export const page7 = {
  page: 7,
  title: "F. Wohnsituation",

  fields: [
    // 80 Wohnen Sie allein?
    {
      key: "lives_alone",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Вы живёте один(одна)?",
      help_ru:
        "Выберите «Да», если вы проживаете полностью один и никто не живёт с вами в одной квартире. Если с вами живёт хотя бы один человек — выберите «Нет».",
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 132, fontSize: 10, mark: "X" },
        no: { x: 60, y: 149, fontSize: 10, mark: "X" }
      }
    },

    // 81 Mit welchen Personen wohnen Sie zusammen?
    {
      key: "lives_with_people",
      type: "multi_choice",
      required: false,
      translate: false,
      label_ru: "С кем вы проживаете? (можно выбрать несколько)",
      help_ru:
        "Выберите всех людей, которые проживают с вами в одной квартире. Это важно для определения состава Bedarfsgemeinschaft и расчёта выплат.",
      options: [
        { value: "spouse_partner", label_ru: "Супруг/партнёр" },
        { value: "unmarried_children_15_24", label_ru: "Не состоящие в браке дети 15–24" },
        { value: "children_under_15", label_ru: "Дети до 15 лет" },
        { value: "parents", label_ru: "Родители / один из родителей" },
        { value: "relatives", label_ru: "Другие родственники" },
        { value: "other_people", label_ru: "Другие люди (сожители и т.п.)" }
      ],
      pdfChoices: {
        spouse_partner: { x: 60, y: 183, fontSize: 10, mark: "X" },
        unmarried_children_15_24: { x: 60, y: 210, fontSize: 10, mark: "X" },
        children_under_15: { x: 60, y: 229, fontSize: 10, mark: "X" },
        parents: { x: 60, y: 248, fontSize: 10, mark: "X" },
        relatives: { x: 60, y: 286, fontSize: 10, mark: "X" },
        other_people: { x: 60, y: 313, fontSize: 10, mark: "X" }
      }
    },

    // 82 Bedarfe für Unterkunft und Heizung?
    {
      key: "needs_housing_heating",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Есть ли расходы на жильё и отопление?",
      help_ru:
        "Выберите «Да», если вы платите за аренду, коммунальные услуги, отопление или другие расходы на жильё. Если вы живёте бесплатно — выберите «Нет».",
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 357, fontSize: 10, mark: "X" },
        no: { x: 60, y: 376, fontSize: 10, mark: "X" }
      }
    },

    // 83 Warmwasser dezentral?
    {
      key: "warmwater_decentral",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Тёплая вода производится децентрализованно (бойлер/проточный нагреватель)?",
      help_ru:
        "Выберите «Да», если горячая вода нагревается у вас в квартире с помощью бойлера или проточного нагревателя. Если горячая вода входит в стоимость аренды — выберите «Нет».",
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 60, y: 420, fontSize: 10, mark: "X" },
        no: { x: 60, y: 438, fontSize: 10, mark: "X" }
      }
    }
  ]
};
