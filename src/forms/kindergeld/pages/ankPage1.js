export const ankPage1 = {
  page: 3,
  title: "Anlage Kind — Seite 1/4",

  fields: [
    { key: "ank_applicant_full_name", type: "text", required: true, translate: true, label_ru: "Фамилия и имя заявителя:", pdf: { x: 66, y: 58, fontSize: 10 } },
    { key: "ank_kindergeld_number", type: "text", required: false, translate: false, label_ru: "Kindergeld-Nr., если уже есть:", pdf: { x: 65, y: 87, fontSize: 10 } },
    { key: "ank_application_date", type: "date", required: true, translate: false, label_ru: "Дата заявления Kindergeld:", pdf: { x: 314, y: 164, fontSize: 10 } },
    { key: "ank_child_number", type: "text", required: true, translate: false, label_ru: "Порядковый номер ребёнка:", pdf: { x: 125, y: 187, fontSize: 10 } },

    { key: "child_tax_id", type: "boxed_text", required: true, translate: false, maxLength: 11, label_ru: "Steuer-ID ребёнка:", help_ru: "Steuer-ID ребёнка обычно состоит из 11 цифр.", pdf: { fontSize: 10, cells: [
      { x: 67, y: 285 }, { x: 84, y: 285 }, { x: 110, y: 285 }, { x: 127, y: 285 },
      { x: 143, y: 285 }, { x: 169, y: 285 }, { x: 187, y: 285 }, { x: 204, y: 285 },
      { x: 227, y: 285 }, { x: 244, y: 285 }, { x: 260, y: 285 }
    ] } },
    { key: "child_last_name", type: "text", required: true, translate: true, label_ru: "Фамилия ребёнка:", pdf: { x: 64, y: 320, fontSize: 10 } },
    { key: "child_title", type: "text", required: false, translate: false, label_ru: "Титул ребёнка, если есть:", pdf: { x: 374, y: 320, fontSize: 10 } },
    { key: "child_first_name", type: "text", required: true, translate: true, label_ru: "Имя ребёнка:", pdf: { x: 62, y: 352, fontSize: 10 } },
    { key: "child_birth_name", type: "text", required: false, translate: true, label_ru: "Фамилия ребёнка при рождении, если отличается:", pdf: { x: 374, y: 352, fontSize: 10 } },
    { key: "child_birth_date", type: "date", required: true, translate: false, label_ru: "Дата рождения ребёнка:", pdf: { x: 60, y: 387, fontSize: 10 } },
    { key: "child_birth_place", type: "text", required: true, translate: true, label_ru: "Место рождения ребёнка:", pdf: { x: 138, y: 387, fontSize: 10 } },
    { key: "child_gender", type: "text", required: true, translate: false, label_ru: "Пол ребёнка (m/w/d):", pdf: { x: 324, y: 387, fontSize: 10 } },
    { key: "child_nationality", type: "text", required: true, translate: true, label_ru: "Гражданство ребёнка:", pdf: { x: 374, y: 387, fontSize: 10 } },

    { key: "child_same_address", type: "choice", required: true, translate: false, label_ru: "Ребёнок живёт по тому же адресу, что и заявитель?", options: [{ value: "yes", label_ru: "Да" }, { value: "no", label_ru: "Нет, адрес отличается" }] },
    { key: "child_different_address", type: "text", required: false, translate: false, dependsOn: { key: "child_same_address", value: "no" }, label_ru: "Адрес ребёнка, если отличается:", pdf: { x: 62, y: 420, fontSize: 10 } },
    { key: "child_different_address_reason", type: "text", required: false, translate: true, dependsOn: { key: "child_same_address", value: "no" }, label_ru: "Причина отличающегося адреса ребёнка:", pdf: { x: 59, y: 466, fontSize: 10 } },

    {
      key: "child_relationship_to_applicant",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Кем ребёнок является для заявителя?",
      options: [
        { value: "biological_child", label_ru: "Родной ребёнок" },
        { value: "adopted_child", label_ru: "Усыновлённый ребёнок" },
        { value: "foster_child", label_ru: "Приёмный ребёнок" },
        { value: "stepchild", label_ru: "Пасынок / падчерица" },
        { value: "grandchild", label_ru: "Внук / внучка" }
      ],
      pdfChoices: {
        biological_child: { x: 253, y: 561, fontSize: 10, mark: "X" },
        adopted_child: { x: 324, y: 561, fontSize: 10, mark: "X" },
        foster_child: { x: 395, y: 561, fontSize: 10, mark: "X" },
        stepchild: { x: 467, y: 561, fontSize: 10, mark: "X" },
        grandchild: { x: 537, y: 561, fontSize: 10, mark: "X" }
      }
    },
    {
      key: "child_relationship_to_partner",
      type: "choice",
      required: false,
      translate: false,
      label_ru: "Кем ребёнок является для супруга/партнёра?",
      options: [
        { value: "none", label_ru: "Не относится / нет партнёра" },
        { value: "biological_child", label_ru: "Родной ребёнок" },
        { value: "adopted_child", label_ru: "Усыновлённый ребёнок" },
        { value: "foster_child", label_ru: "Приёмный ребёнок" },
        { value: "stepchild", label_ru: "Пасынок / падчерица" },
        { value: "grandchild", label_ru: "Внук / внучка" }
      ],
      pdfChoices: {
        biological_child: { x: 253, y: 591, fontSize: 10, mark: "X" },
        adopted_child: { x: 324, y: 591, fontSize: 10, mark: "X" },
        foster_child: { x: 395, y: 591, fontSize: 10, mark: "X" },
        stepchild: { x: 467, y: 591, fontSize: 10, mark: "X" },
        grandchild: { x: 537, y: 591, fontSize: 10, mark: "X" }
      }
    },
    {
      key: "child_relationship_to_other_person",
      type: "choice",
      required: false,
      translate: false,
      label_ru: "Есть другая Person, к которой ребёнок находится в родстве?",
      options: [
        { value: "none", label_ru: "Не указывать" },
        { value: "biological_child", label_ru: "Родной ребёнок" },
        { value: "adopted_child", label_ru: "Усыновлённый ребёнок" },
        { value: "foster_child", label_ru: "Приёмный ребёнок" },
        { value: "stepchild", label_ru: "Пасынок / падчерица" },
        { value: "grandchild", label_ru: "Внук / внучка" }
      ],
      pdfChoices: {
        biological_child: { x: 253, y: 619, fontSize: 10, mark: "X" },
        adopted_child: { x: 324, y: 619, fontSize: 10, mark: "X" },
        foster_child: { x: 395, y: 619, fontSize: 10, mark: "X" },
        stepchild: { x: 467, y: 619, fontSize: 10, mark: "X" },
        grandchild: { x: 537, y: 619, fontSize: 10, mark: "X" }
      }
    },

    { key: "other_person_info_needed", type: "choice", required: true, translate: false, label_ru: "Нужно заполнить данные другой Person?", options: [{ value: "no", label_ru: "Нет" }, { value: "yes", label_ru: "Да" }] },
    { key: "other_person_last_name", type: "text", required: false, translate: true, dependsOn: { key: "other_person_info_needed", value: "yes" }, label_ru: "Другая Person: фамилия:", pdf: { x: 82, y: 696, fontSize: 10 } },
    { key: "other_person_first_name", type: "text", required: false, translate: true, dependsOn: { key: "other_person_info_needed", value: "yes" }, label_ru: "Другая Person: имя:", pdf: { x: 296, y: 696, fontSize: 10 } },
    { key: "other_person_birth_date", type: "date", required: false, translate: false, dependsOn: { key: "other_person_info_needed", value: "yes" }, label_ru: "Другая Person: дата рождения:", pdf: { x: 510, y: 696, fontSize: 10 } },
    { key: "other_person_last_known_address", type: "text", required: false, translate: false, dependsOn: { key: "other_person_info_needed", value: "yes" }, label_ru: "Другая Person: последний известный адрес:", pdf: { x: 83, y: 727, fontSize: 10 } },
    { key: "other_person_nationality", type: "text", required: false, translate: true, dependsOn: { key: "other_person_info_needed", value: "yes" }, label_ru: "Другая Person: гражданство:", pdf: { x: 80, y: 762, fontSize: 10 } },
    { key: "other_person_additional_info", type: "text", required: false, translate: true, dependsOn: { key: "other_person_info_needed", value: "yes" }, label_ru: "Дополнительные данные о другой Person:", pdf: { x: 296, y: 762, fontSize: 10 } }
  ]
};
