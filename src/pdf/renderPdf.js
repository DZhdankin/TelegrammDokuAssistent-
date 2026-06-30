import { getDefaultForm } from "../forms/registry.js";
import { renderFormPdf } from "./pdfEngine.js";

export async function renderPdf(answers = {}, form = getDefaultForm()) {
  return renderFormPdf({ form, answers });
}

