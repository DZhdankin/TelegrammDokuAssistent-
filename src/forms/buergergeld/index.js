import path from "path";
import { fileURLToPath } from "url";

import { allFields, allPages, sections } from "./pages/allPages.js";
import { applyBuergergeldTranslations } from "./translations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const buergergeldForm = applyBuergergeldTranslations({
  id: "buergergeld",
  title: "Buergergeld",
  defaultLanguage: "ru",
  languages: ["ru", "de", "uk"],
  pages: allPages,
  sections,
  fields: allFields,
  templatePath: path.resolve(__dirname, "original.pdf"),
  fontPath: path.resolve(__dirname, "../../assets/fonts/NotoSans-Regular.ttf")
});
