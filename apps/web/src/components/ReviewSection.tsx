"use client";

import { useEffect, useState } from "react";
import { useActivityReview } from "@/lib/reviews";

function Stars({
  value,
  onChange,
  size = "text-lg",
}: {
  value: number;
  onChange?: (n: number) => void;
  size?: string;
}) {
  return (
    <div className={`flex items-center gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const className = `leading-none ${onChange ? "cursor-pointer" : "cursor-default"} ${
          n <= value ? "text-amber-400" : "text-white/20"
        }`;
        const label = `${n} star${n > 1 ? "s" : ""}`;
        // Rendered inside a parent <button> in the "no review yet" prompt,
        // so this can't itself be a <button> there — a span with the same
        // interaction only when onChange is actually provided.
        return onChange ? (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={className}
            aria-label={label}
          >
            ★
          </button>
        ) : (
          <span key={n} className={className} aria-label={label}>
            ★
          </span>
        );
      })}
    </div>
  );
}

export function ReviewSection({ activityId }: { activityId: string }) {
  const { review, save, clear } = useActivityReview(activityId);
  const [editing, setEditing] = useState(false);
  const [draftRating, setDraftRating] = useState(0);
  const [draftText, setDraftText] = useState("");

  useEffect(() => {
    if (editing) {
      setDraftRating(review?.rating ?? 0);
      setDraftText(review?.text ?? "");
    }
  }, [editing, review]);

  if (editing) {
    return (
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">
          Your rating
        </p>
        <Stars value={draftRating} onChange={setDraftRating} />
        <textarea
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          placeholder="How did it go? Notes for future-you or anyone else who saves this activity..."
          rows={3}
          maxLength={2000}
          className="mt-3 w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/60"
        />
        <p className="mt-1 text-right text-xs text-white/50">{draftText.length}/2000</p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (draftRating > 0) save(draftRating, draftText.trim());
              setEditing(false);
            }}
            disabled={draftRating === 0}
            className="rounded-lg bg-accent px-4 py-1.5 text-xs font-bold text-ink transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/60 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (review) {
    return (
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Your rating
            </p>
            <div className="mt-1">
              <Stars value={review.rating} />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-xs font-semibold text-white/50 hover:text-white"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={clear}
              className="text-xs font-semibold text-white/50 hover:text-rose-400"
            >
              Remove
            </button>
          </div>
        </div>
        {review.text && (
          <p className="mt-2 text-sm leading-relaxed text-white/70">{review.text}</p>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm font-medium text-white/50 transition hover:border-white/30 hover:text-white/80"
    >
      <Stars value={0} size="text-base" />
      Been here? Rate &amp; leave yourself a note
    </button>
  );
}
