import { NextResponse } from "next/server";
import { recordOperatorInquiry } from "@/lib/operatorInquiries";
import { isValidEmail, isValidInquiryMessage, isValidShortText } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  // Low-frequency form, not a click tracker — 5/minute per IP is generous
  // for a real submitter and still cheap insurance against a spam script.
  if (isRateLimited(`operator-inquiries:${ip}`, 5)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, company, email, region, activity, message } = (body ?? {}) as {
    name?: unknown;
    company?: unknown;
    email?: unknown;
    region?: unknown;
    activity?: unknown;
    message?: unknown;
  };

  if (
    !isValidShortText(name) ||
    !isValidShortText(company) ||
    !isValidEmail(email) ||
    !isValidShortText(region) ||
    !isValidShortText(activity) ||
    !isValidInquiryMessage(message ?? "")
  ) {
    return NextResponse.json({ error: "Please fill in all required fields correctly" }, { status: 400 });
  }

  await recordOperatorInquiry({
    name: name.trim(),
    company: company.trim(),
    email: email.trim(),
    region: region.trim(),
    activity: activity.trim(),
    message: typeof message === "string" ? message.trim() : "",
  });

  return NextResponse.json({ ok: true });
}
