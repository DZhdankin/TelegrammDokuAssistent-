import path from "path";
import { fileURLToPath } from "url";

import { allPages, sections } from "./pages/allPages.js";
import { applyKindergeldTranslations } from "./translations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MAX_CHILD_FORMS = 5;
const KG1_PAGE_COUNT = 2;
const childFormCountKey = "attached_child_forms_count";

function clonePlain(value) {
  return JSON.parse(JSON.stringify(value));
}

function childFieldKey(childIndex, fieldKey) {
  return `child_${childIndex}__${fieldKey}`;
}

function normalizeDependsOn(dependsOn, childIndex, ankFieldKeys) {
  if (!dependsOn) return [];

  const dependencies = Array.isArray(dependsOn) ? dependsOn : [dependsOn];
  return dependencies.map((dependency) => {
    if (dependency?.key && ankFieldKeys.has(dependency.key)) {
      return { ...dependency, key: childFieldKey(childIndex, dependency.key) };
    }

    return dependency;
  });
}

function cloneAnlageKindField(field, childIndex, ankFieldKeys) {
  const cloned = clonePlain(field);
  cloned.originalKey = field.key;
  cloned.key = childFieldKey(childIndex, field.key);
  cloned.repeatGroup = "anlage_kind";
  cloned.repeatIndex = childIndex;

  if (field.key === "ank_child_number") {
    cloned.autoValue = "repeatIndex";
    cloned.hiddenInSummary = true;
  }

  cloned.dependsOn = [
    { key: childFormCountKey, min: childIndex },
    ...normalizeDependsOn(field.dependsOn, childIndex, ankFieldKeys)
  ];
  return cloned;
}

function buildKindergeldPagesAndSections() {
  const kg1Pages = allPages.slice(0, KG1_PAGE_COUNT).map((page, index) => ({
    ...page,
    sourcePageIndex: index
  }));
  const anlageKindPages = allPages.slice(KG1_PAGE_COUNT);
  const ankFieldKeys = new Set(anlageKindPages.flatMap((page) => page.fields.map((field) => field.key)));

  const repeatedPages = [];
  for (let childIndex = 1; childIndex <= MAX_CHILD_FORMS; childIndex++) {
    for (const page of anlageKindPages) {
      repeatedPages.push({
        ...page,
        key: `${page.title || "anlage_kind"}_${childIndex}`,
        title: `${page.title} (${childIndex})`,
        sourcePageIndex: page.page - 1,
        repeatGroup: "anlage_kind",
        repeatIndex: childIndex,
        fields: page.fields.map((field) => cloneAnlageKindField(field, childIndex, ankFieldKeys))
      });
    }
  }

  const kg1Sections = sections.filter((section) => !section.fields.some((fieldKey) => ankFieldKeys.has(fieldKey)));
  const ankSections = sections.filter((section) => section.fields.some((fieldKey) => ankFieldKeys.has(fieldKey)));
  const repeatedSections = [];

  for (let childIndex = 1; childIndex <= MAX_CHILD_FORMS; childIndex++) {
    for (const section of ankSections) {
      repeatedSections.push({
        ...section,
        key: `${section.key}_child_${childIndex}`,
        originalKey: section.key,
        repeatGroup: "anlage_kind",
        repeatIndex: childIndex,
        fields: section.fields
          .filter((fieldKey) => ankFieldKeys.has(fieldKey))
          .map((fieldKey) => childFieldKey(childIndex, fieldKey))
      });
    }
  }

  const pages = [...kg1Pages, ...repeatedPages];
  return {
    pages,
    sections: [...kg1Sections, ...repeatedSections],
    fields: pages.flatMap((page) => page.fields)
  };
}

const expandedKindergeld = buildKindergeldPagesAndSections();

export const kindergeldForm = applyKindergeldTranslations({
  id: "kindergeld",
  title: "Kindergeld",
  defaultLanguage: "ru",
  languages: ["ru", "de", "uk"],
  maxChildForms: MAX_CHILD_FORMS,
  childFormCountKey,
  pages: expandedKindergeld.pages,
  sections: expandedKindergeld.sections,
  fields: expandedKindergeld.fields,
  templatePath: path.resolve(__dirname, "template.pdf"),
  fontPath: path.resolve(__dirname, "../../assets/fonts/NotoSans-Regular.ttf")
});
