import { pool } from "./db";

export async function recordGuideClick(activityId: string): Promise<void> {
  await pool.query("INSERT INTO guide_link_clicks (activity_id) VALUES ($1)", [activityId]);
}

export type ClickCount = { activityId: string; clicks: number };

export async function getClickCounts(sinceDays: number): Promise<ClickCount[]> {
  const result = await pool.query<{ activity_id: string; clicks: string }>(
    `SELECT activity_id, COUNT(*) AS clicks
     FROM guide_link_clicks
     WHERE clicked_at >= now() - ($1::double precision * INTERVAL '1 day')
     GROUP BY activity_id
     ORDER BY clicks DESC`,
    [sinceDays]
  );
  return result.rows.map((row) => ({ activityId: row.activity_id, clicks: Number(row.clicks) }));
}

export type RecentClick = { activityId: string; clickedAt: string };

// Bounds how far back a client can ask for "recent" clicks — this only
// backs a short-interval live-polling feed, not historical reporting
// (that's getClickCounts above), so there's no reason to let it scan more
// than an hour of rows.
const MAX_RECENT_LOOKBACK_MS = 60 * 60 * 1000;

export async function getRecentClicks(sinceIso: string): Promise<{ clicks: RecentClick[]; serverTime: string }> {
  const now = Date.now();
  const requested = Date.parse(sinceIso);
  const since = new Date(Number.isFinite(requested) ? Math.max(requested, now - MAX_RECENT_LOOKBACK_MS) : now - 60_000);

  const result = await pool.query<{ activity_id: string; clicked_at: string }>(
    `SELECT activity_id, clicked_at
     FROM guide_link_clicks
     WHERE clicked_at > $1
     ORDER BY clicked_at ASC
     LIMIT 200`,
    [since.toISOString()]
  );

  return {
    clicks: result.rows.map((row) => ({ activityId: row.activity_id, clickedAt: row.clicked_at })),
    serverTime: new Date(now).toISOString(),
  };
}
