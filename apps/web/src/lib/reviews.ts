"use client";

import { useCallback, useEffect, useState } from "react";

// There's no backend here, so there's no way to honestly show other people's
// star ratings or reviews — anything presented as crowd feedback without a
// real crowd behind it would just be fabricated. Instead this stores YOUR
// own rating/notes per activity, on this device, for your own reference —
// an honest "my trip journal" feature rather than fake social proof.
export type StoredReview = { rating: number; text: string; updatedAt: string };

const STORAGE_KEY = "outer-line:reviews";
const EVENT_NAME = "outer-line:reviews-changed";

function readAll(): Record<string, StoredReview> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, StoredReview>) : {};
  } catch {
    return {};
  }
}

function writeAll(all: Record<string, StoredReview>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // localStorage unavailable — reviews silently no-op
  }
}

export function useActivityReview(activityId: string) {
  const [review, setReview] = useState<StoredReview | null>(null);

  useEffect(() => {
    setReview(readAll()[activityId] ?? null);
    const sync = () => setReview(readAll()[activityId] ?? null);
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, [activityId]);

  const save = useCallback(
    (rating: number, text: string) => {
      const all = readAll();
      all[activityId] = { rating, text, updatedAt: new Date().toISOString() };
      writeAll(all);
    },
    [activityId]
  );

  const clear = useCallback(() => {
    const all = readAll();
    delete all[activityId];
    writeAll(all);
  }, [activityId]);

  return { review, save, clear };
}
