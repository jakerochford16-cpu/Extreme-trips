"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useSWRConfig } from "swr";

const FAVORITES_KEY = "outer-line:favorites";
const REVIEWS_KEY = "outer-line:reviews";
const MIGRATED_KEY = "outer-line:synced-to-account";

// Runs once, mounted at the root layout: the first time someone who already
// has local (device-only) favorites/reviews signs in, this pushes that data
// into their new account so it isn't silently lost, then clears it locally.
export function AccountSync() {
  const { isSignedIn } = useUser();
  const { mutate } = useSWRConfig();
  const ran = useRef(false);

  useEffect(() => {
    if (!isSignedIn || ran.current) return;
    if (window.localStorage.getItem(MIGRATED_KEY) === "1") return;
    ran.current = true;

    let favorites: string[] = [];
    let reviews: Record<string, unknown> = {};
    try {
      favorites = JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]");
      reviews = JSON.parse(window.localStorage.getItem(REVIEWS_KEY) ?? "{}");
    } catch {
      // malformed local data — nothing worth migrating
    }

    if (favorites.length === 0 && Object.keys(reviews).length === 0) {
      window.localStorage.setItem(MIGRATED_KEY, "1");
      return;
    }

    fetch("/api/sync-local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorites, reviews }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("sync failed");
        window.localStorage.setItem(MIGRATED_KEY, "1");
        window.localStorage.removeItem(FAVORITES_KEY);
        window.localStorage.removeItem(REVIEWS_KEY);
        mutate("/api/favorites");
        mutate((key) => typeof key === "string" && key.startsWith("/api/reviews/"));
      })
      .catch(() => {
        ran.current = false;
      });
  }, [isSignedIn, mutate]);

  return null;
}
