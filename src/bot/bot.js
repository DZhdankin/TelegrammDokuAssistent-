import { Telegraf } from "telegraf";
import {
  startFlow,
  handleAnswer,
  handleChoiceCallback,
  restartFlow,
  goBack,
  generatePdfNow
} from "./flow.js";
import { dataPolicy } from "./dataPolicy.js";
import { getSession } from "../storage/sessions.js";
import { t } from "../services/botMessages.js";
import { getForm, listForms } from "../forms/registry.js";
import { getStats, logStats, resetStats, trackStat } from "../services/botStats.js";

// анти-спам
const lastMessageTime = new Map();

const languageButtons = [
  [{ text: "🇷🇺 Русский", callback_data: "start_lang:ru" }],
  [{ text: "🇩🇪 Deutsch", callback_data: "start_lang:de" }],
  [{ text: "🇺🇦 Українська", callback_data: "start_lang:uk" }]
];

function getLanguage(ctx) {
  return getSession(ctx.from.id).language || "ru";
}

function buildPrivacyKeyboard(language) {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: t(language, "accept"), callback_data: "privacy:accept" }],
        [{ text: t(language, "decline"), callback_data: "privacy:decline" }]
      ]
    }
  };
}

async function sendLanguageChoice(ctx) {
  await ctx.reply(
    "Выберите язык / Wählen Sie die Sprache / Оберіть мову:",
    {
    reply_markup: { inline_keyboard: languageButtons }
    }
  );
}

async function sendFormChoice(ctx, language) {
  const buttons = listForms().map((form) => [
    { text: form.title || form.id, callback_data: `start_form:${form.id}` }
  ]);

  await ctx.reply(t(language, "formPrompt"), {
    reply_markup: { inline_keyboard: buttons }
  });
}

async function sendWelcome(ctx, language) {
  await ctx.reply(t(language, "welcome"), {
    parse_mode: "Markdown",
    ...buildPrivacyKeyboard(language)
  });
}

export function startBot() {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error("❌ TELEGRAM_BOT_TOKEN is missing in .env");
    process.exit(1);
  }

  console.log("📘 Data policy:", dataPolicy);

  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  const feedbackUsers = new Set();

  // пользователи, которые сейчас пишут отзыв

  bot.start(async (ctx) => {
    trackStat(ctx, "starts");
    logStats("START");
    await sendLanguageChoice(ctx);
  });

  // /privacy
  bot.command("privacy", async (ctx) => {
    await ctx.reply(t(getLanguage(ctx), "privacy"), { parse_mode: "Markdown" });
  });

  // команда отзыва
  bot.command("feedback", async (ctx) => {
    feedbackUsers.add(ctx.chat.id);
    await ctx.reply(t(getLanguage(ctx), "feedbackAsk"));
  });

  bot.command("restart", async (ctx) => restartFlow(ctx));
  bot.command("back", async (ctx) => goBack(ctx));
  bot.command("pdf", async (ctx) => generatePdfNow(ctx));

  bot.on("callback_query", async (ctx) => {
    const data = ctx.callbackQuery?.data || "";
    const session = getSession(ctx.from.id);

    if (data.startsWith("start_lang:")) {
      const [, language] = data.split(":");
      session.language = language;

      await ctx.answerCbQuery(t(language, "languageSelected"));
      return sendFormChoice(ctx, language);
    }

    if (data.startsWith("start_form:")) {
      const [, formId] = data.split(":");

      try {
        const form = getForm(formId);
        session.formId = form.id;
        await ctx.answerCbQuery(`${t(session.language, "formSelected")} ${form.title || form.id}`);
        return sendWelcome(ctx, session.language);
      } catch {
        await ctx.answerCbQuery(`${t(session.language, "formNotFound")} ${formId}`);
        return;
      }
    }

    if (data === "privacy:accept") {
  trackStat(ctx, "flowsStarted");
  logStats("FLOW_START");
  await ctx.answerCbQuery(t(session.language, "privacyAccepted"));
  return startFlow(ctx);
}

if (data === "feedback:ask") {
  await ctx.answerCbQuery();

  feedbackUsers.add(ctx.chat.id);

  await ctx.reply(t(session.language, "feedbackAsk"));

  return;
}


    if (data === "privacy:decline") {
      await ctx.answerCbQuery();
      return ctx.reply(t(session.language, "privacyDeclined"));
    }

    try {
      await handleChoiceCallback(ctx);
    } catch (err) {
      console.error("callback_query error:", err?.message || err);
      try {
        await ctx.answerCbQuery(t(session.language, "callbackError"));
      } catch (e) {}
    }
  });

  bot.on("text", async (ctx) => {
    try {
      const chatId = ctx.chat.id;
      const userInput = ctx.message.text;
      const now = Date.now();
      const language = getLanguage(ctx);

      // анти-спам: 1 сообщение в секунду
      const last = lastMessageTime.get(chatId) || 0;
      if (now - last < 1000) {
        return;
      }
      lastMessageTime.set(chatId, now);

      // ограничение длины
      if (userInput.length > 200) {
        return ctx.reply(t(language, "tooLong"));
      }

      // если пользователь пишет отзыв
      if (feedbackUsers.has(chatId)) {
        feedbackUsers.delete(chatId);

        const adminId = process.env.ADMIN_CHAT_ID;

        if (adminId) {
          const username = ctx.from.username
            ? `@${ctx.from.username}`
            : `ID ${ctx.from.id}`;

          await ctx.telegram.sendMessage(
            adminId,
            `📝 Отзыв от ${username}:\n${userInput}`
          );
        }

        trackStat(ctx, "feedbackSent");
        logStats("FEEDBACK");
        return ctx.reply(t(language, "feedbackThanks"));
      }

      // проверка на кириллицу
      if (/[\u0400-\u04FF]/.test(userInput)) {
        return ctx.reply(t(language, "cyrillicBlocked"));
      }

      await handleAnswer(ctx);
    } catch (err) {
      console.error("text handler error:", err?.message || err);
      await ctx.reply(t(getLanguage(ctx), "answerError"));
    }
  });

function scheduleDailyReport(bot) {
  const adminId = process.env.ADMIN_CHAT_ID;
  if (!adminId) return;

  function msUntil22() {
    const now = new Date();
    const target = new Date();

    target.setHours(22, 0, 0, 0);

    // если уже позже 22:00 — ставим на завтра
    if (now > target) {
      target.setDate(target.getDate() + 1);
    }

    return target - now;
  }

  async function sendReport() {
    const stats = getStats();
    const text =
      "📊 Ежедневный отчёт бота:\n\n" +
      `👋 Запусков: ${stats.starts}\n` +
      `🧾 Начали форму: ${stats.flowsStarted}\n` +
      `📄 PDF создано: ${stats.pdfGenerated}\n` +
      `📝 Отзывов: ${stats.feedbackSent}`;

    try {
      await bot.telegram.sendMessage(adminId, text);
    } catch (err) {
      console.error("Daily stats report error:", err?.message || err);
      setTimeout(sendReport, 24 * 60 * 60 * 1000);
      return;
    }

    // после отправки — сбрасываем суточную статистику
    resetStats();

    // планируем следующий отчёт через 24 часа
    setTimeout(sendReport, 24 * 60 * 60 * 1000);
  }

  // первый запуск в ближайшие 22:00
  setTimeout(sendReport, msUntil22());
}

  scheduleDailyReport(bot);

  setInterval(() => {
  logStats("AUTO");
}, 5 * 60 * 1000);

  bot.launch();
  console.log("🤖 Telegram bot started");

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}
