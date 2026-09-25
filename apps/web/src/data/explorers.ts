// Hand-curated, hand-approved creator profiles for the /explorers program —
// deliberately not driven by the creator_applications table. An application
// coming in is a pitch, not an automatic listing; someone (a human) reviews
// it at /admin/creators and, if it's a fit, adds a real entry here.
export type Explorer = {
  slug: string;
  name: string;
  handle: string;
  platform: string;
  profileUrl: string;
  avatarUrl: string | null;
  tagline: string;
  bio: string;
  featuredCountrySlug: string | null;
  featuredActivityId: string | null;
  featuredSince: string;
};

export const EXPLORERS: Explorer[] = [];

export function getAllExplorers(): Explorer[] {
  return EXPLORERS;
}

export function getExplorerBySlug(slug: string): Explorer | null {
  return EXPLORERS.find((e) => e.slug === slug) ?? null;
}
