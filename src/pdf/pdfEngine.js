import fs from "fs";

import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";

import { isFieldAvailable } from "../services/formEngine.js";

function safeText(value) {
  return String(value ?? "").trim();
}

function toPdfCoords(pdfPage, coords) {
  const { height } = pdfPage.getSize();
  return { x: coords.x, y: height - coords.y };
}

function drawTextSafe(pdfPage, font, field, value) {
  const text = safeText(value);
  if (!text || !field?.pdf) return;

  const size = field.pdf.fontSize || 10;
  const p = toPdfCoords(pdfPage, field.pdf);

  pdfPage.drawText(text, {
    x: p.x,
    y: p.y,
    size,
    font,
    color: rgb(0, 0, 0)
  });
}

function drawMark(pdfPage, font, coords, mark = "X") {
  if (!coords) return;

  const size = coords.fontSize || 12;
  const p = toPdfCoords(pdfPage, { x: coords.x + 1.5, y: coords.y + 1.5 });

  pdfPage.drawText(mark, {
    x: p.x,
    y: p.y,
    size,
    font,
    color: rgb(0, 0, 0)
  });
}

function drawBoxedText(pdfPage, font, field, value) {
  const text = safeText(value).replace(/\s+/g, "");
  if (!text || !field?.pdf?.cells?.length) return;

  const size = field.pdf.fontSize || 10;
  const maxLength = field.maxLength || field.pdf.cells.length;

  // Общий сдвиг символов внутри клеток
  // X: влево, Y: чуть ниже
  const offsetX = field.pdf.cellOffsetX ?? -4;
  const offsetY = field.pdf.cellOffsetY ?? -2;

  const chars = [...text.slice(0, maxLength)];

  chars.forEach((ch, index) => {
    const cell = field.pdf.cells[index];
    if (!cell) return;

    const p = toPdfCoords(pdfPage, cell);

    pdfPage.drawText(ch, {
      x: p.x + offsetX,
      y: p.y + offsetY,
      size,
      font,
      color: rgb(0, 0, 0)
    });
  });
}

function normalizeMultiChoiceValue(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];

  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function applyFieldToPdf(pdfPage, font, field, answers) {
  const value = answers?.[field.key];

  if (field.type === "text" || field.type === "date") {
    drawTextSafe(pdfPage, font, field, value);
    return;
  }

  if (field.type === "boxed_text") {
    drawBoxedText(pdfPage, font, field, value);
    return;
  }

  if (field.type === "choice") {
    const selected = safeText(value);
    if (!selected) return;

    if (field.pdfChoices?.[selected]) {
      const coords = field.pdfChoices[selected];
      drawMark(pdfPage, font, coords, coords.mark || "X");
      return;
    }

    const opt = field.options?.find((o) => o.value === selected);
    if (opt?.pdf) {
      drawMark(pdfPage, font, opt.pdf, opt.pdf.mark || "X");
    }
    return;
  }

  if (field.type === "multi_choice") {
    for (const selected of normalizeMultiChoiceValue(value)) {
      if (field.pdfChoices?.[selected]) {
        const coords = field.pdfChoices[selected];
        drawMark(pdfPage, font, coords, coords.mark || "X");
      }
    }
  }
}

export async function renderFormPdf({ form, answers = {} }) {
  if (!form?.templatePath) {
    throw new Error("Form templatePath is not configured");
  }
  if (!form?.fontPath) {
    throw new Error("Form fontPath is not configured");
  }
  if (!fs.existsSync(form.templatePath)) {
    throw new Error(`Template PDF not found: ${form.templatePath}`);
  }
  if (!fs.existsSync(form.fontPath)) {
    throw new Error(`PDF font not found: ${form.fontPath}`);
  }

  const pdfDoc = await PDFDocument.load(fs.readFileSync(form.templatePath));
  pdfDoc.registerFontkit(fontkit);

  const formPages = form.pages || [];
  const usesSourcePages = formPages.some((page) => Number.isInteger(page.sourcePageIndex));

  if (usesSourcePages) {
    const outputDoc = await PDFDocument.create();
    outputDoc.registerFontkit(fontkit);

    const font = await outputDoc.embedFont(fs.readFileSync(form.fontPath));
    const sourcePages = pdfDoc.getPages();

    for (const formPage of formPages) {
      const availableFields = (formPage.fields || []).filter((field) => isFieldAvailable(field, answers));
      if (availableFields.length === 0) continue;

      const sourcePageIndex = Number.isInteger(formPage.sourcePageIndex)
        ? formPage.sourcePageIndex
        : (formPage.page || 1) - 1;

      if (!sourcePages[sourcePageIndex]) continue;

      const [copiedPage] = await outputDoc.copyPages(pdfDoc, [sourcePageIndex]);
      outputDoc.addPage(copiedPage);

      for (const field of availableFields) {
        applyFieldToPdf(copiedPage, font, field, answers);
      }
    }

    return Buffer.from(await outputDoc.save());
  }

  const font = await pdfDoc.embedFont(fs.readFileSync(form.fontPath));
  const pdfPages = pdfDoc.getPages();
  const count = Math.min(pdfPages.length, formPages.length);

  for (let i = 0; i < count; i++) {
    const pdfPage = pdfPages[i];
    const formPage = formPages[i];

    for (const field of formPage.fields) {
      if (!isFieldAvailable(field, answers)) continue;
      applyFieldToPdf(pdfPage, font, field, answers);
    }
  }

  return Buffer.from(await pdfDoc.save());
}
