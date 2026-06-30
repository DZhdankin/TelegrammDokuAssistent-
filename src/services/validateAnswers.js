// src/services/validateAnswers.js

function norm(v) {
  return String(v ?? "").trim().replace(/\s+/g, " ");
}

function normalizeIban(v) {
  return String(v ?? "").toUpperCase().replace(/\s+/g, "");
}

// --------------------
// Date validation DD.MM.YYYY
// --------------------
function isValidGermanDate(v) {
  const s = norm(v);
  const m = s.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) return false;

  const dd = Number(m[1]);
  const mm = Number(m[2]);
  const yyyy = Number(m[3]);

  if (yyyy < 1900 || yyyy > 2100) return false;
  if (mm < 1 || mm > 12) return false;

  const maxDays = new Date(yyyy, mm, 0).getDate();
  return dd >= 1 && dd <= maxDays;
}

// --------------------
// PLZ validation
// --------------------
function isValidPlz(v) {
  const s = norm(v);
  return /^\d{5}$/.test(s);
}

// --------------------
// IBAN validation (mod97)
// --------------------
function ibanToNumericString(iban) {
  const rearranged = iban.slice(4) + iban.slice(0, 4);

  let out = "";
  for (const ch of rearranged) {
    if (ch >= "0" && ch <= "9") out += ch;
    else if (ch >= "A" && ch <= "Z") out += String(ch.charCodeAt(0) - 55);
    else return null;
  }
  return out;
}

function mod97(numStr) {
  let remainder = 0;
  for (let i = 0; i < numStr.length; i++) {
    const digit = numStr.charCodeAt(i) - 48;
    remainder = (remainder * 10 + digit) % 97;
  }
  return remainder;
}

function isValidIban(raw) {
  const iban = normalizeIban(raw);

  // 2 letters country + 2 digits + alphanum rest
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(iban)) return false;

  const numeric = ibanToNumericString(iban);
  if (!numeric) return false;

  return mod97(numeric) === 1;
}

// --------------------
// Generic helpers
// --------------------
function looksLikeName(v) {
  const s = norm(v);
  if (s.length < 2) return false;
  if (/\d/.test(s)) return false;
  if (/^[\W_]+$/.test(s)) return false;
  return true;
}

function looksLikeStreet(v) {
  const s = norm(v);
  if (s.length < 2) return false;
  if (/^[\W_]+$/.test(s)) return false;
  return true;
}

function isGarbageAnswer(v) {
  const s = norm(v).toLowerCase();
  const garbage = [
    "не знаю", "не помню", "нет", "незнаю", "хз",
    "не знаю", "не пам’ятаю", "не памятаю", "ні",
    "weiß nicht", "weiss nicht", "keine ahnung", "idk", "n/a"
  ];
  return garbage.includes(s);
}

const validationMessages = {
  ru: {
    required: "Это обязательное поле. Пожалуйста, введите значение.",
    garbage: "Похоже, это не ответ. Пожалуйста, введите корректное значение 🙂",
    date: "Введите дату в формате ДД.ММ.ГГГГ (например 23.12.2019).",
    plz: "PLZ (индекс) должен состоять из 5 цифр. Пример: 36305",
    iban: "IBAN введён неверно. Пример валидного IBAN: DE89370400440532013000",
    name: "Похоже, это не имя/фамилия. Проверьте ввод (без цифр).",
    street: "Введите улицу корректно (например: Soldanstraße).",
    houseNumber: "Номер дома выглядит неверно. Пример: 7 или 7A"
    ,
    childFormsCount: "Укажите количество приложений Anlage Kind числом от 1 до 5."
  },
  de: {
    required: "Dieses Feld ist erforderlich. Bitte geben Sie einen Wert ein.",
    garbage: "Das sieht nicht wie eine passende Antwort aus. Bitte geben Sie einen korrekten Wert ein 🙂",
    date: "Bitte geben Sie das Datum im Format TT.MM.JJJJ ein (z. B. 23.12.2019).",
    plz: "Die PLZ muss aus 5 Ziffern bestehen. Beispiel: 36305",
    iban: "Die IBAN ist ungültig. Beispiel für eine gültige IBAN: DE89370400440532013000",
    name: "Das sieht nicht wie ein Name aus. Bitte prüfen Sie die Eingabe (ohne Ziffern).",
    street: "Bitte geben Sie die Straße korrekt ein (z. B. Soldanstraße).",
    houseNumber: "Die Hausnummer sieht ungültig aus. Beispiel: 7 oder 7A",
    childFormsCount: "Bitte geben Sie die Anzahl der Anlage Kind-Formulare als Zahl von 1 bis 5 ein."
  },
  uk: {
    required: "Це обов’язкове поле. Будь ласка, введіть значення.",
    garbage: "Схоже, це не відповідь. Будь ласка, введіть коректне значення 🙂",
    date: "Введіть дату у форматі ДД.ММ.РРРР (наприклад 23.12.2019).",
    plz: "PLZ (індекс) має складатися з 5 цифр. Приклад: 36305",
    iban: "IBAN введено неправильно. Приклад коректного IBAN: DE89370400440532013000",
    name: "Схоже, це не ім’я/прізвище. Перевірте введення (без цифр).",
    street: "Введіть вулицю коректно (наприклад: Soldanstraße).",
    houseNumber: "Номер будинку виглядає неправильно. Приклад: 7 або 7A",
    childFormsCount: "Вкажіть кількість додатків Anlage Kind числом від 1 до 5."
  }
};

function validationMessage(language, key) {
  return validationMessages[language]?.[key] || validationMessages.ru[key] || key;
}

// --------------------
// Main validation
// --------------------
export function validateAnswer(field, value, language = "ru") {
  const v = norm(value);

  // required check
  if (field?.required !== false) {
    if (!v) {
      return { ok: false, message: validationMessage(language, "required") };
    }
  }

  // optional empty is ok
  if (!v && field?.required === false) return { ok: true };

  // garbage check (не слишком жёстко)
  if (isGarbageAnswer(v) && field?.required !== false) {
    return { ok: false, message: validationMessage(language, "garbage") };
  }

  const key = String(field?.key || "").toLowerCase();
  const type = String(field?.type || "text").toLowerCase();

  if (key === "attached_child_forms_count") {
    if (!/^[1-5]$/.test(v)) {
      return { ok: false, message: validationMessage(language, "childFormsCount") };
    }
    return { ok: true };
  }

  // type-based date
  if (type === "date") {
    if (!isValidGermanDate(v)) {
      return { ok: false, message: validationMessage(language, "date") };
    }
    return { ok: true };
  }

  // key-based strict rules
  if (key === "plz") {
    if (!isValidPlz(v)) {
      return { ok: false, message: validationMessage(language, "plz") };
    }
    return { ok: true };
  }

  if (key === "iban") {
    if (!isValidIban(v)) {
      return {
        ok: false,
        message: validationMessage(language, "iban")
      };
    }
    return { ok: true };
  }

  if (["vorname", "nachname", "geburtsname", "kontoinhaber"].includes(key)) {
    if (!looksLikeName(v)) {
      return { ok: false, message: validationMessage(language, "name") };
    }
    return { ok: true };
  }

  if (key === "strasse") {
    if (!looksLikeStreet(v)) {
      return { ok: false, message: validationMessage(language, "street") };
    }
    return { ok: true };
  }

  if (key === "hausnummer") {
    // дом может быть: 7, 7a, 12-14
    if (!/^[0-9]{1,5}[a-zA-Z]?(?:[-/][0-9]{1,5})?$/.test(v)) {
      return { ok: false, message: validationMessage(language, "houseNumber") };
    }
    return { ok: true };
  }

  // default ok
  return { ok: true };
}
