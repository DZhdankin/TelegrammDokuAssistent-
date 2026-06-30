import { getSession } from "../storage/sessions.js";
import { validateAnswer } from "../services/validateAnswers.js";
import { renderPdf } from "../pdf/renderPdf.js";
import { processField } from "../ai/fieldAssistant.js";
import { explainField } from "../ai/fieldExplainer.js";
import { getSessionFormContext, resetSessionFormContext } from "../services/formContext.js";
import { logStats, trackStat } from "../services/botStats.js";
import {
  getFieldLabel,
  getOptionLabel,
  getSectionTitle
} from "../services/formLocalization.js";
import { t } from "../services/botMessages.js";
import {
  applyAvailableAutoFields,
  clearDependentAnswers,
  getCurrentField,
  getNextAvailableStep,
  getPrevAvailableStep,
  isFieldAvailable
} from "../services/formEngine.js";

const DEBUG_SKIP = process.env.DEBUG_SKIP === "true";

// =======================
// UI helpers
// =======================
function buildNavInlineKeyboard(field, language = "ru") {
  const rows = [];
  const navRow = [{ text: t(language, "back"), callback_data: "nav:back" }];

  if (field?.required === false) {
    navRow.push({ text: t(language, "skip"), callback_data: "nav:skip" });
  }

  if (DEBUG_SKIP) {
    navRow.push({ text: t(language, "nextDebug"), callback_data: "nav:next_debug" });
  }

  navRow.push({ text: t(language, "restart"), callback_data: "nav:restart" });
  rows.push(navRow);

 /* if (DEBUG_SKIP) {
    rows.push([{ text: t(language, "fillTestData"), callback_data: "debug:fill_test" }]);
    rows.push([{ text: t(language, "fillTestDataAlt"), callback_data: "debug:fill_test_alt" }]);
  }*/

  rows.push([{ text: t(language, "explain"), callback_data: "help:field" }]);
  rows.push([{ text: t(language, "pdfNow"), callback_data: "nav:pdf" }]);

  return { reply_markup: { inline_keyboard: rows } };
}

function buildChoiceInlineKeyboard(field, language = "ru") {
  const rows = field.options.map((o) => [
    { text: getOptionLabel(o, language), callback_data: `choice:${field.key}:${o.value}` }
  ]);

  const navRow = [{ text: t(language, "back"), callback_data: "nav:back" }];

  if (field?.required === false) {
    navRow.push({ text: t(language, "skip"), callback_data: "nav:skip" });
  }

  if (DEBUG_SKIP) {
    navRow.push({ text: t(language, "nextDebug"), callback_data: "nav:next_debug" });
  }

  navRow.push({ text: t(language, "restart"), callback_data: "nav:restart" });
  rows.push(navRow);

 /* if (DEBUG_SKIP) {
    rows.push([{ text: t(language, "fillTestData"), callback_data: "debug:fill_test" }]);
    rows.push([{ text: t(language, "fillTestDataAlt"), callback_data: "debug:fill_test_alt" }]);
  }*/

  rows.push([{ text: t(language, "explain"), callback_data: "help:field" }]);
  rows.push([{ text: t(language, "pdfNow"), callback_data: "nav:pdf" }]);

  return { reply_markup: { inline_keyboard: rows } };
}

function buildMultiChoiceInlineKeyboard(field, selectedValues = [], language = "ru") {
  const selectedSet = new Set(Array.isArray(selectedValues) ? selectedValues : []);

  const rows = field.options.map((o) => {
    const isSelected = selectedSet.has(o.value);
    const label = isSelected
      ? `✅ ${getOptionLabel(o, language)}`
      : `⬜ ${getOptionLabel(o, language)}`;
    return [{ text: label, callback_data: `mchoice:${field.key}:${o.value}` }];
  });

  rows.push([
    { text: t(language, "done"), callback_data: `mchoice_done:${field.key}` },
    { text: t(language, "clear"), callback_data: `mchoice_clear:${field.key}` }
  ]);

  rows.push([
    { text: t(language, "back"), callback_data: "nav:back" },
    ...(DEBUG_SKIP ? [{ text: t(language, "nextDebug"), callback_data: "nav:next_debug" }] : []),
    { text: t(language, "restart"), callback_data: "nav:restart" }
  ]);

  if (DEBUG_SKIP) {
    rows.push([{ text: t(language, "fillTestData"), callback_data: "debug:fill_test" }]);
    rows.push([{ text: t(language, "fillTestDataAlt"), callback_data: "debug:fill_test_alt" }]);
  }

  rows.push([{ text: t(language, "explain"), callback_data: "help:field" }]);
  rows.push([{ text: t(language, "pdfNow"), callback_data: "nav:pdf" }]);

  return { reply_markup: { inline_keyboard: rows } };
}
// =======================
// Public API
// =======================
export async function startFlow(ctx) {
  const session = getSession(ctx.from.id);
  const { fields: allFields, language } = resetSessionFormContext(session);

  session.step = getNextAvailableStep(allFields, session.step, session.answers);

  await ctx.reply(t(language, "flowStart"));
  await askNextQuestion(ctx);
}
export async function restartFlow(ctx) {
  const session = getSession(ctx.from.id);
  const { fields: allFields, language } = resetSessionFormContext(session);

  session.step = getNextAvailableStep(allFields, session.step, session.answers);

  await ctx.reply(t(language, "flowRestart"));
  await askNextQuestion(ctx);
}

export async function goBack(ctx) {
  const session = getSession(ctx.from.id);
  const { fields: allFields, language } = getSessionFormContext(session);

  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};
  if (typeof session.step !== "number") session.step = 0;

  session.step = session.step - 1;
  session.step = getPrevAvailableStep(allFields, session.step, session.answers);

  const field = getCurrentField(allFields, session);
  if (field) {
    delete session.answers[field.key];
    delete session.rawAnswers[field.key];
  }

  await ctx.reply(t(language, "backReply"));
  await askNextQuestion(ctx);
}

export async function skipCurrentField(ctx) {
  const session = getSession(ctx.from.id);
  const { fields: allFields, language } = getSessionFormContext(session);

  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};
  if (typeof session.step !== "number") session.step = 0;

  session.step = getNextAvailableStep(allFields, session.step, session.answers);
  const field = allFields[session.step];
  if (!field) return;

  if (field.required !== false) {
    await ctx.reply(
      t(language, "requiredField"),
      buildNavInlineKeyboard(field, language)
    );
    return;
  }

  session.answers[field.key] = "";
  session.rawAnswers[field.key] = t(language, "skipped");

  session.step++;
  session.step = getNextAvailableStep(allFields, session.step, session.answers);

  await ctx.reply(t(language, "skipped"));
  await askNextQuestion(ctx);
}

export async function debugNext(ctx) {
  const session = getSession(ctx.from.id);
  const { fields: allFields, language } = getSessionFormContext(session);

  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};
  if (typeof session.step !== "number") session.step = 0;

  session.step = getNextAvailableStep(allFields, session.step, session.answers);
  const field = allFields[session.step];
  if (!field) return;

  session.answers[field.key] = "";
  session.rawAnswers[field.key] = "(debug skip)";

  session.step++;
  session.step = getNextAvailableStep(allFields, session.step, session.answers);

  await ctx.reply(t(language, "debugSkipped"));
  await askNextQuestion(ctx);
}

function buildChildrenByKey(fields) {
  const map = new Map();

  for (const field of fields) {
    const dependencies = Array.isArray(field?.dependsOn)
      ? field.dependsOn
      : field?.dependsOn
        ? [field.dependsOn]
        : [];

    for (const dependsOn of dependencies) {
      const parentKey = dependsOn?.key;
      if (!parentKey) continue;

      const list = map.get(parentKey) || [];
      list.push(field);
      map.set(parentKey, list);
    }
  }

  return map;
}

function scoreChoiceBranch(field, selectedValue, childrenByKey, memo, stack) {
  const memoKey = `${field.key}:${selectedValue}`;
  if (memo.has(memoKey)) return memo.get(memoKey);
  if (stack.has(memoKey)) return 0;

  stack.add(memoKey);

  let score = 0;
  const children = childrenByKey.get(field.key) || [];

  for (const child of children) {
    const dependencies = Array.isArray(child?.dependsOn)
      ? child.dependsOn
      : child?.dependsOn
        ? [child.dependsOn]
        : [];
    const matchingChoiceDependency = dependencies.some((dependsOn) =>
      dependsOn.key === field.key && dependsOn.value === selectedValue
    );
    if (!matchingChoiceDependency) continue;
    score += scoreFieldCoverage(child, childrenByKey, memo, stack);
  }

  stack.delete(memoKey);
  memo.set(memoKey, score);
  return score;
}

function scoreFieldCoverage(field, childrenByKey, memo, stack) {
  if (!field) return 0;

  const key = field.key;
  const memoKey = `field:${key}`;
  if (memo.has(memoKey)) return memo.get(memoKey);
  if (stack.has(memoKey)) return 0;

  stack.add(memoKey);

  let score = 1;
  const children = childrenByKey.get(key) || [];

  for (const child of children) {
    if (!child?.dependsOn) continue;

    if (child.type === "choice") {
      let best = 0;
      for (const opt of child.options || []) {
        best = Math.max(best, scoreChoiceBranch(child, opt.value, childrenByKey, memo, stack));
      }
      score += 1 + best;
      continue;
    }

    if (child.type === "multi_choice") {
      let total = 1;
      for (const opt of child.options || []) {
        total += scoreChoiceBranch(child, opt.value, childrenByKey, memo, stack);
      }
      score += total;
      continue;
    }

    score += scoreFieldCoverage(child, childrenByKey, memo, stack);
  }

  stack.delete(memoKey);
  memo.set(memoKey, score);
  return score;
}

function pickBestChoiceValue(field, childrenByKey, variant = "primary") {
  const options = field.options || [];
  if (options.length === 0) return undefined;

  const memo = new Map();
  const stack = new Set();
  const preference = variant === "alternate"
    ? ["no", "nein", "false", "0"]
    : ["yes", "ja", "true", "1"];

  let bestOption = options[0];
  let bestScore = variant === "alternate" ? Number.POSITIVE_INFINITY : -1;

  for (const opt of options) {
    const score = scoreChoiceBranch(field, opt.value, childrenByKey, memo, stack);
    const prefBonus = preference.includes(String(opt.value).toLowerCase()) ? 0.5 : 0;
    const total = variant === "alternate" ? score - prefBonus : score + prefBonus;

    if (variant === "alternate") {
      if (total < bestScore) {
        bestScore = total;
        bestOption = opt;
      }
      continue;
    }

    if (total > bestScore) {
      bestScore = total;
      bestOption = opt;
    }
  }

  return bestOption;
}

function buildTestTextValue(field, variant = "primary") {
  const key = String(field?.key || "").toLowerCase();
  const base = variant === "alternate" ? "ALT" : "TEST";

  if (key.includes("email")) return "test@example.com";
  if (key.includes("iban")) return "DE89370400440532013000";
  if (key.includes("bic")) return "DEUTDEFF500";
  if (key.includes("phone") || key.includes("telefon")) return "015112345678";
  if (key.includes("plz") || key.includes("postal") || key.includes("postleitzahl")) return "10115";
  if (key.includes("date") || key.includes("datum") || key.includes("from") || key.includes("to")) return "01.01.2025";
  if (key.includes("country") || key.includes("land")) return "Deutschland";
  if (key.includes("nationality")) return "Deutsch";
  if (key.includes("city") || key.includes("ort")) return "Berlin";
  if (key.includes("street") || key.includes("strasse") || key.includes("adresse") || key.includes("address") || key.includes("anschrift")) return "Musterstraße 1";
  if (key.includes("house_number") || key.includes("hausnummer")) return "12A";
  if (key.includes("first_name")) return "Max";
  if (key.includes("last_name")) return "Mustermann";
  if (key.includes("full_name")) return "Max Mustermann";
  if (key.includes("name")) return "Max Mustermann";
  if (key.includes("title")) return "Dr.";
  if (key.includes("gender")) return "m";
  if (key.includes("count") || key.includes("anzahl")) return "1";
  if (key.includes("number") || key.includes("nummer") || key.includes("id")) return "12345678901";
  if (key.includes("bank")) return "Musterbank";
  if (key.includes("account_holder") || key.includes("kontoinhaber")) return "Max Mustermann";
  if (key.includes("birth_place") || key.includes("geburtsort")) return "Berlin";
  if (key.includes("birth_name") || key.includes("previous_name") || key.includes("geburtsname")) return "Muster";
  return base;
}

function buildBoxedTextValue(field, variant = "primary") {
  const length = Number(field?.maxLength || field?.pdf?.cells?.length || 11);
  const digits = variant === "alternate" ? "98765432109876543210" : "12345678901234567890";
  return digits.slice(0, Math.max(1, length));
}

export async function fillTestData(ctx, variant = "primary") {
  const session = getSession(ctx.from.id);
  const { fields: allFields, language } = getSessionFormContext(session);
  const childrenByKey = buildChildrenByKey(allFields);

  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};
  if (typeof session.step !== "number") session.step = 0;
  applyAvailableAutoFields(allFields, session);

  for (let i = 0; i < allFields.length; i++) {
    const field = allFields[i];

    if (!isFieldAvailable(field, session.answers)) continue;
    if (session.answers[field.key] !== undefined) continue;

    if (field.type === "boxed_text") {
      const value = buildBoxedTextValue(field, variant);
      session.answers[field.key] = value;
      session.rawAnswers[field.key] = value;
      continue;
    }

    if (field.type === "choice" && field.options?.length) {
      const selected = pickBestChoiceValue(field, childrenByKey, variant) ?? field.options[0];
      session.answers[field.key] = selected.value;
      session.rawAnswers[field.key] = getOptionLabel(selected, language) ?? String(selected.value);
      continue;
    }

    if (field.type === "multi_choice" && field.options?.length) {
      const selected = variant === "alternate"
        ? field.options.slice(-1).map((o) => o.value)
        : field.options.map((o) => o.value);
      session.answers[field.key] = selected;
      session.rawAnswers[field.key] = selected
        .map((v) => getOptionLabel(field.options.find((o) => o.value === v), language) || v)
        .join(", ");
      continue;
    }

    const value = buildTestTextValue(field, variant);
    session.answers[field.key] = value;
    session.rawAnswers[field.key] = value;
  }

  session.step = 0;
  session.step = getNextAvailableStep(allFields, session.step, session.answers);

  await ctx.reply(t(language, variant === "alternate" ? "testDataFilledAlt" : "testDataFilled"));
  await askNextQuestion(ctx);
}

export async function switchForm(ctx, formId) {
  const session = getSession(ctx.from.id);

  try {
    const { fields: allFields, form } = resetSessionFormContext(session, { formId });
    session.step = getNextAvailableStep(allFields, session.step, session.answers);

    await ctx.reply(`${t(session.language, "formSelected")} ${form.title || form.id}`);
    await askNextQuestion(ctx);
  } catch (err) {
    await ctx.reply(`${t(session.language, "formNotFound")} ${formId}`);
  }
}

export async function switchLanguage(ctx, language) {
  const session = getSession(ctx.from.id);
  const { form, fields: allFields } = getSessionFormContext(session);

  if (!form.languages?.includes(language)) {
    await ctx.reply(`${t(session.language, "languageUnavailable")} ${language}`);
    return;
  }

  session.language = language;
  session.step = getNextAvailableStep(allFields, session.step || 0, session.answers || {});

  await ctx.reply(`${t(language, "languageChosen")} ${language}`);
  await askNextQuestion(ctx);
}
// =======================
// PDF generation
// =======================
export async function generatePdfNow(ctx) {
  const session = getSession(ctx.from.id);
  const { form } = getSessionFormContext(session);
  if (!session.answers) session.answers = {};

  await ctx.reply(t(session.language, "pdfBuilding"));

  try {
    const pdfBuffer = await renderPdf(session.answers, form);

    await ctx.replyWithDocument({
      filename: `${form.id || "form"}.pdf`,
      source: pdfBuffer
    });

    trackStat(ctx, "pdfGenerated");
    logStats("PDF");

    await ctx.reply(t(session.language, "pdfDone"), buildAfterPdfKeyboard(session.language));
  } catch (err) {
    console.error("❌ PDF error:", err?.message || err);
    await ctx.reply(t(session.language, "pdfError"));
  }
}

function buildAfterPdfKeyboard(language = "ru") {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: t(language, "importantInfo"), callback_data: "info:after_pdf" }],
        [{ text: t(language, "feedbackButton"), callback_data: "feedback:ask" }],
        [{ text: t(language, "restart"), callback_data: "nav:restart" }]
      ]
    }
  };
}

async function sendImportantNotes(ctx) {
  const session = getSession(ctx.from.id);
  await ctx.reply(t(session.language, "importantNotes"));
}

async function explainCurrentField(ctx) {
  const session = getSession(ctx.from.id);
  const { fields: allFields, language } = getSessionFormContext(session);

  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};
  if (typeof session.step !== "number") session.step = 0;

  const field = allFields[session.step];
  if (!field) {
    await ctx.reply(t(language, "noActiveField"));
    return;
  }

  const text = await explainField(field, language);

  if (field.type === "choice") {
    await ctx.reply(`${t(language, "explanationTitle")}\n\n${text}`, buildChoiceInlineKeyboard(field, language));
    return;
  }

  if (field.type === "multi_choice") {
    const selected = session.answers?.[field.key] || [];
    await ctx.reply(
      `${t(language, "explanationTitle")}\n\n${text}`,
      buildMultiChoiceInlineKeyboard(field, selected, language)
    );
    return;
  }

  await ctx.reply(`${t(language, "explanationTitle")}\n\n${text}`, buildNavInlineKeyboard(field, language));
}

// =======================
// handleAnswer
// =======================
export async function handleAnswer(ctx) {
  const session = getSession(ctx.from.id);
  const { fields: allFields, language } = getSessionFormContext(session);

  if (!session.rawAnswers) session.rawAnswers = {};
  if (!session.answers) session.answers = {};
  if (typeof session.step !== "number") session.step = 0;

  session.step = getNextAvailableStep(allFields, session.step, session.answers);
  const field = allFields[session.step];
  if (!field) return;

  const value = ctx.message?.text?.trim() || "";

  // команды
  if (value === "/restart") return restartFlow(ctx);
  if (value === "/back") return goBack(ctx);
  if (value === "/pdf") return generatePdfNow(ctx);

  if (value.startsWith("/")) {
    await ctx.reply(t(language, "commandReceived"));
    return askNextQuestion(ctx);
  }

  // choice текстом не принимаем
  if (field.type === "choice") {
    await ctx.reply(t(language, "chooseWithButton"), buildChoiceInlineKeyboard(field, language));
    return;
  }

  // multi_choice текстом не принимаем
  if (field.type === "multi_choice") {
    const current = session.answers?.[field.key] || [];
    await ctx.reply(
      t(language, "chooseManyWithButtons"),
      buildMultiChoiceInlineKeyboard(field, current, language)
    );
    return;
  }

  // валидация
  const validation = validateAnswer(field, value, language);
  if (!validation.ok) {
    await ctx.reply(`⚠️ ${validation.message}`, buildNavInlineKeyboard(field, language));
    return;
  }

  session.rawAnswers[field.key] = value;

  let processedValue = value;

  if (field.translate !== false) {
    const processed = await processField(field, value);
    processedValue = processed?.translated ?? value;

    if (processed?.warning) {
      await ctx.reply(processed.warning);
    }
  }

  session.answers[field.key] = processedValue;

  clearDependentAnswers(field.key, session, allFields);
  applyAvailableAutoFields(allFields, session);

  session.step++;
  session.step = getNextAvailableStep(allFields, session.step, session.answers);

  await askNextQuestion(ctx);
}

// =======================
// handleChoiceCallback
// =======================
export async function handleChoiceCallback(ctx) {
  const session = getSession(ctx.from.id);
  const { fields: allFields, language } = getSessionFormContext(session);
  const data = ctx.callbackQuery?.data || "";

  if (!session.rawAnswers) session.rawAnswers = {};
  if (!session.answers) session.answers = {};
  if (typeof session.step !== "number") session.step = 0;

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

  if (data === "debug:fill_test") {
    await ctx.answerCbQuery();
    return fillTestData(ctx);
  }

  if (data === "debug:fill_test_alt") {
    await ctx.answerCbQuery();
    return fillTestData(ctx, "alternate");
  }

  if (data === "help:field") {
    await ctx.answerCbQuery();
    return explainCurrentField(ctx);
  }

  if (data.startsWith("form:")) {
    const [, formId] = data.split(":");
    await ctx.answerCbQuery();
    return switchForm(ctx, formId);
  }

  if (data.startsWith("lang:")) {
    const [, language] = data.split(":");
    await ctx.answerCbQuery();
    return switchLanguage(ctx, language);
  }

  if (data === "summary:pdf") {
    await ctx.answerCbQuery();
    return generatePdfNow(ctx);
  }

  if (data === "summary:edit") {
    await ctx.answerCbQuery();
    session.step = 0;
    session.step = getNextAvailableStep(allFields, session.step, session.answers);
    return askNextQuestion(ctx);
  }

  // multi_choice
  if (data.startsWith("mchoice:")) {
    const [, fieldKey, value] = data.split(":");

    session.step = getNextAvailableStep(allFields, session.step, session.answers);
    const field = allFields[session.step];

    if (!field || field.key !== fieldKey || field.type !== "multi_choice") {
      await ctx.answerCbQuery(t(language, "staleChoice"));
      return;
    }

    let selected = session.answers[field.key];

    if (typeof selected === "string") {
      selected = selected.split(",").map((s) => s.trim()).filter(Boolean);
    }

    if (!Array.isArray(selected)) selected = [];

    if (selected.includes(value)) {
      selected = selected.filter((v) => v !== value);
    } else {
      selected.push(value);
    }

    session.answers[field.key] = selected;

    session.rawAnswers[field.key] = selected
      .map((v) => getOptionLabel(field.options.find((o) => o.value === v), language) || v)
      .join(", ");

    await ctx.answerCbQuery(t(language, "cbOk"));

    try {
      await ctx.editMessageReplyMarkup(
        buildMultiChoiceInlineKeyboard(field, selected, language).reply_markup
      );
    } catch {}

    return;
  }

  if (data.startsWith("mchoice_done:")) {
    const [, fieldKey] = data.split(":");

    session.step = getNextAvailableStep(allFields, session.step, session.answers);
    const field = allFields[session.step];

    if (!field || field.key !== fieldKey || field.type !== "multi_choice") {
      await ctx.answerCbQuery(t(language, "staleChoice"));
      return;
    }

    await ctx.answerCbQuery(t(language, "cbDone"));

    session.step++;
    session.step = getNextAvailableStep(allFields, session.step, session.answers);

    return askNextQuestion(ctx);
  }

  if (data.startsWith("mchoice_clear:")) {
    const [, fieldKey] = data.split(":");

    session.step = getNextAvailableStep(allFields, session.step, session.answers);
    const field = allFields[session.step];

    if (!field || field.key !== fieldKey || field.type !== "multi_choice") {
      await ctx.answerCbQuery(t(language, "staleChoice"));
      return;
    }

    session.answers[field.key] = [];
    session.rawAnswers[field.key] = "";

    await ctx.answerCbQuery(t(language, "cbCleared"));

    try {
      await ctx.editMessageReplyMarkup(
        buildMultiChoiceInlineKeyboard(field, [], language).reply_markup
      );
    } catch {}

    return;
  }

  // choice
  if (!data.startsWith("choice:")) return;

  const [, fieldKey, selectedValue] = data.split(":");

  session.step = getNextAvailableStep(allFields, session.step, session.answers);
  const field = allFields[session.step];

  if (!field || field.key !== fieldKey || field.type !== "choice") {
    await ctx.answerCbQuery(t(language, "staleChoice"));
    return;
  }

  const selected = field.options?.find((o) => o.value === selectedValue);
  if (!selected) {
    await ctx.answerCbQuery(t(language, "invalidChoice"));
    return;
  }

  session.rawAnswers[field.key] = getOptionLabel(selected, language);
  session.answers[field.key] = selected.value;

  clearDependentAnswers(field.key, session, allFields);
  applyAvailableAutoFields(allFields, session);

  await ctx.answerCbQuery();

  try {
    await ctx.editMessageText(
      `${getFieldLabel(field, language)}\n\n${t(language, "chosen")} ${getOptionLabel(selected, language)}`
    );
  } catch {}

  session.step++;
  session.step = getNextAvailableStep(allFields, session.step, session.answers);

  await askNextQuestion(ctx);
}

// =======================
// askNextQuestion
// =======================
async function askNextQuestion(ctx) {
  const session = getSession(ctx.from.id);
  const { fields: allFields, sections, language } = getSessionFormContext(session);

  applyAvailableAutoFields(allFields, session);

  if (typeof session.step !== "number") session.step = 0;
  session.step = getNextAvailableStep(allFields, session.step, session.answers);

  if (session.step < allFields.length) {
    const nextField = allFields[session.step];

    const section = sections.find((sec) => sec.fields.includes(nextField.key));
    const percent = Math.round(((session.step + 1) / allFields.length) * 100);
    const bar = "█".repeat(Math.round(percent / 8)) + "░".repeat(12 - Math.round(percent / 8));

    const header = `${section ? getSectionTitle(section, language) : t(language, "sectionFallback")}\n${bar} ${percent}%\n\n`;
    const label = getFieldLabel(nextField, language);

    if (nextField.type === "choice") {
      await ctx.reply(header + label, buildChoiceInlineKeyboard(nextField, language));
      return;
    }

    if (nextField.type === "multi_choice") {
      const currentValues = session.answers?.[nextField.key] || [];
      await ctx.reply(
        header + label,
        buildMultiChoiceInlineKeyboard(nextField, currentValues, language)
      );
      return;
    }

    await ctx.reply(header + label, buildNavInlineKeyboard(nextField, language));
    return;
  }

  const summary = buildSummary(session);

  await ctx.reply(summary, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: t(language, "summaryEdit"), callback_data: "summary:edit" }],
        [{ text: t(language, "summaryPdf"), callback_data: "summary:pdf" }]
      ]
    }
  });
}

function buildSummary(session) {
  const { fields: allFields, sections, language } = getSessionFormContext(session);
  let text = `${t(language, "checkSummary")}\n\n`;

  for (const section of sections) {
    const fieldsInSection = section.fields
      .map((key) => allFields.find((f) => f.key === key))
      .filter(Boolean)
      .filter((f) => !f.hiddenInSummary)
      .filter((f) => session.answers[f.key] !== undefined);

    if (fieldsInSection.length === 0) continue;

    text += `*${getSectionTitle(section, language)}*\n`;

    for (const field of fieldsInSection) {
      const value = session.rawAnswers[field.key] ?? session.answers[field.key];
      text += `• *${getFieldLabel(field, language)}*: ${value}\n`;
    }

    text += "\n";
  }

  return text;
}
