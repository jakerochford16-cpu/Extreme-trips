import { Client } from "pg";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(path.join(__dirname, "schema.sql"), "utf8");

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DIRECT_URL or DATABASE_URL must be set");
  process.exit(1);
}

const client = new Client({ connectionString });

try {
  await client.connect();
  await client.query(sql);
  console.log("Schema applied successfully.");
} finally {
  await client.end();
}
