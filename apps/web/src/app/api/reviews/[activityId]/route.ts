import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { deleteReview, getReview, upsertReview } from "@/lib/serverData";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { activityId } = await params;
  const review = await getReview(userId, activityId);
  return NextResponse.json({ review });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { activityId } = await params;
  const { rating, text } = await req.json();
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "rating (1-5) required" }, { status: 400 });
  }
  const review = await upsertReview(userId, activityId, rating, typeof text === "string" ? text : "");
  return NextResponse.json({ review });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { activityId } = await params;
  await deleteReview(userId, activityId);
  return NextResponse.json({ ok: true });
}
