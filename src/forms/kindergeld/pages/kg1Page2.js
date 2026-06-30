export const kg1Page2 = {
  page: 2,
  title: "KG1 — Seite 2/2",

  fields: [
    {
      key: "notice_recipient_enabled",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Bescheid должен быть отправлен не вам, а другому человеку?",
      help_ru: "Обычно выбирают «Нет». «Да» — если Bescheid должен получить представитель.",
      options: [{ value: "no", label_ru: "Нет, мне" }, { value: "yes", label_ru: "Да, другому человеку" }]
    },
    { key: "notice_recipient_last_name", type: "text", required: false, translate: true, dependsOn: { key: "notice_recipient_enabled", value: "yes" }, label_ru: "Фамилия получателя Bescheid:", pdf: { x: 54, y: 102, fontSize: 10 } },
    { key: "notice_recipient_first_name", type: "text", required: false, translate: true, dependsOn: { key: "notice_recipient_enabled", value: "yes" }, label_ru: "Имя получателя Bescheid:", pdf: { x: 313, y: 102, fontSize: 10 } },
    { key: "notice_recipient_address", type: "text", required: false, translate: false, dependsOn: { key: "notice_recipient_enabled", value: "yes" }, label_ru: "Адрес получателя Bescheid:", pdf: { x: 54, y: 134, fontSize: 10 } },

    {
      key: "already_receives_kindergeld",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Вы уже получаете Kindergeld на других детей?",
      options: [{ value: "no", label_ru: "Нет" }, { value: "yes", label_ru: "Да" }]
    },
    ...[1, 2, 3, 4, 5].flatMap((n, idx) => {
      const y = 263 + idx * 22;
      return [
        { key: `existing_child_${n}_name`, type: "text", required: false, translate: true, dependsOn: { key: "already_receives_kindergeld", value: "yes" }, label_ru: `Ребёнок ${n}: имя и фамилия:`, pdf: { x: 54, y, fontSize: 9 } },
        { key: `existing_child_${n}_birth_date`, type: "date", required: false, translate: false, dependsOn: { key: "already_receives_kindergeld", value: "yes" }, label_ru: `Ребёнок ${n}: дата рождения:`, pdf: { x: 193, y, fontSize: 9 } },
        { key: `existing_child_${n}_gender`, type: "text", required: false, translate: false, dependsOn: { key: "already_receives_kindergeld", value: "yes" }, label_ru: `Ребёнок ${n}: пол (m/w/d):`, pdf: { x: 257, y, fontSize: 9 } },
        { key: `existing_child_${n}_familienkasse_number`, type: "text", required: false, translate: false, dependsOn: { key: "already_receives_kindergeld", value: "yes" }, label_ru: `Ребёнок ${n}: Familienkasse / Kindergeldnummer:`, pdf: { x: 300, y, fontSize: 9 } }
      ];
    }),

    {
      key: "other_person_receives_kindergeld",
      type: "choice",
      required: true,
      translate: false,
      label_ru: "Есть ваши дети, за которых Kindergeld получает другой человек?",
      options: [{ value: "no", label_ru: "Нет" }, { value: "yes", label_ru: "Да" }]
    },
    ...[1, 2, 3, 4, 5].flatMap((n, idx) => {
      const y = 430 + idx * 22;
      return [
        { key: `other_child_${n}_name`, type: "text", required: false, translate: true, dependsOn: { key: "other_person_receives_kindergeld", value: "yes" }, label_ru: `Другой ребёнок ${n}: имя и фамилия:`, pdf: { x: 54, y, fontSize: 9 } },
        { key: `other_child_${n}_birth_date`, type: "date", required: false, translate: false, dependsOn: { key: "other_person_receives_kindergeld", value: "yes" }, label_ru: `Другой ребёнок ${n}: дата рождения:`, pdf: { x: 193, y, fontSize: 9 } },
        { key: `other_child_${n}_gender`, type: "text", required: false, translate: false, dependsOn: { key: "other_person_receives_kindergeld", value: "yes" }, label_ru: `Другой ребёнок ${n}: пол (m/w/d):`, pdf: { x: 257, y, fontSize: 9 } },
        { key: `other_child_${n}_receiver_name`, type: "text", required: false, translate: true, dependsOn: { key: "other_person_receives_kindergeld", value: "yes" }, label_ru: `Кто получает Kindergeld за ребёнка ${n}?`, pdf: { x: 299, y, fontSize: 9 } },
        { key: `other_child_${n}_familienkasse_number`, type: "text", required: false, translate: false, dependsOn: { key: "other_person_receives_kindergeld", value: "yes" }, label_ru: `Familienkasse / Kindergeldnummer ребёнка ${n}:`, pdf: { x: 435, y, fontSize: 9 } }
      ];
    }),

    { key: "application_signature_date", type: "date", required: true, translate: false, label_ru: "Дата подписи заявления:", pdf: { x: 54, y: 702, fontSize: 10 } },
    { key: "partner_consent_signature_date", type: "date", required: false, translate: false, label_ru: "Дата подписи второго родителя / партнёра:", dependsOn: { key: "partner_exists", value: "yes" }, pdf: { x: 52, y: 768, fontSize: 10 } }
  ]
};
