import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getFavoriteIds, toggleFavorite } from "@/lib/serverData";
import { isValidActivityId } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const ids = await getFavoriteIds(userId);
  return NextResponse.json({ ids });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (isRateLimited(`favorites:${userId}`, 60)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { activityId } = (body ?? {}) as { activityId?: unknown };
  if (!isValidActivityId(activityId)) {
    return NextResponse.json({ error: "activityId required" }, { status: 400 });
  }
  const ids = await toggleFavorite(userId, activityId);
  return NextResponse.json({ ids });
}
