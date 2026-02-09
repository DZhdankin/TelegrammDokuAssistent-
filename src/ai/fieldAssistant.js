// src/ai/fieldAssistant.js

import OpenAI from "openai";

const AI_ENABLED = String(process.env.AI_ENABLED ?? "true").toLowerCase() === "true";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// создаём клиента только если реально нужен
let client = null;
if (AI_ENABLED && OPENAI_API_KEY) {
  client = new OpenAI({ apiKey: OPENAI_API_KEY });
}

// --------------------
// Local dictionaries (как в документах)
// --------------------
const COUNTRY_MAP = {
  "казахстан": "Kasachstan",
  "республика казахстан": "Kasachstan",

  "россия": "Russische Föderation",
  "рф": "Russische Föderation",
  "российская федерация": "Russische Föderation",

  "украина": "Ukraine",
  "германия": "Deutschland",
  "турция": "Türkei",
  "польша": "Polen",
  "узбекистан": "Usbekistan",
  "кыргызстан": "Kirgisistan",
  "киргизия": "Kirgisistan",
  "таджикистан": "Tadschikistan"
};

// иногда гражданство пишут как "русский", "казах"
const NATIONALITY_MAP = {
  "казахстан": "Kasachstan",
  "казах": "Kasachstan",

  "россия": "Russische Föderation",
  "русский": "Russische Föderation",
  "российская федерация": "Russische Föderation"
};

// --------------------
// RU -> LAT transliteration (простая)
// --------------------
const RU_LAT = {
  а: "a", б: "b", в: "v", г: "g", д: "d",
  е: "e", ё: "yo", ж: "zh", з: "z", и: "i",
  й: "y", к: "k", л: "l", м: "m", н: "n",
  о: "o", п: "p", р: "r", с: "s", т: "t",
  у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch",
  ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "",
  э: "e", ю: "yu", я: "ya"
};

function translitRuToLat(text) {
  const s = String(text ?? "");
  let out = "";
  for (const ch of s) {
    const lower = ch.toLowerCase();
    if (RU_LAT[lower] !== undefined) {
      const t = RU_LAT[lower];
      // сохраняем заглавность первой буквы примерно
      if (ch !== lower) out += t.charAt(0).toUpperCase() + t.slice(1);
      else out += t;
    } else {
      out += ch;
    }
  }
  return out;
}

// --------------------
// Helpers
// --------------------
function norm(v) {
  return String(v ?? "").trim().replace(/\s+/g, " ");
}

function looksCyrillic(v) {
  return /[А-Яа-яЁё]/.test(String(v ?? ""));
}

function applyCountryMapping(value, map) {
  const raw = norm(value);
  const key = raw.toLowerCase();
  return map[key] ?? null;
}

// --------------------
// Safe AI helper (без PII)
// --------------------
async function aiHintOnly(field, value) {
  if (!client) return null;

  // ВАЖНО: сюда не передаём value!
  const prompt = `
Ты помощник для заполнения немецких анкет Jobcenter.
Нужно написать короткую подсказку на русском языке для пользователя.

Поле: ${field.key}
Тип: ${field.type}
Вопрос пользователю: ${field.label_ru}

Сделай подсказку в 1-2 предложения, без немецкого языка.
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [{ role: "user", content: prompt }]
  });

  return res?.choices?.[0]?.message?.content?.trim() || null;
}

// --------------------
// Main processor
// --------------------
export async function processField(field, value) {
  try {
    const v = norm(value);

    // Если пользователь написал "-" → оставляем
    if (v === "-") return { translated: "-", warning: null };

    const key = String(field?.key || "").toLowerCase();

    // 1) Страны рождения / гражданство — строго словарь
    if (key === "geburtsland") {
      const mapped = applyCountryMapping(v, COUNTRY_MAP);
      if (mapped) return { translated: mapped, warning: null };

      // если кириллица → транслит (но это будет не “официально”, поэтому предупреждение)
      if (looksCyrillic(v)) {
        return {
          translated: translitRuToLat(v),
          warning: "ℹ️ Страна введена не из списка. Я сделал транслитерацию латиницей."
        };
      }

      return { translated: v, warning: null };
    }

    if (key === "staatsangehoerigkeit") {
      const mapped = applyCountryMapping(v, NATIONALITY_MAP) || applyCountryMapping(v, COUNTRY_MAP);
      if (mapped) return { translated: mapped, warning: null };

      if (looksCyrillic(v)) {
        return {
          translated: translitRuToLat(v),
          warning: "ℹ️ Гражданство введено не из списка. Я сделал транслитерацию латиницей."
        };
      }

      return { translated: v, warning: null };
    }

    // 2) ФИО, города, улицы — просто транслитерация если кириллица
    if (["vorname", "nachname", "geburtsname", "geburtsort", "wohnort", "strasse", "wohnhaft_bei", "kontoinhaber"].includes(key)) {
      if (looksCyrillic(v)) {
        return { translated: translitRuToLat(v), warning: null };
      }
      return { translated: v, warning: null };
    }

    // 3) Всё остальное — без ИИ, как есть
    // (IBAN, даты, номера и т.д. не трогаем)
    return { translated: v, warning: null };
  } catch (e) {
    console.error("processField error:", e?.message || e);
    // безопасный fallback
    return { translated: String(value ?? ""), warning: null };
  }
}
