import { NextResponse } from "next/server";
import { getRecentClicks } from "@/lib/clickTracking";
import { isRateLimited } from "@/lib/rateLimit";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const expectedKey = process.env.ADMIN_DASHBOARD_KEY;

  if (!expectedKey || key !== expectedKey) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  if (isRateLimited(`admin-recent-clicks:${key}`, 60)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const since = searchParams.get("since") ?? new Date(Date.now() - 60_000).toISOString();
  const data = await getRecentClicks(since);
  return NextResponse.json(data);
}
