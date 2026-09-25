"use client";

import { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useFavorites } from "@/lib/favorites";

const DISMISSED_KEY = "outer-line:favorite-prompt-dismissed";

// Nudges a signed-out visitor to create an account right after they've
// favorited something — the moment they've just felt the cost of losing it
// (device-only storage), not on page load before they've seen any value.
export function FavoriteSignInPrompt() {
  const { isSignedIn, isLoaded } = useUser();
  const { favoriteIds } = useFavorites();
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.localStorage.getItem(DISMISSED_KEY) === "1";
    } catch {
      return false;
    }
  });

  if (!isLoaded || isSignedIn || dismissed || favoriteIds.length === 0) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // localStorage unavailable — the prompt just won't remember being dismissed
    }
    setDismissed(true);
  }

  return (
    <div className="no-print fixed inset-x-4 bottom-4 z-40 rounded-xl border border-white/10 bg-surface/95 p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-80">
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-3 text-white/40 transition hover:text-white/70"
      >
        &times;
      </button>
      <p className="pr-5 text-sm font-semibold text-[#FBF8F3]">Saved to this device only</p>
      <p className="mt-1 text-sm leading-relaxed text-white/60">
        Sign in to keep your favorites across devices and pick up trip planning anywhere.
      </p>
      <div className="mt-3 flex gap-2">
        <SignInButton mode="modal">
          <button
            type="button"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:bg-accent-light"
          >
            Sign in
          </button>
        </SignInButton>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
