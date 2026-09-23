// Per-country photo + accent color for the browse grid and country header.
// Accent colors are pulled from the existing category palette (categoryColors.ts)
// so the whole site — map pins, category chips, country cards — reads as one
// consistent color system rather than a separate "branding" palette.
export const COUNTRY_VISUALS: Record<string, { photo: string; accent: string }> = {
  switzerland: { photo: "/images/countries/switzerland.jpg", accent: "#38bdf8" },
  nepal: { photo: "/images/countries/nepal.jpg", accent: "#f97316" },
  iceland: { photo: "/images/countries/iceland.jpg", accent: "#ef4444" },
  australia: { photo: "/images/countries/australia.jpg", accent: "#f59e0b" },
  "new-zealand": { photo: "/images/countries/new-zealand.jpg", accent: "#f472b6" },
  norway: { photo: "/images/countries/norway.jpg", accent: "#eab308" },
  peru: { photo: "/images/countries/peru.jpg", accent: "#a78bfa" },
  "south-africa": { photo: "/images/countries/south-africa.jpg", accent: "#22d3ee" },
  canada: { photo: "/images/countries/canada.jpg", accent: "#818cf8" },

  // From here on, countries reuse one of the category photos above as their
  // card backdrop instead of a unique per-country shot — still a real photo
  // of a real activity found in that country, just not sourced 1:1 per
  // country, which isn't realistic at this scale (see activityPhotos.ts).
  chile: { photo: "/images/categories/ice-snow.jpg", accent: "#60a5fa" },
  argentina: { photo: "/images/categories/mountaineering-climbing.jpg", accent: "#fb923c" },
  bolivia: { photo: "/images/categories/mountain-biking.jpg", accent: "#84cc16" },
  ecuador: { photo: "/images/countries/iceland.jpg", accent: "#ef4444" },
  colombia: { photo: "/images/categories/trekking.jpg", accent: "#22c55e" },
};

const FALLBACK = { photo: "/images/countries/switzerland.jpg", accent: "#94a3b8" };

export function visualsForCountry(slug: string) {
  return COUNTRY_VISUALS[slug] ?? FALLBACK;
}
