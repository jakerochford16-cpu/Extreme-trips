export type Difficulty = "ADVANCED" | "EXPERT" | "EXTREME" | "INSANE";
export type RiskLevel = "MODERATE" | "HIGH" | "SEVERE" | "EXTREME";
export type CostType = "FREE" | "VARIES" | "PAID";

export type CountrySummary = {
  id: string;
  name: string;
  slug: string;
  continent: string;
  summary: string;
  heroTag: string;
  activityCount: number;
  extremenessRating: number;
};

export type Activity = {
  id: string;
  countryId: string;
  title: string;
  region: string;
  category: string;
  categoryGroup: string;
  description: string;
  costType: CostType;
  costEstimate: string | null;
  currency: string | null;
  difficulty: Difficulty;
  riskLevel: RiskLevel;
  permitRequired: boolean;
  guideRequired: boolean;
  bestSeason: string | null;
  latitude: number | null;
  longitude: number | null;
  tags: string[];
};

export type CountryDetail = CountrySummary & {
  activities: Activity[];
};

export type ActivityWithCountry = Activity & {
  country: { name: string; slug: string };
};
