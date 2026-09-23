import type { CountryDetail } from "@/lib/types";
import countriesData from "@/data/countries.json";

const COUNTRIES = countriesData as CountryDetail[];

// A compact, plain-text summary of the curated dataset for the trip planner's
// system prompt — enough for the model to recognize and reference activities
// we've already written up (and link back into the app), without shipping
// full descriptions on every request. Computed once at module load.
export const DATASET_CONTEXT: string = COUNTRIES.map((country) => {
  const lines = country.activities
    .map(
      (a) =>
        `  - ${a.title} (${a.region}) — ${a.category}, difficulty ${a.difficulty}, risk ${a.riskLevel}, cost ${
          a.costEstimate ? `${a.currency ?? ""} ${a.costEstimate}`.trim() : a.costType
        }`
    )
    .join("\n");
  return `${country.name} (/countries/${country.slug}):\n${lines}`;
}).join("\n\n");
