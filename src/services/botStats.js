import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const statsPath = path.resolve(__dirname, "../../logs/bot-stats.json");

const defaultStats = {
  starts: 0,
  flowsStarted: 0,
  pdfGenerated: 0,
  feedbackSent: 0
};

function ensureStatsDir() {
  fs.mkdirSync(path.dirname(statsPath), { recursive: true });
}

function readStatsFromDisk() {
  try {
    if (!fs.existsSync(statsPath)) return { ...defaultStats };

    const parsed = JSON.parse(fs.readFileSync(statsPath, "utf8"));
    return {
      ...defaultStats,
      ...Object.fromEntries(
        Object.entries(parsed || {}).map(([key, value]) => [key, Number(value) || 0])
      )
    };
  } catch (err) {
    console.error("Stats read error:", err?.message || err);
    return { ...defaultStats };
  }
}

const stats = readStatsFromDisk();

function saveStats() {
  try {
    ensureStatsDir();
    fs.writeFileSync(statsPath, `${JSON.stringify(stats, null, 2)}\n`);
  } catch (err) {
    console.error("Stats write error:", err?.message || err);
  }
}

export function getStats() {
  return { ...stats };
}

export function incrementStat(key) {
  if (!Object.hasOwn(stats, key)) stats[key] = 0;
  stats[key]++;
  saveStats();
  return stats[key];
}

function parseExcludedIds() {
  return [
    process.env.ADMIN_CHAT_ID,
    ...(process.env.STATS_EXCLUDE_USER_IDS || "").split(",")
  ]
    .flatMap((id) => String(id || "").split(","))
    .map((id) => String(id || "").trim())
    .filter(Boolean);
}

export function shouldTrackStats(ctx) {
  const excludedIds = new Set(parseExcludedIds());
  if (excludedIds.size === 0) return true;

  const userId = ctx?.from?.id ? String(ctx.from.id) : "";
  const chatId = ctx?.chat?.id ? String(ctx.chat.id) : "";

  return !excludedIds.has(userId) && !excludedIds.has(chatId);
}

export function trackStat(ctx, key) {
  if (!shouldTrackStats(ctx)) return false;
  incrementStat(key);
  return true;
}

export function resetStats() {
  for (const key of Object.keys(defaultStats)) {
    stats[key] = 0;
  }
  saveStats();
}

export function logStats(event) {
  console.log(
    `📊 [${event}]`,
    `starts=${stats.starts}`,
    `flows=${stats.flowsStarted}`,
    `pdf=${stats.pdfGenerated}`,
    `feedback=${stats.feedbackSent}`
  );
}
