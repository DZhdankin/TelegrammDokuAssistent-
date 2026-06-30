const messages = {
  ru: {
    languagePrompt: "Выберите язык, на котором бот продолжит работу:",
    formPrompt: "Выберите форму:",
    languageSelected: "Язык выбран: Русский",
    accept: "✅ Согласен",
    decline: "❌ Не согласен",
    back: "⬅️ Назад",
    skip: "⏭ Пропустить",
    nextDebug: "➡️ Вперёд (debug)",
    restart: "🔄 Restart",
    fillTestData: "⚡ Тестовые данные",
    fillTestDataAlt: "🧪 Альтернативные данные",
    explain: "❓ Объяснить",
    pdfNow: "📄 PDF сейчас",
    done: "✅ Готово",
    clear: "🧹 Очистить",
    sectionFallback: "📄 Раздел",
    summaryEdit: "✏️ Изменить ответы",
    summaryPdf: "📄 Продолжить → PDF",
    flowStart: "📝 Начинаем заполнение анкеты.",
    flowRestart: "🔄 Ок! Начинаем заново.",
    backReply: "⬅️ Назад.",
    requiredField: "⚠️ Это обязательное поле, его нельзя пропустить.",
    skipped: "⏭ Пропущено.",
    pdfBuilding: "⏳ Формирую PDF...",
    pdfDone: "✅ Готово!",
    pdfError: "❌ Ошибка при генерации PDF. Проверьте шаблон и координаты полей.",
    debugSkipped: "➡️ Debug: шаг пропущен.",
    testDataFilled: "⚡ Готово! Тестовые данные заполнены. Можно жать PDF 🙂",
    testDataFilledAlt: "🧪 Готово! Альтернативные тестовые данные заполнены. Можно жать PDF 🙂",
    languageChosen: "🌐 Язык выбран:",
    chooseWithButton: "⚠️ Выберите вариант кнопкой ниже.",
    chooseManyWithButtons: "⚠️ Выберите варианты кнопками ниже.",
    commandReceived: "ℹ️ Команда получена. Продолжаем 🙂",
    staleChoice: "⚠️ Этот выбор уже неактуален",
    invalidChoice: "⚠️ Неверный вариант",
    cbOk: "Ок",
    cbDone: "Готово",
    cbCleared: "Очищено",
    chosen: "✅ Вы выбрали:",
    noActiveField: "❓ Сейчас нет активного поля для объяснения.",
    explanationTitle: "📌 Объяснение:",
    checkSummary: "📋 *Проверьте ваши ответы перед формированием PDF*",
    importantInfo: "📌 Важная информация",
    feedbackButton: "⭐ Оставить отзыв",
    formSelected: "📄 Форма выбрана:",
    formNotFound: "⚠️ Форма не найдена:",
    languageUnavailable: "⚠️ Язык пока не подключён:",
    tooLong: "Слишком длинный ответ. Пожалуйста, введите короткое значение.",
    cyrillicBlocked: "Пожалуйста, вводите данные латиницей, как в документах. Кириллица не допускается.",
    answerError: "❌ Ошибка при обработке ответа. Попробуйте ещё раз.",
    callbackError: "❌ Ошибка. Попробуйте ещё раз.",
    feedbackAsk: "📝 Напишите ваш отзыв или проблему.\nЯ передам его разработчику.",
    feedbackThanks: "Спасибо! Отзыв отправлен разработчику.",
    privacyDeclined: "❌ Вы отказались от обработки данных.\nАнкета не может быть заполнена без согласия.\n\nЕсли передумаете — введите /start.",
    privacyAccepted: "Спасибо! Начинаем заполнение.",
    welcome:
      "👋 *Тестовая версия бота*\n\n" +
      "Этот бот помогает заполнять немецкую форму Bürgergeld.\n" +
      "Сейчас он находится в стадии тестирования.\n\n" +
      "🔐 Ваши данные:\n" +
      "• не сохраняются в базе данных\n" +
      "• используются только для создания PDF\n" +
      "• автоматически удаляются через 30 минут\n\n" +
      "⚠️ *Юридическое уведомление*\n" +
      "Этот бот не является юридическим консультантом и не даёт юридических советов.\n" +
      "Все подсказки носят информационный характер и не заменяют консультацию специалистов.\n" +
      "Ответственность за корректность введённых данных несёт пользователь.\n\n" +
      "Если готовы начать — нажмите «Согласен».",
    privacy:
      "🔐 Политика данных (тестовая версия)\n\n" +
      "• Данные не сохраняются в базе данных.\n" +
      "• Сессия хранится только в памяти и удаляется через 30 минут.\n" +
      "• PDF создаётся в памяти и не записывается на диск.\n" +
      "• Данные не передаются третьим лицам и не отправляются во внешние AI-сервисы.\n\n" +
      "⚠️ Юридическое уведомление\n" +
      "Этот бот не предоставляет юридических консультаций.\n" +
      "Все подсказки носят исключительно информационный характер.",
    importantNotes:
      "📌 Важная информация перед подачей\n\n" +
      "Эти пункты основаны на общих требованиях Jobcenter и носят информационный характер.\n" +
      "Это не является юридической консультацией.\n\n" +
      "• Проверьте, что данные заполнены полностью и без ошибок.\n" +
      "• Jobcenter обычно просит сообщать об изменениях (работа, доход, переезд, состав семьи).\n" +
      "• В отдельных случаях Jobcenter сверяет данные с другими ведомствами.\n" +
      "• Указание телефона является добровольным.\n\n" +
      "📎 Документы, которые Jobcenter часто запрашивает:\n" +
      "• Выписки по банковским счетам за последние 3 месяца\n" +
      "• Договор аренды и подтверждение расходов на жильё/отопление\n" +
      "• Документы о доходах\n" +
      "• Информация о медицинской страховке\n" +
      "• Документы членов семьи\n" +
      "• При необходимости: подтверждения инвалидности или особых потребностей"
  },
  de: {
    languagePrompt: "Wählen Sie die Sprache, in der der Bot fortfahren soll:",
    formPrompt: "Wählen Sie das Formular:",
    languageSelected: "Sprache ausgewählt: Deutsch",
    accept: "✅ Einverstanden",
    decline: "❌ Nicht einverstanden",
    back: "⬅️ Zurück",
    skip: "⏭ Überspringen",
    nextDebug: "➡️ Weiter (debug)",
    restart: "🔄 Neustart",
    fillTestData: "⚡ Testdaten",
    fillTestDataAlt: "🧪 Alternativdaten",
    explain: "❓ Erklären",
    pdfNow: "📄 PDF jetzt",
    done: "✅ Fertig",
    clear: "🧹 Leeren",
    sectionFallback: "📄 Abschnitt",
    summaryEdit: "✏️ Antworten ändern",
    summaryPdf: "📄 Weiter → PDF",
    flowStart: "📝 Wir beginnen mit dem Ausfüllen des Formulars.",
    flowRestart: "🔄 Okay, wir beginnen von vorn.",
    backReply: "⬅️ Zurück.",
    requiredField: "⚠️ Dieses Pflichtfeld kann nicht übersprungen werden.",
    skipped: "⏭ Übersprungen.",
    pdfBuilding: "⏳ PDF wird erstellt...",
    pdfDone: "✅ Fertig!",
    pdfError: "❌ Fehler bei der PDF-Erstellung. Bitte prüfen Sie Vorlage und Feldkoordinaten.",
    debugSkipped: "➡️ Debug: Schritt übersprungen.",
    testDataFilled: "⚡ Fertig! Testdaten wurden ausgefüllt. Sie können PDF drücken 🙂",
    testDataFilledAlt: "🧪 Fertig! Alternativdaten wurden ausgefüllt. Sie können PDF drücken 🙂",
    languageChosen: "🌐 Sprache ausgewählt:",
    chooseWithButton: "⚠️ Bitte wählen Sie eine Option über die Schaltfläche.",
    chooseManyWithButtons: "⚠️ Bitte wählen Sie die Optionen über die Schaltflächen.",
    commandReceived: "ℹ️ Befehl erhalten. Wir machen weiter 🙂",
    staleChoice: "⚠️ Diese Auswahl ist nicht mehr aktuell",
    invalidChoice: "⚠️ Ungültige Option",
    cbOk: "Ok",
    cbDone: "Fertig",
    cbCleared: "Geleert",
    chosen: "✅ Ihre Auswahl:",
    noActiveField: "❓ Es gibt gerade kein aktives Feld für eine Erklärung.",
    explanationTitle: "📌 Erklärung:",
    checkSummary: "📋 *Bitte prüfen Sie Ihre Antworten vor der PDF-Erstellung*",
    importantInfo: "📌 Wichtige Informationen",
    feedbackButton: "⭐ Feedback geben",
    formSelected: "📄 Formular ausgewählt:",
    formNotFound: "⚠️ Formular nicht gefunden:",
    languageUnavailable: "⚠️ Diese Sprache ist noch nicht verfügbar:",
    tooLong: "Die Antwort ist zu lang. Bitte geben Sie einen kurzen Wert ein.",
    cyrillicBlocked: "Bitte geben Sie Daten in lateinischen Buchstaben ein, wie in den Dokumenten. Kyrillische Zeichen sind nicht zulässig.",
    answerError: "❌ Fehler bei der Verarbeitung der Antwort. Bitte versuchen Sie es erneut.",
    callbackError: "❌ Fehler. Bitte versuchen Sie es erneut.",
    feedbackAsk: "📝 Schreiben Sie Ihr Feedback oder Ihr Problem.\nIch leite es an den Entwickler weiter.",
    feedbackThanks: "Danke! Das Feedback wurde an den Entwickler gesendet.",
    privacyDeclined: "❌ Sie haben die Datenverarbeitung abgelehnt.\nDas Formular kann ohne Zustimmung nicht ausgefüllt werden.\n\nWenn Sie es sich anders überlegen, geben Sie /start ein.",
    privacyAccepted: "Danke! Wir beginnen mit dem Ausfüllen.",
    welcome:
      "👋 *Testversion des Bots*\n\n" +
      "Dieser Bot hilft beim Ausfüllen des deutschen Bürgergeld-Formulars.\n" +
      "Der Bot befindet sich derzeit in der Testphase.\n\n" +
      "🔐 Ihre Daten:\n" +
      "• werden nicht in einer Datenbank gespeichert\n" +
      "• werden nur zur Erstellung der PDF verwendet\n" +
      "• werden nach 30 Minuten automatisch gelöscht\n\n" +
      "⚠️ *Rechtlicher Hinweis*\n" +
      "Dieser Bot ist keine Rechtsberatung und gibt keine rechtlichen Empfehlungen.\n" +
      "Alle Hinweise dienen nur der Orientierung und ersetzen keine fachliche Beratung.\n" +
      "Für die Richtigkeit der eingegebenen Daten ist der Nutzer verantwortlich.\n\n" +
      "Wenn Sie beginnen möchten, drücken Sie „Einverstanden“.",
    privacy:
      "🔐 Datenschutz (Testversion)\n\n" +
      "• Daten werden nicht in einer Datenbank gespeichert.\n" +
      "• Die Sitzung wird nur im Speicher gehalten und nach 30 Minuten gelöscht.\n" +
      "• Die PDF wird im Speicher erstellt und nicht auf die Festplatte geschrieben.\n" +
      "• Daten werden nicht an Dritte weitergegeben und nicht an externe KI-Dienste gesendet.\n\n" +
      "⚠️ Rechtlicher Hinweis\n" +
      "Dieser Bot bietet keine Rechtsberatung.\n" +
      "Alle Hinweise dienen ausschließlich der Orientierung.",
    importantNotes:
      "📌 Wichtige Informationen vor der Abgabe\n\n" +
      "Diese Punkte beruhen auf allgemeinen Anforderungen des Jobcenters und dienen nur der Orientierung.\n" +
      "Dies ist keine Rechtsberatung.\n\n" +
      "• Prüfen Sie, ob die Angaben vollständig und fehlerfrei sind.\n" +
      "• Das Jobcenter bittet in der Regel darum, Änderungen mitzuteilen (Arbeit, Einkommen, Umzug, Haushaltszusammensetzung).\n" +
      "• In einzelnen Fällen gleicht das Jobcenter Daten mit anderen Stellen ab.\n" +
      "• Die Angabe der Telefonnummer ist freiwillig.\n\n" +
      "📎 Unterlagen, die das Jobcenter häufig anfordert:\n" +
      "• Kontoauszüge der letzten 3 Monate\n" +
      "• Mietvertrag und Nachweise zu Unterkunfts-/Heizkosten\n" +
      "• Nachweise über Einkommen\n" +
      "• Informationen zur Krankenversicherung\n" +
      "• Unterlagen von Familienmitgliedern\n" +
      "• Falls erforderlich: Nachweise zu Behinderung oder besonderen Bedarfen"
  },
  uk: {
    languagePrompt: "Оберіть мову, якою бот продовжить роботу:",
    formPrompt: "Оберіть форму:",
    languageSelected: "Мову обрано: Українська",
    accept: "✅ Згоден",
    decline: "❌ Не згоден",
    back: "⬅️ Назад",
    skip: "⏭ Пропустити",
    nextDebug: "➡️ Далі (debug)",
    restart: "🔄 Restart",
    fillTestData: "⚡ Тестові дані",
    fillTestDataAlt: "🧪 Альтернативні дані",
    explain: "❓ Пояснити",
    pdfNow: "📄 PDF зараз",
    done: "✅ Готово",
    clear: "🧹 Очистити",
    sectionFallback: "📄 Розділ",
    summaryEdit: "✏️ Змінити відповіді",
    summaryPdf: "📄 Продовжити → PDF",
    flowStart: "📝 Починаємо заповнення анкети.",
    flowRestart: "🔄 Добре! Починаємо заново.",
    backReply: "⬅️ Назад.",
    requiredField: "⚠️ Це обов’язкове поле, його не можна пропустити.",
    skipped: "⏭ Пропущено.",
    pdfBuilding: "⏳ Формую PDF...",
    pdfDone: "✅ Готово!",
    pdfError: "❌ Помилка під час генерації PDF. Перевірте шаблон і координати полів.",
    debugSkipped: "➡️ Debug: крок пропущено.",
    testDataFilled: "⚡ Готово! Тестові дані заповнено. Можна натиснути PDF 🙂",
    testDataFilledAlt: "🧪 Готово! Альтернативні тестові дані заповнено. Можна натиснути PDF 🙂",
    languageChosen: "🌐 Мову обрано:",
    chooseWithButton: "⚠️ Оберіть варіант кнопкою нижче.",
    chooseManyWithButtons: "⚠️ Оберіть варіанти кнопками нижче.",
    commandReceived: "ℹ️ Команду отримано. Продовжуємо 🙂",
    staleChoice: "⚠️ Цей вибір уже неактуальний",
    invalidChoice: "⚠️ Неправильний варіант",
    cbOk: "Ок",
    cbDone: "Готово",
    cbCleared: "Очищено",
    chosen: "✅ Ви обрали:",
    noActiveField: "❓ Зараз немає активного поля для пояснення.",
    explanationTitle: "📌 Пояснення:",
    checkSummary: "📋 *Перевірте ваші відповіді перед формуванням PDF*",
    importantInfo: "📌 Важлива інформація",
    feedbackButton: "⭐ Залишити відгук",
    formSelected: "📄 Форму обрано:",
    formNotFound: "⚠️ Форму не знайдено:",
    languageUnavailable: "⚠️ Цю мову ще не підключено:",
    tooLong: "Відповідь занадто довга. Будь ласка, введіть коротке значення.",
    cyrillicBlocked: "Будь ласка, вводьте дані латиницею, як у документах. Кирилиця не допускається.",
    answerError: "❌ Помилка під час обробки відповіді. Спробуйте ще раз.",
    callbackError: "❌ Помилка. Спробуйте ще раз.",
    feedbackAsk: "📝 Напишіть ваш відгук або проблему.\nЯ передам це розробнику.",
    feedbackThanks: "Дякую! Відгук надіслано розробнику.",
    privacyDeclined: "❌ Ви відмовилися від обробки даних.\nАнкету не можна заповнити без згоди.\n\nЯкщо передумаєте — введіть /start.",
    privacyAccepted: "Дякую! Починаємо заповнення.",
    welcome:
      "👋 *Тестова версія бота*\n\n" +
      "Цей бот допомагає заповнювати німецьку форму Bürgergeld.\n" +
      "Зараз він перебуває на етапі тестування.\n\n" +
      "🔐 Ваші дані:\n" +
      "• не зберігаються в базі даних\n" +
      "• використовуються тільки для створення PDF\n" +
      "• автоматично видаляються через 30 хвилин\n\n" +
      "⚠️ *Юридичне повідомлення*\n" +
      "Цей бот не є юридичним консультантом і не надає юридичних порад.\n" +
      "Усі підказки мають інформаційний характер і не замінюють консультацію фахівців.\n" +
      "Відповідальність за правильність введених даних несе користувач.\n\n" +
      "Якщо готові почати — натисніть «Згоден».",
    privacy:
      "🔐 Політика даних (тестова версія)\n\n" +
      "• Дані не зберігаються в базі даних.\n" +
      "• Сесія зберігається тільки в пам’яті та видаляється через 30 хвилин.\n" +
      "• PDF створюється в пам’яті й не записується на диск.\n" +
      "• Дані не передаються третім особам і не надсилаються до зовнішніх AI-сервісів.\n\n" +
      "⚠️ Юридичне повідомлення\n" +
      "Цей бот не надає юридичних консультацій.\n" +
      "Усі підказки мають виключно інформаційний характер.",
    importantNotes:
      "📌 Важлива інформація перед поданням\n\n" +
      "Ці пункти базуються на загальних вимогах Jobcenter і мають інформаційний характер.\n" +
      "Це не є юридичною консультацією.\n\n" +
      "• Перевірте, що дані заповнені повністю і без помилок.\n" +
      "• Jobcenter зазвичай просить повідомляти про зміни (робота, дохід, переїзд, склад сім’ї).\n" +
      "• В окремих випадках Jobcenter звіряє дані з іншими відомствами.\n" +
      "• Вказання телефону є добровільним.\n\n" +
      "📎 Документи, які Jobcenter часто запитує:\n" +
      "• Виписки з банківських рахунків за останні 3 місяці\n" +
      "• Договір оренди та підтвердження витрат на житло/опалення\n" +
      "• Документи про доходи\n" +
      "• Інформація про медичне страхування\n" +
      "• Документи членів сім’ї\n" +
      "• За потреби: підтвердження інвалідності або особливих потреб"
  }
};

export function t(language = "ru", key) {
  return messages[language]?.[key] || messages.ru[key] || key;
}
