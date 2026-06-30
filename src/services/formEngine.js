function parseComparableNumber(value) {
  if (Array.isArray(value)) return NaN;
  const normalized = String(value ?? "").replace(",", ".").trim();
  const match = normalized.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : NaN;
}

function isDependencySatisfied(dependsOn, answers) {
  const depKey = dependsOn.key;
  const actual = answers?.[depKey];

  if (dependsOn.min !== undefined || dependsOn.max !== undefined) {
    const actualNumber = parseComparableNumber(actual);
    if (!Number.isFinite(actualNumber)) return false;
    if (dependsOn.min !== undefined && actualNumber < Number(dependsOn.min)) return false;
    if (dependsOn.max !== undefined && actualNumber > Number(dependsOn.max)) return false;
    return true;
  }

  const depValue = dependsOn.value;

  if (Array.isArray(actual)) return actual.includes(depValue);

  if (typeof actual === "string") {
    return actual
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .includes(depValue);
  }

  return actual === depValue;
}

function getDependencies(field) {
  if (!field?.dependsOn) return [];
  return Array.isArray(field.dependsOn) ? field.dependsOn : [field.dependsOn];
}

export function isFieldAvailable(field, answers) {
  const dependencies = getDependencies(field);
  if (dependencies.length === 0) return true;

  return dependencies.every((dependsOn) => isDependencySatisfied(dependsOn, answers));
}

export function clearDependentAnswers(changedKey, session, fields) {
  let removed = true;

  while (removed) {
    removed = false;

    for (const field of fields) {
      const dependencies = getDependencies(field);
      if (!dependencies.some((dependsOn) => dependsOn.key === changedKey)) continue;
      if (isFieldAvailable(field, session.answers)) continue;

      if (session.answers?.[field.key] !== undefined) {
        delete session.answers[field.key];
        if (session.rawAnswers) delete session.rawAnswers[field.key];
        clearDependentAnswers(field.key, session, fields);
        removed = true;
      }
    }
  }
}

export function getNextAvailableStep(fields, fromStep, answers) {
  let step = fromStep;
  while (step < fields.length) {
    if (isFieldAvailable(fields[step], answers)) return step;
    step++;
  }
  return step;
}

export function getPrevAvailableStep(fields, fromStep, answers) {
  let step = fromStep;
  while (step >= 0) {
    if (isFieldAvailable(fields[step], answers)) return step;
    step--;
  }
  return 0;
}

export function getCurrentField(fields, session) {
  if (typeof session.step !== "number") session.step = 0;
  session.step = getNextAvailableStep(fields, session.step, session.answers);
  return fields[session.step];
}

export function resolveAutoFieldValue(field) {
  if (!field || field.autoValue === undefined) return undefined;

  if (field.autoValue === "repeatIndex") {
    return field.repeatIndex !== undefined ? String(field.repeatIndex) : undefined;
  }

  if (typeof field.autoValue === "string" || typeof field.autoValue === "number") {
    return String(field.autoValue);
  }

  return undefined;
}

export function applyAvailableAutoFields(fields, session) {
  if (!session.answers) session.answers = {};
  if (!session.rawAnswers) session.rawAnswers = {};

  let changed = true;
  while (changed) {
    changed = false;

    for (const field of fields) {
      if (!field?.autoValue) continue;
      if (session.answers[field.key] !== undefined) continue;
      if (!isFieldAvailable(field, session.answers)) continue;

      const value = resolveAutoFieldValue(field);
      if (value === undefined) continue;

      session.answers[field.key] = value;
      session.rawAnswers[field.key] = value;
      changed = true;
    }
  }
}
