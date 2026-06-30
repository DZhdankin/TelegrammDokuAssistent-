export const page5 = {
  page: 5,
  title: "Seite 5 — Lebenssituation (C/D)",

  fields: [
    // 59 Pflege von Angehörigen?
    {
      key: "caredForRelatives",
      label_ru: "Вы ухаживали за родственниками (Pflege nach SGB XI)?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы официально ухаживали за родственником, который нуждается в уходе (Pflegegrad). Это поле используется в форме как дополнительная информация.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 102, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 121, fontSize: 10 } }
      ]
    },

    // 60 Wie haben Sie sich finanziert?
    {
      key: "howSupportedYourselfLast5Years",
      label_ru:
        "Если ни одно из утверждений за последние 5 лет не подходит: опишите, как вы обеспечивали себя (например помощь родственников/знакомых, сбережения и т.д.):",
      help_ru: "Опишите, за счёт чего вы жили последние 5 лет, если не работали и не получали выплаты. Например: помощь семьи, сбережения, поддержка друзей.",
      type: "text",
      required: false,
      translate: true,
      pdf: { x: 60, y: 168, fontSize: 10 }
    },

    // 60 Andere Leistungen beantragt?
    {
      key: "appliedForOtherBenefits",
      label_ru: "Вы уже подавали на другие выплаты или планируете подать?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы уже подали или собираетесь подать на другие социальные выплаты (например Wohngeld, Kindergeld, BAföG).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 228, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 248, fontSize: 10 } }
      ]
    },

    // 62 Welche Leistungen? (multi-choice)
    {
      key: "otherBenefitsList",
      label_ru: "Какие выплаты вы подали/хотите подать? (можно выбрать несколько)",
      help_ru: "Поле относится к выплатам, на которые заявление уже подано или планируется. Если нужной выплаты нет в списке, для этого предусмотрен вариант «Sonstiges».",
      type: "multi_choice",
      required: false,
      translate: false,
      dependsOn: { key: "appliedForOtherBenefits", value: "yes" },

      options: [
        { value: "bafoeg", label_ru: "BAföG" },
        { value: "bab", label_ru: "BAB" },
        { value: "wohngeld", label_ru: "Wohngeld" },
        { value: "arbeitslosengeld", label_ru: "Arbeitslosengeld" },
        { value: "rente", label_ru: "Rente" },
        { value: "krankengeld", label_ru: "Krankengeld" },
        { value: "kindergeld", label_ru: "Kindergeld" },
        { value: "kinderzuschlag", label_ru: "Kinderzuschlag" },
        { value: "sonstiges", label_ru: "Sonstiges" }
      ],

      pdfChoices: {
        bafoeg: { x: 60, y: 292, fontSize: 10, mark: "X" },
        bab: { x: 60, y: 309, fontSize: 10, mark: "X" },
        wohngeld: { x: 60, y: 329, fontSize: 10, mark: "X" },
        arbeitslosengeld: { x: 60, y: 345, fontSize: 10, mark: "X" },
        rente: { x: 60, y: 365, fontSize: 10, mark: "X" },
        krankengeld: { x: 60, y: 385, fontSize: 10, mark: "X" },
        kindergeld: { x: 60, y: 400, fontSize: 10, mark: "X" },
        kinderzuschlag: { x: 60, y: 418, fontSize: 10, mark: "X" },
        sonstiges: { x: 60, y: 437, fontSize: 10, mark: "X" }
      }
    },

    // 62 Sonstiges Text
    {
      key: "otherBenefitsOtherText",
      label_ru: "Если выбрали «Sonstiges» — укажите какие именно:",
      help_ru: "Опишите другие выплаты, которые вы подали или планируете подать. Например: Stiftungshilfe, Unterstützung от организации.",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "otherBenefitsList", value: "sonstiges" },
      pdf: { x: 138, y: 437, fontSize: 10 }
    },

    // 63 Schaden durch Dritte?
    {
      key: "healthDamageByThirdParty",
      label_ru:
        "Вы получили ущерб здоровью по вине третьих лиц (ДТП/несчастный случай/ошибка врача и т.д.)?",
      help_ru: "Вариант «Да» относится к ситуации, когда ваше здоровье пострадало из‑за действий другого человека (например ДТП, нападение, врачебная ошибка).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 495, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 513, fontSize: 10 } }
      ]
    },

    // 64 Anspruch gegenüber Dritten?
    {
      key: "claimsAgainstThirdParties",
      label_ru: "У вас есть требования к третьим лицам (например компенсация/наследство)?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы имеете право на компенсацию, страховые выплаты, наследство или другие требования к третьим лицам.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 558, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 576, fontSize: 10 } }
      ]
    },

    // 65 Alleinerziehend?
    {
      key: "isSingleParent",
      label_ru: "Вы воспитываете ребёнка(детей) один(одна)?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы один воспитываете ребёнка и несёте основную ответственность за него.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 636, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 652, fontSize: 10 } }
      ]
    },

    // 66 Schwanger?
    {
      key: "isPregnant",
      label_ru: "Вы беременны?",
      help_ru: "Вариант «Да» относится к ситуации, когда вы беременны. Это поле используется в форме для информации о беременности.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да", pdf: { x: 60, y: 687, fontSize: 10 } },
        { value: "no", label_ru: "Нет", pdf: { x: 60, y: 704, fontSize: 10 } }
      ]
    },

    // 67 Entbindungstermin
    {
      key: "expectedDueDate",
      label_ru: "Введите предполагаемую дату родов (ДД.ММ.ГГГГ):",
      help_ru: "Введите дату предполагаемых родов. Она указана в Mutterpass.",
      type: "date",
      required: false,
      translate: false,
      dependsOn: { key: "isPregnant", value: "yes" },
      pdf: { x: 145, y: 744, fontSize: 10 }
    }
  ]
};
