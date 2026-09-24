"use client";

import { useState } from "react";
import type { Activity } from "@/lib/types";
import {
  BLANK_ANSWERS,
  readinessQuestions,
  readinessVerdict,
  type ReadinessAnswers,
} from "@/lib/readinessCheck";

const TONE_STYLES = {
  green: "border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-200",
  yellow: "border-amber-500/30 bg-amber-500/[0.06] text-amber-200",
  red: "border-red-500/30 bg-red-500/[0.06] text-red-200",
};

type Activityish = Pick<Activity, "difficulty" | "riskLevel" | "guideRequired" | "permitRequired">;

export function ReadinessCheck({ activity }: { activity: Activityish }) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<ReadinessAnswers>(BLANK_ANSWERS);
  const [showVerdict, setShowVerdict] = useState(false);

  const questions = readinessQuestions(activity);
  const allAnswered = questions.every((q) => answers[q.key] !== null);
  const verdict = showVerdict ? readinessVerdict(activity, answers) : null;

  function reset() {
    setAnswers(BLANK_ANSWERS);
    setShowVerdict(false);
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        Am I actually ready for this?
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          {!verdict ? (
            <>
              <div className="space-y-4">
                {questions.map((q) => (
                  <div key={q.key}>
                    <p className="text-sm text-white/80">{q.text}</p>
                    <div className="mt-2 flex gap-2">
                      {[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setAnswers((a) => ({ ...a, [q.key]: opt.value }))}
                          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                            answers[q.key] === opt.value
                              ? "border-accent bg-accent/15 text-accent-light"
                              : "border-white/15 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowVerdict(true)}
                disabled={!allAnswered}
                className="mt-4 rounded-lg bg-accent px-4 py-1.5 text-xs font-bold text-ink transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-40"
              >
                See the honest answer
              </button>
            </>
          ) : (
            <div>
              <div className={`rounded-lg border p-3 text-sm font-semibold ${TONE_STYLES[verdict.tone]}`}>
                {verdict.summary}
              </div>
              {verdict.concerns.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {verdict.concerns.map((c, i) => (
                    <li key={i} className="text-xs leading-relaxed text-white/65">
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={reset}
                className="mt-3 text-xs font-semibold text-white/50 hover:text-white/70"
              >
                Start over
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
