import { SUPPORTED_FORM_LANGUAGES, buildGenericFieldHelp } from "../../services/formHelpBuilder.js";

const supportedLanguages = ["de", "uk"];

const sectionTitles = {
  de: {
    kg1_header: "📄 Hauptantrag",
    applicant: "👤 Antragsteller/in",
    partner: "👥 Zweiter Elternteil / Ehepartner/in",
    payment: "💳 Bankverbindung",
    kg1_page2: "📋 Weitere Angaben KG1",
    child_basic: "👶 Angaben zum Kind",
    child_relationship: "👨‍👩‍👧 Verwandtschaft",
    adult_child: "🎓 Kind ab 18 Jahren",
    ank_checks: "✅ Prüffragen Anlage Kind",
    signatures: "✍️ Unterschriften"
  },
  uk: {
    kg1_header: "📄 Основна заява",
    applicant: "👤 Заявник/заявниця",
    partner: "👥 Другий з батьків / чоловік або дружина",
    payment: "💳 Банківські дані",
    kg1_page2: "📋 Додаткові дані KG1",
    child_basic: "👶 Дані дитини",
    child_relationship: "👨‍👩‍👧 Родинний зв'язок",
    adult_child: "🎓 Дитина від 18 років",
    ank_checks: "✅ Перевірочні питання Anlage Kind",
    signatures: "✍️ Підписи"
  }
};

const fieldLabels = {
  de: {
    kindergeld_number: "Kindergeld-Nr., falls bereits vorhanden:",
    daytime_phone: "Telefonnummer für Rückfragen tagsüber:",
    attached_child_forms_count: "Wie viele Anlagen Kind sind beigefügt?",
    applicant_tax_id: "Steuer-ID der antragstellenden Person:",
    applicant_last_name: "Nachname der antragstellenden Person:",
    applicant_title: "Titel der antragstellenden Person, falls vorhanden:",
    applicant_first_name: "Vorname der antragstellenden Person:",
    applicant_previous_name: "Geburtsname / früherer Name, falls vorhanden:",
    applicant_birth_date: "Geburtsdatum der antragstellenden Person:",
    applicant_birth_place: "Geburtsort der antragstellenden Person:",
    applicant_gender: "Geschlecht der antragstellenden Person (m/w/d):",
    applicant_nationality: "Staatsangehörigkeit der antragstellenden Person:",
    applicant_address: "Vollständige Anschrift der antragstellenden Person:",
    applicant_marital_status: "Familienstand:",
    applicant_marital_status_since: "Seit wann besteht dieser Familienstand?",
    partner_exists: "Gibt es einen Ehepartner/Partner oder anderen Elternteil im gemeinsamen Haushalt?",
    partner_tax_id: "Steuer-ID des zweiten Elternteils / Ehepartners:",
    partner_last_name: "Nachname des zweiten Elternteils / Ehepartners:",
    partner_first_name: "Vorname des zweiten Elternteils / Ehepartners:",
    partner_title: "Titel des zweiten Elternteils / Ehepartners:",
    partner_birth_date: "Geburtsdatum des zweiten Elternteils / Ehepartners:",
    partner_nationality: "Staatsangehörigkeit des zweiten Elternteils / Ehepartners:",
    partner_gender: "Geschlecht des zweiten Elternteils / Ehepartners (m/w/d):",
    partner_previous_name: "Früherer Name des zweiten Elternteils / Ehepartners:",
    partner_address: "Anschrift des zweiten Elternteils / Ehepartners, falls abweichend:",
    payment_iban: "IBAN für die Auszahlung des Kindergeldes:",
    payment_bic: "BIC, falls erforderlich:",
    payment_bank_name: "Name der Bank:",
    payment_account_holder_type: "Wem gehört das Konto?",
    payment_account_holder_name: "Nachname und Vorname der Kontoinhaberin / des Kontoinhabers:",
    notice_recipient_enabled: "Soll der Bescheid nicht an Sie, sondern an eine andere Person gesendet werden?",
    notice_recipient_last_name: "Nachname der empfangsberechtigten Person:",
    notice_recipient_first_name: "Vorname der empfangsberechtigten Person:",
    notice_recipient_address: "Anschrift der empfangsberechtigten Person:",
    already_receives_kindergeld: "Erhalten Sie bereits Kindergeld für andere Kinder?",
    other_person_receives_kindergeld: "Gibt es Kinder von Ihnen, für die eine andere Person Kindergeld erhält?",
    application_signature_date: "Datum der Unterschrift des Antrags:",
    partner_consent_signature_date: "Datum der Unterschrift des zweiten Elternteils / Partners:",
    ank_applicant_full_name: "Nachname und Vorname der antragstellenden Person:",
    ank_kindergeld_number: "Kindergeld-Nr., falls bereits vorhanden:",
    ank_application_date: "Datum des Kindergeldantrags:",
    ank_child_number: "Laufende Nummer des Kindes:",
    child_tax_id: "Steuer-ID des Kindes:",
    child_last_name: "Nachname des Kindes:",
    child_title: "Titel des Kindes, falls vorhanden:",
    child_first_name: "Vorname des Kindes:",
    child_birth_name: "Geburtsname des Kindes, falls abweichend:",
    child_birth_date: "Geburtsdatum des Kindes:",
    child_birth_place: "Geburtsort des Kindes:",
    child_gender: "Geschlecht des Kindes (m/w/d):",
    child_nationality: "Staatsangehörigkeit des Kindes:",
    child_same_address: "Wohnt das Kind unter derselben Anschrift wie die antragstellende Person?",
    child_different_address: "Anschrift des Kindes, falls abweichend:",
    child_different_address_reason: "Grund für die abweichende Anschrift des Kindes:",
    child_relationship_to_applicant: "In welchem Verwandtschaftsverhältnis steht das Kind zur antragstellenden Person?",
    child_relationship_to_partner: "In welchem Verwandtschaftsverhältnis steht das Kind zum Ehepartner/Partner?",
    child_relationship_to_other_person: "Gibt es eine andere Person, zu der das Kind in einem Verwandtschaftsverhältnis steht?",
    other_person_info_needed: "Sollen Angaben zu einer anderen Person gemacht werden?",
    other_person_last_name: "Andere Person: Nachname:",
    other_person_first_name: "Andere Person: Vorname:",
    other_person_birth_date: "Andere Person: Geburtsdatum:",
    other_person_last_known_address: "Andere Person: letzte bekannte Anschrift:",
    other_person_nationality: "Andere Person: Staatsangehörigkeit:",
    other_person_additional_info: "Weitere Angaben zur anderen Person:",
    child_is_adult_or_soon_18: "Ist das Kind bereits 18 Jahre alt oder wird es bald 18?",
    adult_child_proofs_status: "Was ist mit den Nachweisen für das Kind ab 18 Jahren?",
    adult_child_situation: "Welche Situation trifft auf das Kind zu?",
    adult_child_school_training_name: "Name der Ausbildung / Schule / Hochschule / Berufsausbildung:",
    adult_child_school_training_from: "Ausbildung: ab welchem Datum?",
    adult_child_school_training_to: "Ausbildung: bis zu welchem Datum?",
    adult_child_other_training_name: "Name der anderen Ausbildungsmaßnahme:",
    adult_child_other_training_from: "Andere Ausbildungsmaßnahme: ab welchem Datum?",
    adult_child_other_training_to: "Andere Ausbildungsmaßnahme: bis zu welchem Datum?",
    adult_child_no_training_place_from: "Kein Ausbildungsplatz: ab welchem Datum?",
    adult_child_no_training_place_to: "Kein Ausbildungsplatz: bis zu welchem Datum?",
    adult_child_voluntary_service_from: "Freiwilligendienst: ab welchem Datum?",
    adult_child_voluntary_service_to: "Freiwilligendienst: bis zu welchem Datum?",
    adult_child_transition_from: "Übergangszeit: ab welchem Datum?",
    adult_child_transition_to: "Übergangszeit: bis zu welchem Datum?",
    adult_child_jobseeker_from: "Als arbeitssuchend gemeldet: ab welchem Datum?",
    adult_child_jobseeker_to: "Als arbeitssuchend gemeldet: bis zu welchem Datum?",
    adult_child_has_completed_training_or_degree: "Hat das Kind bereits eine Ausbildung oder ein Studium abgeschlossen?",
    adult_child_degree_name: "Welcher Berufsabschluss / Studienabschluss wurde erworben?",
    adult_child_training_end_date: "Enddatum der Ausbildung / des Studiums:",
    adult_child_career_goal_if_different: "Berufsziel, falls es vom erreichten Abschluss abweicht:",
    adult_child_is_employed: "Hat das Kind gearbeitet, arbeitet es oder wird es arbeiten?",
    adult_child_employment_type_1: "Welche Art der Beschäftigung hat das Kind?",
    adult_child_employment_1_from: "Beschäftigung 1: ab welchem Datum?",
    adult_child_employment_1_to: "Beschäftigung 1: bis zu welchem Datum?",
    adult_child_employer_1_name_address: "Arbeitgeber 1: Name und Anschrift:",
    adult_child_has_second_employment: "Gibt es eine zweite/weitere Beschäftigung?",
    adult_child_employment_2_from: "Beschäftigung 2: ab welchem Datum?",
    adult_child_employment_2_to: "Beschäftigung 2: bis zu welchem Datum?",
    adult_child_employer_2_name_address: "Arbeitgeber 2: Name und Anschrift:",
    adult_child_weekly_working_hours: "Regelmäßige wöchentliche Arbeitszeit insgesamt in Stunden:",
    adult_child_has_disability_before_25: "Hat das Kind eine Behinderung, die vor dem 25. Lebensjahr eingetreten ist?",
    child_kindergeld_already_applied_or_received: "Wurde für dieses Kind bereits Kindergeld beantragt oder bezogen?",
    previous_kindergeld_person_name: "Wer hat Kindergeld beantragt oder bezogen?",
    previous_kindergeld_person_birth_date: "Geburtsdatum dieser Person:",
    previous_kindergeld_period: "Zeitraum des Bezugs / Antrags auf Kindergeld:",
    previous_kindergeld_familienkasse_address: "Familienkasse und Anschrift:",
    previous_kindergeld_number: "Kindergeldnummer, falls bekannt:",
    public_service_employment_exists: "Arbeiten oder arbeiteten Sie oder die Person aus Punkt 2 im öffentlichen Dienst?",
    public_service_federal_institution: "Wird die Tätigkeit bei einer Einrichtung des Bundes ausgeübt?",
    public_service_ba_or_jobcenter: "Wird die Tätigkeit bei der Bundesagentur für Arbeit oder einem Jobcenter ausgeübt?",
    public_service_person_name: "Person im öffentlichen Dienst: Nachname und Vorname:",
    public_service_person_birth_date: "Person im öffentlichen Dienst: Geburtsdatum:",
    foreign_child_benefit_claim_exists: "Bestand oder besteht ein Anspruch auf Familienleistungen aus dem Ausland oder von einer zwischenstaatlichen Einrichtung?",
    foreign_benefit_person_name: "Wer erhält / erhielt die ausländische Leistung?",
    foreign_benefit_person_birth_date: "Geburtsdatum der empfangenden Person:",
    foreign_benefit_name: "Name der Leistung:",
    foreign_benefit_monthly_amount: "Monatlicher Betrag der Leistung in Euro:",
    foreign_benefit_period: "Zeitraum der Leistung:",
    foreign_benefit_provider_address: "Stelle/Behörde, die die Leistung zahlt, und Anschrift:",
    foreign_benefit_reference_number: "Aktenzeichen / Geschäftszeichen:",
    foreign_work_employee_self_employed: "Waren Sie im Ausland angestellt oder selbständig tätig?",
    foreign_state_or_nato_employment: "Waren Sie im Ausland bei einer staatlichen Einrichtung oder NATO-Organisation tätig?",
    posted_worker_foreign_employer: "Wurden Sie von einem ausländischen Arbeitgeber entsandt?",
    foreign_work_person_name: "Nachname und Vorname der Person, die im Ausland tätig war:",
    foreign_work_period: "Zeitraum der Tätigkeit im Ausland:",
    foreign_work_employer_name: "Name des Arbeitgebers im Ausland:",
    foreign_work_employer_address: "Anschrift des Arbeitgebers im Ausland:",
    foreign_work_country_place: "Land und Ort der Tätigkeit im Ausland:",
    ank_signature_date: "Datum der Unterschrift:"
  },
  uk: {
    kindergeld_number: "Номер Kindergeld, якщо вже є:",
    daytime_phone: "Телефон для зворотного зв'язку вдень:",
    attached_child_forms_count: "Скільки додатків Anlage Kind додано?",
    applicant_tax_id: "Steuer-ID заявника/заявниці:",
    applicant_last_name: "Прізвище заявника/заявниці:",
    applicant_title: "Титул заявника/заявниці, якщо є:",
    applicant_first_name: "Ім'я заявника/заявниці:",
    applicant_previous_name: "Прізвище при народженні / попереднє прізвище, якщо є:",
    applicant_birth_date: "Дата народження заявника/заявниці:",
    applicant_birth_place: "Місце народження заявника/заявниці:",
    applicant_gender: "Стать заявника/заявниці (m/w/d):",
    applicant_nationality: "Громадянство заявника/заявниці:",
    applicant_address: "Повна адреса заявника/заявниці:",
    applicant_marital_status: "Сімейний стан:",
    applicant_marital_status_since: "З якої дати діє цей сімейний стан?",
    partner_exists: "Є чоловік/дружина, партнер або інший з батьків у спільному домогосподарстві?",
    partner_tax_id: "Steuer-ID другого з батьків / чоловіка або дружини:",
    partner_last_name: "Прізвище другого з батьків / чоловіка або дружини:",
    partner_first_name: "Ім'я другого з батьків / чоловіка або дружини:",
    partner_title: "Титул другого з батьків / чоловіка або дружини:",
    partner_birth_date: "Дата народження другого з батьків / чоловіка або дружини:",
    partner_nationality: "Громадянство другого з батьків / чоловіка або дружини:",
    partner_gender: "Стать другого з батьків / чоловіка або дружини (m/w/d):",
    partner_previous_name: "Попереднє прізвище другого з батьків / чоловіка або дружини:",
    partner_address: "Адреса другого з батьків / чоловіка або дружини, якщо відрізняється:",
    payment_iban: "IBAN для виплати Kindergeld:",
    payment_bic: "BIC, якщо потрібен:",
    payment_bank_name: "Назва банку:",
    payment_account_holder_type: "Кому належить рахунок?",
    payment_account_holder_name: "Прізвище та ім'я власника рахунку:",
    notice_recipient_enabled: "Bescheid має бути надісланий не вам, а іншій особі?",
    notice_recipient_last_name: "Прізвище отримувача Bescheid:",
    notice_recipient_first_name: "Ім'я отримувача Bescheid:",
    notice_recipient_address: "Адреса отримувача Bescheid:",
    already_receives_kindergeld: "Ви вже отримуєте Kindergeld на інших дітей?",
    other_person_receives_kindergeld: "Є ваші діти, за яких Kindergeld отримує інша особа?",
    application_signature_date: "Дата підпису заяви:",
    partner_consent_signature_date: "Дата підпису другого з батьків / партнера:",
    ank_applicant_full_name: "Прізвище та ім'я заявника/заявниці:",
    ank_kindergeld_number: "Номер Kindergeld, якщо вже є:",
    ank_application_date: "Дата заяви на Kindergeld:",
    ank_child_number: "Порядковий номер дитини:",
    child_tax_id: "Steuer-ID дитини:",
    child_last_name: "Прізвище дитини:",
    child_title: "Титул дитини, якщо є:",
    child_first_name: "Ім'я дитини:",
    child_birth_name: "Прізвище дитини при народженні, якщо відрізняється:",
    child_birth_date: "Дата народження дитини:",
    child_birth_place: "Місце народження дитини:",
    child_gender: "Стать дитини (m/w/d):",
    child_nationality: "Громадянство дитини:",
    child_same_address: "Дитина проживає за тією самою адресою, що й заявник/заявниця?",
    child_different_address: "Адреса дитини, якщо відрізняється:",
    child_different_address_reason: "Причина іншої адреси дитини:",
    child_relationship_to_applicant: "Ким дитина є для заявника/заявниці?",
    child_relationship_to_partner: "Ким дитина є для чоловіка/дружини або партнера?",
    child_relationship_to_other_person: "Є інша особа, з якою дитина перебуває у родинному зв'язку?",
    other_person_info_needed: "Потрібно заповнити дані іншої особи?",
    other_person_last_name: "Інша особа: прізвище:",
    other_person_first_name: "Інша особа: ім'я:",
    other_person_birth_date: "Інша особа: дата народження:",
    other_person_last_known_address: "Інша особа: остання відома адреса:",
    other_person_nationality: "Інша особа: громадянство:",
    other_person_additional_info: "Додаткові дані про іншу особу:",
    child_is_adult_or_soon_18: "Дитині вже 18 років або скоро виповниться 18?",
    adult_child_proofs_status: "Що з підтвердними документами для дитини 18+?",
    adult_child_situation: "Яка ситуація стосується дитини?",
    adult_child_school_training_name: "Назва навчання / школи / університету / Ausbildung:",
    adult_child_school_training_from: "Навчання: з якої дати?",
    adult_child_school_training_to: "Навчання: до якої дати?",
    adult_child_other_training_name: "Назва іншого Ausbildungsmaßnahme:",
    adult_child_other_training_from: "Інше Ausbildungsmaßnahme: з якої дати?",
    adult_child_other_training_to: "Інше Ausbildungsmaßnahme: до якої дати?",
    adult_child_no_training_place_from: "Немає місця Ausbildung: з якої дати?",
    adult_child_no_training_place_to: "Немає місця Ausbildung: до якої дати?",
    adult_child_voluntary_service_from: "Добровільна служба: з якої дати?",
    adult_child_voluntary_service_to: "Добровільна служба: до якої дати?",
    adult_child_transition_from: "Перехідний період: з якої дати?",
    adult_child_transition_to: "Перехідний період: до якої дати?",
    adult_child_jobseeker_from: "Зареєстрований/зареєстрована як шукач роботи: з якої дати?",
    adult_child_jobseeker_to: "Зареєстрований/зареєстрована як шукач роботи: до якої дати?",
    adult_child_has_completed_training_or_degree: "Дитина вже завершила Ausbildung або Studium?",
    adult_child_degree_name: "Який Berufsabschluss / Studienabschluss було отримано?",
    adult_child_training_end_date: "Дата завершення Ausbildung / Studium:",
    adult_child_career_goal_if_different: "Професійна мета, якщо вона відрізняється від отриманої освіти:",
    adult_child_is_employed: "Дитина працювала, працює або буде працювати?",
    adult_child_employment_type_1: "Який вид зайнятості має дитина?",
    adult_child_employment_1_from: "Робота 1: з якої дати?",
    adult_child_employment_1_to: "Робота 1: до якої дати?",
    adult_child_employer_1_name_address: "Роботодавець 1: назва та адреса:",
    adult_child_has_second_employment: "Є друга/додаткова зайнятість?",
    adult_child_employment_2_from: "Робота 2: з якої дати?",
    adult_child_employment_2_to: "Робота 2: до якої дати?",
    adult_child_employer_2_name_address: "Роботодавець 2: назва та адреса:",
    adult_child_weekly_working_hours: "Загальна регулярна тижнева зайнятість у годинах:",
    adult_child_has_disability_before_25: "У дитини є інвалідність, яка настала до 25 років?",
    child_kindergeld_already_applied_or_received: "На цю дитину вже подавали заяву або отримували Kindergeld?",
    previous_kindergeld_person_name: "Хто подавав заяву або отримував Kindergeld?",
    previous_kindergeld_person_birth_date: "Дата народження цієї особи:",
    previous_kindergeld_period: "Період отримання / заяви на Kindergeld:",
    previous_kindergeld_familienkasse_address: "Familienkasse та адреса:",
    previous_kindergeld_number: "Kindergeldnummer, якщо відомий:",
    public_service_employment_exists: "Ви або особа з пункту 2 працюєте/працювали в öffentlichen Dienst?",
    public_service_federal_institution: "Робота виконується у федеральній установі?",
    public_service_ba_or_jobcenter: "Робота виконується у Bundesagentur für Arbeit або Jobcenter?",
    public_service_person_name: "Особа в öffentlichen Dienst: прізвище та ім'я:",
    public_service_person_birth_date: "Особа в öffentlichen Dienst: дата народження:",
    foreign_child_benefit_claim_exists: "Було або є право на виплати на дитину з-за кордону або від міжнародної організації?",
    foreign_benefit_person_name: "Хто отримує / отримував іноземну виплату?",
    foreign_benefit_person_birth_date: "Дата народження отримувача виплати:",
    foreign_benefit_name: "Назва виплати:",
    foreign_benefit_monthly_amount: "Щомісячна сума виплати в євро:",
    foreign_benefit_period: "Період виплати:",
    foreign_benefit_provider_address: "Організація/відомство, яке виплачує, та адреса:",
    foreign_benefit_reference_number: "Aktenzeichen / номер справи:",
    foreign_work_employee_self_employed: "Ви працювали за наймом або були самозайняті за кордоном?",
    foreign_state_or_nato_employment: "Ви працювали в державній установі або організації НАТО за кордоном?",
    posted_worker_foreign_employer: "Вас направляв у відрядження іноземний роботодавець?",
    foreign_work_person_name: "Прізвище та ім'я особи, яка працювала за кордоном:",
    foreign_work_period: "Період роботи за кордоном:",
    foreign_work_employer_name: "Назва роботодавця за кордоном:",
    foreign_work_employer_address: "Адреса роботодавця за кордоном:",
    foreign_work_country_place: "Країна та місце роботи за кордоном:",
    ank_signature_date: "Дата підпису:"
  }
};

const dynamicFieldLabels = {
  de: [
    [/^existing_child_(\d+)_name$/, (n) => `Kind ${n}: Vor- und Nachname:`],
    [/^existing_child_(\d+)_birth_date$/, (n) => `Kind ${n}: Geburtsdatum:`],
    [/^existing_child_(\d+)_gender$/, (n) => `Kind ${n}: Geschlecht (m/w/d):`],
    [/^existing_child_(\d+)_familienkasse_number$/, (n) => `Kind ${n}: Familienkasse / Kindergeldnummer:`],
    [/^other_child_(\d+)_name$/, (n) => `Anderes Kind ${n}: Vor- und Nachname:`],
    [/^other_child_(\d+)_birth_date$/, (n) => `Anderes Kind ${n}: Geburtsdatum:`],
    [/^other_child_(\d+)_gender$/, (n) => `Anderes Kind ${n}: Geschlecht (m/w/d):`],
    [/^other_child_(\d+)_receiver_name$/, (n) => `Wer erhält Kindergeld für Kind ${n}?`],
    [/^other_child_(\d+)_familienkasse_number$/, (n) => `Familienkasse / Kindergeldnummer von Kind ${n}:`]
  ],
  uk: [
    [/^existing_child_(\d+)_name$/, (n) => `Дитина ${n}: ім'я та прізвище:`],
    [/^existing_child_(\d+)_birth_date$/, (n) => `Дитина ${n}: дата народження:`],
    [/^existing_child_(\d+)_gender$/, (n) => `Дитина ${n}: стать (m/w/d):`],
    [/^existing_child_(\d+)_familienkasse_number$/, (n) => `Дитина ${n}: Familienkasse / Kindergeldnummer:`],
    [/^other_child_(\d+)_name$/, (n) => `Інша дитина ${n}: ім'я та прізвище:`],
    [/^other_child_(\d+)_birth_date$/, (n) => `Інша дитина ${n}: дата народження:`],
    [/^other_child_(\d+)_gender$/, (n) => `Інша дитина ${n}: стать (m/w/d):`],
    [/^other_child_(\d+)_receiver_name$/, (n) => `Хто отримує Kindergeld за дитину ${n}?`],
    [/^other_child_(\d+)_familienkasse_number$/, (n) => `Familienkasse / Kindergeldnummer дитини ${n}:`]
  ]
};

const commonOptionLabels = {
  de: {
    yes: "Ja",
    no: "Nein",
    single: "Ledig",
    married: "Verheiratet",
    registered_partnership: "Eingetragene Lebenspartnerschaft",
    divorced: "Geschieden",
    dissolved_partnership: "Lebenspartnerschaft aufgehoben",
    widowed: "Verwitwet",
    permanently_separated: "Dauernd getrennt lebend",
    applicant: "Antragstellende Person",
    other: "Andere Person",
    biological_child: "Leibliches Kind",
    adopted_child: "Adoptiertes Kind",
    foster_child: "Pflegekind",
    stepchild: "Stiefkind",
    grandchild: "Enkelkind",
    attached: "Nachweise sind beigefügt",
    already_submitted: "Wurden bereits früher eingereicht",
    will_submit_later: "Werden später nachgereicht",
    school_university_training: "Schule / Hochschule / Berufsausbildung",
    other_training_measure: "Andere Ausbildungsmaßnahme / Praktikum / Au-pair",
    no_training_place: "Kann Ausbildung mangels Ausbildungsplatz nicht beginnen/fortsetzen",
    voluntary_service: "Freiwilligendienst FSJ/BFD usw.",
    transition_period: "Übergangszeit bis zu 4 Monaten",
    jobseeker_registered: "Als arbeitssuchend gemeldet",
    minijob: "Minijob / geringfügige Beschäftigung",
    other_employment: "Andere Beschäftigung"
  },
  uk: {
    yes: "Так",
    no: "Ні",
    single: "Неодружений / незаміжня",
    married: "Одружений / заміжня",
    registered_partnership: "Зареєстроване партнерство",
    divorced: "Розлучений/розлучена",
    dissolved_partnership: "Партнерство припинено",
    widowed: "Вдівець / вдова",
    permanently_separated: "Постійно проживаємо окремо",
    applicant: "Заявник/заявниця",
    other: "Інша особа",
    biological_child: "Рідна дитина",
    adopted_child: "Усиновлена дитина",
    foster_child: "Прийомна дитина",
    stepchild: "Пасинок / падчерка",
    grandchild: "Онук / онука",
    attached: "Документи додано",
    already_submitted: "Вже були подані раніше",
    will_submit_later: "Будуть надіслані пізніше",
    school_university_training: "Школа / університет / Berufsausbildung",
    other_training_measure: "Інше Ausbildungsmaßnahme / практика / Au-pair",
    no_training_place: "Не може почати/продовжити Ausbildung через відсутність місця",
    voluntary_service: "Добровільна служба FSJ/BFD тощо",
    transition_period: "Перехідний період до 4 місяців",
    jobseeker_registered: "Зареєстрований/зареєстрована як шукач роботи",
    minijob: "Minijob / незначна зайнятість",
    other_employment: "Інша робота"
  }
};

const optionOverrides = {
  de: {
    "notice_recipient_enabled:no": "Nein, an mich",
    "notice_recipient_enabled:yes": "Ja, an eine andere Person",
    "child_same_address:no": "Nein, die Anschrift ist abweichend",
    "child_relationship_to_partner:none": "Trifft nicht zu / kein Partner vorhanden",
    "child_relationship_to_other_person:none": "Nicht angeben"
  },
  uk: {
    "notice_recipient_enabled:no": "Ні, мені",
    "notice_recipient_enabled:yes": "Так, іншій особі",
    "child_same_address:no": "Ні, адреса відрізняється",
    "child_relationship_to_partner:none": "Не стосується / партнера немає",
    "child_relationship_to_other_person:none": "Не вказувати"
  }
};

function getDynamicFieldLabel(language, fieldKey) {
  for (const [pattern, buildLabel] of dynamicFieldLabels[language] || []) {
    const match = fieldKey.match(pattern);
    if (match) return buildLabel(match[1]);
  }

  return null;
}

function getFieldLabel(language, field) {
  const fieldKey = field.originalKey || field.key;
  return fieldLabels[language]?.[fieldKey] || getDynamicFieldLabel(language, fieldKey);
}

function getOptionLabel(language, fieldKey, value) {
  return optionOverrides[language]?.[`${fieldKey}:${value}`] || commonOptionLabels[language]?.[value];
}

export function applyKindergeldTranslations(form) {
  for (const section of form.sections || []) {
    for (const language of supportedLanguages) {
      const sectionKey = section.originalKey || section.key;
      const title = sectionTitles[language]?.[sectionKey];
      if (title) {
        const prefix = section.repeatIndex
          ? language === "de"
            ? `Kind ${section.repeatIndex} - `
            : `Дитина ${section.repeatIndex} - `
          : "";
        section[`title_${language}`] = `${prefix}${title}`;
      }
    }

    if (section.repeatIndex && section.title_ru) {
      section.title_ru = `Ребёнок ${section.repeatIndex} - ${section.title_ru}`;
    }
  }

  for (const field of form.fields || []) {
    for (const language of supportedLanguages) {
      const label = getFieldLabel(language, field);
      if (label) field[`label_${language}`] = label;

      for (const option of field.options || []) {
        const optionLabel = getOptionLabel(language, field.originalKey || field.key, option.value);
        if (optionLabel) option[`label_${language}`] = optionLabel;
      }
    }

    for (const language of SUPPORTED_FORM_LANGUAGES) {
      const helpKey = `help_${language}`;
      const label = field[`label_${language}`] || field.label_ru || field.key;
      field[helpKey] = buildGenericFieldHelp(field, language, label);
    }
  }

  return form;
}
