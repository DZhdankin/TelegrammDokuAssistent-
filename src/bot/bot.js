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

// анти-спам
const lastMessageTime = new Map();

export function startBot() {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error("❌ TELEGRAM_BOT_TOKEN is missing in .env");
    process.exit(1);
  }

  console.log("📘 Data policy:", dataPolicy);

  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  // пользователи, которые сейчас пишут отзыв
  const feedbackUsers = new Set();

  bot.start(async (ctx) => {
    await ctx.reply(
      "👋 *Тестовая версия бота*\n\n" +
        "Этот бот помогает заполнять немецкие формы.\n" +
        "Сейчас он находится в стадии тестирования.\n\n" +
        "🔐 Ваши данные:\n" +
        "• не сохраняются на сервере\n" +
        "• используются только для создания PDF\n" +
        "• автоматически удаляются через 30 минут\n\n" +
        "⚠️ *Юридическое уведомление*\n" +
        "Этот бот не является юридическим консультантом и не даёт юридических советов.\n" +
        "Все подсказки носят информационный характер и не заменяют консультацию специалистов.\n" +
        "Ответственность за корректность введённых данных несёт пользователь.\n\n" +
        "Если готовы начать — нажмите «Согласен».",
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "✅ Согласен", callback_data: "privacy:accept" }],
            [{ text: "❌ Не согласен", callback_data: "privacy:decline" }]
          ]
        }
      }
    );
  });

  // /privacy
  bot.command("privacy", async (ctx) => {
    await ctx.reply(
      "🔐 Политика данных (тестовая версия)\n\n" +
        "• Данные не сохраняются в базе данных.\n" +
        "• Сессия хранится только в памяти и удаляется через 30 минут.\n" +
        "• PDF создаётся в памяти и не записывается на диск.\n" +
        "• Данные не передаются третьим лицам.\n\n" +
        "⚠️ Юридическое уведомление\n" +
        "Этот бот не предоставляет юридических консультаций.\n" +
        "Все подсказки носят исключительно информационный характер.\n" +
        "Для юридически значимых вопросов обращайтесь в Jobcenter или к квалифицированным консультантам.\n\n" +
        "———\n" +
        "🇩🇪 *Juristischer Hinweis (Deutsch)*\n" +
        "Dieser Bot bietet keine Rechtsberatung.\n" +
        "Alle Hinweise dienen nur der Orientierung und ersetzen keine professionelle Beratung.\n" +
        "Für die Richtigkeit der Angaben ist der Nutzer selbst verantwortlich.",
      { parse_mode: "Markdown" }
    );
  });

  // команда отзыва
  bot.command("feedback", async (ctx) => {
    feedbackUsers.add(ctx.chat.id);

    await ctx.reply(
      "📝 Напишите ваш отзыв или проблему.\n" +
        "Я передам его разработчику."
    );
  });

  bot.command("restart", async (ctx) => restartFlow(ctx));
  bot.command("back", async (ctx) => goBack(ctx));
  bot.command("pdf", async (ctx) => generatePdfNow(ctx));

  bot.on("callback_query", async (ctx) => {
    const data = ctx.callbackQuery?.data || "";

    if (data === "privacy:accept") {
      await ctx.answerCbQuery("Спасибо! Начинаем заполнение.");
      return startFlow(ctx);
    }

    if (data === "privacy:decline") {
      await ctx.answerCbQuery();
      return ctx.reply(
        "❌ Вы отказались от обработки данных.\n" +
          "Анкета не может быть заполнена без согласия.\n\n" +
          "Если передумаете — введите /start."
      );
    }

    try {
      await handleChoiceCallback(ctx);
    } catch (err) {
      console.error("callback_query error:", err?.message || err);
      try {
        await ctx.answerCbQuery("❌ Ошибка. Попробуйте ещё раз.");
      } catch (e) {}
    }
  });

  bot.on("text", async (ctx) => {
    try {
      const chatId = ctx.chat.id;
      const userInput = ctx.message.text;
      const now = Date.now();

      // анти-спам: 1 сообщение в секунду
      const last = lastMessageTime.get(chatId) || 0;
      if (now - last < 1000) {
        return;
      }
      lastMessageTime.set(chatId, now);

      // ограничение длины
      if (userInput.length > 200) {
        return ctx.reply(
          "Слишком длинный ответ. Пожалуйста, введите короткое значение."
        );
      }

      // если пользователь пишет отзыв
      if (feedbackUsers.has(chatId)) {
        feedbackUsers.delete(chatId);

        const adminId = process.env.ADMIN_CHAT_ID;

        if (adminId) {
          await ctx.telegram.sendMessage(adminId, userInput);
        }

        return ctx.reply("Спасибо! Отзыв отправлен разработчику.");
      }

      // проверка на кириллицу
      if (/[\u0400-\u04FF]/.test(userInput)) {
        return ctx.reply(
          "Пожалуйста, вводите данные латиницей, как в документах. Кириллица не допускается."
        );
      }

      await handleAnswer(ctx);
    } catch (err) {
      console.error("text handler error:", err?.message || err);
      await ctx.reply(
        "❌ Ошибка при обработке ответа. Попробуйте ещё раз."
      );
    }
  });

  bot.launch();
  console.log("🤖 Telegram bot started");

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}
