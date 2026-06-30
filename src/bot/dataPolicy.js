export const dataPolicy = {
  storage: "user answers: none; aggregate counters only (logs/bot-stats.json, no personal data)",
  retention: "user sessions: RAM only, auto-delete after 30 minutes; aggregate counters reset after daily report",
  pdf: "generated in-memory, never written to disk",
  ai: "Local rule-based translation/explanation, no external API calls, no data leaves the server",
  logging: "no user answers logged, only technical errors and aggregate counters",
  thirdParties: "none",
  purpose: "assist users in filling German social forms (e.g. Buergergeld) only"
};
