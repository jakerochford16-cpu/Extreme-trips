"use client";

import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { useUser } from "@clerk/nextjs";

// Anything presented as crowd feedback without a real crowd behind it would
// just be fabricated, so this stores YOUR own rating/notes per activity —
// an honest "my trip journal" feature rather than fake social proof. Signed
// out, it lives on this device only; signed in, it syncs to your account.
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

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function useActivityReview(activityId: string) {
  const { isSignedIn } = useUser();

  const [localReview, setLocalReview] = useState<StoredReview | null>(null);
  useEffect(() => {
    if (isSignedIn) return;
    setLocalReview(readAll()[activityId] ?? null);
    const sync = () => setLocalReview(readAll()[activityId] ?? null);
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, [isSignedIn, activityId]);

  const { data, mutate } = useSWR<{ review: StoredReview | null }>(
    isSignedIn ? `/api/reviews/${activityId}` : null,
    fetchJSON
  );

  const review = isSignedIn ? data?.review ?? null : localReview;

  const save = useCallback(
    (rating: number, text: string) => {
      if (isSignedIn) {
        const optimistic = { rating, text, updatedAt: new Date().toISOString() };
        mutate(
          fetchJSON(`/api/reviews/${activityId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating, text }),
          }),
          { optimisticData: { review: optimistic }, rollbackOnError: true, revalidate: false }
        );
        return;
      }
      const all = readAll();
      all[activityId] = { rating, text, updatedAt: new Date().toISOString() };
      writeAll(all);
    },
    [isSignedIn, activityId, mutate]
  );

  const clear = useCallback(() => {
    if (isSignedIn) {
      mutate(
        fetchJSON(`/api/reviews/${activityId}`, { method: "DELETE" }).then(() => ({
          review: null,
        })),
        { optimisticData: { review: null }, rollbackOnError: true, revalidate: false }
      );
      return;
    }
    const all = readAll();
    delete all[activityId];
    writeAll(all);
  }, [isSignedIn, activityId, mutate]);

  return { review, save, clear };
}
