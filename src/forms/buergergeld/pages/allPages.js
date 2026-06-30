import { page1 } from "./page1.js";
import { page2 } from "./page2.js";
import { page3 } from "./page3.js";
import { page4 } from "./page4.js";
import { page5 } from "./page5.js";
import { page6 } from "./page6.js";
import { page7 } from "./page7.js";
import { page8 } from "./page8.js";

export const allPages = [page1, page2, page3, page4, page5, page6, page7, page8];

export const sections = [
  {
    key: "A",
    title: "🏠 Личные данные",
    fields: [
      "vorname","nachname","geburtsdatum","geburtsname_changed","geburtsname",
      "geburtsort","geburtsland","staatsangehoerigkeit","geschlecht",
      "strasse","hausnummer","plz","wohnort","postfachanschrift","telefon",
      "kein_fester_wohnsitz","wohnhaft_bei"
    ]
  },
  {
    key: "B",
    title: "📝 Подача заявления",
    fields: ["antrag_ab","antrag_date"]
  },
  {
    key: "C",
    title: "👨‍👩‍👧 Жизненная ситуация",
    fields: [
      "isAbleToWork","isStudentOrTrainee","hasSchoolCosts","isAccommodatedDuringTraining",
      "isUnder18or18to24","parentLivesOutsideBG","hasOrWillStartTraining",
      "receivesAsylumBenefits","asylumBenefitsUntil","personIdNumber","azrNumber",
      "receivedBenefitsLast3Years","benefitType",
      "caredForRelatives","howSupportedYourselfLast5Years","appliedForOtherBenefits",
      "otherBenefitsList","otherBenefitsOtherText","healthDamageByThirdParty",
      "claimsAgainstThirdParties","isSingleParent","isPregnant","expectedDueDate"
    ]
  },
  {
    key: "D",
    title: "⚠️ Особые обстоятельства",
    fields: [
      "benefitsPeriodFrom","benefitsPeriodTo","benefitProviderName","benefitProviderStreet",
      "benefitProviderHouseNumber","benefitProviderPostalCode","benefitProviderCity",
      "wasEmployedLast5Years","employmentPeriodFrom1","employmentPeriodTo1",
      "employmentPeriodFrom2","employmentPeriodTo2","hasUnpaidWageClaims",
      "employerName","employerStreet","employerHouseNumber","employerPostalCode",
      "employerCity","wasSelfEmployed","receivedWageReplacementBenefits",
      "wageReplacementBenefitType","wageReplacementPeriodFrom","wageReplacementPeriodTo",
      "didMilitaryOrVolunteerService"
    ]
  },
  {
    key: "E",
    title: "💊 Медицинская и социальная страховка",
    fields: [
      "wasStatutoryInsured","healthInsuranceName","healthInsuranceNumber",
      "wantsToChangeHealthInsurance","isPrivatelyOrVoluntaryOrUninsured"
    ]
  },
  {
    key: "F",
    title: "🏡 Жилищные условия",
    fields: [
      "lives_alone","lives_with_people","needs_housing_heating","warmwater_decentral"
    ]
  },
  {
    key: "G",
    title: "📎 Необходимые приложения",
    fields: []
  },
  {
    key: "H",
    title: "✍️ Примечания и подпись",
    fields: ["signature_date_1","signature_date_2"]
  }
];


// плоский список всех полей по порядку
export const allFields = allPages.flatMap((p) => p.fields);
