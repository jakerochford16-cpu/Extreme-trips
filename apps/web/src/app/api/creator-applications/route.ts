import { NextResponse } from "next/server";
import { recordCreatorApplication } from "@/lib/creatorApplications";
import { isValidEmail, isValidInquiryMessage, isValidShortText } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  // Low-frequency form, not a click tracker — same posture as operator-inquiries.
  if (isRateLimited(`creator-applications:${ip}`, 5)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, handle, platform, followerCount, niche, email, message } = (body ?? {}) as {
    name?: unknown;
    handle?: unknown;
    platform?: unknown;
    followerCount?: unknown;
    niche?: unknown;
    email?: unknown;
    message?: unknown;
  };

  if (
    !isValidShortText(name) ||
    !isValidShortText(handle) ||
    !isValidShortText(platform) ||
    !isValidShortText(followerCount) ||
    !isValidShortText(niche) ||
    !isValidEmail(email) ||
    !isValidInquiryMessage(message ?? "")
  ) {
    return NextResponse.json({ error: "Please fill in all required fields correctly" }, { status: 400 });
  }

  await recordCreatorApplication({
    name: name.trim(),
    handle: handle.trim(),
    platform: platform.trim(),
    followerCount: followerCount.trim(),
    niche: niche.trim(),
    email: email.trim(),
    message: typeof message === "string" ? message.trim() : "",
  });

  return NextResponse.json({ ok: true });
}
