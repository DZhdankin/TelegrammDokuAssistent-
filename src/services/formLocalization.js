import { DEFAULT_LANGUAGE } from "./formContext.js";

function localizedValue(source, baseKey, language = DEFAULT_LANGUAGE) {
  if (!source) return "";

  const exactKey = `${baseKey}_${language}`;
  const fallbackKey = `${baseKey}_${DEFAULT_LANGUAGE}`;

  if (typeof source[exactKey] === "string") return source[exactKey];
  if (source[baseKey] && typeof source[baseKey] === "object") {
    return source[baseKey][language] || source[baseKey][DEFAULT_LANGUAGE] || "";
  }
  if (typeof source[fallbackKey] === "string") return source[fallbackKey];
  if (typeof source[baseKey] === "string") return source[baseKey];

  return "";
}

export function getFieldLabel(field, language = DEFAULT_LANGUAGE) {
  if (language !== DEFAULT_LANGUAGE) {
    const exactKey = `label_${language}`;
    if (typeof field?.[exactKey] === "string") return field[exactKey];
    if (field?.label && typeof field.label === "object") {
      return field.label[language] || field.label[DEFAULT_LANGUAGE] || "";
    }
  }

  return localizedValue(field, "label", language) || field?.key || "";
}

export function getFieldHelp(field, language = DEFAULT_LANGUAGE) {
  if (language !== DEFAULT_LANGUAGE) {
    const exactKey = `help_${language}`;
    if (typeof field?.[exactKey] === "string") return field[exactKey];
    if (field?.help && typeof field.help === "object") {
      return field.help[language] || "";
    }
    return "";
  }

  return localizedValue(field, "help", language);
}

export function getOptionLabel(option, language = DEFAULT_LANGUAGE) {
  if (language !== DEFAULT_LANGUAGE) {
    const exactKey = `label_${language}`;
    if (typeof option?.[exactKey] === "string") return option[exactKey];
    if (option?.label && typeof option.label === "object") {
      return option.label[language] || option.label[DEFAULT_LANGUAGE] || "";
    }
  }

  return localizedValue(option, "label", language) || String(option?.value ?? "");
}

export function getSectionTitle(section, language = DEFAULT_LANGUAGE) {
  if (language !== DEFAULT_LANGUAGE) {
    const exactKey = `title_${language}`;
    if (typeof section?.[exactKey] === "string") return section[exactKey];
    if (section?.title && typeof section.title === "object") {
      return section.title[language] || section.title[DEFAULT_LANGUAGE] || "";
    }
  }

  return localizedValue(section, "title", language) || section?.key || "";
}
