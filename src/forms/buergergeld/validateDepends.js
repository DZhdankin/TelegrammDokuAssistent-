import { buergergeldForm } from "./index.js";

function validateDependsOn() {
  const errors = [];
  const allFields = buergergeldForm.fields;

  // карта всех полей: key → { field, index }
  const fieldMap = new Map();
  allFields.forEach((f, i) => fieldMap.set(f.key, { field: f, index: i }));

  for (const field of allFields) {
    if (!field.dependsOn) continue;

    const { key: depKey, value: depValue } = field.dependsOn;

    // 1. Проверяем, что ключ существует
    if (!fieldMap.has(depKey)) {
      errors.push(`❌ Поле "${field.key}" зависит от НЕсуществующего ключа "${depKey}"`);
      continue;
    }

    const parent = fieldMap.get(depKey).field;

    // 2. Проверяем порядок (родитель должен быть раньше)
    if (fieldMap.get(depKey).index > fieldMap.get(field.key).index) {
      errors.push(
        `❌ Поле "${field.key}" зависит от "${depKey}", но "${depKey}" идёт ПОСЛЕ него`
      );
    }

    // 3. Проверяем, что значение существует среди options
    if (parent.type === "choice" || parent.type === "multi_choice") {
      const values = parent.options.map(o => o.value);
      if (!values.includes(depValue)) {
        errors.push(
          `❌ Поле "${field.key}" зависит от "${depKey}=${depValue}", но такого значения нет в options (${values.join(", ")})`
        );
      }
    }
  }

  if (errors.length === 0) {
    console.log("✅ dependsOn: всё корректно!");
  } else {
    console.log("⚠️ Найдены проблемы:");
    errors.forEach(e => console.log(e));
  }
}

validateDependsOn();
