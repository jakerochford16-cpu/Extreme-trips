import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { deleteReview, getReview, upsertReview } from "@/lib/serverData";
import { isValidActivityId, isValidRating, isValidReviewText } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { activityId } = await params;
  if (!isValidActivityId(activityId)) {
    return NextResponse.json({ error: "Invalid activityId" }, { status: 400 });
  }
  const review = await getReview(userId, activityId);
  return NextResponse.json({ review });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (isRateLimited(`reviews:${userId}`, 30)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { activityId } = await params;
  if (!isValidActivityId(activityId)) {
    return NextResponse.json({ error: "Invalid activityId" }, { status: 400 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { rating, text } = (body ?? {}) as { rating?: unknown; text?: unknown };
  if (!isValidRating(rating)) {
    return NextResponse.json({ error: "rating (integer 1-5) required" }, { status: 400 });
  }
  const reviewText = text === undefined ? "" : text;
  if (!isValidReviewText(reviewText)) {
    return NextResponse.json({ error: "text is too long" }, { status: 400 });
  }
  const review = await upsertReview(userId, activityId, rating, reviewText);
  return NextResponse.json({ review });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (isRateLimited(`reviews-delete:${userId}`, 30)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { activityId } = await params;
  if (!isValidActivityId(activityId)) {
    return NextResponse.json({ error: "Invalid activityId" }, { status: 400 });
  }
  await deleteReview(userId, activityId);
  return NextResponse.json({ ok: true });
}
