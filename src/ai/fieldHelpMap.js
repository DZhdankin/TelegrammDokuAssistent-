/**
 * Local fallback explanations used when a page field has no own help text.
 * The content is kept entirely in the repository and does not call external AI.
 */

export const fieldHelpMap = {
  has_guardian: {
    title: {
      ru: "Опекун / Betreuer / Vormund",
      de: "Betreuer / Vormund",
      uk: "Опікун / піклувальник"
    },
    text: {
      ru: `📌 Что это значит:
Опекун (Betreuer/Vormund) — это человек, которого официально назначил суд или ведомство, чтобы он представлял вас в делах (документы, финансы, медицина).

✅ Вариант "Да":
Если у вас есть официальный Betreuer/Vormund и есть документ о назначении (решение суда).

❌ Вариант "Нет":
Если вы сами подписываете документы и решаете свои вопросы.

🔎 Где это подтверждается:
Обычно есть письмо/решение от Amtsgericht / Betreuungsgericht.

💡 Ориентир:
Обычно ориентируются на официальный документ или подтверждённую ситуацию.`,
      de: `📌 Was bedeutet das:
Ein Betreuer oder Vormund ist eine Person, die vom Gericht oder einer Behörde offiziell bestellt wurde, um Sie in Angelegenheiten zu vertreten (Unterlagen, Finanzen, medizinische Fragen).

✅ Antwort "Ja":
Wenn Sie einen offiziellen Betreuer/Vormund haben und ein Bestelldokument (Gerichtsentscheidung) vorliegt.

❌ Antwort "Nein":
Wenn Sie Ihre Unterlagen selbst unterschreiben und Ihre Angelegenheiten selbst regeln.

🔎 Wo das bestätigt wird:
Meist gibt es einen Beschluss oder ein Schreiben vom Amtsgericht / Betreuungsgericht.

💡 Orientierung:
Maßgeblich ist in der Regel das offizielle Dokument oder eine bestätigte Betreuungssituation.`,
      uk: `📌 Що це означає:
Опікун або піклувальник — це людина, яку офіційно призначив суд або орган, щоб вона представляла вас у справах (документи, фінанси, медицина).

✅ Варіант "Так":
Якщо у вас є офіційний Betreuer/Vormund і є документ про призначення (рішення суду).

❌ Варіант "Ні":
Якщо ви самі підписуєте документи й самостійно вирішуєте свої питання.

🔎 Де це підтверджується:
Зазвичай є лист або рішення від Amtsgericht / Betreuungsgericht.

💡 Орієнтир:
Зазвичай орієнтуються на офіційний документ або підтверджену ситуацію.`
    }
  },

  iban: {
    title: {
      ru: "IBAN",
      de: "IBAN",
      uk: "IBAN"
    },
    text: {
      ru: `📌 Что это:
IBAN — номер банковского счёта.

🔎 Где найти:
• в банковском приложении
• в выписке/договоре
• в онлайн-банке

⚠️ Формат для Германии:
Начинается с DE и всего 22 символа (DE + 20 цифр).
Пример: DE12345678901234567890

✍️ Как вводить:
Без пробелов.`,
      de: `📌 Was ist das:
IBAN ist die Nummer Ihres Bankkontos.

🔎 Wo zu finden:
• in der Banking-App
• im Kontoauszug oder Vertrag
• im Online-Banking

⚠️ Format für Deutschland:
Beginnt mit DE und hat insgesamt 22 Zeichen (DE + 20 Ziffern).
Beispiel: DE12345678901234567890

✍️ Eingabe:
Ohne Leerzeichen.`,
      uk: `📌 Що це:
IBAN — це номер банківського рахунку.

🔎 Де знайти:
• у банківському застосунку
• у виписці або договорі
• в онлайн-банкінгу

⚠️ Формат для Німеччини:
Починається з DE і має всього 22 символи (DE + 20 цифр).
Приклад: DE12345678901234567890

✍️ Як вводити:
Без пробілів.`
    }
  },

  rentenversicherung_number: {
    title: {
      ru: "Социальный номер / пенсионное страхование",
      de: "Sozialversicherungsnummer / Rentenversicherung",
      uk: "Номер соціального страхування / пенсійного страхування"
    },
    text: {
      ru: `📌 Что это за номер:
Sozialversicherungsnummer / Rentenversicherungsnummer — номер пенсионного/социального страхования в Германии.

🔎 Где найти:
• письмо от Deutsche Rentenversicherung
• Sozialversicherungsausweis
• Lohnabrechnung (расчётный лист)

✍️ Если нет:
Если номера нет, обычно указывают вариант "Нет" или "-" в текстовом поле.`,
      de: `📌 Welche Nummer ist gemeint:
Die Sozialversicherungsnummer bzw. Rentenversicherungsnummer ist die Nummer Ihrer Renten- und Sozialversicherung in Deutschland.

🔎 Wo zu finden:
• Schreiben der Deutschen Rentenversicherung
• Sozialversicherungsausweis
• Lohnabrechnung

✍️ Wenn nicht vorhanden:
Wenn die Nummer unbekannt ist, wird meist die Option "Nein" oder "-" im Textfeld verwendet.`,
      uk: `📌 Що це за номер:
Sozialversicherungsnummer / Rentenversicherungsnummer — номер пенсійного або соціального страхування в Німеччині.

🔎 Де знайти:
• лист від Deutsche Rentenversicherung
• Sozialversicherungsausweis
• Lohnabrechnung (розрахунковий лист)

✍️ Якщо немає:
Якщо номера немає, зазвичай обирають варіант "Ні" або "-" у текстовому полі.`
    }
  },

  has_residence_permit: {
    title: {
      ru: "Разрешение на проживание",
      de: "Aufenthaltstitel",
      uk: "Дозвіл на проживання"
    },
    text: {
      ru: `📌 Что это значит:
Aufenthaltstitel — это действующий вид на жительство в Германии (пластиковая карточка).

✅ "Да":
Если у вас есть карточка Aufenthaltstitel и она действующая.

❌ "Нет":
Если карточки нет (например только ожидание решения / другие временные бумаги).

💡 Где сверить:
Обычно можно сверить с документом из Ausländerbehörde.`,
      de: `📌 Was bedeutet das:
Ein Aufenthaltstitel ist ein gültiger Aufenthaltstitel bzw. eine Aufenthaltskarte in Deutschland (Plastikkarte).

✅ "Ja":
Wenn Sie eine Aufenthaltstitel-Karte haben und diese gültig ist.

❌ "Nein":
Wenn keine Karte vorliegt (zum Beispiel nur ein Bescheid in Bearbeitung oder andere vorläufige Unterlagen).

💡 Abgleich:
Meist kann man dies mit dem Dokument der Ausländerbehörde prüfen.`,
      uk: `📌 Що це означає:
Aufenthaltstitel — це чинний дозвіл на проживання в Німеччині (пластикова картка).

✅ "Так":
Якщо у вас є картка Aufenthaltstitel і вона чинна.

❌ "Ні":
Якщо картки немає (наприклад, лише очікування рішення або інші тимчасові папери).

💡 Де перевірити:
Зазвичай це можна звірити з документом від Ausländerbehörde.`
    }
  },

  has_verpflichtung: {
    title: {
      ru: "Verpflichtungserklärung / поручительство",
      de: "Verpflichtungserklärung",
      uk: "Зобов’язання про фінансове забезпечення"
    },
    text: {
      ru: `📌 Что это значит:
Verpflichtungserklärung — это документ, когда другой человек в Германии официально обязуется оплачивать ваши расходы (часто для визы/въезда).

✅ Вариант "Да":
Если кто-то подписывал за вас такую бумагу в Ausländerbehörde / консульстве, и у вас есть документ.

❌ Вариант "Нет":
Если вы приехали без поручителя и никто не подписывал обязательство.

💡 Ориентир:
Обычно ориентируются на официальный документ или подтверждённую ситуацию.`,
      de: `📌 Was bedeutet das:
Eine Verpflichtungserklärung ist ein Dokument, mit dem sich eine andere Person in Deutschland offiziell verpflichtet, Ihre Kosten zu übernehmen (oft für Visum oder Einreise).

✅ Antwort "Ja":
Wenn jemand eine solche Erklärung für Sie bei der Ausländerbehörde oder im Konsulat unterschrieben hat und Sie das Dokument besitzen.

❌ Antwort "Nein":
Wenn Sie ohne Verpflichtungsgeber eingereist sind und niemand eine solche Erklärung unterschrieben hat.

💡 Orientierung:
Maßgeblich ist in der Regel das offizielle Dokument oder die bestätigte Situation.`,
      uk: `📌 Що це означає:
Verpflichtungserklärung — це документ, коли інша людина в Німеччині офіційно зобов’язується оплачувати ваші витрати (часто для візи або в’їзду).

✅ Варіант "Так":
Якщо хтось підписував за вас таку заяву в Ausländerbehörde / консульстві, і у вас є документ.

❌ Варіант "Ні":
Якщо ви приїхали без поручителя і ніхто не підписував зобов’язання.

💡 Орієнтир:
Зазвичай орієнтуються на офіційний документ або підтверджену ситуацію.`
    }
  },

  familienstand: {
    title: {
      ru: "Семейное положение",
      de: "Familienstand",
      uk: "Сімейний стан"
    },
    text: {
      ru: `📌 Что это значит:
Семейное положение на текущий момент.

Примеры:
• ledig — не женат/не замужем
• verheiratet — женат/замужем
• geschieden — разведён(а)
• verwitwet — вдовец/вдова
• dauernd_getrennt — живёте раздельно (официально)

💡 Важно:
Ориентир — текущий официальный статус на момент заполнения.`,
      de: `📌 Was bedeutet das:
Der aktuelle Familienstand.

Beispiele:
• ledig — ledig
• verheiratet — verheiratet
• geschieden — geschieden
• verwitwet — verwitwet
• dauernd_getrennt — dauerhaft getrennt lebend (offiziell)

💡 Wichtig:
Maßgeblich ist der aktuelle offizielle Status zum Zeitpunkt der Antragstellung.`,
      uk: `📌 Що це означає:
Поточний сімейний стан.

Приклади:
• ledig — не одружений/не заміжня
• verheiratet — одружений/заміжня
• geschieden — розлучений(а)
• verwitwet — вдівець / вдова
• dauernd_getrennt — проживаєте окремо (офіційно)

💡 Важливо:
Орієнтир — поточний офіційний статус на момент заповнення.`
    }
  },

  familienstand_date: {
    title: {
      ru: "Дата развода / раздельного проживания / прекращения партнёрства",
      de: "Datum der Scheidung / Trennung / Aufhebung der Partnerschaft",
      uk: "Дата розлучення / роз’їзду / припинення партнерства"
    },
    text: {
      ru: `📌 Что это:
Эту дату заполняют только если вы:
• живёте раздельно (dauernd getrennt)
• разведены (geschieden)
• вдовец/вдова (verwitwet)
• партнёрство прекращено

✍️ Формат:
ДД.ММ.ГГГГ

💡 Если нет точной даты:
Можно посмотреть в документах (решение суда/дата развода).`,
      de: `📌 Was ist gemeint:
Dieses Datum füllen Sie nur aus, wenn Sie:
• dauerhaft getrennt leben
• geschieden sind
• verwitwet sind
• eine Partnerschaft beendet haben

✍️ Format:
TT.MM.JJJJ

💡 Wenn das genaue Datum fehlt:
Es lässt sich meist in Unterlagen prüfen (Gerichtsentscheidung oder Scheidungsdatum).`,
      uk: `📌 Що мається на увазі:
Цю дату заповнюють лише якщо ви:
• проживаєте окремо
• розлучені
• вдівець / вдова
• партнерство припинено

✍️ Формат:
ДД.ММ.РРРР

💡 Якщо точної дати немає:
Її можна подивитися в документах (рішення суду / дата розлучення).`
    }
  },

  antrag_ab: {
    title: {
      ru: "С какого момента получать Bürgergeld",
      de: "Ab wann Bürgergeld erhalten",
      uk: "З якого моменту отримувати Bürgergeld"
    },
    text: {
      ru: `📌 Что это значит:
С какого момента вы хотите получать Bürgergeld.

• "Сразу" — с ближайшего возможного момента (обычно с начала месяца подачи)
• "Позже" — если хотите указать конкретную дату

💡 Ориентир:
"Сразу" означает ближайший возможный момент; "Позже" — конкретную дату.`,
      de: `📌 Was bedeutet das:
Ab wann Sie Bürgergeld erhalten möchten.

• "Sofort" — zum nächstmöglichen Zeitpunkt (meist ab dem Monat der Antragstellung)
• "Später" — wenn Sie ein konkretes Datum angeben möchten

💡 Orientierung:
"Sofort" meint den frühestmöglichen Zeitpunkt; "Später" ein konkretes Datum.`,
      uk: `📌 Що це означає:
З якого моменту ви хочете отримувати Bürgergeld.

• "Одразу" — з найближчого можливого моменту (зазвичай з початку місяця подання)
• "Пізніше" — якщо хочете вказати конкретну дату

💡 Орієнтир:
"Одразу" означає найближчий можливий момент; "Пізніше" — конкретну дату.`
    }
  }
};
