export type CategoryGroup = {
  slug: string;
  label: string;
};

// Fixed, ordered taxonomy used to group the many specific activity
// categories (e.g. "Ice Climbing", "BASE Jumping") into a small, consistent
// set of filter buckets shown on each country page. Order here is display
// order.
export const CATEGORY_GROUPS: CategoryGroup[] = [
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

// Maps each specific `category` string used in prisma/seed.ts to one of the
// broad slugs above. Every category used in the seed data must have an
// entry here — seeding fails loudly if one is missing, rather than silently
// dropping an activity into "other".
const CATEGORY_TO_GROUP: Record<string, string> = {
  "Mountaineering": "mountaineering-climbing",
  "Rock Climbing": "mountaineering-climbing",
  "Rock Scrambling": "mountaineering-climbing",
  "Exposed Scrambling": "mountaineering-climbing",
  "Via Ferrata / Scrambling": "mountaineering-climbing",
  "Via Ferrata": "mountaineering-climbing",

  "Wilderness Trekking": "trekking",
  "High-Altitude Trekking": "trekking",
  "Restricted-Area Trekking": "trekking",
  "Canyon Trekking": "trekking",
  "Remote Ruins Trekking": "trekking",
  "Jungle Expedition": "trekking",
  "Camel Trekking": "trekking",

  "Ice Climbing": "ice-snow",
  "Ice Caving": "ice-snow",
  "Ice Diving": "ice-snow",
  "Extreme Skiing": "ice-snow",

  "Diving": "diving-whitewater",
  "Cave Diving": "diving-whitewater",
  "Freediving": "diving-whitewater",
  "Whitewater": "diving-whitewater",
  "Sea Kayaking": "diving-whitewater",
  "Sea Kayaking & Wild Camping": "diving-whitewater",

  "Canyoning": "canyoning-caving",
  "Caving": "canyoning-caving",
  "Abseiling": "canyoning-caving",

  "Extreme Jump": "air",
  "BASE Jumping": "air",
  "Paragliding": "air",
  "Skydiving": "air",

  "Mountain Biking": "mountain-biking",

  "Hunting": "wildlife-hunting",
  "Wildlife Expedition": "wildlife-hunting",

  "Bivouac & Wild Camping": "camping",

  "Volcano Descent": "volcano-offroad",
  "Volcano Trekking": "volcano-offroad",
  "Off-Road Expedition": "volcano-offroad",

  "Surfing": "surfing",

  "Polar Expedition": "polar",
  "Dog Sledding": "polar",

  "Sandboarding": "other",
};

export function groupForCategory(category: string): string {
  const group = CATEGORY_TO_GROUP[category];
  if (!group) {
    throw new Error(
      `No categoryGroup mapping for category "${category}" — add it to CATEGORY_TO_GROUP in src/categoryGroups.ts`
    );
  }
  return group;
}
