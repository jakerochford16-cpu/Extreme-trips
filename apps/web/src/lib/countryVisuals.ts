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
  mexico: { photo: "/images/categories/diving-whitewater.jpg", accent: "#06b6d4" },
  "united-states": { photo: "/images/categories/mountaineering-climbing.jpg", accent: "#f97316" },
  greenland: { photo: "/images/categories/polar.jpg", accent: "#7dd3fc" },
  "faroe-islands": { photo: "/images/categories/camping.jpg", accent: "#a3e635" },
  "united-kingdom": { photo: "/images/categories/canyoning-caving.jpg", accent: "#c084fc" },
  france: { photo: "/images/countries/switzerland.jpg", accent: "#38bdf8" },
  italy: { photo: "/images/countries/iceland.jpg", accent: "#ef4444" },
  austria: { photo: "/images/categories/ice-snow.jpg", accent: "#60a5fa" },
  slovenia: { photo: "/images/categories/diving-whitewater.jpg", accent: "#14b8a6" },
  georgia: { photo: "/images/categories/mountaineering-climbing.jpg", accent: "#fb923c" },
  kyrgyzstan: { photo: "/images/categories/ice-snow.jpg", accent: "#93c5fd" },
  pakistan: { photo: "/images/countries/nepal.jpg", accent: "#f97316" },
  india: { photo: "/images/categories/diving-whitewater.jpg", accent: "#fbbf24" },
  bhutan: { photo: "/images/categories/trekking.jpg", accent: "#4ade80" },
  mongolia: { photo: "/images/categories/other.jpg", accent: "#eab308" },
  japan: { photo: "/images/categories/ice-snow.jpg", accent: "#f472b6" },
  indonesia: { photo: "/images/countries/iceland.jpg", accent: "#f97316" },
  philippines: { photo: "/images/categories/diving-whitewater.jpg", accent: "#22d3ee" },
  vietnam: { photo: "/images/categories/canyoning-caving.jpg", accent: "#4ade80" },
  thailand: { photo: "/images/categories/mountaineering-climbing.jpg", accent: "#2dd4bf" },
  tanzania: { photo: "/images/categories/wildlife-hunting.jpg", accent: "#f59e0b" },
  kenya: { photo: "/images/countries/south-africa.jpg", accent: "#d97706" },
  namibia: { photo: "/images/categories/other.jpg", accent: "#fb923c" },
  botswana: { photo: "/images/categories/wildlife-hunting.jpg", accent: "#a3e635" },
  madagascar: { photo: "/images/categories/canyoning-caving.jpg", accent: "#34d399" },
  morocco: { photo: "/images/categories/other.jpg", accent: "#f59e0b" },
  jordan: { photo: "/images/categories/mountaineering-climbing.jpg", accent: "#dc2626" },
  oman: { photo: "/images/categories/canyoning-caving.jpg", accent: "#0ea5e9" },
  "costa-rica": { photo: "/images/categories/diving-whitewater.jpg", accent: "#22c55e" },
  brazil: { photo: "/images/categories/mountaineering-climbing.jpg", accent: "#16a34a" },
  fiji: { photo: "/images/categories/surfing.jpg", accent: "#38bdf8" },
  "papua-new-guinea": { photo: "/images/categories/trekking.jpg", accent: "#65a30d" },
  sweden: { photo: "/images/categories/ice-snow.jpg", accent: "#93c5fd" },
  finland: { photo: "/images/categories/polar.jpg", accent: "#a5b4fc" },
  uganda: { photo: "/images/categories/diving-whitewater.jpg", accent: "#15803d" },
  rwanda: { photo: "/images/categories/wildlife-hunting.jpg", accent: "#059669" },
};

const FALLBACK = { photo: "/images/countries/switzerland.jpg", accent: "#94a3b8" };

export function visualsForCountry(slug: string) {
  return COUNTRY_VISUALS[slug] ?? FALLBACK;
}
