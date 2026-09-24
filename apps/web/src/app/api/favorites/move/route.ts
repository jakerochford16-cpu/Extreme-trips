import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { moveFavorite } from "@/lib/serverData";
import { isValidActivityId } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (isRateLimited(`favorites-move:${userId}`, 60)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { activityId, direction } = (body ?? {}) as { activityId?: unknown; direction?: unknown };
  if (!isValidActivityId(activityId) || (direction !== 1 && direction !== -1)) {
    return NextResponse.json({ error: "activityId and direction (1 | -1) required" }, { status: 400 });
  }
  const ids = await moveFavorite(userId, activityId, direction);
  return NextResponse.json({ ids });
}
