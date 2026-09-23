"use client";

import { useCallback, useEffect, useState } from "react";

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

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(readFavorites());
    const sync = () => setIds(readFavorites());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isFavorite = useCallback((activityId: string) => ids.includes(activityId), [ids]);

  const toggle = useCallback((activityId: string) => {
    const current = readFavorites();
    const next = current.includes(activityId)
      ? current.filter((id) => id !== activityId)
      : [...current, activityId];
    writeFavorites(next);
  }, []);

  return { favoriteIds: ids, isFavorite, toggle };
}
