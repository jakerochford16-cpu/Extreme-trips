import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { mergeLocalData, type StoredReview } from "@/lib/serverData";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const body = await req.json();
  const favorites: string[] = Array.isArray(body.favorites) ? body.favorites : [];
  const reviews: Record<string, StoredReview> =
    body.reviews && typeof body.reviews === "object" ? body.reviews : {};

  await mergeLocalData(userId, favorites, reviews);
  return NextResponse.json({ ok: true });
}
