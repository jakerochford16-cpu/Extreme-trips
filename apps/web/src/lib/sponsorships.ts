// Manually curated list of activity IDs with a paid featured placement.
// Deliberately kept separate from the curated content pipeline in apps/api
// (which regenerates independently) — flipping a placement on/off is just
// adding or removing an id here and redeploying, no data regeneration
// needed. Only add an id once an operator has actually paid for a slot
// (see /partner) — an unpaid "featured" tag would be a lie, same reasoning
// as the honest-reviews-only approach elsewhere in this app.
const SPONSORED_ACTIVITY_IDS: ReadonlySet<string> = new Set([
  // "some-activity-id",
]);

export function isSponsored(activityId: string): boolean {
  return SPONSORED_ACTIVITY_IDS.has(activityId);
}
