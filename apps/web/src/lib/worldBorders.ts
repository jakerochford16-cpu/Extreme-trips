import rawBorders from "@/data/worldBorders.json";

export type CountryBorder = {
  name: string;
  // Each entry is a ring of [lng, lat] pairs — one per outer/inner ring of
  // every polygon that makes up the country (islands, exclaves and holes
  // all become separate rings, which is fine for outline rendering).
  rings: [number, number][][];
};

// Pre-converted and simplified from the standard world-atlas country
// boundary dataset (the same public source globe.gl's own examples use for
// country outlines) at build time — see
// scratch script referenced in the PR that added this file. Baked in
// statically like countries.json rather than fetched at runtime, so it
// works offline, doesn't need a CSP allowance for a third-party CDN, and
// never depends on that CDN being up.
const BORDERS = rawBorders as CountryBorder[];

export function getWorldBorders(): Promise<CountryBorder[]> {
  return Promise.resolve(BORDERS);
}
