import { fieldHelpMap } from "./fieldHelpMap.js";
import { getFieldHelp, getFieldLabel } from "../services/formLocalization.js";
import { buildGenericFieldHelp } from "../services/formHelpBuilder.js";

export async function explainField(field, language = "ru") {
  if (!field) {
    if (language === "de") return "Es gibt gerade kein aktives Feld für eine Erklärung.";
    if (language === "uk") return "Зараз немає активного поля для пояснення.";
    return "Нет активного поля для объяснения.";
  }

  const fieldHelp = getFieldHelp(field, language);
  if (fieldHelp && String(fieldHelp).trim()) {
    return String(fieldHelp).trim();
  }

  const local = fieldHelpMap?.[field.key];
  const localText = language === "ru" ? local?.text?.ru : local?.text?.[language];
  if (localText) {
    const localTitle = language === "ru" ? local?.title?.ru : local?.title?.[language];
    return `${localTitle ? `${localTitle}\n\n` : ""}${localText}`.trim();
  }

  const label = getFieldLabel(field, language);
  return buildGenericFieldHelp(field, language, label);
}
