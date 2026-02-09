import fs from "fs";
import path from "path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { page1 } from "../forms/buergergeld/pages/page1.js";
import { page2 } from "../forms/buergergeld/pages/page2.js";
import { page3 } from "../forms/buergergeld/pages/page3.js";
import { page4 } from "../forms/buergergeld/pages/page4.js";
import { page5 } from "../forms/buergergeld/pages/page5.js";
import { page6 } from "../forms/buergergeld/pages/page6.js";
import { page7 } from "../forms/buergergeld/pages/page7.js";
import { page8 } from "../forms/buergergeld/pages/page8.js";



// =======================
// Utils
// =======================
function containsCyrillic(str) {
  return /[А-Яа-яЁё]/.test(String(str || ""));
}

function safeText(value) {
  return String(value ?? "").trim();
}

function toPdfCoords(pdfPage, coords) {
  const { height } = pdfPage.getSize();
  return { x: coords.x, y: height - coords.y };
}

// dependsOn поддерживает:
// - обычное значение
// - массив (multi_choice)
// - строку "a,b,c"
function isFieldAvailable(field, answers) {
  if (!field?.dependsOn) return true;

  const depKey = field.dependsOn.key;
  const depValue = field.dependsOn.value;

  const actual = answers?.[depKey];

  if (Array.isArray(actual)) return actual.includes(depValue);

  if (typeof actual === "string") {
    const arr = actual
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return arr.includes(depValue);
  }

  return actual === depValue;
}

// =======================
// Draw helpers
// =======================
function drawTextSafe(pdfPage, font, field, value) {
  const text = safeText(value);
  if (!text) return;
  if (!field?.pdf) return;

  // PDF-lib Helvetica не умеет кириллицу -> пропускаем
  if (containsCyrillic(text)) {
    console.log(`⚠️ Cyrillic skipped: field "${field.key}" -> "${text}"`);
    return;
  }

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
  const p = toPdfCoords(pdfPage, coords);

  pdfPage.drawText(mark, {
    x: p.x,
    y: p.y,
    size,
    font,
    color: rgb(0, 0, 0)
  });
}

// =======================
// Apply field to PDF
// =======================
function applyFieldToPdf(pdfPage, font, field, answers) {
  const key = field.key;
  const value = answers?.[key];

  // text / date
  if (field.type === "text" || field.type === "date") {
    drawTextSafe(pdfPage, font, field, value);
    return;
  }

  // choice
  if (field.type === "choice") {
    const selected = safeText(value);
    if (!selected) return;

    // вариант 1: pdfChoices
    if (field.pdfChoices && field.pdfChoices[selected]) {
      const coords = field.pdfChoices[selected];
      drawMark(pdfPage, font, coords, coords.mark || "X");
      return;
    }

    // вариант 2: pdf внутри options
    const opt = field.options?.find((o) => o.value === selected);
    if (opt?.pdf) {
      drawMark(pdfPage, font, opt.pdf, opt.pdf.mark || "X");
      return;
    }

    console.log(`ℹ️ choice "${key}" selected="${selected}" but no pdf coords`);
    return;
  }

  // multi_choice
  if (field.type === "multi_choice") {
    let selectedValues = value;

    if (typeof selectedValues === "string") {
      selectedValues = selectedValues
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (!Array.isArray(selectedValues)) return;

    for (const sv of selectedValues) {
      if (field.pdfChoices && field.pdfChoices[sv]) {
        const coords = field.pdfChoices[sv];
        drawMark(pdfPage, font, coords, coords.mark || "X");
      }
    }
    return;
  }
}

// =======================
// Main
// =======================
// вместо сохранения на диск — просто возвращаем Buffer
export async function renderPdf(answers = {}) {
  const templatePath = path.resolve("src/forms/buergergeld/original.pdf");

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template PDF not found: ${templatePath}`);
  }

  const pdfBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pdfPages = pdfDoc.getPages();

  const formPages = [page1, page2, page3, page4, page5, page6, page7, page8];
  const count = Math.min(pdfPages.length, formPages.length);

  for (let i = 0; i < count; i++) {
    const pdfPage = pdfPages[i];
    const formPage = formPages[i];

    for (const field of formPage.fields) {
      if (!isFieldAvailable(field, answers)) continue;
      applyFieldToPdf(pdfPage, font, field, answers);
    }
  }

  // ⬇️ ВАЖНО: возвращаем PDF как Buffer
  const outBytes = await pdfDoc.save();
  return Buffer.from(outBytes);
}
