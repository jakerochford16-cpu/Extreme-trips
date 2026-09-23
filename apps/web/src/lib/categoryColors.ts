// Marker/legend colors keyed by categoryGroup slug (apps/web/src/lib/categoryGroups.ts).
export const CATEGORY_COLORS: Record<string, string> = {
  "mountaineering-climbing": "#f97316",
  trekking: "#eab308",
  "ice-snow": "#38bdf8",
  "diving-whitewater": "#22d3ee",
  "canyoning-caving": "#a78bfa",
  air: "#f472b6",
  "mountain-biking": "#84cc16",
  "wildlife-hunting": "#f59e0b",
  camping: "#34d399",
  "volcano-offroad": "#ef4444",
  surfing: "#06b6d4",
  polar: "#818cf8",
  other: "#94a3b8",
};

export function colorForGroup(slug: string): string {
  return CATEGORY_COLORS[slug] ?? "#94a3b8";
}
