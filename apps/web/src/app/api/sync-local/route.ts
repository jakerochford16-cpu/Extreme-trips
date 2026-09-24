import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { mergeLocalData } from "@/lib/serverData";
import { isValidSyncFavorites, isValidSyncReviews } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (isRateLimited(`sync-local:${userId}`, 5)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { favorites, reviews } = (body ?? {}) as { favorites?: unknown; reviews?: unknown };
  if (!isValidSyncFavorites(favorites) || !isValidSyncReviews(reviews)) {
    return NextResponse.json({ error: "Invalid favorites or reviews payload" }, { status: 400 });
  }

  await mergeLocalData(userId, favorites, reviews);
  return NextResponse.json({ ok: true });
}
