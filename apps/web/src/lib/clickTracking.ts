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
