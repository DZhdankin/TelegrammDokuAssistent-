function norm(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

function looksCyrillic(value) {
  return /[\u0400-\u04FF]/.test(String(value ?? ""));
}

const RU_LAT = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya"
};

const COUNTRY_MAP = {
  kazakhstan: "Kasachstan",
  kasachstan: "Kasachstan",
  russia: "Russische Föderation",
  russland: "Russische Föderation",
  ukraine: "Ukraine",
  germany: "Deutschland",
  deutschland: "Deutschland",
  turkey: "Türkei",
  tuerkei: "Türkei",
  poland: "Polen",
  polen: "Polen",
  uzbekistan: "Usbekistan",
  kyrgyzstan: "Kirgisistan",
  kirgisistan: "Kirgisistan",
  tajikistan: "Tadschikistan",
  tadschikistan: "Tadschikistan"
};

const NATIONALITY_MAP = {
  kazakh: "Kasachstan",
  kazakhstani: "Kasachstan",
  russian: "Russische Föderation",
  ukrainian: "Ukraine",
  german: "Deutschland",
  turkish: "Türkei",
  polish: "Polen",
  uzbek: "Usbekistan",
  kyrgyz: "Kirgisistan",
  tajik: "Tadschikistan"
};

function translitRuToLat(text) {
  let out = "";

  for (const ch of String(text ?? "")) {
    const lower = ch.toLowerCase();
    const mapped = RU_LAT[lower];

    if (mapped === undefined) {
      out += ch;
      continue;
    }

    out += ch === lower ? mapped : mapped.charAt(0).toUpperCase() + mapped.slice(1);
  }

  return out;
}

function mapKnownValue(value, map) {
  return map[norm(value).toLowerCase()] ?? null;
}

export async function processField(field, value) {
  const raw = norm(value);
  if (raw === "-") return { translated: "-", warning: null };

  const key = String(field?.key || "").toLowerCase();

  if (key === "geburtsland") {
    return { translated: mapKnownValue(raw, COUNTRY_MAP) ?? raw, warning: null };
  }

  if (key === "staatsangehoerigkeit") {
    return {
      translated: mapKnownValue(raw, NATIONALITY_MAP) ?? mapKnownValue(raw, COUNTRY_MAP) ?? raw,
      warning: null
    };
  }

  if (
    [
      "vorname",
      "nachname",
      "geburtsname",
      "geburtsort",
      "wohnort",
      "strasse",
      "wohnhaft_bei",
      "kontoinhaber"
    ].includes(key) &&
    looksCyrillic(raw)
  ) {
    return { translated: translitRuToLat(raw), warning: null };
  }

  return { translated: raw, warning: null };
}
