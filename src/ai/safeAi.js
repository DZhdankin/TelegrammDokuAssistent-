import OpenAI from "openai";

const AI_ENABLED = process.env.AI_ENABLED === "true"; // включается только если явно true

const client =
  AI_ENABLED && process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

/**
 * Безопасный вызов AI: НИКОГДА не бросает ошибку наружу.
 * Всегда возвращает { ok: boolean, text?: string, error?: string }
 */
export async function safeAskAI({ system, user, temperature = 0.2 }) {
  try {
    if (!AI_ENABLED) {
      return { ok: false, error: "AI disabled" };
    }

    if (!client) {
      return { ok: false, error: "No OpenAI client" };
    }

    const resp = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature,
      messages: [
        { role: "system", content: system || "You are a helpful assistant." },
        { role: "user", content: user || "" }
      ]
    });

    const text = resp?.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return { ok: false, error: "Empty AI response" };
    }

    return { ok: true, text };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}
