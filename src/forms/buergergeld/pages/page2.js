export const page2 = {
  page: 2,
  title_ru: "Страница 2 — Банк / страховка / семейное положение",

  fields: [
    // 17.5 — Есть ли банковский счёт
    {
      key: "has_bank_account",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Есть банковский счёт (IBAN)?",
      help_ru: "Выберите «Да», если у вас есть банковский счёт в Германии или другой стране ЕС. Если счёта нет — выберите «Нет».",
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        no: { x: 60, y: 174, fontSize: 10, mark: "X" }
      }
    },

    // 16 — Kontoinhaber/in
    {
      key: "kontoinhaber",
      type: "text",
      required: true,
      translate: true,
      dependsOn: { key: "has_bank_account", value: "yes" },
      label_ru: "Введите владельца банковского счёта (как в банке):",
      help_ru: "Введите имя владельца счёта латиницей, точно как указано в банке. Если счёт ваш — укажите своё имя.",
      pdf: { x: 60, y: 118, fontSize: 10 }
    },

    // 17 — IBAN
    {
      key: "iban",
      type: "text",
      required: true,
      translate: false,
      dependsOn: { key: "has_bank_account", value: "yes" },
      label_ru: "Введите IBAN (без пробелов):",
      help_ru: "Введите номер IBAN полностью, без пробелов. Например: DE12345678901234567890.",
      pdf: { x: 60, y: 155, fontSize: 10 }
    },

    // 18 — Есть номер Sozial-/Rentenversicherung?
    {
      key: "has_rentenversicherung",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Есть номер Sozial-/Rentenversicherung (пенсионное/соц. страхование)?",
      help_ru: "Выберите «Да», если у вас есть номер пенсионного или социального страхования (обычно начинается с двух букв и цифр). Если не знаете — выберите «Нет».",
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 219, fontSize: 10, mark: "X" },
        no: { x: 60, y: 234, fontSize: 10, mark: "X" }
      }
    },

    // 19 — Номер Sozial-/Rentenversicherung
    {
      key: "rentenversicherung_number",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "has_rentenversicherung", value: "yes" },
      label_ru: "Введите номер Sozial-/Rentenversicherung:",
      help_ru: "Введите номер пенсионного/социального страхования. Он указан в письмах от DRV или на документах работодателя.",
      pdf: { x: 60, y: 270, fontSize: 10 }
    },

    // 20 — Есть опекун?
    {
      key: "has_guardian",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Есть официальный опекун / Vormund / Betreuer?",
      help_ru: "Выберите «Да», если над вами назначен официальный опекун или Betreuer. Если нет — выберите «Нет».",
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 306, fontSize: 10, mark: "X" },
        no: { x: 60, y: 325, fontSize: 10, mark: "X" }
      }
    },

    // 21 — Дата въезда
    {
      key: "einreise_date",
      type: "text",
      required: false,
      translate: false,
      label_ru: "Дата въезда в Германию (ДД.ММ.ГГГГ) — если требуется:",
      help_ru: "Введите дату первого въезда в Германию. Если вы не уверены или это не относится к вам — оставьте пустым.",
      pdf: { x: 60, y: 368, fontSize: 10 }
    },

    // 22 — Есть ВНЖ?
    {
      key: "has_residence_permit",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Есть действующий ВНЖ (Aufenthaltstitel)?",
      help_ru: "Выберите «Да», если у вас есть действующий Aufenthaltstitel (например, §24, §25, Blaue Karte и т.д.).",
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 405, fontSize: 10, mark: "X" },
        no: { x: 60, y: 423, fontSize: 10, mark: "X" }
      }
    },

    // 23 — Verpflichtungserklärung
    {
      key: "has_verpflichtung",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Была Verpflichtungserklärung (поручительство/обязательство)?",
      help_ru: "Выберите «Да», если кто-то подписывал Verpflichtungserklärung, чтобы пригласить вас в Германию.",
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 467, fontSize: 10, mark: "X" },
        no: { x: 60, y: 485, fontSize: 10, mark: "X" }
      }
    },

    // 24 — Семейное положение
    {
      key: "familienstand",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Выберите семейное положение:",
      help_ru: "Выберите ваш текущий официальный статус. Если вы живёте раздельно, но брак не расторгнут — выберите «Живём раздельно».",
      options: [
        { value: "ledig", label_ru: "Холост / не замужем" },
        { value: "verheiratet", label_ru: "Женат / замужем" },
        { value: "verwitwet", label_ru: "Вдовец / вдова" },
        { value: "eingetragene_lp", label_ru: "Зарегистрированное партнёрство" },
        { value: "dauernd_getrennt", label_ru: "Живём раздельно" },
        { value: "geschieden", label_ru: "Разведён(а)" },
        { value: "aufgehoben_lp", label_ru: "Партнёрство прекращено" }
      ],
      pdfChoices: {
        ledig: { x: 60, y: 519, fontSize: 10, mark: "X" },
        verheiratet: { x: 60, y: 537, fontSize: 10, mark: "X" },
        verwitwet: { x: 60, y: 555, fontSize: 10, mark: "X" },
        eingetragene_lp: { x: 60, y: 572, fontSize: 10, mark: "X" },
        dauernd_getrennt: { x: 60, y: 590, fontSize: 10, mark: "X" },
        geschieden: { x: 60, y: 605, fontSize: 10, mark: "X" },
        aufgehoben_lp: { x: 60, y: 624, fontSize: 10, mark: "X" }
      }
    },

    // 25 — Дата события
    {
      key: "familienstand_date",
      type: "text",
      required: false,
      translate: false,
      label_ru: "Дата (если живёте раздельно / разведены / вдовец) — ДД.ММ.ГГГГ:",
      help_ru: "Введите дату изменения семейного положения, если это относится к вам. Например: дата развода или дата разъезда.",
      pdf: { x: 165, y: 664, fontSize: 10 }
    },

          // 26 — Antragstellung
    {
      key: "antrag_ab",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "С какого момента хотите получать Bürgergeld?",
      help_ru: "Выберите, с какой даты вы хотите получать выплаты. Обычно выбирают «Сразу», чтобы получить деньги как можно раньше.",
      options: [
        { value: "sofort", label_ru: "Сразу" },
        { value: "spaeter", label_ru: "Позже (укажу дату)" }
      ],
      pdfChoices: {
        sofort: { x: 60, y: 728, fontSize: 10, mark: "X" },
        spaeter: { x: 145, y: 728, fontSize: 10, mark: "X" }
      }
    },

    // 26.1 — Дата, если позже
    {
      key: "antrag_date",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "antrag_ab", value: "spaeter" },
      label_ru: "Введите дату (ДД.ММ.ГГГГ):",
      help_ru: "Введите дату, с которой вы хотите начать получать Bürgergeld. Например: 01.03.2025.",
      pdf: { x: 398, y: 729, fontSize: 10 }
    }
  ]
};
