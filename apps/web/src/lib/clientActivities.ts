import countriesData from "@/data/countries.json";
import type { CountryDetail } from "./types";

const COUNTRIES = countriesData as CountryDetail[];

// A client-safe lookup (countries.json is a plain static import, fine to
// pull into client bundles) for resolving a favorited activity id back to
// its title + country, without a network round trip — used by the trip
// planner to give the model a favorites list as context.
export function findActivityById(id: string) {
  for (const country of COUNTRIES) {
    const activity = country.activities.find((a) => a.id === id);
    if (activity) return { ...activity, countryName: country.name };
  }
  return null;
}
