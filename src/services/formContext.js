import { DEFAULT_FORM_ID, getForm } from "../forms/registry.js";

export const DEFAULT_LANGUAGE = "ru";

export function getSessionFormContext(session) {
  if (!session.formId) session.formId = DEFAULT_FORM_ID;

  const form = getForm(session.formId);
  const fallbackLanguage = form.defaultLanguage || DEFAULT_LANGUAGE;
  const supportedLanguages = form.languages?.length ? form.languages : [fallbackLanguage];

  if (!session.language || !supportedLanguages.includes(session.language)) {
    session.language = fallbackLanguage;
  }

  return {
    form,
    language: session.language,
    fields: form.fields || [],
    pages: form.pages || [],
    sections: form.sections || []
  };
}

export function resetSessionFormContext(session, options = {}) {
  const nextFormId = options.formId || session.formId || DEFAULT_FORM_ID;
  const form = getForm(nextFormId);
  const fallbackLanguage = form.defaultLanguage || DEFAULT_LANGUAGE;
  const supportedLanguages = form.languages?.length ? form.languages : [fallbackLanguage];
  const requestedLanguage = options.language || session.language || fallbackLanguage;

  session.formId = nextFormId;
  session.language = supportedLanguages.includes(requestedLanguage)
    ? requestedLanguage
    : fallbackLanguage;

  session.step = 0;
  session.rawAnswers = {};
  session.answers = {};

  return getSessionFormContext(session);
}
