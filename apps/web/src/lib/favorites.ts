"use client";

import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { useUser } from "@clerk/nextjs";

const STORAGE_KEY = "outer-line:favorites";
const EVENT_NAME = "outer-line:favorites-changed";

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // localStorage unavailable (private mode, etc.) — favoriting silently no-ops
  }
}

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function useFavorites() {
  const { isSignedIn } = useUser();

  const [localIds, setLocalIds] = useState<string[]>([]);
  useEffect(() => {
    if (isSignedIn) return;
    setLocalIds(readFavorites());
    const sync = () => setLocalIds(readFavorites());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, [isSignedIn]);

  const { data, mutate } = useSWR<{ ids: string[] }>(
    isSignedIn ? "/api/favorites" : null,
    fetchJSON
  );

  const ids = isSignedIn ? data?.ids ?? [] : localIds;

  const isFavorite = useCallback((activityId: string) => ids.includes(activityId), [ids]);

  const toggle = useCallback(
    (activityId: string) => {
      if (isSignedIn) {
        const optimistic = ids.includes(activityId)
          ? ids.filter((id) => id !== activityId)
          : [...ids, activityId];
        mutate(
          fetchJSON("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ activityId }),
          }),
          { optimisticData: { ids: optimistic }, rollbackOnError: true, revalidate: false }
        );
        return;
      }
      const current = readFavorites();
      const next = current.includes(activityId)
        ? current.filter((id) => id !== activityId)
        : [...current, activityId];
      writeFavorites(next);
    },
    [isSignedIn, ids, mutate]
  );

  // Favorite order doubles as a rough itinerary order — reordering here is
  // what "Move up/down" on the favorites page does.
  const move = useCallback(
    (activityId: string, direction: -1 | 1) => {
      if (isSignedIn) {
        const from = ids.indexOf(activityId);
        const to = from + direction;
        if (from === -1 || to < 0 || to >= ids.length) return;
        const optimistic = [...ids];
        [optimistic[from], optimistic[to]] = [optimistic[to], optimistic[from]];
        mutate(
          fetchJSON("/api/favorites/move", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ activityId, direction }),
          }),
          { optimisticData: { ids: optimistic }, rollbackOnError: true, revalidate: false }
        );
        return;
      }
      const current = readFavorites();
      const from = current.indexOf(activityId);
      const to = from + direction;
      if (from === -1 || to < 0 || to >= current.length) return;
      const next = [...current];
      [next[from], next[to]] = [next[to], next[from]];
      writeFavorites(next);
    },
    [isSignedIn, ids, mutate]
  );

  return { favoriteIds: ids, isFavorite, toggle, move };
}
