import { kg1Page1 } from "./kg1Page1.js";
import { kg1Page2 } from "./kg1Page2.js";
import { ankPage1 } from "./ankPage1.js";
import { ankPage2 } from "./ankPage2.js";
import { ankPage3 } from "./ankPage3.js";
import { ankPage4 } from "./ankPage4.js";

export const allPages = [
  kg1Page1,
  kg1Page2,
  ankPage1,
  ankPage2,
  ankPage3,
  ankPage4
];

export const allFields = allPages.flatMap((p) => p.fields);

export const sections = [
  {
    key: "kg1_header",
    title_ru: "📄 Основное заявление",
    fields: ["kindergeld_number", "daytime_phone", "attached_child_forms_count"]
  },
  {
    key: "applicant",
    title_ru: "👤 Заявитель",
    fields: [
      "applicant_tax_id", "applicant_last_name", "applicant_title", "applicant_first_name",
      "applicant_previous_name", "applicant_birth_date", "applicant_birth_place",
      "applicant_gender", "applicant_nationality", "applicant_address",
      "applicant_marital_status", "applicant_marital_status_since"
    ]
  },
  {
    key: "partner",
    title_ru: "👥 Второй родитель / супруг",
    fields: [
      "partner_exists", "partner_tax_id", "partner_last_name", "partner_first_name",
      "partner_title", "partner_birth_date", "partner_nationality", "partner_gender",
      "partner_previous_name", "partner_address"
    ]
  },
  {
    key: "payment",
    title_ru: "💳 Банковские данные",
    fields: [
      "payment_iban", "payment_bic", "payment_bank_name",
      "payment_account_holder_type", "payment_account_holder_name"
    ]
  },
  {
    key: "kg1_page2",
    title_ru: "📋 Дополнительные данные KG1",
    fields: [
      "notice_recipient_enabled", "notice_recipient_last_name", "notice_recipient_first_name",
      "notice_recipient_address", "already_receives_kindergeld", "other_person_receives_kindergeld",
      "application_signature_date", "partner_consent_signature_date"
    ]
  },
  {
    key: "child_basic",
    title_ru: "👶 Данные ребёнка",
    fields: [
      "ank_applicant_full_name", "ank_kindergeld_number", "ank_application_date", "ank_child_number",
      "child_tax_id", "child_last_name", "child_title", "child_first_name", "child_birth_name",
      "child_birth_date", "child_birth_place", "child_gender", "child_nationality",
      "child_same_address", "child_different_address", "child_different_address_reason"
    ]
  },
  {
    key: "child_relationship",
    title_ru: "👨‍👩‍👧 Родство",
    fields: [
      "child_relationship_to_applicant", "child_relationship_to_partner",
      "child_relationship_to_other_person", "other_person_info_needed"
    ]
  },
  {
    key: "adult_child",
    title_ru: "🎓 Ребёнок 18+",
    fields: ["child_is_adult_or_soon_18", "adult_child_proofs_status", "adult_child_situation"]
  },
  {
    key: "ank_checks",
    title_ru: "✅ Проверочные вопросы Anlage Kind",
    fields: [
      "child_kindergeld_already_applied_or_received", "public_service_employment_exists",
      "foreign_child_benefit_claim_exists", "foreign_work_employee_self_employed",
      "foreign_state_or_nato_employment", "posted_worker_foreign_employer"
    ]
  },
  {
    key: "signatures",
    title_ru: "✍️ Подписи",
    fields: ["ank_signature_date"]
  }
];
