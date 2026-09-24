import { pool } from "./db";

const MAX_PATH_LENGTH = 300;

export function isValidPath(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= MAX_PATH_LENGTH && value.startsWith("/");
}

export async function recordPageView(path: string): Promise<void> {
  await pool.query("INSERT INTO page_views (path) VALUES ($1)", [path]);
}

export async function getPageViewStats(sinceDays: number): Promise<{ total: number; today: number }> {
  const result = await pool.query<{ total: string; today: string }>(
    `SELECT
       COUNT(*) FILTER (WHERE viewed_at >= now() - ($1::double precision * INTERVAL '1 day')) AS total,
       COUNT(*) FILTER (WHERE viewed_at >= date_trunc('day', now())) AS today
     FROM page_views`,
    [sinceDays]
  );
  const row = result.rows[0];
  return { total: Number(row?.total ?? 0), today: Number(row?.today ?? 0) };
}
