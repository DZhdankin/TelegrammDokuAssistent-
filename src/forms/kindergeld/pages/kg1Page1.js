export const kg1Page1 = {
  page: 1,
  title: "KG1 — Seite 1/2",

  fields: [
    {
      key: "kindergeld_number",
      label_ru: "Kindergeld-Nr., если уже есть:",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 63, y: 48, fontSize: 10 }
    },
    {
      key: "daytime_phone",
      label_ru: "Телефон для обратной связи днём:",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 405, y: 129, fontSize: 10 }
    },
    {
      key: "attached_child_forms_count",
      label_ru: "Сколько Anlage Kind приложено?",
      type: "text",
      required: true,
      translate: false,
      pdf: { x: 299, y: 189, fontSize: 10 }
    },

    {
      key: "applicant_tax_id",
      label_ru: "Steuer-ID заявителя:",
      help_ru: "Steuer-ID обычно состоит из 11 цифр.",
      type: "boxed_text",
      required: true,
      translate: false,
      maxLength: 11,
      pdf: {
        fontSize: 10,
        cells: [
          { x: 69, y: 265 },
          { x: 85, y: 265 },
          { x: 113, y: 265 },
          { x: 130, y: 265 },
          { x: 147, y: 265 },
          { x: 174, y: 265 },
          { x: 190, y: 265 },
          { x: 206, y: 265 },
          { x: 230, y: 265 },
          { x: 247, y: 265 },
          { x: 264, y: 265 }
        ]
      }
    },
    {
      key: "applicant_last_name",
      label_ru: "Фамилия заявителя:",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 59, y: 299, fontSize: 10 }
    },
    {
      key: "applicant_title",
      label_ru: "Титул заявителя, если есть:",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 455, y: 299, fontSize: 10 }
    },
    {
      key: "applicant_first_name",
      label_ru: "Имя заявителя:",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 59, y: 331, fontSize: 10 }
    },
    {
      key: "applicant_previous_name",
      label_ru: "Фамилия при рождении / прежняя фамилия, если есть:",
      type: "text",
      required: false,
      translate: true,
      pdf: { x: 373, y: 331, fontSize: 10 }
    },
    {
      key: "applicant_birth_date",
      label_ru: "Дата рождения заявителя:",
      type: "date",
      required: true,
      translate: false,
      pdf: { x: 57, y: 363, fontSize: 10 }
    },
    {
      key: "applicant_birth_place",
      label_ru: "Место рождения заявителя:",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 135, y: 363, fontSize: 10 }
    },
    {
      key: "applicant_gender",
      label_ru: "Пол заявителя (m/w/d):",
      type: "text",
      required: true,
      translate: false,
      pdf: { x: 322, y: 363, fontSize: 10 }
    },
    {
      key: "applicant_nationality",
      label_ru: "Гражданство заявителя:",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 374, y: 363, fontSize: 10 }
    },
    {
      key: "applicant_address",
      label_ru: "Адрес заявителя полностью:",
      help_ru: "Улица, дом, индекс, город, страна.",
      type: "text",
      required: true,
      translate: false,
      pdf: { x: 60, y: 417, fontSize: 10 }
    },

    {
      key: "applicant_marital_status",
      label_ru: "Семейное положение:",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "single", label_ru: "Холост / не замужем" },
        { value: "married", label_ru: "Женат / замужем" },
        { value: "registered_partnership", label_ru: "Зарегистрированное партнёрство" },
        { value: "divorced", label_ru: "Разведён(а)" },
        { value: "dissolved_partnership", label_ru: "Партнёрство прекращено" },
        { value: "widowed", label_ru: "Вдовец / вдова" },
        { value: "permanently_separated", label_ru: "Постоянно проживаем раздельно" }
      ],
      pdfChoices: {
        single: { x: 64, y: 466, fontSize: 10, mark: "X" },
        married: { x: 255, y: 451, fontSize: 10, mark: "X" },
        registered_partnership: { x: 354, y: 451, fontSize: 10, mark: "X" },
        divorced: { x: 255, y: 466, fontSize: 10, mark: "X" },
        dissolved_partnership: { x: 354, y: 466, fontSize: 10, mark: "X" },
        widowed: { x: 255, y: 480, fontSize: 10, mark: "X" },
        permanently_separated: { x: 354, y: 480, fontSize: 10, mark: "X" }
      }
    },
    {
      key: "applicant_marital_status_since",
      label_ru: "С какого времени этот статус?",
      type: "date",
      required: false,
      translate: false,
      pdf: { x: 158, y: 466, fontSize: 10 }
    },

    {
      key: "partner_exists",
      label_ru: "Есть супруг/партнёр или другой родитель в общем Haushalt?",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ]
    },
    {
      key: "partner_tax_id",
      label_ru: "Steuer-ID второго родителя / супруга:",
      type: "boxed_text",
      required: false,
      translate: false,
      maxLength: 11,
      dependsOn: { key: "partner_exists", value: "yes" },
      pdf: {
        fontSize: 10,
        cells: [
          { x: 69, y: 560 },
          { x: 85, y: 560 },
          { x: 113, y: 560 },
          { x: 130, y: 560 },
          { x: 147, y: 560 },
          { x: 174, y: 560 },
          { x: 190, y: 560 },
          { x: 206, y: 560 },
          { x: 230, y: 560 },
          { x: 247, y: 560 },
          { x: 264, y: 560 }
        ]
      }
    },
    {
      key: "partner_last_name",
      label_ru: "Фамилия второго родителя / супруга:",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "partner_exists", value: "yes" },
      pdf: { x: 58, y: 596, fontSize: 10 }
    },
    {
      key: "partner_first_name",
      label_ru: "Имя второго родителя / супруга:",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "partner_exists", value: "yes" },
      pdf: { x: 256, y: 596, fontSize: 10 }
    },
    {
      key: "partner_title",
      label_ru: "Титул второго родителя / супруга:",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "partner_exists", value: "yes" },
      pdf: { x: 480, y: 596, fontSize: 10 }
    },
    {
      key: "partner_birth_date",
      label_ru: "Дата рождения второго родителя / супруга:",
      type: "date",
      required: false,
      translate: false,
      dependsOn: { key: "partner_exists", value: "yes" },
      pdf: { x: 60, y: 627, fontSize: 10 }
    },
    {
      key: "partner_nationality",
      label_ru: "Гражданство второго родителя / супруга:",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "partner_exists", value: "yes" },
      pdf: { x: 133, y: 627, fontSize: 10 }
    },
    {
      key: "partner_gender",
      label_ru: "Пол второго родителя / супруга (m/w/d):",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "partner_exists", value: "yes" },
      pdf: { x: 320, y: 627, fontSize: 10 }
    },
    {
      key: "partner_previous_name",
      label_ru: "Прежняя фамилия второго родителя / супруга:",
      type: "text",
      required: false,
      translate: true,
      dependsOn: { key: "partner_exists", value: "yes" },
      pdf: { x: 373, y: 627, fontSize: 10 }
    },
    {
      key: "partner_address",
      label_ru: "Адрес второго родителя / супруга, если отличается:",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "partner_exists", value: "yes" },
      pdf: { x: 60, y: 657, fontSize: 10 }
    },

    {
      key: "payment_iban",
      label_ru: "IBAN для выплаты Kindergeld:",
      type: "boxed_text",
      required: true,
      translate: false,
      maxLength: 34,
      pdf: {
        fontSize: 9,
        cells: [
          { x: 69, y: 717 },
          { x: 81, y: 717 },
          { x: 97, y: 717 },
          { x: 110, y: 717 },
          { x: 126, y: 717 },
          { x: 141, y: 717 },
          { x: 155, y: 717 },
          { x: 165, y: 717 },
          { x: 181, y: 717 },
          { x: 195, y: 717 },
          { x: 209, y: 717 },
          { x: 221, y: 717 },
          { x: 237, y: 717 },
          { x: 252, y: 717 },
          { x: 266, y: 717 },
          { x: 277, y: 717 },
          { x: 296, y: 717 },
          { x: 307, y: 717 },
          { x: 320, y: 717 },
          { x: 335, y: 717 },
          { x: 351, y: 717 },
          { x: 366, y: 717 },
          { x: 381, y: 717 },
          { x: 391, y: 717 },
          { x: 404, y: 717 },
          { x: 420, y: 717 },
          { x: 435, y: 717 },
          { x: 450, y: 717 },
          { x: 464, y: 717 },
          { x: 479, y: 717 },
          { x: 492, y: 717 },
          { x: 502, y: 717 },
          { x: 520, y: 717 },
          { x: 534, y: 717 }
        ]
      }
    },
    {
      key: "payment_bic",
      label_ru: "BIC, если требуется:",
      type: "boxed_text",
      required: false,
      translate: false,
      maxLength: 11,
      pdf: {
        fontSize: 9,
        cells: [
          { x: 68, y: 747 },
          { x: 82, y: 747 },
          { x: 94, y: 747 },
          { x: 109, y: 747 },
          { x: 125, y: 747 },
          { x: 134, y: 747 },
          { x: 151, y: 747 },
          { x: 163, y: 747 },
          { x: 177, y: 747 },
          { x: 190, y: 747 },
          { x: 206, y: 747 }
        ]
      }
    },
    {
      key: "payment_bank_name",
      label_ru: "Название банка:",
      type: "text",
      required: false,
      translate: false,
      pdf: { x: 223, y: 748, fontSize: 10 }
    },
    {
      key: "payment_account_holder_type",
      label_ru: "Кому принадлежит счёт?",
      type: "choice",
      required: true,
      translate: false,
      options: [
        { value: "applicant", label_ru: "Заявителю" },
        { value: "other", label_ru: "Другому человеку" }
      ],
      pdfChoices: {
        applicant: { x: 64, y: 782, fontSize: 10, mark: "X" },
        other: { x: 64, y: 793, fontSize: 10, mark: "X" }
      }
    },
    {
      key: "payment_account_holder_name",
      label_ru: "Фамилия и имя владельца счёта:",
      type: "text",
      required: false,
      translate: false,
      dependsOn: { key: "payment_account_holder_type", value: "other" },
      pdf: { x: 222, y: 791, fontSize: 10 }
    }
  ]
};