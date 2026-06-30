import "./env.js"; // <-- важно: первым!

import { startBot } from "./bot/bot.js";

console.log("DEBUG_SKIP:", process.env.DEBUG_SKIP);

startBot();
