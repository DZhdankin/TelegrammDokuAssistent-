const HELP_TEXTS = {
  kindergeld_number: {
    ru: "Номер Kindergeld, если он уже известен. Обычно указан в письмах Familienkasse.",
    de: "Kindergeldnummer, falls sie bereits bekannt ist. Sie steht meist in Briefen der Familienkasse.",
    uk: "Номер Kindergeld, якщо він уже відомий. Зазвичай він вказаний у листах Familienkasse."
  },
  ank_kindergeld_number: {
    ru: "Номер Kindergeld, если он уже известен. Обычно указан в письмах Familienkasse.",
    de: "Kindergeldnummer, falls sie bereits bekannt ist. Sie steht meist in Briefen der Familienkasse.",
    uk: "Номер Kindergeld, якщо він уже відомий. Зазвичай він вказаний у листах Familienkasse."
  },
  daytime_phone: {
    ru: "Номер телефона для связи в дневное время. Нужен для обратной связи.",
    de: "Telefonnummer für Rückfragen tagsüber. Sie wird für die Kontaktaufnahme verwendet.",
    uk: "Номер телефону для зв'язку вдень. Він потрібен для зворотного зв'язку."
  },
  attached_child_forms_count: {
    ru: "Сколько приложений Anlage Kind добавлено к заявлению.",
    de: "Wie viele Anlage Kind-Formulare dem Antrag beigefügt sind.",
    uk: "Скільки додатків Anlage Kind додано до заяви."
  },
  applicant_tax_id: {
    ru: "Steuer-ID заявителя или ребёнка. Обычно состоит из 11 цифр.",
    de: "Steuer-ID des Antragstellers oder des Kindes. Sie besteht normalerweise aus 11 Ziffern.",
    uk: "Steuer-ID заявника або дитини. Зазвичай складається з 11 цифр."
  },
  child_tax_id: {
    ru: "Steuer-ID заявителя или ребёнка. Обычно состоит из 11 цифр.",
    de: "Steuer-ID des Antragstellers oder des Kindes. Sie besteht normalerweise aus 11 Ziffern.",
    uk: "Steuer-ID заявника або дитини. Зазвичай складається з 11 цифр."
  },
  applicant_address: {
    ru: "Полный адрес заявителя: улица, дом, индекс, город, страна.",
    de: "Vollständige Adresse des Antragstellers: Straße, Hausnummer, Postleitzahl, Ort, Land.",
    uk: "Повна адреса заявника: вулиця, будинок, індекс, місто, країна."
  },
  applicant_marital_status: {
    ru: "Текущий семейный статус заявителя.",
    de: "Aktueller Familienstand des Antragstellers.",
    uk: "Поточний сімейний стан заявника."
  },
  applicant_marital_status_since: {
    ru: "Дата, с которой действует этот семейный статус.",
    de: "Datum, seit dem dieser Familienstand gilt.",
    uk: "Дата, з якої діє цей сімейний стан."
  },
  partner_exists: {
    ru: "Указывает, есть ли супруг, партнёр или другой родитель в общем Haushalt.",
    de: "Gibt an, ob es einen Ehepartner, Partner oder anderen Elternteil im gemeinsamen Haushalt gibt.",
    uk: "Вказує, чи є чоловік/дружина, партнер або інший батько/мати в спільному домогосподарстві."
  },
  partner_tax_id: {
    ru: "Steuer-ID второго родителя или супруга, если она известна.",
    de: "Steuer-ID des anderen Elternteils oder Ehepartners, falls bekannt.",
    uk: "Steuer-ID другого з батьків або чоловіка/дружини, якщо вона відома."
  },
  partner_last_name: {
    ru: "Фамилия второго родителя или супруга.",
    de: "Nachname des anderen Elternteils oder Ehepartners.",
    uk: "Прізвище другого з батьків або чоловіка/дружини."
  },
  partner_first_name: {
    ru: "Имя второго родителя или супруга.",
    de: "Vorname des anderen Elternteils oder Ehepartners.",
    uk: "Ім'я другого з батьків або чоловіка/дружини."
  },
  partner_title: {
    ru: "Титул второго родителя или супруга, если он есть.",
    de: "Titel des anderen Elternteils oder Ehepartners, falls vorhanden.",
    uk: "Титул другого з батьків або чоловіка/дружини, якщо він є."
  },
  partner_birth_date: {
    ru: "Дата рождения второго родителя или супруга.",
    de: "Geburtsdatum des anderen Elternteils oder Ehepartners.",
    uk: "Дата народження другого з батьків або чоловіка/дружини."
  },
  partner_nationality: {
    ru: "Гражданство второго родителя или супруга.",
    de: "Staatsangehörigkeit des anderen Elternteils oder Ehepartners.",
    uk: "Громадянство другого з батьків або чоловіка/дружини."
  },
  partner_gender: {
    ru: "Пол второго родителя или супруга, как указан в документах.",
    de: "Geschlecht des anderen Elternteils oder Ehepartners, wie es in den Unterlagen angegeben ist.",
    uk: "Стать другого з батьків або чоловіка/дружини, як зазначено в документах."
  },
  partner_previous_name: {
    ru: "Предыдущая фамилия второго родителя или супруга, если она есть.",
    de: "Früherer Nachname des anderen Elternteils oder Ehepartners, falls vorhanden.",
    uk: "Попереднє прізвище другого з батьків або чоловіка/дружини, якщо воно є."
  },
  partner_address: {
    ru: "Адрес второго родителя или супруга, если он отличается.",
    de: "Adresse des anderen Elternteils oder Ehepartners, falls sie abweicht.",
    uk: "Адреса другого з батьків або чоловіка/дружини, якщо вона відрізняється."
  },
  payment_iban: {
    ru: "IBAN для перечисления Kindergeld.",
    de: "IBAN für die Kindergeldzahlung.",
    uk: "IBAN для виплати Kindergeld."
  },
  payment_bic: {
    ru: "BIC банка, если он требуется.",
    de: "BIC der Bank, falls erforderlich.",
    uk: "BIC банку, якщо він потрібен."
  },
  payment_bank_name: {
    ru: "Название банка, в котором открыт счёт.",
    de: "Name der Bank, bei der das Konto geführt wird.",
    uk: "Назва банку, в якому відкрито рахунок."
  },
  payment_account_holder_type: {
    ru: "Указывает, кому принадлежит счёт для выплат.",
    de: "Gibt an, wem das Konto für die Zahlung gehört.",
    uk: "Вказує, кому належить рахунок для виплати."
  },
  payment_account_holder_name: {
    ru: "Фамилия и имя владельца счёта, если счёт принадлежит не заявителю.",
    de: "Vor- und Nachname des Kontoinhabers, wenn das Konto nicht dem Antragsteller gehört.",
    uk: "Ім'я та прізвище власника рахунку, якщо рахунок належить не заявнику."
  },
  notice_recipient_enabled: {
    ru: "Нужно ли отправлять решение не заявителю, а другому человеку.",
    de: "Ob der Bescheid an eine andere Person als den Antragsteller geschickt werden soll.",
    uk: "Чи потрібно надсилати рішення не заявнику, а іншій людині."
  },
  notice_recipient_last_name: {
    ru: "Фамилия получателя Bescheid.",
    de: "Nachname der Person, die den Bescheid erhalten soll.",
    uk: "Прізвище отримувача Bescheid."
  },
  notice_recipient_first_name: {
    ru: "Имя получателя Bescheid.",
    de: "Vorname der Person, die den Bescheid erhalten soll.",
    uk: "Ім'я отримувача Bescheid."
  },
  notice_recipient_address: {
    ru: "Адрес получателя Bescheid.",
    de: "Adresse der Person, die den Bescheid erhalten soll.",
    uk: "Адреса отримувача Bescheid."
  },
  already_receives_kindergeld: {
    ru: "Нужно ли перечислить детей, на которых Kindergeld уже получают.",
    de: "Ob Kinder aufgelistet werden sollen, für die bereits Kindergeld bezogen wird.",
    uk: "Чи потрібно перелічити дітей, на яких уже отримують Kindergeld."
  },
  other_person_receives_kindergeld: {
    ru: "Есть ли дети, на которых Kindergeld получает другой человек.",
    de: "Ob es Kinder gibt, für die eine andere Person Kindergeld erhält.",
    uk: "Чи є діти, на яких Kindergeld отримує інша людина."
  },
  application_signature_date: {
    ru: "Дата подписи заявления или приложения.",
    de: "Datum der Unterschrift auf dem Antrag oder Anhang.",
    uk: "Дата підпису заяви або додатка."
  },
  partner_consent_signature_date: {
    ru: "Дата подписи заявления или приложения.",
    de: "Datum der Unterschrift auf dem Antrag oder Anhang.",
    uk: "Дата підпису заяви або додатка."
  },
  ank_signature_date: {
    ru: "Дата подписи заявления или приложения.",
    de: "Datum der Unterschrift auf dem Antrag oder Anhang.",
    uk: "Дата підпису заяви або додатка."
  },
  ank_applicant_full_name: {
    ru: "ФИО заявителя для приложения Anlage Kind.",
    de: "Vor- und Nachname des Antragstellers für die Anlage Kind.",
    uk: "Ім'я та прізвище заявника для додатка Anlage Kind."
  },
  ank_application_date: {
    ru: "Дата подачи заявления на Kindergeld.",
    de: "Datum des Kindergeld-Antrags.",
    uk: "Дата подання заяви на Kindergeld."
  },
  ank_child_number: {
    ru: "Порядковый номер ребёнка в приложении.",
    de: "Laufende Nummer des Kindes im Anhang.",
    uk: "Порядковий номер дитини в додатку."
  },
  child_last_name: {
    ru: "Фамилия ребёнка.",
    de: "Nachname des Kindes.",
    uk: "Прізвище дитини."
  },
  child_first_name: {
    ru: "Имя ребёнка.",
    de: "Vorname des Kindes.",
    uk: "Ім'я дитини."
  },
  child_birth_name: {
    ru: "Фамилия ребёнка при рождении, если она отличается.",
    de: "Geburtsname des Kindes, falls abweichend.",
    uk: "Прізвище дитини при народженні, якщо воно відрізняється."
  },
  child_birth_place: {
    ru: "Место рождения ребёнка.",
    de: "Geburtsort des Kindes.",
    uk: "Місце народження дитини."
  },
  child_nationality: {
    ru: "Гражданство ребёнка.",
    de: "Staatsangehörigkeit des Kindes.",
    uk: "Громадянство дитини."
  },
  child_title: {
    ru: "Титул ребёнка, если он есть.",
    de: "Titel des Kindes, falls vorhanden.",
    uk: "Титул дитини, якщо він є."
  },
  child_birth_date: {
    ru: "Дата рождения ребёнка.",
    de: "Geburtsdatum des Kindes.",
    uk: "Дата народження дитини."
  },
  child_gender: {
    ru: "Пол ребёнка, как указан в документах.",
    de: "Geschlecht des Kindes, wie es in den Unterlagen angegeben ist.",
    uk: "Стать дитини, як зазначено в документах."
  },
  child_same_address: {
    ru: "Живёт ли ребёнок по тому же адресу, что и заявитель.",
    de: "Ob das Kind unter derselben Adresse wie der Antragsteller lebt.",
    uk: "Чи живе дитина за тією самою адресою, що й заявник."
  },
  child_different_address: {
    ru: "Адрес ребёнка, если он отличается от адреса заявителя.",
    de: "Adresse des Kindes, falls sie von der Adresse des Antragstellers abweicht.",
    uk: "Адреса дитини, якщо вона відрізняється від адреси заявника."
  },
  child_different_address_reason: {
    ru: "Причина, по которой у ребёнка другой адрес.",
    de: "Grund, warum das Kind eine andere Adresse hat.",
    uk: "Причина, через яку в дитини інша адреса."
  },
  child_relationship_to_applicant: {
    ru: "Кем ребёнок является для заявителя.",
    de: "In welchem Verhältnis das Kind zum Antragsteller steht.",
    uk: "Ким дитина є для заявника."
  },
  child_relationship_to_partner: {
    ru: "Кем ребёнок является для супруга или партнёра.",
    de: "In welchem Verhältnis das Kind zum Ehepartner oder Partner steht.",
    uk: "Ким дитина є для чоловіка/дружини або партнера."
  },
  child_relationship_to_other_person: {
    ru: "Есть ли у ребёнка родственная связь с другой указанной Person.",
    de: "Ob das Kind mit der anderen angegebenen Person verwandt ist.",
    uk: "Чи має дитина родинний зв'язок з іншою вказаною Person."
  },
  other_person_info_needed: {
    ru: "Нужно ли заполнить данные другой Person.",
    de: "Ob die Daten einer anderen Person ausgefüllt werden müssen.",
    uk: "Чи потрібно заповнити дані іншої Person."
  },
  child_is_adult_or_soon_18: {
    ru: "Уже ли ребёнку 18 лет или скоро исполнится 18.",
    de: "Ob das Kind bereits 18 Jahre alt ist oder bald 18 wird.",
    uk: "Чи виповнилося дитині 18 років або це станеться скоро."
  },
  adult_child_proofs_status: {
    ru: "Что делать с подтверждающими документами для ребёнка 18+.",
    de: "Was mit den Nachweisen für das Kind 18+ geschehen soll.",
    uk: "Що робити з підтвердними документами для дитини 18+."
  },
  adult_child_situation: {
    ru: "Как выглядит текущая ситуация ребёнка 18+.",
    de: "Wie die aktuelle Situation des Kindes 18+ aussieht.",
    uk: "Якою є поточна ситуація дитини 18+."
  },
  adult_child_school_training_name: {
    ru: "Название школы, вуза или Ausbildung.",
    de: "Name der Schule, Hochschule oder Ausbildung.",
    uk: "Назва школи, вишу або Ausbildung."
  },
  adult_child_school_training_from: {
    ru: "Дата начала обучения.",
    de: "Beginn der Ausbildung oder des Studiums.",
    uk: "Дата початку навчання."
  },
  adult_child_school_training_to: {
    ru: "Дата окончания или планируемого окончания обучения.",
    de: "Ende oder voraussichtliches Ende der Ausbildung oder des Studiums.",
    uk: "Дата закінчення або запланованого закінчення навчання."
  },
  adult_child_other_training_name: {
    ru: "Название другой Ausbildungsmaßnahme.",
    de: "Bezeichnung der anderen Ausbildungsmaßnahme.",
    uk: "Назва іншого заходу з навчання."
  },
  adult_child_other_training_from: {
    ru: "Дата начала другой меры обучения.",
    de: "Beginn der anderen Ausbildungsmaßnahme.",
    uk: "Дата початку іншого заходу з навчання."
  },
  adult_child_other_training_to: {
    ru: "Дата окончания другой меры обучения.",
    de: "Ende der anderen Ausbildungsmaßnahme.",
    uk: "Дата закінчення іншого заходу з навчання."
  },
  adult_child_no_training_place_from: {
    ru: "Дата, с которой нет места для Ausbildung.",
    de: "Datum, seit dem kein Ausbildungsplatz vorhanden ist.",
    uk: "Дата, з якої немає місця для Ausbildung."
  },
  adult_child_no_training_place_to: {
    ru: "Дата, до которой нет места для Ausbildung.",
    de: "Datum, bis zu dem kein Ausbildungsplatz vorhanden ist.",
    uk: "Дата, до якої немає місця для Ausbildung."
  },
  adult_child_voluntary_service_from: {
    ru: "Дата начала добровольной службы.",
    de: "Beginn des freiwilligen Dienstes.",
    uk: "Дата початку добровільної служби."
  },
  adult_child_voluntary_service_to: {
    ru: "Дата окончания добровольной службы.",
    de: "Ende des freiwilligen Dienstes.",
    uk: "Дата завершення добровільної служби."
  },
  adult_child_transition_from: {
    ru: "Дата начала переходного периода.",
    de: "Beginn des Übergangszeitraums.",
    uk: "Дата початку перехідного періоду."
  },
  adult_child_transition_to: {
    ru: "Дата окончания переходного периода.",
    de: "Ende des Übergangszeitraums.",
    uk: "Дата завершення перехідного періоду."
  },
  adult_child_jobseeker_from: {
    ru: "Дата регистрации как ищущего работу.",
    de: "Datum der Arbeitsuchendmeldung.",
    uk: "Дата реєстрації як особи, що шукає роботу."
  },
  adult_child_jobseeker_to: {
    ru: "Дата окончания этой регистрации.",
    de: "Ende dieser Arbeitsuchendmeldung.",
    uk: "Дата завершення цієї реєстрації."
  },
  adult_child_has_completed_training_or_degree: {
    ru: "Уже ли ребёнок завершил Ausbildung или Studium.",
    de: "Ob das Kind die Ausbildung oder das Studium bereits abgeschlossen hat.",
    uk: "Чи вже дитина завершила Ausbildung або Studium."
  },
  adult_child_degree_name: {
    ru: "Название полученного Berufsabschluss или Studienabschluss.",
    de: "Bezeichnung des erreichten Berufs- oder Studienabschlusses.",
    uk: "Назва отриманого Berufsabschluss або Studienabschluss."
  },
  adult_child_training_end_date: {
    ru: "Дата окончания Ausbildung или Studium.",
    de: "Datum des Abschlusses der Ausbildung oder des Studiums.",
    uk: "Дата завершення Ausbildung або Studium."
  },
  adult_child_career_goal_if_different: {
    ru: "Профессиональная цель, если она отличается от полученного образования.",
    de: "Berufliches Ziel, falls es vom erreichten Abschluss abweicht.",
    uk: "Професійна мета, якщо вона відрізняється від отриманої освіти."
  },
  adult_child_is_employed: {
    ru: "Работает ли ребёнок сейчас, работал ли ранее или будет работать.",
    de: "Ob das Kind derzeit arbeitet, früher gearbeitet hat oder arbeiten wird.",
    uk: "Чи працює дитина зараз, працювала раніше або буде працювати."
  },
  adult_child_employment_type_1: {
    ru: "Какой вид занятости у ребёнка.",
    de: "Welche Art von Beschäftigung das Kind hat.",
    uk: "Який вид зайнятості має дитина."
  },
  adult_child_employment_1_from: {
    ru: "Период соответствующей работы.",
    de: "Zeitraum der entsprechenden Beschäftigung.",
    uk: "Період відповідної роботи."
  },
  adult_child_employment_1_to: {
    ru: "Период соответствующей работы.",
    de: "Zeitraum der entsprechenden Beschäftigung.",
    uk: "Період відповідної роботи."
  },
  adult_child_employment_2_from: {
    ru: "Период соответствующей работы.",
    de: "Zeitraum der entsprechenden Beschäftigung.",
    uk: "Період відповідної роботи."
  },
  adult_child_employment_2_to: {
    ru: "Период соответствующей работы.",
    de: "Zeitraum der entsprechenden Beschäftigung.",
    uk: "Період відповідної роботи."
  },
  adult_child_employer_1_name_address: {
    ru: "Название и адрес работодателя.",
    de: "Name und Adresse des Arbeitgebers.",
    uk: "Назва та адреса роботодавця."
  },
  adult_child_employer_2_name_address: {
    ru: "Название и адрес работодателя.",
    de: "Name und Adresse des Arbeitgebers.",
    uk: "Назва та адреса роботодавця."
  },
  adult_child_has_second_employment: {
    ru: "Есть ли вторая дополнительная занятость.",
    de: "Ob es eine zweite zusätzliche Beschäftigung gibt.",
    uk: "Чи є друга додаткова зайнятість."
  },
  adult_child_weekly_working_hours: {
    ru: "Общая регулярная недельная занятость в часах.",
    de: "Regelmäßige wöchentliche Arbeitszeit in Stunden.",
    uk: "Загальна регулярна тижнева зайнятість у годинах."
  },
  adult_child_has_disability_before_25: {
    ru: "Есть ли у ребёнка инвалидность, которая началась до 25 лет.",
    de: "Ob beim Kind eine Behinderung vorliegt, die vor dem 25. Lebensjahr begonnen hat.",
    uk: "Чи є у дитини інвалідність, яка почалася до 25 років."
  },
  child_kindergeld_already_applied_or_received: {
    ru: "Подавали ли заявление на этого ребёнка или уже получали Kindergeld.",
    de: "Ob für dieses Kind bereits ein Antrag gestellt wurde oder Kindergeld bezogen wurde.",
    uk: "Чи подавали заяву на цю дитину або вже отримували Kindergeld."
  },
  previous_kindergeld_person_name: {
    ru: "Кто подавал заявление или получал Kindergeld.",
    de: "Wer den Antrag gestellt oder Kindergeld bezogen hat.",
    uk: "Хто подавав заяву або отримував Kindergeld."
  },
  previous_kindergeld_person_birth_date: {
    ru: "Дата рождения этого человека.",
    de: "Geburtsdatum dieser Person.",
    uk: "Дата народження цієї людини."
  },
  previous_kindergeld_period: {
    ru: "Период подачи или получения Kindergeld.",
    de: "Zeitraum des Antrags oder Bezugs von Kindergeld.",
    uk: "Період подання або отримання Kindergeld."
  },
  previous_kindergeld_familienkasse_address: {
    ru: "Familienkasse и адрес, если известны.",
    de: "Familienkasse und Adresse, falls bekannt.",
    uk: "Familienkasse та адреса, якщо відомі."
  },
  previous_kindergeld_number: {
    ru: "Kindergeldnummer, если известна.",
    de: "Kindergeldnummer, falls bekannt.",
    uk: "Номер Kindergeld, якщо відомий."
  },
  public_service_employment_exists: {
    ru: "Работает ли заявитель или другой указанный человек в öffentlichen Dienst.",
    de: "Ob der Antragsteller oder die andere genannte Person im öffentlichen Dienst arbeitet oder gearbeitet hat.",
    uk: "Чи працює заявник або інша вказана особа в öffentlichen Dienst."
  },
  public_service_federal_institution: {
    ru: "Работа выполняется в учреждении федерального уровня.",
    de: "Ob es sich um eine Beschäftigung bei einer Bundesbehörde handelt.",
    uk: "Чи йдеться про роботу в установі федерального рівня."
  },
  public_service_ba_or_jobcenter: {
    ru: "Работа выполняется в Bundesagentur für Arbeit или Jobcenter.",
    de: "Ob es sich um eine Beschäftigung bei der Bundesagentur für Arbeit oder beim Jobcenter handelt.",
    uk: "Чи йдеться про роботу в Bundesagentur für Arbeit або Jobcenter."
  },
  public_service_person_name: {
    ru: "Фамилия и имя человека, работающего в öffentlichen Dienst.",
    de: "Vor- und Nachname der Person im öffentlichen Dienst.",
    uk: "Ім'я та прізвище людини, яка працює в öffentlichen Dienst."
  },
  public_service_person_birth_date: {
    ru: "Дата рождения этого человека.",
    de: "Geburtsdatum dieser Person.",
    uk: "Дата народження цієї людини."
  },
  foreign_child_benefit_claim_exists: {
    ru: "Было ли или есть право на выплаты на ребёнка из-за границы или международной организации.",
    de: "Ob es einen Anspruch auf Leistungen für das Kind aus dem Ausland oder von einer internationalen Organisation gab oder gibt.",
    uk: "Чи було або є право на виплати на дитину з-за кордону або міжнародної організації."
  },
  foreign_benefit_person_name: {
    ru: "Кто получает или получал иностранную выплату.",
    de: "Wer die ausländische Leistung erhält oder erhalten hat.",
    uk: "Хто отримує або отримував іноземну виплату."
  },
  foreign_benefit_person_birth_date: {
    ru: "Дата рождения получателя выплаты.",
    de: "Geburtsdatum der Person, die die Leistung erhält oder erhielt.",
    uk: "Дата народження отримувача виплати."
  },
  foreign_benefit_name: {
    ru: "Название иностранной выплаты.",
    de: "Name der ausländischen Leistung.",
    uk: "Назва іноземної виплати."
  },
  foreign_benefit_monthly_amount: {
    ru: "Ежемесячная сумма выплаты в евро.",
    de: "Monatlicher Betrag der Leistung in Euro.",
    uk: "Щомісячна сума виплати в євро."
  },
  foreign_benefit_period: {
    ru: "Период выплаты.",
    de: "Zeitraum der Leistung.",
    uk: "Період виплати."
  },
  foreign_benefit_provider_address: {
    ru: "Организация или ведомство, которое выплачивает, и адрес.",
    de: "Auszahlende Stelle oder Organisation mit Adresse.",
    uk: "Організація або відомство, яке виплачує, і адреса."
  },
  foreign_benefit_reference_number: {
    ru: "Номер дела или Aktenzeichen.",
    de: "Aktenzeichen oder Vorgangsnummer.",
    uk: "Номер справи або Aktenzeichen."
  },
  foreign_work_employee_self_employed: {
    ru: "Работали ли вы по найму или были самозанятым за границей.",
    de: "Ob Sie im Ausland angestellt oder selbständig waren.",
    uk: "Чи працювали ви за наймом або були самозайняті за кордоном."
  },
  foreign_state_or_nato_employment: {
    ru: "Работали ли вы в государственном учреждении или организации НАТО за границей.",
    de: "Ob Sie im Ausland in einer staatlichen Einrichtung oder bei einer NATO-Organisation gearbeitet haben.",
    uk: "Чи працювали ви в державній установі або організації НАТО за кордоном."
  },
  posted_worker_foreign_employer: {
    ru: "Были ли вы направлены в командировку иностранным работодателем.",
    de: "Ob Sie von einem ausländischen Arbeitgeber entsandt wurden.",
    uk: "Чи були ви направлені у відрядження іноземним роботодавцем."
  },
  foreign_work_person_name: {
    ru: "Фамилия и имя человека, который работал за границей.",
    de: "Vor- und Nachname der Person, die im Ausland gearbeitet hat.",
    uk: "Ім'я та прізвище людини, яка працювала за кордоном."
  },
  foreign_work_period: {
    ru: "Период работы за границей.",
    de: "Zeitraum der Tätigkeit im Ausland.",
    uk: "Період роботи за кордоном."
  },
  foreign_work_employer_name: {
    ru: "Название работодателя за границей.",
    de: "Name des Arbeitgebers im Ausland.",
    uk: "Назва роботодавця за кордоном."
  },
  foreign_work_employer_address: {
    ru: "Адрес работодателя за границей.",
    de: "Adresse des Arbeitgebers im Ausland.",
    uk: "Адреса роботодавця за кордоном."
  },
  foreign_work_country_place: {
    ru: "Страна и место работы за границей.",
    de: "Land und Arbeitsort im Ausland.",
    uk: "Країна та місце роботи за кордоном."
  }
};

const DYNAMIC_HELP_TEXTS = [
  {
    pattern: /^other_child_(\d+)_receiver_name$/,
    build: (n) => ({
      ru: `Имя человека, который получает Kindergeld за ребёнка ${n}. Это поле описывает получателя выплаты, если это не заявитель.`,
      de: `Name der Person, die Kindergeld für Kind ${n} erhält. Dieses Feld beschreibt die empfangende Person, wenn sie nicht die antragstellende Person ist.`,
      uk: `Ім'я людини, яка отримує Kindergeld за дитину ${n}. Це поле описує отримувача виплати, якщо це не заявник/заявниця.`
    })
  }
];

function getDynamicHelpText(key, language) {
  for (const { pattern, build } of DYNAMIC_HELP_TEXTS) {
    const match = key.match(pattern);
    if (!match) continue;

    const entry = build(match[1]);
    return language === "ru" ? entry.ru || "" : entry[language] || "";
  }

  return "";
}

export function getKindergeldFieldHelp(field, language = "ru") {
  const key = String(field?.key || "");
  const entry = HELP_TEXTS[key];
  if (!entry) return getDynamicHelpText(key, language);
  return language === "ru" ? entry.ru || "" : entry[language] || "";
}
