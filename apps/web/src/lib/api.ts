import type { ActivityWithCountry, CountryDetail, CountrySummary } from "./types";
import countriesData from "@/data/countries.json";
import { isSponsored } from "./sponsorships";

// The full curated dataset, baked into the app at build time — see
// apps/api/prisma/data.ts (source of truth) and
// apps/api/scripts/build-static-data.ts (regenerates this JSON). No live
// API or database is involved at runtime, which is what lets this app
// deploy as a plain static/serverless Next.js site with zero configuration.
const COUNTRIES = countriesData as CountryDetail[];

export async function getCountries(): Promise<CountrySummary[]> {
  return COUNTRIES.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    continent: c.continent,
    summary: c.summary,
    heroTag: c.heroTag,
    activityCount: c.activityCount,
    extremenessRating: c.extremenessRating,
  })).sort((a, b) => a.name.localeCompare(b.name));
}

// Sponsored placements (see /partner) surface first in the default browse
// order — everywhere else (most-extreme-first, free-first, etc.) is left
// as the visitor's own explicit choice, un-nudged.
function sponsoredFirst<T extends { id: string; title: string }>(activities: T[]): T[] {
  const sponsored = activities.filter((a) => isSponsored(a.id));
  const rest = activities.filter((a) => !isSponsored(a.id));
  return [...sponsored, ...rest];
}

export async function getCountry(slug: string): Promise<CountryDetail | null> {
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) return null;
  const activities = country.activities
    .map((activity) => ({ ...activity, sponsored: isSponsored(activity.id) }))
    .sort((a, b) => a.title.localeCompare(b.title));
  return {
    ...country,
    activities: sponsoredFirst(activities),
  };
}

export async function getActivities(): Promise<ActivityWithCountry[]> {
  const activities = COUNTRIES.flatMap((country) =>
    country.activities.map((activity) => ({
      ...activity,
      sponsored: isSponsored(activity.id),
      country: { name: country.name, slug: country.slug },
    }))
  ).sort((a, b) => a.title.localeCompare(b.title));
  return sponsoredFirst(activities);
}
