import "./env.js"; // <-- важно: первым!

import { startBot } from "./bot/bot.js";

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "OK" : "MISSING");
console.log("DEBUG_SKIP:", process.env.DEBUG_SKIP);
console.log("AI_ENABLED:", process.env.AI_ENABLED);

startBot();
