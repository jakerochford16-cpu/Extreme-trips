import { pool } from "./db";

export type OperatorInquiryInput = {
  name: string;
  company: string;
  email: string;
  region: string;
  activity: string;
  message: string;
};

export async function recordOperatorInquiry(input: OperatorInquiryInput): Promise<void> {
  await pool.query(
    `INSERT INTO operator_inquiries (name, company, email, region, activity, message)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [input.name, input.company, input.email, input.region, input.activity, input.message]
  );
}

export type OperatorInquiry = {
  id: number;
  name: string;
  company: string;
  email: string;
  region: string;
  activity: string;
  message: string;
  createdAt: string;
};

export async function getOperatorInquiries(sinceDays: number): Promise<OperatorInquiry[]> {
  const result = await pool.query<{
    id: string;
    name: string;
    company: string;
    email: string;
    region: string;
    activity: string;
    message: string;
    created_at: string;
  }>(
    `SELECT id, name, company, email, region, activity, message, created_at
     FROM operator_inquiries
     WHERE created_at >= now() - ($1::double precision * INTERVAL '1 day')
     ORDER BY created_at DESC`,
    [sinceDays]
  );
  return result.rows.map((row) => ({
    id: Number(row.id),
    name: row.name,
    company: row.company,
    email: row.email,
    region: row.region,
    activity: row.activity,
    message: row.message,
    createdAt: row.created_at,
  }));
}
