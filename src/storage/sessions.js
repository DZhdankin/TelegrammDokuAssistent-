const sessions = new Map();
const TTL_MS = 30 * 60 * 1000; // 30 минут — защита данных: сессии не храним долго

export function getSession(userId) {
  const now = Date.now();

  if (!sessions.has(userId)) {
    sessions.set(userId, {
      step: 0,
      rawAnswers: {},
      answers: {},
      updatedAt: now
    });
  }

  const s = sessions.get(userId);
  s.updatedAt = now;

  return s;
}

// авто-очистка старых сессий (data minimization)
setInterval(() => {
  const now = Date.now();
  for (const [userId, s] of sessions.entries()) {
    if (!s?.updatedAt) continue;
    if (now - s.updatedAt > TTL_MS) {
      sessions.delete(userId);
    }
  }
}, 60 * 1000);
