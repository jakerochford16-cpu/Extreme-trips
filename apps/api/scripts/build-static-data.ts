// Regenerates apps/web/src/data/countries.json from apps/api/prisma/data.ts —
// the same curated content the local dev database is seeded from, but
// pre-computed into the exact shape apps/web reads directly, with no
// database or live API involved at runtime. Run via `npm run build:data`
// from the repo root whenever prisma/data.ts changes.

import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import { data } from "../prisma/data";
import { groupForCategory } from "../src/categoryGroups";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const output = data.map((country) => {
  const activities = country.activities.map((a) => ({
    id: `${country.slug}--${slugify(a.title)}`,
    countryId: country.slug,
    title: a.title,
    region: a.region,
    category: a.category,
    categoryGroup: groupForCategory(a.category),
    description: a.description,
    costType: a.costType,
    costEstimate: a.costEstimate ?? null,
    currency: a.currency ?? null,
    difficulty: a.difficulty,
    riskLevel: a.riskLevel,
    permitRequired: a.permitRequired,
    guideRequired: a.guideRequired,
    bestSeason: a.bestSeason ?? null,
    latitude: a.latitude ?? null,
    longitude: a.longitude ?? null,
    tags: a.tags,
  }));

  return {
    id: country.slug,
    name: country.name,
    slug: country.slug,
    continent: country.continent,
    summary: country.summary,
    heroTag: country.heroTag,
    activityCount: activities.length,
    activities,
  };
});

const outPath = resolve(__dirname, "../../web/src/data/countries.json");
mkdirSync(resolve(outPath, ".."), { recursive: true });
writeFileSync(outPath, JSON.stringify(output, null, 2) + "\n");

const total = output.reduce((sum, c) => sum + c.activities.length, 0);
console.log(`Wrote ${output.length} countries, ${total} activities to ${outPath}`);
