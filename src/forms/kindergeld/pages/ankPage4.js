export const ankPage4 = {
  page: 6,
  title: "Anlage Kind - Seite 4/4",
  fields: [
    {
      key: "foreign_work_employee_self_employed",
      label_ru: "Вы работали по найму или были самозанятым за границей?",
      type: "choice",
      required: true,
      translate: true,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 458, y: 105, fontSize: 10, mark: "X" },
        no: { x: 517, y: 105, fontSize: 10, mark: "X" }
      }
    },
    {
      key: "foreign_state_or_nato_employment",
      label_ru: "Вы работали в государственном учреждении или организации НАТО за границей?",
      type: "choice",
      required: true,
      translate: true,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 458, y: 129, fontSize: 10, mark: "X" },
        no: { x: 517, y: 129, fontSize: 10, mark: "X" }
      }
    },
    {
      key: "posted_worker_foreign_employer",
      label_ru: "Вы были направлены в командировку иностранным работодателем?",
      type: "choice",
      required: true,
      translate: true,
      options: [
        { value: "yes", label_ru: "Да" },
        { value: "no", label_ru: "Нет" }
      ],
      pdfChoices: {
        yes: { x: 458, y: 151, fontSize: 10, mark: "X" },
        no: { x: 517, y: 151, fontSize: 10, mark: "X" }
      }
    },
    {
      key: "foreign_work_person_name",
      label_ru: "Фамилия и имя человека, работавшего за границей:",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 81, y: 185, fontSize: 10 }
    },
    {
      key: "foreign_work_period",
      label_ru: "Период работы за границей:",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 448, y: 186, fontSize: 10 }
    },
    {
      key: "foreign_work_employer_name",
      label_ru: "Название работодателя за границей:",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 81, y: 212, fontSize: 10 }
    },
    {
      key: "foreign_work_employer_address",
      label_ru: "Адрес работодателя за границей:",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 80, y: 236, fontSize: 10 }
    },
    {
      key: "foreign_work_country_place",
      label_ru: "Страна и место работы за границей:",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 82, y: 263, fontSize: 10 }
    },
    {
      key: "ank_signature_date",
      label_ru: "Дата подписи:",
      type: "text",
      required: true,
      translate: true,
      pdf: { x: 58, y: 748, fontSize: 10 }
    }
  ]
};
