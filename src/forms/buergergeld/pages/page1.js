export const page1 = {
  page: 1,
  title: "Личные данные",

  fields: [
    // 1 — Vorname
    {
      key: "vorname",
      label_ru: "Введите имя:",
      help_ru: "Введите имя латиницей, как в паспорте или Aufenthaltstitel. Например: IVAN.",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 60, y: 484, fontSize: 10 }
    },

    // 2 — Nachname
    {
      key: "nachname",
      label_ru: "Введите фамилию:",
      help_ru: "Введите фамилию латиницей, как в паспорте или Aufenthaltstitel. Например: PETROV.",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 312, y: 485, fontSize: 10 }
    },

    // 3 — Geburtsdatum
    {
      key: "geburtsdatum",
      label_ru: "Введите дату рождения (ДД.ММ.ГГГГ):",
      help_ru: "Введите дату рождения в формате ДД.ММ.ГГГГ. Например: 14.02.1991.",
      type: "date",
      required: true,
      translate: false,
      pdf: { x: 60, y: 519, fontSize: 10 }
    },

    // 4 — Geburtsname geändert?
    {
      key: "geburtsname_changed",
      label_ru: "Фамилия менялась?",
      help_ru: "Укажите, менялась ли ваша фамилия. Если фамилия сейчас отличается от фамилии при рождении — выберите «Да».",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "no", label_ru: "Нет" },
        { value: "yes", label_ru: "Да" }
      ]
    },

    // 5 — Geburtsname (dependsOn)
    {
      key: "geburtsname",
      label_ru: "Введите фамилию при рождении:",
      help_ru: "Введите фамилию при рождении латиницей. Если не уверены — проверьте в свидетельстве о рождении или старых документах.",
      type: "text",
      required: true,
      translate: true,
      dependsOn: { key: "geburtsname_changed", value: "yes" },
      pdf: { x: 312, y: 519, fontSize: 10 }
    },

    // 6 — Geburtsort
    {
      key: "geburtsort",
      label_ru: "Введите место рождения (город):",
      help_ru: "Введите город рождения латиницей. Например: MOSCOW, KYIV, ALMATY.",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 60, y: 555, fontSize: 10 }
    },

    // 7 — Geburtsland
    {
      key: "geburtsland",
      label_ru: "Введите страну рождения:",
      help_ru: "Введите страну рождения латиницей. Например: RUSSIA, UKRAINE, KAZAKHSTAN.",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 312, y: 555, fontSize: 10 }
    },

    // 8 — Staatsangehörigkeit
    {
      key: "staatsangehoerigkeit",
      label_ru: "Введите гражданство:",
      help_ru: "Введите ваше гражданство латиницей. Например: RUSSIAN, UKRAINIAN, KAZAKH.",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 60, y: 591, fontSize: 10 }
    },

    // 9 — Geschlecht
    {
      key: "geschlecht",
      label_ru: "Выберите пол:",
      help_ru: "Выберите ваш пол. Если не хотите указывать — выберите «Не указывать».",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "maennlich", label_ru: "Мужской", pdf: { x: 312, y: 591, fontSize: 10 } },
        { value: "weiblich", label_ru: "Женский", pdf: { x: 370, y: 591, fontSize: 10 } },
        { value: "divers", label_ru: "Другое", pdf: { x: 428, y: 591, fontSize: 10 } },
        { value: "keine", label_ru: "Не указывать", pdf: { x: 480, y: 591, fontSize: 10 } }
      ]
    },

    // 10 — Straße
    {
      key: "strasse",
      label_ru: "Введите улицу:",
      help_ru: "Введите улицу проживания латиницей. Например: BERLINER STRASSE.",
      type: "text",
      required: true,
      translate: false,
      pdf: { x: 60, y: 628, fontSize: 10 }
    },

    // 11 — Hausnummer
    {
      key: "hausnummer",
      label_ru: "Введите номер дома:",
      help_ru: "Введите номер дома. Можно добавить букву, если есть: 12A.",
      type: "text",
      required: true,
      translate: false,
      pdf: { x: 227, y: 628, fontSize: 10 }
    },

    // 12 — PLZ
    {
      key: "plz",
      label_ru: "Введите индекс (PLZ):",
      help_ru: "Введите почтовый индекс (PLZ). Например: 10115.",
      type: "text",
      required: true,
      translate: false,
      pdf: { x: 312, y: 628, fontSize: 10 }
    },

    // 13 — Wohnort
    {
      key: "wohnort",
      label_ru: "Введите город проживания:",
      help_ru: "Введите город проживания латиницей. Например: BERLIN.",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 396, y: 628, fontSize: 10 }
    },

    // 14 — Postfachanschrift
    {
      key: "postfachanschrift",
      label_ru: "Введите Postfachanschrift (если есть):",
      help_ru: "Введите адрес абонентского ящика (Postfach), если он у вас есть. Если нет — оставьте пустым.",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 60, y: 665, fontSize: 10 }
    },

    // 15 — Telefon
    {
      key: "telefon",
      label_ru: "Введите номер телефона (необязательно):",
      help_ru: "Введите номер телефона в международном формате. Например: +4915123456789. Это необязательное поле.",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 60, y: 700, fontSize: 10 }
    },

    // 16 — Kein fester Wohnsitz
    {
      key: "kein_fester_wohnsitz",
      label_ru: "У вас нет постоянного места жительства?",
      help_ru: "Выберите «Да», если у вас нет постоянного адреса проживания в Германии.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "no", label_ru: "Нет" },
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 720, fontSize: 10 } }
      ]
    },

    // 17 — Wohnhaft bei
    {
      key: "wohnhaft_bei",
      label_ru: "Если проживаете у кого-то: имя и адрес",
      help_ru: "Если вы живёте у кого-то, укажите имя и адрес этого человека латиницей. Например: MAX MUSTERMANN, BERLINER STR. 12.",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 60, y: 759, fontSize: 10 }
    }
  ]
};
