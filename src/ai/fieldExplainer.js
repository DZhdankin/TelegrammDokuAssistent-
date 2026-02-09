import { fieldHelpMap } from "./fieldHelpMap.js";
import { safeAskAI } from "./safeAi.js";

/**
 * Возвращает объяснение поля.
 * ВАЖНО: эта функция НИКОГДА не должна падать.
 */
export async function explainField(field) {
  try {
    if (!field) {
      return "Нет активного поля для объяснения.";
    }

    // 1) help прямо в поле (если добавишь в pageX.js)
    if (field.help_ru && String(field.help_ru).trim()) {
      return String(field.help_ru).trim();
    }

    // 2) локальный справочник (самый безопасный вариант)
    const local = fieldHelpMap?.[field.key];
    if (local?.text) {
      const title = local.title ? `🧩 ${local.title}\n\n` : "";
      return `${title}${local.text}`.trim();
    }

    // 3) AI (если доступен)
    const ai = await safeAskAI({
      system: `Ты помощник по заполнению немецких анкет. Объясняй по-русски простыми словами, без юридических советов. Коротко и понятно.`,
      user: `Объясни пользователю, что означает поле анкеты.
key: ${field.key}
label_ru: ${field.label_ru || ""}
type: ${field.type || ""}

Дай:
- что это значит
- где найти/как ответить
- что писать если нет`
    });

    if (ai?.ok && ai?.text) {
      return ai.text.trim();
    }

    // 4) fallback (чтобы НЕ было ошибки)
    return `📌 Подсказка:
Это поле анкеты: «${field.label_ru || field.key}».

Если вы не уверены — напишите «-» (если поле не обязательное) или попробуйте ответить максимально близко к правде.
Если хотите — я могу добавить точное объяснение для этого поля в справочник.`;
  } catch (e) {
    // вообще никогда не кидаем ошибку наружу
    return `📌 Подсказка:
Это поле анкеты: «${field?.label_ru || field?.key || "неизвестное поле"}».

Сейчас не удалось загрузить подробное объяснение.
Попробуйте ещё раз или пропустите поле (если можно).`;
  }
}
