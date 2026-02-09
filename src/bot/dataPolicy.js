export const dataPolicy = {
  storage: "none", // нет постоянного хранения
  retention: "session-only (RAM, auto-delete after 30 minutes)",
  pdf: "generated in-memory, never written to disk",
  ai: "no personal data sent to AI",
  logging: "no user answers logged, only technical errors",
  thirdParties: "none",
  purpose: "assist users in filling German social forms (e.g. Bürgergeld) only"
};
