// A best-effort, per-instance sliding-window limiter — no external store
// (Redis/Upstash) is wired up, so this only throttles requests that land on
// the same warm serverless instance, not truly globally. Real protection
// against a determined attacker needs a shared store; this is cheap
// insurance against a buggy client or a casual abuser hammering an
// authenticated write endpoint, which is the realistic threat here since
// every route this guards already requires a signed-in Clerk session.
const WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart);
  timestamps.push(now);
  hits.set(key, timestamps);

  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => t <= windowStart)) hits.delete(k);
    }
  }

  return timestamps.length > limit;
}
