import { pool } from "./db";

export type CreatorApplicationInput = {
  name: string;
  handle: string;
  platform: string;
  followerCount: string;
  niche: string;
  email: string;
  message: string;
};

export async function recordCreatorApplication(input: CreatorApplicationInput): Promise<void> {
  await pool.query(
    `INSERT INTO creator_applications (name, handle, platform, follower_count, niche, email, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [input.name, input.handle, input.platform, input.followerCount, input.niche, input.email, input.message]
  );
}

export type CreatorApplication = {
  id: number;
  name: string;
  handle: string;
  platform: string;
  followerCount: string;
  niche: string;
  email: string;
  message: string;
  createdAt: string;
};

export async function getCreatorApplications(sinceDays: number): Promise<CreatorApplication[]> {
  const result = await pool.query<{
    id: string;
    name: string;
    handle: string;
    platform: string;
    follower_count: string;
    niche: string;
    email: string;
    message: string;
    created_at: string;
  }>(
    `SELECT id, name, handle, platform, follower_count, niche, email, message, created_at
     FROM creator_applications
     WHERE created_at >= now() - ($1::double precision * INTERVAL '1 day')
     ORDER BY created_at DESC`,
    [sinceDays]
  );
  return result.rows.map((row) => ({
    id: Number(row.id),
    name: row.name,
    handle: row.handle,
    platform: row.platform,
    followerCount: row.follower_count,
    niche: row.niche,
    email: row.email,
    message: row.message,
    createdAt: row.created_at,
  }));
}
