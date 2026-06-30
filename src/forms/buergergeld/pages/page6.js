export const page6 = {
  page: 6,
  title: "Seite 6 — Mehrbedarfe + Kranken- und Pflegeversicherung (E)",

  fields: [
    // 68 Kostaufwändige Ernährung?
    {
      key: "needsExpensiveDiet",
      label_ru:
        "Вам нужна специальная (дорогая) диета по медицинским причинам (kostenaufwändige Ernährung)?",
      help_ru:
        "Вариант «Да» относится к ситуации, когда врач назначил вам специальную диету по медицинским показаниям (например диабет, целиакия, тяжёлые заболевания).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 114, fontSize: 10, mark: "X" },
        no: { x: 60, y: 133, fontSize: 10, mark: "X" }
      }
    },

    // 69 Behinderung?
    {
      key: "hasDisability",
      label_ru: "У вас есть инвалидность (Behinderung)?",
      help_ru:
        "Вариант «Да» относится к ситуации, когда у вас есть официально подтверждённая инвалидность или Schwerbehindertenausweis.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 164, fontSize: 10, mark: "X" },
        no: { x: 60, y: 186, fontSize: 10, mark: "X" }
      }
    },

    // 70 Leistungen zur Teilhabe am Arbeitsleben?
    {
      key: "receivesParticipationWorkBenefits",
      label_ru:
        "Вы получаете помощь/выплаты для участия в трудовой жизни (Leistungen zur Teilhabe am Arbeitsleben / Eingliederungshilfen)?",
      help_ru:
        "Вариант «Да» относится к ситуации, когда вы получаете поддержку для интеграции в трудовую жизнь (например от DRV или Integrationsamt).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 228, fontSize: 10, mark: "X" },
        no: { x: 60, y: 246, fontSize: 10, mark: "X" }
      }
    },

    // 71 Unabweisbarer besonderer Bedarf?
    {
      key: "hasSpecialUnavoidableNeed",
      label_ru:
        "У вас есть особая неизбежная потребность (unabweisbarer besonderer Bedarf), которую нельзя покрыть экономией?",
      help_ru:
        "Вариант «Да» относится к ситуации, когда у вас есть важные расходы, которые нельзя отложить (например срочные медицинские расходы, необходимые вещи).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 303, fontSize: 10, mark: "X" },
        no: { x: 60, y: 320, fontSize: 10, mark: "X" }
      }
    },

    // 72 Stationäre Einrichtung?
    {
      key: "isInStationaryFacility",
      label_ru:
        "Вы сейчас (или скоро) находитесь в стационарном учреждении (например больница, дом престарелых, тюрьма)?",
      help_ru:
        "Вариант «Да» относится к ситуации, когда вы проживаете или будете проживать в учреждении с круглосуточным пребыванием (например Krankenhaus, Altenheim, JVA).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 366, fontSize: 10, mark: "X" },
        no: { x: 60, y: 384, fontSize: 10, mark: "X" }
      }
    },

    // 73 Art der stationären Einrichtung
    {
      key: "stationaryFacilityType",
      label_ru:
        "Если вы в стационаре: укажите тип учреждения (например Krankenhaus, Altenheim, JVA):",
      help_ru:
        "Введите тип учреждения, где вы находитесь. Например: Krankenhaus (больница), Altenheim (дом престарелых), JVA (тюрьма).",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "isInStationaryFacility", value: "yes" },
      pdf: { x: 60, y: 418, fontSize: 10 }
    },

    // 74 Dauer des Aufenthaltes
    {
      key: "stationaryStayFrom",
      label_ru: "Дата начала пребывания (von) (ДД.ММ.ГГГГ):",
      help_ru: "Введите дату начала пребывания в учреждении.",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "isInStationaryFacility", value: "yes" },
      pdf: { x: 144, y: 456, fontSize: 10 }
    },
    {
      key: "stationaryStayTo",
      label_ru: "Дата окончания пребывания (bis) (ДД.ММ.ГГГГ):",
      help_ru: "Введите дату окончания пребывания. Если дата неизвестна, можно указать «-».",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "isInStationaryFacility", value: "yes" },
      pdf: { x: 313, y: 455, fontSize: 10 }
    },

    // ===========================
    // E. Kranken- und Pflegeversicherung
    // ===========================

    // 75 Gesetzlich versichert?
    {
      key: "wasStatutoryInsured",
      label_ru:
        "Вы сейчас или раньше были застрахованы в государственной медицинской/уходовой страховке (gesetzliche Kranken-/Pflegeversicherung)?",
      help_ru:
        "Вариант «Да» относится к ситуации, когда вы когда-либо были застрахованы в государственной Krankenkasse (например AOK, TK, Barmer).",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 531, fontSize: 10, mark: "X" },
        no: { x: 60, y: 548, fontSize: 10, mark: "X" }
      }
    },

    // 76 Name der Krankenkasse
    {
      key: "healthInsuranceName",
      label_ru: "Название вашей Krankenkasse (например AOK, TK, Barmer):",
      help_ru:
        "Введите название вашей медицинской страховки. Например: AOK, Techniker Krankenkasse, Barmer.",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "wasStatutoryInsured", value: "yes" },
      pdf: { x: 60, y: 583, fontSize: 10 }
    },

    // 77 Krankenversichertennummer
    {
      key: "healthInsuranceNumber",
      label_ru: "Номер страховки (Krankenversichertennummer), если известен:",
      help_ru:
        "Введите номер вашей медицинской страховки. Он указан на вашей электронной карте (Gesundheitskarte).",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "wasStatutoryInsured", value: "yes" },
      pdf: { x: 354, y: 583, fontSize: 10 }
    },

    // 78 Wechsel der Krankenkasse?
    {
      key: "wantsToChangeHealthInsurance",
      label_ru:
        "Хотите сменить Krankenkasse с началом получения Bürgergeld?",
      help_ru:
        "Вариант «Да» относится к ситуации, когда вы хотите сменить медицинскую страховку. Это поле используется в форме для информации о смене страховки.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 618, fontSize: 10, mark: "X" },
        no: { x: 60, y: 632, fontSize: 10, mark: "X" }
      }
    },

    // 79 Privat / freiwillig gesetzlich / nicht versichert?
    {
      key: "isPrivatelyOrVoluntaryOrUninsured",
      label_ru:
        "Вы застрахованы частно / добровольно в гос. страховке или вообще не застрахованы?",
      help_ru:
        "Вариант «Да» относится к ситуации, когда вы частно застрахованы, добровольно застрахованы в государственной Krankenkasse или не имеете страховки.",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 669, fontSize: 10, mark: "X" },
        no: { x: 60, y: 689, fontSize: 10, mark: "X" }
      }
    }
  ]
};
