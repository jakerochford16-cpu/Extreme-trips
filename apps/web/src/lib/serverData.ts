import { pool } from "./db";

export async function getFavoriteIds(userId: string): Promise<string[]> {
  const { rows } = await pool.query<{ activity_id: string }>(
    "SELECT activity_id FROM favorites WHERE user_id = $1 ORDER BY position ASC",
    [userId]
  );
  return rows.map((r) => r.activity_id);
}

export async function toggleFavorite(userId: string, activityId: string): Promise<string[]> {
  const existing = await pool.query(
    "SELECT id FROM favorites WHERE user_id = $1 AND activity_id = $2",
    [userId, activityId]
  );
  if (existing.rowCount && existing.rowCount > 0) {
    await pool.query("DELETE FROM favorites WHERE user_id = $1 AND activity_id = $2", [
      userId,
      activityId,
    ]);
  } else {
    const { rows } = await pool.query<{ max: number | null }>(
      "SELECT MAX(position) AS max FROM favorites WHERE user_id = $1",
      [userId]
    );
    const nextPosition = (rows[0]?.max ?? -1) + 1;
    await pool.query(
      "INSERT INTO favorites (user_id, activity_id, position) VALUES ($1, $2, $3) ON CONFLICT (user_id, activity_id) DO NOTHING",
      [userId, activityId, nextPosition]
    );
  }
  return getFavoriteIds(userId);
}

export async function moveFavorite(
  userId: string,
  activityId: string,
  direction: -1 | 1
): Promise<string[]> {
  const { rows } = await pool.query<{ activity_id: string; position: number }>(
    "SELECT activity_id, position FROM favorites WHERE user_id = $1 ORDER BY position ASC",
    [userId]
  );
  const from = rows.findIndex((r) => r.activity_id === activityId);
  const to = from + direction;
  if (from === -1 || to < 0 || to >= rows.length) return rows.map((r) => r.activity_id);

  const a = rows[from];
  const b = rows[to];
  await pool.query("UPDATE favorites SET position = $1 WHERE user_id = $2 AND activity_id = $3", [
    b.position,
    userId,
    a.activity_id,
  ]);
  await pool.query("UPDATE favorites SET position = $1 WHERE user_id = $2 AND activity_id = $3", [
    a.position,
    userId,
    b.activity_id,
  ]);
  return getFavoriteIds(userId);
}

export type StoredReview = { rating: number; text: string; updatedAt: string };

export async function getReview(userId: string, activityId: string): Promise<StoredReview | null> {
  const { rows } = await pool.query<{ rating: number; review_text: string; updated_at: Date }>(
    "SELECT rating, review_text, updated_at FROM reviews WHERE user_id = $1 AND activity_id = $2",
    [userId, activityId]
  );
  if (rows.length === 0) return null;
  const r = rows[0];
  return { rating: r.rating, text: r.review_text, updatedAt: r.updated_at.toISOString() };
}

export async function upsertReview(
  userId: string,
  activityId: string,
  rating: number,
  text: string
): Promise<StoredReview> {
  const { rows } = await pool.query<{ rating: number; review_text: string; updated_at: Date }>(
    `INSERT INTO reviews (user_id, activity_id, rating, review_text, updated_at)
     VALUES ($1, $2, $3, $4, now())
     ON CONFLICT (user_id, activity_id)
     DO UPDATE SET rating = $3, review_text = $4, updated_at = now()
     RETURNING rating, review_text, updated_at`,
    [userId, activityId, rating, text]
  );
  const r = rows[0];
  return { rating: r.rating, text: r.review_text, updatedAt: r.updated_at.toISOString() };
}

export async function deleteReview(userId: string, activityId: string): Promise<void> {
  await pool.query("DELETE FROM reviews WHERE user_id = $1 AND activity_id = $2", [
    userId,
    activityId,
  ]);
}

export async function mergeLocalData(
  userId: string,
  localFavoriteIds: string[],
  localReviews: Record<string, StoredReview>
): Promise<void> {
  const { rows: favRows } = await pool.query<{ max: number | null }>(
    "SELECT MAX(position) AS max FROM favorites WHERE user_id = $1",
    [userId]
  );
  let nextPosition = (favRows[0]?.max ?? -1) + 1;
  for (const activityId of localFavoriteIds) {
    await pool.query(
      "INSERT INTO favorites (user_id, activity_id, position) VALUES ($1, $2, $3) ON CONFLICT (user_id, activity_id) DO NOTHING",
      [userId, activityId, nextPosition]
    );
    nextPosition += 1;
  }

  for (const [activityId, review] of Object.entries(localReviews)) {
    await pool.query(
      `INSERT INTO reviews (user_id, activity_id, rating, review_text, updated_at)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, activity_id) DO NOTHING`,
      [userId, activityId, review.rating, review.text, review.updatedAt]
    );
  }
}
