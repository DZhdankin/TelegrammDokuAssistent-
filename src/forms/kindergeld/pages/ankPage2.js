export const ankPage2 = {
  page: 4,
  title: "Anlage Kind — Seite 2/4",

  fields: [
    { key: "child_is_adult_or_soon_18", type: "choice", required: true, translate: false, label_ru: "Ребёнку уже 18 лет или скоро исполнится 18?", options: [{ value: "no", label_ru: "Нет" }, { value: "yes", label_ru: "Да" }] },
    { key: "adult_child_proofs_status", type: "multi_choice", required: false, translate: false, dependsOn: { key: "child_is_adult_or_soon_18", value: "yes" }, label_ru: "Что с подтверждающими документами для ребёнка 18+?", options: [
      { value: "attached", label_ru: "Документы приложены" },
      { value: "already_submitted", label_ru: "Уже были поданы ранее" },
      { value: "will_submit_later", label_ru: "Будут досланы позже" }
    ], pdfChoices: { attached: { x: 294, y: 97, fontSize: 10, mark: "X" }, already_submitted: { x: 371, y: 97, fontSize: 10, mark: "X" }, will_submit_later: { x: 462, y: 97, fontSize: 10, mark: "X" } } },
    { key: "adult_child_situation", type: "multi_choice", required: false, translate: false, dependsOn: { key: "child_is_adult_or_soon_18", value: "yes" }, label_ru: "Что относится к ребёнку?", options: [
      { value: "school_university_training", label_ru: "Школа / вуз / Berufsausbildung" },
      { value: "other_training_measure", label_ru: "Другая Ausbildungsmaßnahme / Praktikum / Au-pair" },
      { value: "no_training_place", label_ru: "Не может начать/продолжить Ausbildung из-за отсутствия места" },
      { value: "voluntary_service", label_ru: "Добровольная служба FSJ/BFD и т.п." },
      { value: "transition_period", label_ru: "Переходный период до 4 месяцев" },
      { value: "jobseeker_registered", label_ru: "Зарегистрирован как ищущий работу" }
    ], pdfChoices: {
      school_university_training: { x: 89, y: 145, fontSize: 10, mark: "X" },
      other_training_measure: { x: 89, y: 224, fontSize: 10, mark: "X" },
      no_training_place: { x: 89, y: 309, fontSize: 10, mark: "X" },
      voluntary_service: { x: 89, y: 347, fontSize: 10, mark: "X" },
      transition_period: { x: 89, y: 466, fontSize: 10, mark: "X" },
      jobseeker_registered: { x: 89, y: 491, fontSize: 10, mark: "X" }
    } },

    { key: "adult_child_school_training_name", type: "text", required: false, translate: true, dependsOn: { key: "adult_child_situation", value: "school_university_training" }, label_ru: "Название обучения / школы / вуза / Ausbildung:", pdf: { x: 104, y: 189, fontSize: 10 } },
    { key: "adult_child_school_training_from", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "school_university_training" }, label_ru: "Обучение: с какой даты?", pdf: { x: 421, y: 189, fontSize: 10 } },
    { key: "adult_child_school_training_to", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "school_university_training" }, label_ru: "Обучение: до какой даты?", pdf: { x: 501, y: 189, fontSize: 10 } },

    { key: "adult_child_other_training_name", type: "text", required: false, translate: true, dependsOn: { key: "adult_child_situation", value: "other_training_measure" }, label_ru: "Название другой Ausbildungsmaßnahme:", pdf: { x: 102, y: 257, fontSize: 10 } },
    { key: "adult_child_other_training_from", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "other_training_measure" }, label_ru: "Другая Ausbildungsmaßnahme: с какой даты?", pdf: { x: 423, y: 257, fontSize: 10 } },
    { key: "adult_child_other_training_to", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "other_training_measure" }, label_ru: "Другая Ausbildungsmaßnahme: до какой даты?", pdf: { x: 502, y: 257, fontSize: 10 } },

    { key: "adult_child_no_training_place_from", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "no_training_place" }, label_ru: "Нет места Ausbildung: с какой даты?", pdf: { x: 421, y: 311, fontSize: 10 } },
    { key: "adult_child_no_training_place_to", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "no_training_place" }, label_ru: "Нет места Ausbildung: до какой даты?", pdf: { x: 501, y: 311, fontSize: 10 } },

    { key: "adult_child_voluntary_service_from", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "voluntary_service" }, label_ru: "Добровольная служба: с какой даты?", pdf: { x: 422, y: 388, fontSize: 10 } },
    { key: "adult_child_voluntary_service_to", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "voluntary_service" }, label_ru: "Добровольная служба: до какой даты?", pdf: { x: 501, y: 388, fontSize: 10 } },

    { key: "adult_child_transition_from", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "transition_period" }, label_ru: "Переходный период: с какой даты?", pdf: { x: 423, y: 466, fontSize: 10 } },
    { key: "adult_child_transition_to", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "transition_period" }, label_ru: "Переходный период: до какой даты?", pdf: { x: 500, y: 466, fontSize: 10 } },

    { key: "adult_child_jobseeker_from", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "jobseeker_registered" }, label_ru: "Зарегистрирован как ищущий работу: с какой даты?", pdf: { x: 422, y: 493, fontSize: 10 } },
    { key: "adult_child_jobseeker_to", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_situation", value: "jobseeker_registered" }, label_ru: "Зарегистрирован как ищущий работу: до какой даты?", pdf: { x: 500, y: 493, fontSize: 10 } },

    { key: "adult_child_has_completed_training_or_degree", type: "choice", required: false, translate: false, dependsOn: { key: "child_is_adult_or_soon_18", value: "yes" }, label_ru: "Ребёнок уже завершил Ausbildung или Studium?", options: [{ value: "yes", label_ru: "Да" }, { value: "no", label_ru: "Нет" }], pdfChoices: { yes: { x: 423, y: 566, fontSize: 10, mark: "X" }, no: { x: 481, y: 566, fontSize: 10, mark: "X" } } },
    { key: "adult_child_degree_name", type: "text", required: false, translate: true, dependsOn: { key: "adult_child_has_completed_training_or_degree", value: "yes" }, label_ru: "Какой Berufsabschluss / Studienabschluss был получен?", pdf: { x: 103, y: 597, fontSize: 10 } },
    { key: "adult_child_training_end_date", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_has_completed_training_or_degree", value: "yes" }, label_ru: "Дата окончания Ausbildung / Studium:", pdf: { x: 423, y: 597, fontSize: 10 } },
    { key: "adult_child_career_goal_if_different", type: "text", required: false, translate: true, dependsOn: { key: "adult_child_has_completed_training_or_degree", value: "yes" }, label_ru: "Профессиональная цель, если отличается от полученного образования:", pdf: { x: 100, y: 625, fontSize: 10 } },

    { key: "adult_child_is_employed", type: "choice", required: false, translate: false, dependsOn: { key: "child_is_adult_or_soon_18", value: "yes" }, label_ru: "Ребёнок работал, работает или будет работать?", options: [{ value: "yes", label_ru: "Да" }, { value: "no", label_ru: "Нет" }], pdfChoices: { yes: { x: 423, y: 645, fontSize: 10, mark: "X" }, no: { x: 481, y: 645, fontSize: 10, mark: "X" } } },
    { key: "adult_child_employment_type_1", type: "choice", required: false, translate: false, dependsOn: { key: "adult_child_is_employed", value: "yes" }, label_ru: "Какой вид занятости у ребёнка?", options: [{ value: "minijob", label_ru: "Minijob / geringfügige Beschäftigung" }, { value: "other_employment", label_ru: "Другая работа" }], pdfChoices: { minijob: { x: 107, y: 681, fontSize: 10, mark: "X" }, other_employment: { x: 107, y: 709, fontSize: 10, mark: "X" } } },
    { key: "adult_child_employment_1_from", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_is_employed", value: "yes" }, label_ru: "Работа 1: с какой даты?", pdf: { x: 423, y: 691, fontSize: 10 } },
    { key: "adult_child_employment_1_to", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_is_employed", value: "yes" }, label_ru: "Работа 1: до какой даты?", pdf: { x: 502, y: 691, fontSize: 10 } },
    { key: "adult_child_employer_1_name_address", type: "text", required: false, translate: true, dependsOn: { key: "adult_child_is_employed", value: "yes" }, label_ru: "Работодатель 1: название и адрес:", pdf: { x: 117, y: 736, fontSize: 10 } },
    { key: "adult_child_has_second_employment", type: "choice", required: false, translate: false, dependsOn: { key: "adult_child_is_employed", value: "yes" }, label_ru: "Есть вторая/дополнительная занятость?", options: [{ value: "no", label_ru: "Нет" }, { value: "yes", label_ru: "Да" }] },
    { key: "adult_child_employment_2_from", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_has_second_employment", value: "yes" }, label_ru: "Работа 2: с какой даты?", pdf: { x: 423, y: 758, fontSize: 10 } },
    { key: "adult_child_employment_2_to", type: "date", required: false, translate: false, dependsOn: { key: "adult_child_has_second_employment", value: "yes" }, label_ru: "Работа 2: до какой даты?", pdf: { x: 502, y: 758, fontSize: 10 } },
    { key: "adult_child_employer_2_name_address", type: "text", required: false, translate: true, dependsOn: { key: "adult_child_has_second_employment", value: "yes" }, label_ru: "Работодатель 2: название и адрес:", pdf: { x: 119, y: 790, fontSize: 10 } },
    { key: "adult_child_weekly_working_hours", type: "text", required: false, translate: false, dependsOn: { key: "adult_child_is_employed", value: "yes" }, label_ru: "Общая регулярная недельная занятость в часах:", pdf: { x: 425, y: 806, fontSize: 10 } }
  ]
};
