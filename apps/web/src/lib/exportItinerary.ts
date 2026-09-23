import type { ActivityWithCountry } from "./types";

export function itineraryToText(activities: ActivityWithCountry[]): string {
  const lines: string[] = [
    "OUTER LINE — YOUR ITINERARY",
    `${activities.length} ${activities.length === 1 ? "activity" : "activities"}`,
    "",
  ];

  activities.forEach((a, i) => {
    lines.push(`${i + 1}. ${a.title}`);
    lines.push(`   ${a.country.name} — ${a.region}`);
    lines.push(`   Difficulty: ${a.difficulty}  |  Risk: ${a.riskLevel}`);
    const cost =
      a.costType === "FREE"
        ? "Free"
        : a.costEstimate
          ? `${a.currency ? a.currency + " " : ""}${a.costEstimate}`
          : a.costType === "VARIES"
            ? "Varies"
            : "Paid";
    lines.push(`   Cost: ${cost}`);
    if (a.bestSeason) lines.push(`   Best season: ${a.bestSeason}`);
    if (a.permitRequired) lines.push(`   Permit required`);
    if (a.guideRequired) lines.push(`   Guide required`);
    lines.push(`   ${a.description}`);
    lines.push("");
  });

  lines.push(
    "Curated starting points, not instructions. Conditions, permits, prices and regulations change — verify everything with a local guide or operator before you go."
  );

  return lines.join("\n");
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
