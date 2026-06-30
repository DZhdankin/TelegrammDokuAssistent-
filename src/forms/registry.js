import { buergergeldForm } from "./buergergeld/index.js";
import { kindergeldForm } from "./kindergeld/index.js";

export const DEFAULT_FORM_ID = buergergeldForm.id;

const forms = new Map([
  [buergergeldForm.id, buergergeldForm],
  [kindergeldForm.id, kindergeldForm]
]);

export function getForm(formId) {
  const form = forms.get(formId);
  if (!form) {
    throw new Error(`Unknown form: ${formId}`);
  }
  return form;
}

export function getDefaultForm() {
  return getForm(DEFAULT_FORM_ID);
}

export function listForms() {
  return [...forms.values()];
}

