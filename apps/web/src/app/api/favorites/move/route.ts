import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { moveFavorite } from "@/lib/serverData";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { activityId, direction } = await req.json();
  if (typeof activityId !== "string" || (direction !== 1 && direction !== -1)) {
    return NextResponse.json({ error: "activityId and direction (1 | -1) required" }, { status: 400 });
  }
  const ids = await moveFavorite(userId, activityId, direction);
  return NextResponse.json({ ids });
}
