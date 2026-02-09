export const page4 = {
  page: 4,
  title: "Страница 4 — Данные о занятости / выплатах (D)",

  fields: [
    // 40 Zeitraum Leistungen erhalten
    {
      key: "benefitsPeriodFrom",
      label_ru: "Период получения выплат: с (ДД.ММ.ГГГГ) — если не было, напишите «-»",
      help_ru: "Введите дату начала получения выплат, если вы их получали. Если выплат не было — напишите «-».",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 146, y: 105, fontSize: 10 }
    },
    {
      key: "benefitsPeriodTo",
      label_ru: "Период получения выплат: по (ДД.ММ.ГГГГ) — если не было, напишите «-»",
      help_ru: "Введите дату окончания получения выплат. Если выплат не было — напишите «-».",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 314, y: 105, fontSize: 10 }
    },

    // 41 Name des Leistungsträgers
    {
      key: "benefitProviderName",
      label_ru: "Название организации (Leistungsträger), которая выплачивала пособие — если не было, «-»",
      help_ru: "Введите название организации, которая выплачивала вам пособие (например Jobcenter, Sozialamt). Если выплат не было — напишите «-».",
      type: "text",
      required: false,
      translate: true,
      pdf: { x: 60, y: 157, fontSize: 10 }
    },

    // 42–45 Adresse Leistungsträger
    {
      key: "benefitProviderStreet",
      label_ru: "Улица организации (Leistungsträger) — если не было, «-»",
      help_ru: "Введите улицу организации, которая выплачивала пособие. Если выплат не было — напишите «-».",
      type: "text",
      required: false,
      translate: true,
      pdf: { x: 60, y: 193, fontSize: 10 }
    },
    {
      key: "benefitProviderHouseNumber",
      label_ru: "Номер дома организации (Leistungsträger) — если не было, «-»",
      help_ru: "Введите номер дома организации. Если выплат не было — напишите «-».",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 229, y: 193, fontSize: 10 }
    },
    {
      key: "benefitProviderPostalCode",
      label_ru: "PLZ организации (Leistungsträger) — если не было, «-»",
      help_ru: "Введите почтовый индекс организации. Если выплат не было — напишите «-».",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 313, y: 193, fontSize: 10 }
    },
    {
      key: "benefitProviderCity",
      label_ru: "Город организации (Leistungsträger) — если не было, «-»",
      help_ru: "Введите город организации. Если выплат не было — напишите «-».",
      type: "text",
      required: false,
      translate: true,
      pdf: { x: 397, y: 193, fontSize: 10 }
    },

    // 46 Angestellt/beschäftigt?
    {
      key: "wasEmployedLast5Years",
      label_ru: "За последние 5 лет вы работали по найму (были трудоустроены)?",
      help_ru: "Выберите «Да», если у вас была официальная работа по трудовому договору за последние 5 лет.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет (дальше к пункту 54)" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 258, fontSize: 10, mark: "X" },
        no: { x: 60, y: 276, fontSize: 10, mark: "X" }
      }
    },

    // 47 Zeitraum Beschäftigung
    {
      key: "employmentPeriodFrom1",
      label_ru: "Период работы (1): с (ДД.ММ.ГГГГ)",
      help_ru: "Введите дату начала первого периода работы. Если не было — оставьте пустым.",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "wasEmployedLast5Years", value: "yes" },
      pdf: { x: 145, y: 311, fontSize: 10 }
    },
    {
      key: "employmentPeriodTo1",
      label_ru: "Период работы (1): по (ДД.ММ.ГГГГ)",
      help_ru: "Введите дату окончания первого периода работы.",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "wasEmployedLast5Years", value: "yes" },
      pdf: { x: 311, y: 311, fontSize: 10 }
    },
    {
      key: "employmentPeriodFrom2",
      label_ru: "Период работы (2): с (ДД.ММ.ГГГГ) — если не было второго периода, «-»",
      help_ru: "Введите дату начала второго периода работы, если он был. Если нет — напишите «-».",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "wasEmployedLast5Years", value: "yes" },
      pdf: { x: 144, y: 333, fontSize: 10 }
    },
    {
      key: "employmentPeriodTo2",
      label_ru: "Период работы (2): по (ДД.ММ.ГГГГ) — если не было второго периода, «-»",
      help_ru: "Введите дату окончания второго периода работы. Если его не было — напишите «-».",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "wasEmployedLast5Years", value: "yes" },
      pdf: { x: 310, y: 333, fontSize: 10 }
    },

    // 48 Ausstehende Lohnansprüche?
    {
      key: "hasUnpaidWageClaims",
      label_ru: "Есть невыплаченные зарплатные требования к (бывшему) работодателю?",
      help_ru: "Выберите «Да», если работодатель должен вам зарплату или другие выплаты.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет (дальше к пункту 54)" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 369, fontSize: 10, mark: "X" },
        no: { x: 60, y: 386, fontSize: 10, mark: "X" }
      }
    },

    // 49 Arbeitgeber Name
    {
      key: "employerName",
      label_ru: "Название работодателя (или бывшего работодателя) — если не работали, «-»",
      help_ru: "Введите название компании, где вы работали. Если не работали — напишите «-».",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "wasEmployedLast5Years", value: "yes" },
      pdf: { x: 60, y: 436, fontSize: 10 }
    },

    // 50–53 Arbeitgeber Adresse
    {
      key: "employerStreet",
      label_ru: "Улица работодателя — если не работали, «-»",
      help_ru: "Введите улицу работодателя. Если не работали — напишите «-».",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "wasEmployedLast5Years", value: "yes" },
      pdf: { x: 60, y: 473, fontSize: 10 }
    },
    {
      key: "employerHouseNumber",
      label_ru: "Номер дома работодателя — если не работали, «-»",
      help_ru: "Введите номер дома работодателя. Если не работали — напишите «-».",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "wasEmployedLast5Years", value: "yes" },
      pdf: { x: 228, y: 473, fontSize: 10 }
    },
    {
      key: "employerPostalCode",
      label_ru: "PLZ работодателя — если не работали, «-»",
      help_ru: "Введите почтовый индекс работодателя. Если не работали — напишите «-».",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "wasEmployedLast5Years", value: "yes" },
      pdf: { x: 313, y: 473, fontSize: 10 }
    },
    {
      key: "employerCity",
      label_ru: "Город работодателя — если не работали, «-»",
      help_ru: "Введите город работодателя. Если не работали — напишите «-».",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "wasEmployedLast5Years", value: "yes" },
      pdf: { x: 398, y: 473, fontSize: 10 }
    },

    // 54 Selbstständig/freiberuflich?
    {
      key: "wasSelfEmployed",
      label_ru: "За последние 5 лет вы были самозанятым / фрилансером?",
      help_ru: "Выберите «Да», если вы работали как самозанятый, предприниматель или фрилансер.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 507, fontSize: 10, mark: "X" },
        no: { x: 60, y: 526, fontSize: 10, mark: "X" }
      }
    },

    // 55 Entgeltersatzleistungen?
    {
      key: "receivedWageReplacementBenefits",
      label_ru: "Получали ли вы выплаты типа Krankengeld / Arbeitslosengeld / Elterngeld и т.п.?",
      help_ru: "Выберите «Да», если вы получали выплаты, заменяющие зарплату (например больничные, пособие по безработице, пособие по уходу за ребёнком).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет (дальше к пункту 58)" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 558, fontSize: 10, mark: "X" },
        no: { x: 60, y: 576, fontSize: 10, mark: "X" }
      }
    },

        // 56 Art der Entgeltersatzleistung
    {
      key: "wageReplacementBenefitType",
      label_ru: "Укажите вид выплаты (например Krankengeld / Arbeitslosengeld / Elterngeld):",
      help_ru: "Введите название выплаты, которую вы получали. Например: Krankengeld (больничные), Arbeitslosengeld I (пособие по безработице), Elterngeld (пособие по уходу за ребёнком).",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "receivedWageReplacementBenefits", value: "yes" },
      pdf: { x: 60, y: 610, fontSize: 10 }
    },

    // 57 Zeitraum Entgeltersatzleistung
    {
      key: "wageReplacementPeriodFrom",
      label_ru: "Период получения этой выплаты: с (ДД.ММ.ГГГГ)",
      help_ru: "Введите дату начала получения выплаты. Если не уверены — посмотрите письма из Krankenkasse или Arbeitsagentur.",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "receivedWageReplacementBenefits", value: "yes" },
      pdf: { x: 144, y: 649, fontSize: 10 }
    },
    {
      key: "wageReplacementPeriodTo",
      label_ru: "Период получения этой выплаты: по (ДД.ММ.ГГГГ)",
      help_ru: "Введите дату окончания получения выплаты. Если выплата продолжается — напишите текущую дату или «-».",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "receivedWageReplacementBenefits", value: "yes" },
      pdf: { x: 313, y: 649, fontSize: 10 }
    },

    // 58 Wehrdienst/Freiwilligendienst?
    {
      key: "didMilitaryOrVolunteerService",
      label_ru: "Проходили ли вы военную службу или добровольную службу (FSJ/BFD)?",
      help_ru: "Выберите «Да», если вы проходили военную службу, FSJ (добровольный социальный год) или BFD (федеральная добровольная служба).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 696, fontSize: 10, mark: "X" },
        no: { x: 60, y: 714, fontSize: 10, mark: "X" }
      }
    }
  ]
};
