export const page3 = {
  page: 3,
  title: "Жизненная ситуация (C)",

  fields: [
    // 27 — Erwerbsfähig?
    {
      key: "isAbleToWork",
      label_ru: "Вы трудоспособны? (можете работать минимум 3 часа в день)",
      help_ru: "Вариант «Да» относится к ситуации, когда вы физически и психически способны работать минимум 3 часа в день. Это поле используется в форме для оценки трудоспособности.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 131, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 149, fontSize: 10 } }
      ]
    },

    // 28 — Schüler/Student/Azubi?
    {
      key: "isStudentOrTrainee",
      label_ru: "Вы школьник/студент или проходите Ausbildung?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы учитесь в школе, университете или проходите профессиональное обучение (Ausbildung).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 194, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 214, fontSize: 10 } }
      ]
    },

    // 29 — Kosten für Schulbücher?
    {
      key: "hasSchoolCosts",
      label_ru: "Есть расходы на школьные учебники/тетради?",
      help_ru: "Вариант «Да» относится к ситуации, когда есть расходы на учебники, рабочие тетради или школьные материалы.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 245, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 262, fontSize: 10 } }
      ]
    },

    // 30 — Untergebracht während Ausbildung?
    {
      key: "isAccommodatedDuringTraining",
      label_ru: "Во время обучения вы проживаете отдельно (общежитие/интернат/и т.д.)?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы живёте в общежитии, интернате или другом учреждении во время обучения.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 320, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 338, fontSize: 10 } }
      ]
    },

    // 31 — Unter 18 oder 18–24?
    {
      key: "isUnder18or18to24",
      label_ru: "Вам меньше 18 лет или вам от 18 до 24 лет?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы младше 18 или вам от 18 до 24 лет. Это поле используется в форме для расчёта.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 372, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 390, fontSize: 10 } }
      ]
    },

    // 32 — Elternteil außerhalb BG?
    {
      key: "parentLivesOutsideBG",
      label_ru: "Один из родителей живёт отдельно (не входит в вашу Bedarfsgemeinschaft)?",
      help_ru: "Вариант «Да» относится к ситуации, когда один из родителей живёт отдельно и не является частью вашей Bedarfsgemeinschaft (семейной единицы для Jobcenter).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 424, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 442, fontSize: 10 } }
      ]
    },

    // 33 — Ausbildung jetzt oder geplant?
    {
      key: "hasOrWillStartTraining",
      label_ru: "Вы проходите или планируете начать обучение / Ausbildung?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы уже проходите Ausbildung или планируете начать его в ближайшее время.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 473, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 493, fontSize: 10 } }
      ]
    },

    // 34 — Asylbewerberleistungsgesetz?
    {
      key: "receivesAsylumBenefits",
      label_ru: "Вы получаете выплаты по Asylbewerberleistungsgesetz?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы получаете выплаты для соискателей убежища (Asylbewerberleistungen).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 537, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 556, fontSize: 10 } }
      ]
    },

    // 35 — Bis wann?
    {
      key: "asylumBenefitsUntil",
      label_ru: "До какой даты вы получаете эти выплаты? (ДД.ММ.ГГГГ) Если неизвестно, можно указать «-»",
      help_ru: "Введите дату, до которой вам назначены выплаты по Asylbewerberleistungsgesetz. Если неизвестно, можно указать «-».",
      type: "date",
      required: false,
      translate: false,
      dependsOn: { key: "receivesAsylumBenefits", value: "yes" },
      pdf: { x: 146, y: 591, fontSize: 10 }
    },

    // 36 — Personen-ID
    {
      key: "personIdNumber",
      label_ru: "Введите Personenidentifikationsnummer (если есть, иначе «-»):",
      help_ru: "Введите вашу Personen-ID, если она есть. Обычно указана в письмах BAMF или Ausländerbehörde.",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 60, y: 643, fontSize: 10 }
    },

    // 37 — AZR
    {
      key: "azrNumber",
      label_ru: "Введите AZR-номер (Ausländerzentralregisternummer), если есть (иначе «-»):",
      help_ru: "Введите номер AZR, если он есть. Это номер в центральном реестре иностранцев.",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 316, y: 642, fontSize: 10 }
    },

    // 38 — Schon Leistungen erhalten?
    {
      key: "receivedBenefitsLast3Years",
      label_ru: "За последние 3 года вы уже получали Bürgergeld/Sozialhilfe?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы получали Bürgergeld, Sozialhilfe или аналогичные выплаты в последние 3 года.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 678, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 697, fontSize: 10 } }
      ]
    },

    // 39 — Art der Leistung
    {
      key: "benefitType",
      label_ru: "Укажите вид выплаты (например Bürgergeld / Sozialhilfe). Если не было, можно указать «-»",
      help_ru: "Укажите, какие выплаты вы получали ранее. Например: Bürgergeld, Sozialhilfe, Wohngeld. Если неизвестно, можно указать «-».",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "receivedBenefitsLast3Years", value: "yes" },
      pdf: { x: 60, y: 730, fontSize: 10 }
    }
  ]
};
