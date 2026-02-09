export const page8 = {
  page: 8,
  title: "H. Hinweise und Unterschrift",

  fields: [
    // 84 Datum
    {
      key: "signature_date_1",
      type: "date",
      required: true,
      translate: false,
      label_ru: "Дата (84) — укажите дату (например 16.01.2026)",
      help_ru:
        "Введите дату, когда вы подписываете заявление. Обычно это сегодняшняя дата.",
      pdf: {
        x: 60,
        y: 600,
        fontSize: 10
      }
    },

    // 86 Datum
    {
      key: "signature_date_2",
      type: "date",
      required: false,
      translate: false,
      label_ru: "Дата (86) — если есть опекун/представитель (иначе пропустить)",
      help_ru:
        "Заполняется только если заявление подписывает ваш официальный представитель или опекун. Если у вас нет представителя — оставьте пустым.",
      pdf: {
        x: 60,
        y: 657,
        fontSize: 10
      }
    }
  ]
};
