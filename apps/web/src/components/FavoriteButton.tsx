"use client";

import { useFavorites } from "@/lib/favorites";

export function FavoriteButton({ activityId }: { activityId: string }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(activityId);

  return (
    <button
      type="button"
      onClick={() => toggle(activityId)}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
        active
          ? "border-rose-400/60 bg-rose-500/15 text-rose-400"
          : "border-white/15 bg-white/[0.03] text-white/50 hover:border-white/30 hover:text-white/80"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4.5 w-4.5"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s-6.7-4.35-9.3-8.2C.9 9.8 1.9 6 5.2 5.1c2-.55 3.9.35 4.8 2C10.9 5.45 12.8 4.55 14.8 5.1c3.3.9 4.3 4.7 2.5 7.7C18.7 16.65 12 21 12 21z"
        />
      </svg>
    </button>
  );
}
