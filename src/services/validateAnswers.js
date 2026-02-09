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
  const garbage = ["не знаю", "не помню", "нет", "незнаю", "хз", "idk", "n/a"];
  return garbage.includes(s);
}

// --------------------
// Main validation
// --------------------
export function validateAnswer(field, value) {
  const v = norm(value);

  // required check
  if (field?.required !== false) {
    if (!v) {
      return { ok: false, message: "Это обязательное поле. Пожалуйста, введите значение." };
    }
  }

  // optional empty is ok
  if (!v && field?.required === false) return { ok: true };

  // garbage check (не слишком жёстко)
  if (isGarbageAnswer(v) && field?.required !== false) {
    return { ok: false, message: "Похоже, это не ответ. Пожалуйста, введите корректное значение 🙂" };
  }

  const key = String(field?.key || "").toLowerCase();
  const type = String(field?.type || "text").toLowerCase();

  // type-based date
  if (type === "date") {
    if (!isValidGermanDate(v)) {
      return { ok: false, message: "Введите дату в формате ДД.ММ.ГГГГ (например 23.12.2019)." };
    }
    return { ok: true };
  }

  // key-based strict rules
  if (key === "plz") {
    if (!isValidPlz(v)) {
      return { ok: false, message: "PLZ (индекс) должен состоять из 5 цифр. Пример: 36305" };
    }
    return { ok: true };
  }

  if (key === "iban") {
    if (!isValidIban(v)) {
      return {
        ok: false,
        message: "IBAN введён неверно. Пример валидного IBAN: DE89370400440532013000"
      };
    }
    return { ok: true };
  }

  if (["vorname", "nachname", "geburtsname", "kontoinhaber"].includes(key)) {
    if (!looksLikeName(v)) {
      return { ok: false, message: "Похоже, это не имя/фамилия. Проверьте ввод (без цифр)." };
    }
    return { ok: true };
  }

  if (key === "strasse") {
    if (!looksLikeStreet(v)) {
      return { ok: false, message: "Введите улицу корректно (например: Soldanstraße)." };
    }
    return { ok: true };
  }

  if (key === "hausnummer") {
    // дом может быть: 7, 7a, 12-14
    if (!/^[0-9]{1,5}[a-zA-Z]?(?:[-/][0-9]{1,5})?$/.test(v)) {
      return { ok: false, message: "Номер дома выглядит неверно. Пример: 7 или 7A" };
    }
    return { ok: true };
  }

  // default ok
  return { ok: true };
}
