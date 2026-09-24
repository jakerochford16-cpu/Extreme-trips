"use client";

import { useMemo, useRef, useState } from "react";
import { useFavorites } from "@/lib/favorites";
import { findActivityById } from "@/lib/clientActivities";

type ChatTurn = { role: "user" | "model"; text: string };

const STARTER_PROMPTS = [
  "I land in Bishkek on Oct 5th, I want to ride horses",
  "3 days in Queenstown, NZ, what should I actually do?",
  "Cheapest way to see an active volcano up close",
];

export function PlanPageClient() {
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { favoriteIds } = useFavorites();
  const favoriteActivities = useMemo(
    () => favoriteIds.map(findActivityById).filter((a) => a !== null),
    [favoriteIds]
  );
  const [useFavoritesContext, setUseFavoritesContext] = useState(true);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextTurns: ChatTurn[] = [...turns, { role: "user", text: trimmed }];
    setTurns(nextTurns);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextTurns,
          favorites:
            useFavoritesContext && favoriteActivities.length > 0
              ? favoriteActivities.map((a) => `${a.title} (${a.countryName})`)
              : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setTurns([...nextTurns, { role: "model", text: data.reply }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch {
      setError("Couldn't reach the planner — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        Ask it anything
      </p>
      <h1 className="font-serif mt-2 text-4xl font-semibold text-[#FBF8F3] sm:text-5xl">Plan a trip</h1>
      <p className="mt-4 text-lg leading-relaxed text-white/70">
        Tell it where you&apos;re flying and what you want to do. It&apos;ll give you real
        transport options, costs, and a day-by-day breakdown — not just a list of
        attractions.
      </p>

      {favoriteActivities.length > 0 && (
        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
          <input
            type="checkbox"
            checked={useFavoritesContext}
            onChange={(e) => setUseFavoritesContext(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#c17f4e]"
          />
          <span>
            <span className="font-semibold text-white">
              Use your {favoriteActivities.length} favorite
              {favoriteActivities.length === 1 ? "" : "s"} as context
            </span>{" "}
            — {favoriteActivities.map((a) => a.title).join(" • ")}
          </span>
        </label>
      )}

      {turns.length === 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => send(prompt)}
              className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition hover:border-accent/60 hover:text-white"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 flex-1 space-y-4">
        {turns.map((turn, i) => (
          <div
            key={i}
            className={`rounded-2xl border p-5 ${
              turn.role === "user"
                ? "border-accent/30 bg-accent/10"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
              {turn.role === "user" ? "You" : "Outer Line"}
            </p>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/85">
              {turn.text}
            </p>
          </div>
        ))}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/40">
            Working it out&hellip;
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="sticky bottom-6 mt-8 flex gap-2 rounded-2xl border border-white/15 bg-surface p-2 shadow-2xl"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="I land in Nairobi on the 12th, I want to climb something"
          className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </main>
  );
}
