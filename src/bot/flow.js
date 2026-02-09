import { getSession } from "../storage/sessions.js";
import { validateAnswer } from "../services/validateAnswers.js";
import { renderPdf } from "../pdf/renderPdf.js";
import { processField } from "../ai/fieldAssistant.js";
import { explainField } from "../ai/fieldExplainer.js";
import { allFields } from "../forms/buergergeld/pages/allPages.js";
import { sections } from "../forms/buergergeld/pages/allPages.js";


const DEBUG_SKIP = process.env.DEBUG_SKIP === "true";
console.log("FLOW DEBUG_SKIP =", DEBUG_SKIP, "ENV =", process.env.DEBUG_SKIP);
// =======================
// UI helpers
// =======================
function buildNavInlineKeyboard(field) {
  const rows = [];

  const navRow = [{ text: "⬅️ Назад", callback_data: "nav:back" }];

  // нормальный пропуск только если поле optional
  if (field?.required === false) {
    navRow.push({ text: "⏭ Пропустить", callback_data: "nav:skip" });
  }

  // DEBUG пропуск (вперёд) — даже для required
  if (DEBUG_SKIP) {
    navRow.push({ text: "➡️ Вперёд (debug)", callback_data: "nav:next_debug" });
  }

  navRow.push({ text: "🔄 Restart", callback_data: "nav:restart" });

  rows.push(navRow);

  // DEBUG: тестовые данные
  if (DEBUG_SKIP) {
    rows.push([{ text: "⚡ Тестовые данные", callback_data: "debug:fill_test" }]);
  }

  rows.push([{ text: "❓ Объяснить", callback_data: "help:field" }]);
  rows.push([{ text: "📄 PDF сейчас", callback_data: "nav:pdf" }]);

  return { reply_markup: { inline_keyboard: rows } };
}

function buildChoiceInlineKeyboard(field) {
  const rows = field.options.map((o) => [
    { text: o.label_ru, callback_data: `choice:${field.key}:${o.value}` }
  ]);

  const navRow = [{ text: "⬅️ Назад", callback_data: "nav:back" }];

  if (field?.required === false) {
    navRow.push({ text: "⏭ Пропустить", callback_data: "nav:skip" });
  }

  if (DEBUG_SKIP) {
    navRow.push({ text: "➡️ Вперёд (debug)", callback_data: "nav:next_debug" });
  }

  navRow.push({ text: "🔄 Restart", callback_data: "nav:restart" });

  rows.push(navRow);

  // DEBUG: тестовые данные
  if (DEBUG_SKIP) {
    rows.push([{ text: "⚡ Тестовые данные", callback_data: "debug:fill_test" }]);
  }

  rows.push([{ text: "❓ Объяснить", callback_data: "help:field" }]);
  rows.push([{ text: "📄 PDF сейчас", callback_data: "nav:pdf" }]);

  return { reply_markup: { inline_keyboard: rows } };
}

function buildMultiChoiceInlineKeyboard(field, selectedValues = []) {
  const selectedSet = new Set(Array.isArray(selectedValues) ? selectedValues : []);

  const rows = field.options.map((o) => {
    const isSelected = selectedSet.has(o.value);
    const label = isSelected ? `✅ ${o.label_ru}` : `⬜ ${o.label_ru}`;

    return [
      {
        text: label,
        callback_data: `mchoice:${field.key}:${o.value}`
      }
    ];
  });

  rows.push([
    { text: "✅ Готово", callback_data: `mchoice_done:${field.key}` },
    { text: "🧹 Очистить", callback_data: `mchoice_clear:${field.key}` }
  ]);

  rows.push([
    { text: "⬅️ Назад", callback_data: "nav:back" },
    ...(DEBUG_SKIP ? [{ text: "➡️ Вперёд (debug)", callback_data: "nav:next_debug" }] : []),
    { text: "🔄 Restart", callback_data: "nav:restart" }
  ]);

  // DEBUG: тестовые данные
  if (DEBUG_SKIP) {
    rows.push([{ text: "⚡ Тестовые данные", callback_data: "debug:fill_test" }]);
  }

  rows.push([{ text: "❓ Объяснить", callback_data: "help:field" }]);
  rows.push([{ text: "📄 PDF сейчас", callback_data: "nav:pdf" }]);

  return { reply_markup: { inline_keyboard: rows } };
}

// =======================
// Flow helpers
// =======================
function isFieldAvailable(field, answers) {
  if (!field?.dependsOn) return true;

  const depKey = field.dependsOn.key;
  const depValue = field.dependsOn.value;

  const actual = answers?.[depKey];

  // multi_choice -> массив
  if (Array.isArray(actual)) {
    return actual.includes(depValue);
  }

  // multi_choice -> строка "a,b,c"
  if (typeof actual === "string") {
    const arr = actual
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    return arr.includes(depValue);
  }

  // обычный случай
  return actual === depValue;
}

function clearDependentAnswers(changedKey, session) {
  let removed = true;

  while (removed) {
    removed = false;

    for (const field of allFields) {
      if (!field.dependsOn) continue;

      const { key: depKey } = field.dependsOn;

      // если поле зависит от изменённого ключа
      if (depKey === changedKey) {
        if (session.answers[field.key] !== undefined) {
          delete session.answers[field.key];
          delete session.rawAnswers[field.key];
          clearDependentAnswers(field.key, session);
          removed = true;

          // рекурсивно чистим цепочку
          clearDependentAnswers(field.key, session);
        }
      }
    }
  }
}

function getNextAvailableStep(fromStep, answers) {
  let step = fromStep;
  while (step < allFields.length) {
    const f = allFields[step];
    if (isFieldAvailable(f, answers)) return step;
    step++;
  }
  return step;
}

function getPrevAvailableStep(fromStep, answers) {
  let step = fromStep;
  while (step >= 0) {
    const f = allFields[step];
    if (isFieldAvailable(f, answers)) return step;
    step--;
  }
  return 0;
}

function getCurrentField(session) {
  if (typeof session.step !== "number") session.step = 0;
  session.step = getNextAvailableStep(session.step, session.answers);
  return allFields[session.step];
}

function getQuestionProgress(session, page) {
  if (!session || !page) return null;

  const visibleFields = page.fields.filter(field => {
    if (!field.dependsOn) return true;

    const val = session.answers[field.dependsOn.key];
    return val === field.dependsOn.value;
  });

  const totalQuestions = visibleFields.length;

  // текущее поле
  const currentKey = session.currentFieldKey;
  let currentQuestion = 1;

  if (currentKey) {
    const index = visibleFields.findIndex(f => f.key === currentKey);
    if (index >= 0) {
      currentQuestion = index + 1;
    }
  }

  return {
    question: currentQuestion,
    totalQuestions
  };
}

function formatProgress(session, form, page) {
  const pageIndex = session.pageIndex;
  const totalPages = form.pages.length;

  const q = getQuestionProgress(session, page);

  if (!q) return "";

  return (
    `📄 Страница ${pageIndex + 1} из ${totalPages}\n` +
    `📊 Вопрос ${q.question} из ${q.totalQuestions}\n\n`
  );
}


// =======================
// Explain helper
// =======================
async function explainCurrentField(ctx) {
  const session = getSession(ctx.from.id);
  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};
  if (typeof session.step !== "number") session.step = 0;

  const field = getCurrentField(session);
  if (!field) {
    await ctx.reply("❓ Сейчас нет активного поля для объяснения.");
    return;
  }

  const text = field.help_ru || "Пояснение для этого поля пока не добавлено.";

  if (field.type === "choice") {
    await ctx.reply(`📌 Объяснение:\n\n${text}`, buildChoiceInlineKeyboard(field));
    return;
  }

  if (field.type === "multi_choice") {
    const selected = session.answers?.[field.key] || [];
    await ctx.reply(
      `📌 Объяснение:\n\n${text}`,
      buildMultiChoiceInlineKeyboard(field, selected)
    );
    return;
  }

  await ctx.reply(`📌 Объяснение:\n\n${text}`, buildNavInlineKeyboard(field));
}


// =======================
// Public API
// =======================
export async function startFlow(ctx) {
  const session = getSession(ctx.from.id);

  session.step = 0;
  session.rawAnswers = {};
  session.answers = {};

  session.step = getNextAvailableStep(session.step, session.answers);

  await ctx.reply("📝 Начинаем заполнение анкеты.");
  await askNextQuestion(ctx);
}


export async function restartFlow(ctx) {
  const session = getSession(ctx.from.id);

  session.step = 0;
  session.rawAnswers = {};
  session.answers = {};

  session.step = getNextAvailableStep(session.step, session.answers);

  await ctx.reply("🔄 Ок! Начинаем заново.");
  await askNextQuestion(ctx);
}

export async function goBack(ctx) {
  const session = getSession(ctx.from.id);

  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};
  if (typeof session.step !== "number") session.step = 0;

  session.step = session.step - 1;
  session.step = getPrevAvailableStep(session.step, session.answers);

  const field = allFields[session.step];
  if (field) {
    delete session.answers[field.key];
    delete session.rawAnswers[field.key];
  }

  await ctx.reply("⬅️ Назад.");
  await askNextQuestion(ctx);
}

export async function skipCurrentField(ctx) {
  const session = getSession(ctx.from.id);

  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};
  if (typeof session.step !== "number") session.step = 0;

  session.step = getNextAvailableStep(session.step, session.answers);

  const field = allFields[session.step];
  if (!field) return;

  if (field.required !== false) {
    await ctx.reply(
      "⚠️ Это обязательное поле, его нельзя пропустить.",
      buildNavInlineKeyboard(field)
    );
    return;
  }

  session.answers[field.key] = "";
  session.rawAnswers[field.key] = "(пропущено)";

  session.step++;
  session.step = getNextAvailableStep(session.step, session.answers);

  await ctx.reply("⏭ Пропущено.");
  await askNextQuestion(ctx);
}

export async function debugNext(ctx) {
  const session = getSession(ctx.from.id);

  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};
  if (typeof session.step !== "number") session.step = 0;

  session.step = getNextAvailableStep(session.step, session.answers);

  const field = allFields[session.step];
  if (!field) return;

  session.answers[field.key] = "";
  session.rawAnswers[field.key] = "(debug skip)";

  session.step++;
  session.step = getNextAvailableStep(session.step, session.answers);

  await ctx.reply("➡️ Debug: шаг пропущен.");
  await askNextQuestion(ctx);
}

export async function fillTestData(ctx) {
  const session = getSession(ctx.from.id);

  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};
  if (typeof session.step !== "number") session.step = 0;

  // заполняем все доступные поля по dependsOn
  for (let i = 0; i < allFields.length; i++) {
    const field = allFields[i];

    if (!isFieldAvailable(field, session.answers)) continue;

    if (session.answers[field.key] !== undefined) continue;

    // choice
    if (field.type === "choice" && field.options?.length) {
      const v = field.options.find((o) => o.value === "yes")?.value ?? field.options[0].value;
      session.answers[field.key] = v;
      session.rawAnswers[field.key] =
        field.options.find((o) => o.value === v)?.label_ru ?? String(v);
      continue;
    }

    // multi_choice
    if (field.type === "multi_choice" && field.options?.length) {
      const selected = field.options
        .slice(0, Math.min(2, field.options.length))
        .map((o) => o.value);

      session.answers[field.key] = selected;
      session.rawAnswers[field.key] = selected
        .map((v) => field.options.find((o) => o.value === v)?.label_ru || v)
        .join(", ");
      continue;
    }

    // text (эвристики)
    const key = String(field.key || "").toLowerCase();

    if (
      key.includes("date") ||
      key.includes("datum") ||
      key.includes("from") ||
      key.includes("to")
    ) {
      session.answers[field.key] = "01.01.2025";
      session.rawAnswers[field.key] = "01.01.2025";
      continue;
    }

    if (key === "plz" || key.includes("postleitzahl")) {
      session.answers[field.key] = "10115";
      session.rawAnswers[field.key] = "10115";
      continue;
    }

    if (key.includes("iban")) {
      session.answers[field.key] = "DE89370400440532013000";
      session.rawAnswers[field.key] = "DE89370400440532013000";
      continue;
    }

    if (key.includes("email")) {
      session.answers[field.key] = "test@example.com";
      session.rawAnswers[field.key] = "test@example.com";
      continue;
    }

    if (key.includes("phone") || key.includes("telefon")) {
      session.answers[field.key] = "015112345678";
      session.rawAnswers[field.key] = "015112345678";
      continue;
    }

    session.answers[field.key] = "TEST";
    session.rawAnswers[field.key] = "TEST";
  }

  // перейти на первый незаполненный доступный шаг
  session.step = 0;
  session.step = getNextAvailableStep(session.step, session.answers);

  await ctx.reply("⚡ Готово! Тестовые данные заполнены. Можно жать PDF 🙂");
  await askNextQuestion(ctx);
}

export async function generatePdfNow(ctx) {
  const session = getSession(ctx.from.id);
  if (!session.answers) session.answers = {};

  await ctx.reply("⏳ Формирую PDF...");

  try {
    const pdfBuffer = await renderPdf(session.answers);

    await ctx.replyWithDocument({
      filename: "buergergeld.pdf",
      source: pdfBuffer
    });

    await ctx.reply("✅ Готово!", buildAfterPdfKeyboard());
  } catch (err) {
    console.error("❌ PDF error:", err?.message || err);
    await ctx.reply("❌ Ошибка при генерации PDF. Проверьте шаблон и координаты полей.");
  }
}

async function sendImportantNotes(ctx) {
  await ctx.reply(
`📌 Важная информация перед подачей

Эти пункты основаны на общих требованиях Jobcenter и носят информационный характер.
Это не является юридической консультацией.

• Проверьте, что данные заполнены полностью и без ошибок.
• Jobcenter обычно просит сообщать об изменениях (работа, доход, переезд, состав семьи).
• В отдельных случаях Jobcenter сверяет данные с другими ведомствами.
• Указание телефона является добровольным.

📎 Документы, которые Jobcenter часто запрашивает (если относится к вашей ситуации):
• Выписки по банковским счетам за последние 3 месяца
• Договор аренды и подтверждение расходов на жильё/отопление
• Документы о доходах (зарплата, Minijob, Selbständigkeit)
• Информация о медицинской страховке
• Документы членов семьи/совместного проживания
• При необходимости: подтверждения инвалидности или особых потребностей
`
  );
}

function buildAfterPdfKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📌 Важная информация", callback_data: "info:after_pdf" }],
        [{ text: "🔄 Restart", callback_data: "nav:restart" }]
      ]
    }
  };
}

export async function handleAnswer(ctx) {
  const session = getSession(ctx.from.id);

  if (!session.rawAnswers) session.rawAnswers = {};
  if (!session.answers) session.answers = {};
  if (typeof session.step !== "number") session.step = 0;

  session.step = getNextAvailableStep(session.step, session.answers);

  const field = allFields[session.step];
  if (!field) return;

  const value = ctx.message?.text?.trim() || "";

  // команды
  if (value === "/restart") return restartFlow(ctx);
  if (value === "/back") return goBack(ctx);
  if (value === "/pdf") return generatePdfNow(ctx);

  if (value.startsWith("/")) {
    await ctx.reply("ℹ️ Команда получена. Продолжаем 🙂");
    await askNextQuestion(ctx);
    return;
  }

  // choice текстом не принимаем
  if (field.type === "choice") {
    await ctx.reply("⚠️ Выберите вариант кнопкой ниже.", buildChoiceInlineKeyboard(field));
    return;
  }

  // multi_choice текстом не принимаем
  if (field.type === "multi_choice") {
    const current = session.answers?.[field.key] || [];
    await ctx.reply(
      "⚠️ Выберите варианты кнопками ниже.",
      buildMultiChoiceInlineKeyboard(field, current)
    );
    return;
  }

  const validation = validateAnswer(field, value);
  if (!validation.ok) {
    await ctx.reply(`⚠️ ${validation.message}`, buildNavInlineKeyboard(field));
    return;
  }

  session.rawAnswers[field.key] = value;

  let processedValue = value;

  // перевод/нормализация через ИИ (только если translate !== false)
  if (field.translate !== false) {
    const processed = await processField(field, value);
    processedValue = processed?.translated ?? value;

    if (processed?.warning) {
      await ctx.reply(processed.warning);
    }
  }

  session.answers[field.key] = processedValue;

  clearDependentAnswers(field.key, session);

  session.step++;
  session.step = getNextAvailableStep(session.step, session.answers);

  await askNextQuestion(ctx);
}

export async function handleChoiceCallback(ctx) {
  const session = getSession(ctx.from.id);

  if (!session.rawAnswers) session.rawAnswers = {};
  if (!session.answers) session.answers = {};
  if (typeof session.step !== "number") session.step = 0;

  const data = ctx.callbackQuery?.data || "";

  // навигация
  if (data === "nav:back") {
    await ctx.answerCbQuery();
    return goBack(ctx);
  }
  if (data === "nav:restart") {
    await ctx.answerCbQuery();
    return restartFlow(ctx);
  }
  if (data === "nav:pdf") {
    await ctx.answerCbQuery();
    return generatePdfNow(ctx);
  }
  if (data === "nav:skip") {
    await ctx.answerCbQuery();
    return skipCurrentField(ctx);
  }
  if (data === "nav:next_debug") {
    await ctx.answerCbQuery();
    return debugNext(ctx);
  }

  if (data === "info:after_pdf") {
    await ctx.answerCbQuery();
    return sendImportantNotes(ctx);
  }


  // DEBUG: заполнить тестовыми данными
  if (data === "debug:fill_test") {
    await ctx.answerCbQuery();
    return fillTestData(ctx);
  }

  // объяснение
  if (data === "help:field") {
    await ctx.answerCbQuery();
    return explainCurrentField(ctx);
  }

  // -----------------------
  // multi_choice
  // -----------------------
  if (data.startsWith("mchoice:")) {
    const [, fieldKey, value] = data.split(":");

    session.step = getNextAvailableStep(session.step, session.answers);
    const field = allFields[session.step];

    if (!field || field.key !== fieldKey || field.type !== "multi_choice") {
      await ctx.answerCbQuery("⚠️ Этот выбор уже неактуален");
      return;
    }

    let selected = session.answers[field.key];

    if (typeof selected === "string") {
      selected = selected
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (!Array.isArray(selected)) selected = [];

    if (selected.includes(value)) {
      selected = selected.filter((v) => v !== value);
    } else {
      selected.push(value);
    }

    session.answers[field.key] = selected;

    session.rawAnswers[field.key] = selected
      .map((v) => field.options.find((o) => o.value === v)?.label_ru || v)
      .join(", ");

    await ctx.answerCbQuery("Ок");

    try {
      await ctx.editMessageReplyMarkup(
        buildMultiChoiceInlineKeyboard(field, selected).reply_markup
      );
    } catch (e) {}

    return;
  }

  if (data.startsWith("mchoice_done:")) {
    const [, fieldKey] = data.split(":");

    session.step = getNextAvailableStep(session.step, session.answers);
    const field = allFields[session.step];

    if (!field || field.key !== fieldKey || field.type !== "multi_choice") {
      await ctx.answerCbQuery("⚠️ Этот выбор уже неактуален");
      return;
    }

    await ctx.answerCbQuery("Готово");

    session.step++;
    session.step = getNextAvailableStep(session.step, session.answers);

    await askNextQuestion(ctx);
    return;
  }

  // === ОБРАБОТКА ОБЗОРА ===
if (data === "summary:pdf") {
  await ctx.answerCbQuery();
  return generatePdfNow(ctx);
}

if (data === "summary:edit") {
  await ctx.answerCbQuery();
  const session = getSession(ctx.from.id);

  // возвращаемся на первый доступный вопрос
  session.step = 0;
  session.step = getNextAvailableStep(session.step, session.answers);

  await ctx.reply("✏️ Хорошо, вы можете изменить ответы.");
  return askNextQuestion(ctx);
}

  if (data.startsWith("mchoice_clear:")) {
    const [, fieldKey] = data.split(":");

    session.step = getNextAvailableStep(session.step, session.answers);
    const field = allFields[session.step];

    if (!field || field.key !== fieldKey || field.type !== "multi_choice") {
      await ctx.answerCbQuery("⚠️ Этот выбор уже неактуален");
      return;
    }

    session.answers[field.key] = [];
    session.rawAnswers[field.key] = "";

    await ctx.answerCbQuery("Очищено");

    try {
      await ctx.editMessageReplyMarkup(
        buildMultiChoiceInlineKeyboard(field, []).reply_markup
      );
    } catch (e) {}

    return;
  }

  // -----------------------
  // choice
  // -----------------------
  if (!data.startsWith("choice:")) return;

  const [, fieldKey, selectedValue] = data.split(":");

  session.step = getNextAvailableStep(session.step, session.answers);

  const field = allFields[session.step];
  if (!field || field.key !== fieldKey || field.type !== "choice") {
    await ctx.answerCbQuery("⚠️ Этот выбор уже неактуален");
    return;
  }

  const selected = field.options?.find((o) => o.value === selectedValue);
  if (!selected) {
    await ctx.answerCbQuery("⚠️ Неверный вариант");
    return;
  }

  session.rawAnswers[field.key] = selected.label_ru;
session.answers[field.key] = selected.value;

clearDependentAnswers(field.key, session);

await ctx.answerCbQuery(); // просто закрываем всплывающее окно без текста

  try {
    await ctx.editMessageText(`${field.label_ru}\n\n✅ Вы выбрали: ${selected.label_ru}`);
  } catch (e) {}

  session.step++;
  session.step = getNextAvailableStep(session.step, session.answers);

  await askNextQuestion(ctx);
}


function getCurrentSection(session) {
  const currentKey = allFields[session.step]?.key;
  return sections.find(sec => sec.fields.includes(currentKey)) || null;
}

function getProgressPercent(session) {
  const total = allFields.length;
  const current = session.step + 1;
  return Math.round((current / total) * 100);
}

function makeProgressBar(percent) {
  const totalBlocks = 12;
  const filled = Math.round((percent / 100) * totalBlocks);
  return "█".repeat(filled) + "░".repeat(totalBlocks - filled) + ` ${percent}%`;
}

function buildSummary(session) {
  let text = "📋 *Проверьте ваши ответы перед формированием PDF*\n\n";

  for (const section of sections) {
    const fieldsInSection = section.fields
      .map(key => allFields.find(f => f.key === key))
      .filter(Boolean)
      .filter(f => session.answers[f.key] !== undefined);

    if (fieldsInSection.length === 0) continue;

    text += `*${section.title}*\n`;

    for (const field of fieldsInSection) {
      const value = session.rawAnswers[field.key] ?? session.answers[field.key];
      text += `• *${field.label_ru}*: ${value}\n`;
    }

    text += "\n";
  }

  return text;
}

// =======================
// Ask next question
// =======================
async function askNextQuestion(ctx) {
  const session = getSession(ctx.from.id);

  if (typeof session.step !== "number") session.step = 0;
  session.step = getNextAvailableStep(session.step, session.answers);

  if (session.step < allFields.length) {
    const nextField = allFields[session.step];

    // === ПРОГРЕСС ===
    const section = getCurrentSection(session);
    const percent = getProgressPercent(session);
    const bar = makeProgressBar(percent);

    const header =
      `${section?.title || "📄 Раздел"}\n` +
      `${bar}\n\n`;

    // === CHOICE ===
    if (nextField.type === "choice" && nextField.options?.length) {
      await ctx.reply(
        header + nextField.label_ru,
        buildChoiceInlineKeyboard(nextField)
      );
      return;
    }

    // === MULTI CHOICE ===
    if (nextField.type === "multi_choice" && nextField.options?.length) {
      const currentValues = session.answers?.[nextField.key] || [];
      await ctx.reply(
        header + nextField.label_ru,
        buildMultiChoiceInlineKeyboard(nextField, currentValues)
      );
      return;
    }

    // === TEXT ===
    await ctx.reply(
      header + nextField.label_ru,
      buildNavInlineKeyboard(nextField)
    );
    return;
  }

// === КОНЕЦ АНКЕТЫ — ПОКАЗЫВАЕМ ОБЗОР ===
const summary = buildSummary(session);

await ctx.reply(summary, {
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{ text: "✏️ Изменить ответы", callback_data: "summary:edit" }],
      [{ text: "📄 Продолжить → PDF", callback_data: "summary:pdf" }]
    ]
  }
});

return; 
}
