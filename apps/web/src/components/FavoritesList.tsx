"use client";

import Link from "next/link";
import { ActivityCard } from "./ActivityCard";
import { useFavorites } from "@/lib/favorites";
import type { ActivityWithCountry } from "@/lib/types";

export function FavoritesList({ activities }: { activities: ActivityWithCountry[] }) {
  const { isFavorite } = useFavorites();
  const favorites = activities.filter((a) => isFavorite(a.id));

  if (favorites.length === 0) {
    return (
      <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
        No favorites yet. Browse a country and tap the heart on any activity to save it here.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {favorites.map((activity) => (
        <div key={activity.id}>
          <Link
            href={`/countries/${activity.country.slug}#${activity.id}`}
            className="mb-1.5 inline-block text-xs font-semibold uppercase tracking-widest text-white/40 hover:text-white/70"
          >
            {activity.country.name} &rarr;
          </Link>
          <ActivityCard activity={activity} countryName={activity.country.name} />
        </div>
      ))}
    </div>
  );
}
