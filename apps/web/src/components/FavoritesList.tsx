"use client";

import Link from "next/link";
import { ActivityCard } from "./ActivityCard";
import { useFavorites } from "@/lib/favorites";
import { itineraryToText, downloadTextFile } from "@/lib/exportItinerary";
import type { ActivityWithCountry } from "@/lib/types";

export function FavoritesList({ activities }: { activities: ActivityWithCountry[] }) {
  const { favoriteIds, isFavorite, move } = useFavorites();

  const byId = new Map(activities.map((a) => [a.id, a]));
  const favorites = favoriteIds
    .map((id) => byId.get(id))
    .filter((a): a is ActivityWithCountry => a !== undefined);

  if (favorites.length === 0) {
    return (
      <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
        No favorites yet. Browse a country and tap the heart on any activity to save it here.
      </p>
    );
  }

  return (
    <div>
      <div className="no-print mb-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => downloadTextFile("outer-line-itinerary.txt", itineraryToText(favorites))}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0l-4-4m4 4l4-4M5 21h14" />
          </svg>
          Download as text
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9V3h12v6M6 18H4a1 1 0 01-1-1v-5a1 1 0 011-1h16a1 1 0 011 1v5a1 1 0 01-1 1h-2M6 14h12v7H6v-7z"
            />
          </svg>
          Print / save as PDF
        </button>
      </div>

      <div className="space-y-5">
        {favorites.map((activity, i) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="no-print flex shrink-0 flex-col items-center gap-1 pt-1">
              <span className="text-sm font-black text-white/25">{i + 1}</span>
              <button
                type="button"
                onClick={() => move(activity.id, -1)}
                disabled={i === 0}
                aria-label="Move up"
                className="text-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => move(activity.id, 1)}
                disabled={i === favorites.length - 1}
                aria-label="Move down"
                className="text-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/countries/${activity.country.slug}#${activity.id}`}
                className="mb-1.5 inline-block text-xs font-semibold uppercase tracking-widest text-white/40 hover:text-white/70"
              >
                {activity.country.name} &rarr;
              </Link>
              <ActivityCard
                activity={activity}
                countryName={activity.country.name}
                countrySlug={activity.country.slug}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
