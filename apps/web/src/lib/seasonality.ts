// Picks up to `count` items, preferring not to repeat a categoryGroup or
// country until every group/country has had a turn — otherwise a handful of
// similar activities (e.g. several BASE jumps that all happen to share a
// season window) can crowd out everything else in a short "in season" list.
export function pickDiverse<T extends { categoryGroup: string; country: { slug: string } }>(
  items: T[],
  count: number
): T[] {
  const seenGroups = new Set<string>();
  const seenCountries = new Set<string>();
  const picked: T[] = [];
  const leftover: T[] = [];

  for (const item of items) {
    if (picked.length >= count) break;
    if (seenGroups.has(item.categoryGroup) || seenCountries.has(item.country.slug)) {
      leftover.push(item);
      continue;
    }
    picked.push(item);
    seenGroups.add(item.categoryGroup);
    seenCountries.add(item.country.slug);
  }

  for (const item of leftover) {
    if (picked.length >= count) break;
    picked.push(item);
  }

  return picked;
}

// Parses the free-text `bestSeason` field ("December – March",
// "Early July – early September", "April – October (dry season)") to check
// whether a given date falls inside it. This is deliberately conservative:
// anything that doesn't cleanly match "Month – Month" (optionally repeated,
// comma-separated, with a parenthetical aside) is treated as unparseable and
// excluded rather than guessed at — showing a wrong "in season now" claim
// for a safety-relevant travel window is worse than not showing one at all.
const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function monthIndex(fragment: string): number | null {
  const word = fragment
    .trim()
    .toLowerCase()
    .replace(/^(early|mid|late)[\s-]+/, "");
  const idx = MONTHS.findIndex((m) => word.startsWith(m.slice(0, 3)));
  return idx === -1 ? null : idx;
}

function parseRange(range: string): [number, number] | null {
  // Only the en/em dash separates a range ("December – March"); a bare
  // hyphen shows up mid-word in prefixes like "Mid-October" and must not
  // be split on.
  const parts = range.split(/[–—]/).map((p) => p.trim());
  if (parts.length !== 2) return null;
  const start = monthIndex(parts[0]);
  const end = monthIndex(parts[1]);
  if (start === null || end === null) return null;
  return [start, end];
}

export function isInSeason(bestSeason: string | null | undefined, now: Date = new Date()): boolean {
  if (!bestSeason) return false;
  const cleaned = bestSeason.replace(/\([^)]*\)/g, "");
  if (/year-round/i.test(cleaned)) return false;

  const month = now.getMonth();
  const ranges = cleaned
    .split(",")
    .map((r) => parseRange(r))
    .filter((r): r is [number, number] => r !== null);

  if (ranges.length === 0) return false;

  return ranges.some(([start, end]) => {
    if (start <= end) return month >= start && month <= end;
    // wraps around the year, e.g. "November – March"
    return month >= start || month <= end;
  });
}
