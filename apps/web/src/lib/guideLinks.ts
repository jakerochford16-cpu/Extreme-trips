// Every activity gets a working link to find a real guide/operator for it.
// We deliberately don't hand-write a specific operator URL per activity —
// at hundreds of activities across 50 countries, operators change names,
// go out of business, or never existed as a single bookable link in the
// first place, and a broken or fabricated "guide link" is worse than none.
// A scoped search query is always live, always relevant, and never lies
// about being a verified specific operator.
export function guideSearchUrl(title: string, region: string, countryName: string): string {
  const query = `${title} ${region} ${countryName} guide operator booking`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
