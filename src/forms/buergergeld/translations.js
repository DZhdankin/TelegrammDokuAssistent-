import { SUPPORTED_FORM_LANGUAGES, buildGenericFieldHelp } from "../../services/formHelpBuilder.js";

const sectionTitles = {
  de: {
    A: "🏠 Persönliche Daten",
    B: "📝 Antragstellung",
    C: "👨‍👩‍👧 Lebenssituation",
    D: "⚠️ Besondere Umstände",
    E: "💊 Kranken- und Pflegeversicherung",
    F: "🏡 Wohnsituation",
    G: "📎 Erforderliche Anlagen",
    H: "✍️ Bemerkungen und Unterschrift"
  },
  uk: {
    A: "🏠 Особисті дані",
    B: "📝 Подання заяви",
    C: "👨‍👩‍👧 Життєва ситуація",
    D: "⚠️ Особливі обставини",
    E: "💊 Медичне та соціальне страхування",
    F: "🏡 Житлові умови",
    G: "📎 Необхідні додатки",
    H: "✍️ Примітки та підпис"
  }
};

const fieldLabels = {
  de: {
    vorname: "Geben Sie den Vornamen ein:",
    nachname: "Geben Sie den Nachnamen ein:",
    geburtsdatum: "Geben Sie das Geburtsdatum ein (TT.MM.JJJJ):",
    geburtsname_changed: "Hat sich Ihr Nachname geändert?",
    geburtsname: "Geben Sie den Geburtsnamen ein:",
    geburtsort: "Geben Sie den Geburtsort ein:",
    geburtsland: "Geben Sie das Geburtsland ein:",
    staatsangehoerigkeit: "Geben Sie die Staatsangehörigkeit ein:",
    geschlecht: "Wählen Sie das Geschlecht:",
    strasse: "Geben Sie die Straße ein:",
    hausnummer: "Geben Sie die Hausnummer ein:",
    plz: "Geben Sie die Postleitzahl (PLZ) ein:",
    wohnort: "Geben Sie den Wohnort ein:",
    postfachanschrift: "Geben Sie die Postfachanschrift ein, falls vorhanden:",
    telefon: "Geben Sie die Telefonnummer ein (freiwillig):",
    kein_fester_wohnsitz: "Haben Sie eine feste Wohnanschrift in Deutschland?",
    wohnhaft_bei: "Falls Sie bei jemandem wohnen: Name und Anschrift",
    has_bank_account: "Haben Sie ein Bankkonto (IBAN)?",
    kontoinhaber: "Geben Sie den Kontoinhaber ein:",
    iban: "IBAN (kann übersprungen und später manuell eingetragen werden)",
    has_rentenversicherung: "Haben Sie eine Sozial-/Rentenversicherungsnummer?",
    rentenversicherung_number: "Geben Sie die Sozial-/Rentenversicherungsnummer ein:",
    has_guardian: "Gibt es einen offiziellen Vormund oder Betreuer?",
    einreise_date: "Einreisedatum nach Deutschland (TT.MM.JJJJ), falls erforderlich:",
    has_residence_permit: "Haben Sie einen gültigen Aufenthaltstitel?",
    has_verpflichtung: "Gab es eine Verpflichtungserklärung?",
    familienstand: "Wählen Sie den Familienstand:",
    familienstand_date: "Datum, falls getrennt lebend / geschieden / verwitwet (TT.MM.JJJJ):",
    antrag_ab: "Ab wann möchten Sie Bürgergeld erhalten?",
    antrag_date: "Geben Sie das Datum ein (TT.MM.JJJJ):",
    isAbleToWork: "Sind Sie erwerbsfähig? (mindestens 3 Stunden täglich)",
    isStudentOrTrainee: "Sind Sie Schüler, Student oder in Ausbildung?",
    hasSchoolCosts: "Gibt es Ausgaben für Schulbücher oder Hefte?",
    isAccommodatedDuringTraining: "Wohnen Sie während der Ausbildung getrennt (Wohnheim/Internat usw.)?",
    isUnder18or18to24: "Sind Sie unter 18 oder zwischen 18 und 24 Jahre alt?",
    parentLivesOutsideBG: "Lebt ein Elternteil getrennt und gehört nicht zu Ihrer Bedarfsgemeinschaft?",
    hasOrWillStartTraining: "Machen Sie eine Ausbildung oder planen Sie, eine zu beginnen?",
    receivesAsylumBenefits: "Erhalten Sie Leistungen nach dem Asylbewerberleistungsgesetz?",
    asylumBenefitsUntil: "Bis zu welchem Datum erhalten Sie diese Leistungen? (TT.MM.JJJJ) Wenn unbekannt, kann „-“ angegeben werden",
    personIdNumber: "Geben Sie die Personenidentifikationsnummer ein, falls vorhanden, sonst „-“:",
    azrNumber: "Geben Sie die AZR-Nummer ein, falls vorhanden, sonst „-“:",
    receivedBenefitsLast3Years: "Haben Sie in den letzten 3 Jahren Bürgergeld/Sozialhilfe erhalten?",
    benefitType: "Geben Sie die Art der Leistung an (z. B. Bürgergeld / Sozialhilfe). Falls keine, „-“",
    benefitsPeriodFrom: "Zeitraum des Leistungsbezugs: von (TT.MM.JJJJ), falls keiner, „-“",
    benefitsPeriodTo: "Zeitraum des Leistungsbezugs: bis (TT.MM.JJJJ), falls keiner, „-“",
    benefitProviderName: "Name des Leistungsträgers, falls keiner, „-“",
    benefitProviderStreet: "Straße des Leistungsträgers, falls keiner, „-“",
    benefitProviderHouseNumber: "Hausnummer des Leistungsträgers, falls keiner, „-“",
    benefitProviderPostalCode: "PLZ des Leistungsträgers, falls keiner, „-“",
    benefitProviderCity: "Ort des Leistungsträgers, falls keiner, „-“",
    wasEmployedLast5Years: "Waren Sie in den letzten 5 Jahren beschäftigt?",
    employmentPeriodFrom1: "Beschäftigungszeitraum (1): von (TT.MM.JJJJ)",
    employmentPeriodTo1: "Beschäftigungszeitraum (1): bis (TT.MM.JJJJ)",
    employmentPeriodFrom2: "Beschäftigungszeitraum (2): von (TT.MM.JJJJ), falls keiner, „-“",
    employmentPeriodTo2: "Beschäftigungszeitraum (2): bis (TT.MM.JJJJ), falls keiner, „-“",
    hasUnpaidWageClaims: "Gibt es offene Lohnansprüche gegen einen aktuellen oder früheren Arbeitgeber?",
    employerName: "Name des Arbeitgebers oder früheren Arbeitgebers, falls keiner, „-“",
    employerStreet: "Straße des Arbeitgebers, falls keiner, „-“",
    employerHouseNumber: "Hausnummer des Arbeitgebers, falls keiner, „-“",
    employerPostalCode: "PLZ des Arbeitgebers, falls keiner, „-“",
    employerCity: "Ort des Arbeitgebers, falls keiner, „-“",
    wasSelfEmployed: "Waren Sie in den letzten 5 Jahren selbständig oder freiberuflich tätig?",
    receivedWageReplacementBenefits: "Haben Sie Entgeltersatzleistungen wie Krankengeld, Arbeitslosengeld oder Elterngeld erhalten?",
    wageReplacementBenefitType: "Geben Sie die Art der Leistung an (z. B. Krankengeld / Arbeitslosengeld / Elterngeld):",
    wageReplacementPeriodFrom: "Zeitraum dieser Leistung: von (TT.MM.JJJJ)",
    wageReplacementPeriodTo: "Zeitraum dieser Leistung: bis (TT.MM.JJJJ)",
    didMilitaryOrVolunteerService: "Haben Sie Wehrdienst oder Freiwilligendienst (FSJ/BFD) geleistet?",
    caredForRelatives: "Haben Sie Angehörige gepflegt (Pflege nach SGB XI)?",
    howSupportedYourselfLast5Years: "Falls keine der Aussagen für die letzten 5 Jahre passt: Beschreiben Sie, wie Sie Ihren Lebensunterhalt bestritten haben:",
    appliedForOtherBenefits: "Haben Sie andere Leistungen beantragt oder planen Sie einen Antrag?",
    otherBenefitsList: "Welche Leistungen haben Sie beantragt oder möchten Sie beantragen? (Mehrfachauswahl möglich)",
    otherBenefitsOtherText: "Falls „Sonstiges“ ausgewählt wurde: bitte genauer angeben:",
    healthDamageByThirdParty: "Gab es eine Gesundheitsschädigung durch Dritte (Unfall, ärztlicher Fehler usw.)?",
    claimsAgainstThirdParties: "Haben Sie Ansprüche gegen Dritte (z. B. Entschädigung oder Erbschaft)?",
    isSingleParent: "Erziehen Sie ein Kind oder mehrere Kinder allein?",
    isPregnant: "Sind Sie schwanger?",
    expectedDueDate: "Geben Sie den voraussichtlichen Geburtstermin ein (TT.MM.JJJJ):",
    needsExpensiveDiet: "Benötigen Sie aus medizinischen Gründen kostenaufwändige Ernährung?",
    hasDisability: "Haben Sie eine Behinderung?",
    receivesParticipationWorkBenefits: "Erhalten Sie Leistungen zur Teilhabe am Arbeitsleben oder Eingliederungshilfen?",
    hasSpecialUnavoidableNeed: "Gibt es einen unabweisbaren besonderen Bedarf, der nicht durch Einsparungen gedeckt werden kann?",
    isInStationaryFacility: "Befinden Sie sich jetzt oder bald in einer stationären Einrichtung (z. B. Krankenhaus, Pflegeheim, JVA)?",
    stationaryFacilityType: "Falls stationär: Art der Einrichtung angeben (z. B. Krankenhaus, Altenheim, JVA):",
    stationaryStayFrom: "Beginn des Aufenthalts (von) (TT.MM.JJJJ):",
    stationaryStayTo: "Ende des Aufenthalts (bis) (TT.MM.JJJJ):",
    wasStatutoryInsured: "Waren oder sind Sie gesetzlich kranken-/pflegeversichert?",
    healthInsuranceName: "Name Ihrer Krankenkasse (z. B. AOK, TK, Barmer):",
    healthInsuranceNumber: "Versichertennummer, falls bekannt:",
    wantsToChangeHealthInsurance: "Möchten Sie mit Beginn des Bürgergeldbezugs die Krankenkasse wechseln?",
    isPrivatelyOrVoluntaryOrUninsured: "Sind Sie privat, freiwillig gesetzlich oder gar nicht krankenversichert?",
    lives_alone: "Wohnen Sie allein?",
    lives_with_people: "Mit wem wohnen Sie zusammen? (Mehrfachauswahl möglich)",
    needs_housing_heating: "Haben Sie Kosten für Unterkunft und Heizung?",
    warmwater_decentral: "Wird Warmwasser dezentral erzeugt (Boiler/Durchlauferhitzer)?",
    signature_date_1: "Datum (84), z. B. 16.01.2026",
    signature_date_2: "Datum (86), falls Vormund/Vertreter vorhanden, sonst überspringen"
  },
  uk: {
    vorname: "Введіть ім’я:",
    nachname: "Введіть прізвище:",
    geburtsdatum: "Введіть дату народження (ДД.ММ.РРРР):",
    geburtsname_changed: "Ваше прізвище змінювалося?",
    geburtsname: "Введіть прізвище при народженні:",
    geburtsort: "Введіть місце народження (місто):",
    geburtsland: "Введіть країну народження:",
    staatsangehoerigkeit: "Введіть громадянство:",
    geschlecht: "Оберіть стать:",
    strasse: "Введіть вулицю:",
    hausnummer: "Введіть номер будинку:",
    plz: "Введіть поштовий індекс (PLZ):",
    wohnort: "Введіть місто проживання:",
    postfachanschrift: "Введіть Postfachanschrift, якщо є:",
    telefon: "Введіть номер телефону (необов’язково):",
    kein_fester_wohnsitz: "У вас є постійна адреса проживання в Німеччині?",
    wohnhaft_bei: "Якщо проживаєте у когось: ім’я та адреса",
    has_bank_account: "Є банківський рахунок (IBAN)?",
    kontoinhaber: "Введіть власника банківського рахунку:",
    iban: "IBAN (можна пропустити й вписати вручну)",
    has_rentenversicherung: "Є номер Sozial-/Rentenversicherung?",
    rentenversicherung_number: "Введіть номер Sozial-/Rentenversicherung:",
    has_guardian: "Є офіційний опікун / Vormund / Betreuer?",
    einreise_date: "Дата в’їзду до Німеччини (ДД.ММ.РРРР), якщо потрібно:",
    has_residence_permit: "Є чинний дозвіл на проживання (Aufenthaltstitel)?",
    has_verpflichtung: "Була Verpflichtungserklärung (поручительство/зобов’язання)?",
    familienstand: "Оберіть сімейний стан:",
    familienstand_date: "Дата, якщо проживаєте окремо / розлучені / вдівець або вдова (ДД.ММ.РРРР):",
    antrag_ab: "З якого моменту ви хочете отримувати Bürgergeld?",
    antrag_date: "Введіть дату (ДД.ММ.РРРР):",
    isAbleToWork: "Ви працездатні? (можете працювати щонайменше 3 години на день)",
    isStudentOrTrainee: "Ви школяр/студент або проходите Ausbildung?",
    hasSchoolCosts: "Є витрати на шкільні підручники або зошити?",
    isAccommodatedDuringTraining: "Під час навчання ви проживаєте окремо (гуртожиток/інтернат тощо)?",
    isUnder18or18to24: "Вам менше 18 років або від 18 до 24 років?",
    parentLivesOutsideBG: "Один із батьків живе окремо і не входить до вашої Bedarfsgemeinschaft?",
    hasOrWillStartTraining: "Ви проходите або плануєте почати навчання / Ausbildung?",
    receivesAsylumBenefits: "Ви отримуєте виплати за Asylbewerberleistungsgesetz?",
    asylumBenefitsUntil: "До якої дати ви отримуєте ці виплати? (ДД.ММ.РРРР) Якщо невідомо, можна вказати «-»",
    personIdNumber: "Введіть Personenidentifikationsnummer, якщо є, інакше «-»:",
    azrNumber: "Введіть AZR-номер, якщо є, інакше «-»:",
    receivedBenefitsLast3Years: "За останні 3 роки ви вже отримували Bürgergeld/Sozialhilfe?",
    benefitType: "Вкажіть вид виплати (наприклад Bürgergeld / Sozialhilfe). Якщо не було, «-»",
    benefitsPeriodFrom: "Період отримання виплат: з (ДД.ММ.РРРР), якщо не було, «-»",
    benefitsPeriodTo: "Період отримання виплат: до (ДД.ММ.РРРР), якщо не було, «-»",
    benefitProviderName: "Назва організації (Leistungsträger), якщо не було, «-»",
    benefitProviderStreet: "Вулиця організації (Leistungsträger), якщо не було, «-»",
    benefitProviderHouseNumber: "Номер будинку організації (Leistungsträger), якщо не було, «-»",
    benefitProviderPostalCode: "PLZ організації (Leistungsträger), якщо не було, «-»",
    benefitProviderCity: "Місто організації (Leistungsträger), якщо не було, «-»",
    wasEmployedLast5Years: "За останні 5 років ви працювали за наймом?",
    employmentPeriodFrom1: "Період роботи (1): з (ДД.ММ.РРРР)",
    employmentPeriodTo1: "Період роботи (1): до (ДД.ММ.РРРР)",
    employmentPeriodFrom2: "Період роботи (2): з (ДД.ММ.РРРР), якщо не було, «-»",
    employmentPeriodTo2: "Період роботи (2): до (ДД.ММ.РРРР), якщо не було, «-»",
    hasUnpaidWageClaims: "Є невиплачені зарплатні вимоги до нинішнього або колишнього роботодавця?",
    employerName: "Назва роботодавця або колишнього роботодавця, якщо не працювали, «-»",
    employerStreet: "Вулиця роботодавця, якщо не працювали, «-»",
    employerHouseNumber: "Номер будинку роботодавця, якщо не працювали, «-»",
    employerPostalCode: "PLZ роботодавця, якщо не працювали, «-»",
    employerCity: "Місто роботодавця, якщо не працювали, «-»",
    wasSelfEmployed: "За останні 5 років ви були самозайнятим або фрилансером?",
    receivedWageReplacementBenefits: "Ви отримували виплати типу Krankengeld / Arbeitslosengeld / Elterngeld тощо?",
    wageReplacementBenefitType: "Вкажіть вид виплати (наприклад Krankengeld / Arbeitslosengeld / Elterngeld):",
    wageReplacementPeriodFrom: "Період отримання цієї виплати: з (ДД.ММ.РРРР)",
    wageReplacementPeriodTo: "Період отримання цієї виплати: до (ДД.ММ.РРРР)",
    didMilitaryOrVolunteerService: "Ви проходили військову або добровільну службу (FSJ/BFD)?",
    caredForRelatives: "Ви доглядали за родичами (Pflege nach SGB XI)?",
    howSupportedYourselfLast5Years: "Якщо жодне твердження за останні 5 років не підходить: опишіть, як ви забезпечували себе:",
    appliedForOtherBenefits: "Ви вже подавали на інші виплати або плануєте подати?",
    otherBenefitsList: "Які виплати ви подали або хочете подати? (можна обрати кілька)",
    otherBenefitsOtherText: "Якщо обрали «Sonstiges», вкажіть які саме:",
    healthDamageByThirdParty: "Ви отримали шкоду здоров’ю з вини третіх осіб (ДТП/нещасний випадок/помилка лікаря тощо)?",
    claimsAgainstThirdParties: "У вас є вимоги до третіх осіб (наприклад компенсація/спадщина)?",
    isSingleParent: "Ви виховуєте дитину/дітей самостійно?",
    isPregnant: "Ви вагітні?",
    expectedDueDate: "Введіть очікувану дату пологів (ДД.ММ.РРРР):",
    needsExpensiveDiet: "Вам потрібна спеціальна дорога дієта з медичних причин?",
    hasDisability: "У вас є інвалідність (Behinderung)?",
    receivesParticipationWorkBenefits: "Ви отримуєте допомогу для участі в трудовому житті або Eingliederungshilfen?",
    hasSpecialUnavoidableNeed: "У вас є особлива неминуча потреба, яку не можна покрити економією?",
    isInStationaryFacility: "Ви зараз або незабаром перебуватимете у стаціонарній установі (лікарня, будинок догляду, JVA)?",
    stationaryFacilityType: "Якщо ви у стаціонарі: вкажіть тип установи:",
    stationaryStayFrom: "Дата початку перебування (von) (ДД.ММ.РРРР):",
    stationaryStayTo: "Дата закінчення перебування (bis) (ДД.ММ.РРРР):",
    wasStatutoryInsured: "Ви зараз або раніше були застраховані в державному медичному/доглядовому страхуванні?",
    healthInsuranceName: "Назва вашої Krankenkasse (наприклад AOK, TK, Barmer):",
    healthInsuranceNumber: "Номер страхування, якщо відомий:",
    wantsToChangeHealthInsurance: "Хочете змінити Krankenkasse з початком отримання Bürgergeld?",
    isPrivatelyOrVoluntaryOrUninsured: "Ви застраховані приватно / добровільно в державній страховці або не застраховані?",
    lives_alone: "Ви живете один/одна?",
    lives_with_people: "З ким ви проживаєте? (можна обрати кілька)",
    needs_housing_heating: "Є витрати на житло та опалення?",
    warmwater_decentral: "Тепла вода виробляється децентралізовано (бойлер/проточний нагрівач)?",
    signature_date_1: "Дата (84), наприклад 16.01.2026",
    signature_date_2: "Дата (86), якщо є опікун/представник, інакше пропустити"
  }
};

const commonOptionLabels = {
  de: {
    yes: "Ja",
    no: "Nein",
    maennlich: "Männlich",
    weiblich: "Weiblich",
    divers: "Divers",
    keine: "Keine Angabe",
    sofort: "Sofort",
    spaeter: "Später (Datum angeben)",
    ledig: "Ledig",
    verheiratet: "Verheiratet",
    verwitwet: "Verwitwet",
    eingetragene_lp: "Eingetragene Lebenspartnerschaft",
    dauernd_getrennt: "Dauernd getrennt lebend",
    geschieden: "Geschieden",
    aufgehoben_lp: "Lebenspartnerschaft aufgehoben",
    spouse_partner: "Ehepartner/Partner",
    unmarried_children_15_24: "Unverheiratete Kinder 15–24",
    children_under_15: "Kinder unter 15",
    parents: "Eltern / ein Elternteil",
    relatives: "Andere Verwandte",
    other_people: "Andere Personen",
    sonstiges: "Sonstiges",
    bafoeg: "BAföG",
    bab: "Berufsausbildungsbeihilfe (BAB)",
    wohngeld: "Wohngeld",
    arbeitslosengeld: "Arbeitslosengeld",
    rente: "Rente",
    krankengeld: "Krankengeld",
    kindergeld: "Kindergeld",
    kinderzuschlag: "Kinderzuschlag"
  },
  uk: {
    yes: "Так",
    no: "Ні",
    maennlich: "Чоловіча",
    weiblich: "Жіноча",
    divers: "Інше",
    keine: "Не вказувати",
    sofort: "Одразу",
    spaeter: "Пізніше (вкажу дату)",
    ledig: "Неодружений / незаміжня",
    verheiratet: "Одружений / заміжня",
    verwitwet: "Вдівець / вдова",
    eingetragene_lp: "Зареєстроване партнерство",
    dauernd_getrennt: "Проживаємо окремо",
    geschieden: "Розлучений(а)",
    aufgehoben_lp: "Партнерство припинено",
    spouse_partner: "Чоловік/дружина або партнер",
    unmarried_children_15_24: "Неодружені діти 15–24",
    children_under_15: "Діти до 15 років",
    parents: "Батьки / один із батьків",
    relatives: "Інші родичі",
    other_people: "Інші люди",
    sonstiges: "Інше",
    bafoeg: "BAföG",
    bab: "Допомога на професійне навчання (BAB)",
    wohngeld: "Wohngeld",
    arbeitslosengeld: "Допомога по безробіттю",
    rente: "Пенсія",
    krankengeld: "Krankengeld",
    kindergeld: "Kindergeld",
    kinderzuschlag: "Kinderzuschlag"
  }
};

const optionOverrides = {
  de: {
    "kein_fester_wohnsitz:no": "Ja, vorhanden",
    "kein_fester_wohnsitz:yes": "Nein, keine feste Anschrift",
    "wasEmployedLast5Years:no": "Nein (weiter zu Punkt 54)",
    "hasUnpaidWageClaims:no": "Nein (weiter zu Punkt 54)",
    "receivedWageReplacementBenefits:no": "Nein (weiter zu Punkt 58)"
  },
  uk: {
    "kein_fester_wohnsitz:no": "Так, є",
    "kein_fester_wohnsitz:yes": "Ні, адреси немає",
    "wasEmployedLast5Years:no": "Ні (далі до пункту 54)",
    "hasUnpaidWageClaims:no": "Ні (далі до пункту 54)",
    "receivedWageReplacementBenefits:no": "Ні (далі до пункту 58)"
  }
};

export function applyBuergergeldTranslations(form) {
  for (const section of form.sections || []) {
    if (!section.title_ru && typeof section.title === "string") {
      section.title_ru = section.title;
    }

    for (const language of Object.keys(sectionTitles)) {
      const title = sectionTitles[language]?.[section.key];
      if (title) section[`title_${language}`] = title;
    }
  }

  for (const field of form.fields || []) {
    for (const language of Object.keys(fieldLabels)) {
      const label = fieldLabels[language]?.[field.key];
      if (label) field[`label_${language}`] = label;
    }

    for (const option of field.options || []) {
      for (const language of Object.keys(commonOptionLabels)) {
        const override = optionOverrides[language]?.[`${field.key}:${option.value}`];
        const label = override || commonOptionLabels[language]?.[option.value];
        if (label) option[`label_${language}`] = label;
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
