import { NextResponse } from "next/server";
import { recordPageView, isValidPath } from "@/lib/pageViews";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`hit:${ip}`, 60)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { path } = (body ?? {}) as { path?: unknown };
  if (!isValidPath(path)) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }

  await recordPageView(path);
  return NextResponse.json({ ok: true });
}
