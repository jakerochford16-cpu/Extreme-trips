// One representative real photo per categoryGroup, used on every activity
// card in that group. Sourcing a unique verified photo per activity isn't
// realistic at hundreds of activities — this keeps every image real and
// thematically accurate while staying maintainable as the dataset grows.
export const CATEGORY_PHOTOS: Record<string, string> = {
  "mountaineering-climbing": "/images/categories/mountaineering-climbing.jpg",
  trekking: "/images/categories/trekking.jpg",
  "ice-snow": "/images/categories/ice-snow.jpg",
  "diving-whitewater": "/images/categories/diving-whitewater.jpg",
  "canyoning-caving": "/images/categories/canyoning-caving.jpg",
  air: "/images/categories/air.jpg",
  "mountain-biking": "/images/categories/mountain-biking.jpg",
  "wildlife-hunting": "/images/categories/wildlife-hunting.jpg",
  camping: "/images/categories/camping.jpg",
  "volcano-offroad": "/images/countries/iceland.jpg",
  surfing: "/images/categories/surfing.jpg",
  polar: "/images/categories/polar.jpg",
  other: "/images/categories/other.jpg",
};

const FALLBACK = "/images/categories/other.jpg";

export function photoForCategoryGroup(slug: string): string {
  return CATEGORY_PHOTOS[slug] ?? FALLBACK;
}
