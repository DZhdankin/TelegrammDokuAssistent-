import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function markAllFields() {
  const pdfPath = path.join(__dirname, "forms/buergergeld/original.pdf");
  
  console.log(`📂 PDF path: ${pdfPath}`);
  
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const page = pdfDoc.getPage(0);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  console.log(`📏 Page size: ${width} x ${height}`);
  console.log(`📄 Pages in PDF: ${pdfDoc.getPageCount()}`);
  
  // Рисуем оси координат БЕЗ русских букв
  page.drawLine({
    start: { x: 0, y: height/2 },
    end: { x: width, y: height/2 },
    thickness: 0.5,
    color: rgb(0, 0, 1)
  });
  
  page.drawLine({
    start: { x: width/2, y: 0 },
    end: { x: width/2, y: height },
    thickness: 0.5,
    color: rgb(0, 0, 1)
  });
  
  console.log("🎯 Drawing coordinate grid...");
  
  // Метки по ключевым точкам БЕЗ русских букв
  const keyPoints = [
    { x: 50, y: height - 50, label: "TOP-LEFT" },
    { x: width - 50, y: height - 50, label: "TOP-RIGHT" },
    { x: 50, y: 50, label: "BOT-LEFT" },
    { x: width - 50, y: 50, label: "BOT-RIGHT" },
    { x: width/2, y: height/2, label: "CENTER" }
  ];
  
  keyPoints.forEach(point => {
    // Красная точка
    page.drawCircle({
      x: point.x,
      y: point.y,
      size: 5,
      color: rgb(1, 0, 0)
    });
    
    // Подпись (только латиница)
    page.drawText(`${point.label} (${point.x},${point.y})`, {
      x: point.x + 10,
      y: point.y - 10,
      size: 8,
      font,
      color: rgb(1, 0, 0)
    });
  });
  
  // Сетка для области с полями формы
  console.log("📊 Drawing grid in form area...");
  
  // Область где вероятно находятся поля (y от height-300 до height-50)
  for (let y = height - 50; y > height - 400; y -= 20) {
    for (let x = 50; x < width - 50; x += 100) {
      // Точка сетки
      page.drawCircle({
        x: x,
        y: y,
        size: 1,
        color: rgb(0.7, 0.7, 0.7)
      });
    }
  }
  
  // Подписи координат (только для некоторых точек)
  for (let y = height - 50; y > height - 400; y -= 40) {
    for (let x = 50; x < width - 50; x += 200) {
      page.drawText(`${x},${y}`, {
        x: x + 3,
        y: y - 3,
        size: 6,
        font,
        color: rgb(0.5, 0.5, 0.5)
      });
    }
  }
  
  // Особые метки для предполагаемых полей формы БЕЗ русских букв
  console.log("📍 Marking suspected form fields...");
  
  const suspectedFields = [
    { name: "Vorname?", x: 100, y: height - 200 },
    { name: "Nachname?", x: 300, y: height - 200 },
    { name: "Geburtsdatum?", x: 100, y: height - 220 },
    { name: "Geburtsname?", x: 300, y: height - 220 },
    { name: "Geburtsort?", x: 100, y: height - 240 },
    { name: "Geburtsland?", x: 300, y: height - 240 },
    { name: "Staatsangeh?", x: 100, y: height - 260 },
    { name: "Strasse?", x: 100, y: height - 300 },
    { name: "Hausnummer?", x: 300, y: height - 300 },
    { name: "PLZ?", x: 100, y: height - 320 },
    { name: "Wohnort?", x: 300, y: height - 320 },
    { name: "Telefon?", x: 100, y: height - 350 }
  ];
  
  suspectedFields.forEach(field => {
    // Зелёный кружок
    page.drawCircle({
      x: field.x,
      y: field.y,
      size: 3,
      color: rgb(0, 0.8, 0)
    });
    
    // Подпись (только латиница)
    page.drawText(field.name, {
      x: field.x + 5,
      y: field.y - 5,
      size: 7,
      font,
      color: rgb(0, 0.6, 0)
    });
  });
  
  // Добавим цифры по вертикали для ориентира
  for (let i = 0; i < 10; i++) {
    const yPos = height - 200 - (i * 25);
    page.drawText(`Row${i}:${yPos}`, {
      x: 20,
      y: yPos,
      size: 6,
      font,
      color: rgb(0.3, 0.3, 0.8)
    });
  }
  
  // Сохраняем
  const outDir = path.join(__dirname, "debug");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  const outPath = path.join(outDir, "coordinate_grid.pdf");
  const pdfBytesOut = await pdfDoc.save();
  fs.writeFileSync(outPath, pdfBytesOut);
  
  console.log(`✅ Grid created: ${outPath}`);
  console.log(`📁 Saved to: ${outDir}`);
  console.log("\n🎯 INSTRUCTIONS:");
  console.log("1. Open coordinate_grid.pdf");
  console.log("2. Compare green dots with form fields");
  console.log("3. If dots are not in right places:");
  console.log("   - Green dots should be at form field positions");
  console.log("   - Note the correct coordinates from the grid");
  console.log("4. Update page1.js with correct coordinates");
  console.log("\n📊 TYPICAL COORDINATES for this form:");
  console.log("   First column (Vorname, Geburtsdatum, etc.): x = 80-120");
  console.log("   Second column (Nachname, Geburtsname, etc.): x = 280-320");
  console.log("   Y starts at ~height-200 and decreases by 20-25 per row");
}

markAllFields().catch(console.error);