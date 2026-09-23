import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { DATASET_CONTEXT } from "@/lib/planner/datasetContext";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = "gemini-2.5-flash";

function buildSystemPrompt(favorites?: string[]): string {
  const favoritesBlock =
    favorites && favorites.length > 0
      ? `\n\nThe user has favorited these activities in the app: ${favorites.join(
          "; "
        )}. They may be asking about one of these directly, or want a trip built around several of them — factor that in where it's relevant, but don't force it into every reply if the question is unrelated.`
      : "";

  return `You are the trip-planning assistant built into Outer Line, a travel app for extremists — people who want to wild camp on a mountaintop or ride horses across a mountain range, not sightsee.

When someone tells you where they're flying and what they want to do, give them a real, usable plan:
- Concrete transport logistics from the arrival point to where the activity happens (options like train/shared taxi/bus/private transfer, with a rough price and travel time for each — say when you're estimating rather than certain).
- A realistic cost and duration for the activity itself (e.g. "$150 for a 3-day horse trek").
- A rough day-by-day breakdown once they're out there — what happens after arrival, what a multi-day itinerary looks like, where it's possible to add on a hike or extra day.
- Practical logistics: permits, guides, best season, what to bring, and genuine safety/risk notes — this app doesn't sanitize risk, so don't either.

Below is the app's own curated dataset of activities already written up in the app, across 50 countries. If a question overlaps with one of these, mention it by name and point the user to its page (the path is given in parentheses after each country name) — but you are NOT limited to this list. Most questions (like flying somewhere and wanting to ride horses) will be about places and activities outside this dataset entirely — answer those fully from your own knowledge, with the same level of concrete, practical detail.

${DATASET_CONTEXT}${favoritesBlock}

Formatting: plain text only, no markdown symbols (no #, no **, no markdown tables). Use short paragraphs and simple "- " dashes for lists. Keep it tight and scannable — this is a chat reply, not an essay. Be direct and a little blunt, matching the app's voice: practical over polished, real numbers over vague reassurance, and always flag when a cost or time is a rough estimate rather than a quoted price.`;
}

type ChatTurn = { role: "user" | "model"; text: string };

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The trip planner isn't set up yet — GEMINI_API_KEY is missing. Add it in Vercel under Project Settings → Environment Variables, then redeploy.",
      },
      { status: 500 }
    );
  }

  let body: { messages?: ChatTurn[]; favorites?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const favorites = Array.isArray(body.favorites)
    ? body.favorites.filter((f): f is string => typeof f === "string").slice(0, 30)
    : undefined;

  const contents = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = buildSystemPrompt(favorites);
  const attempts = 3;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents,
        config: {
          systemInstruction,
          maxOutputTokens: 2048,
        },
      });

      const text = response.text;
      if (!text) {
        return NextResponse.json(
          { error: "The planner didn't return a response — try rephrasing." },
          { status: 502 }
        );
      }

      return NextResponse.json({ reply: text });
    } catch (error) {
      const isOverloaded =
        error instanceof Error && /503|overloaded|unavailable/i.test(error.message);
      const isQuota = error instanceof Error && /quota|rate.?limit|429/i.test(error.message);

      console.error(`Gemini request failed (attempt ${attempt}/${attempts}):`, error);

      if (isOverloaded && attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      const message = isQuota
        ? "The free planner quota is used up for now — it resets automatically, try again in a bit."
        : isOverloaded
          ? "Google's model is overloaded right now — this is on their end, not yours. Try again in a minute."
          : "The trip planner hit an error. Try again in a moment.";
      return NextResponse.json({ error: message }, { status: 502 });
    }
  }

  return NextResponse.json({ error: "The trip planner hit an error. Try again in a moment." }, { status: 502 });
}
