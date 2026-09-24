import { NextResponse } from "next/server";
import { recordGuideClick } from "@/lib/clickTracking";
import { isValidActivityId } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`track-click:${ip}`, 30)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { activityId } = (body ?? {}) as { activityId?: unknown };
  if (!isValidActivityId(activityId)) {
    return NextResponse.json({ error: "activityId required" }, { status: 400 });
  }

  await recordGuideClick(activityId);
  return NextResponse.json({ ok: true });
}
