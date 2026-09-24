import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getFavoriteIds, toggleFavorite } from "@/lib/serverData";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const ids = await getFavoriteIds(userId);
  return NextResponse.json({ ids });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { activityId } = await req.json();
  if (typeof activityId !== "string" || !activityId) {
    return NextResponse.json({ error: "activityId required" }, { status: 400 });
  }
  const ids = await toggleFavorite(userId, activityId);
  return NextResponse.json({ ids });
}
