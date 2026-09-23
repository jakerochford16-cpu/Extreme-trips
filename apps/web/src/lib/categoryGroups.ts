// Mirrors apps/api/src/categoryGroups.ts — this list only needs the display
// label and order; the api owns the category -> group mapping used at seed
// time. Keep the slugs in sync with what's actually stored on activities.
export const CATEGORY_GROUPS: { slug: string; label: string }[] = [
  { slug: "mountaineering-climbing", label: "Mountaineering & Climbing" },
  { slug: "trekking", label: "Trekking & Wilderness" },
  { slug: "ice-snow", label: "Ice & Snow" },
  { slug: "diving-whitewater", label: "Diving & Whitewater" },
  { slug: "canyoning-caving", label: "Canyoning & Caving" },
  { slug: "air", label: "Air & Jumps" },
  { slug: "mountain-biking", label: "Mountain Biking" },
  { slug: "wildlife-hunting", label: "Wildlife & Hunting" },
  { slug: "camping", label: "Bivouac & Camping" },
  { slug: "volcano-offroad", label: "Volcano & Off-Road" },
  { slug: "surfing", label: "Surfing" },
  { slug: "polar", label: "Polar Expeditions" },
  { slug: "other", label: "Other Extremes" },
];

export function labelForGroup(slug: string): string {
  return CATEGORY_GROUPS.find((g) => g.slug === slug)?.label ?? slug;
}
