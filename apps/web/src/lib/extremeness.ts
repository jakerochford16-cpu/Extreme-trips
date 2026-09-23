import type { Activity, Difficulty, RiskLevel } from "./types";

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  ADVANCED: 1,
  EXPERT: 2,
  EXTREME: 3,
  INSANE: 4,
};

const RISK_RANK: Record<RiskLevel, number> = {
  MODERATE: 1,
  HIGH: 2,
  SEVERE: 3,
  EXTREME: 4,
};

// A simple, transparent 2-8 score combining how hard an activity is to do
// (difficulty) with how dangerous it is (risk) — used for sorting and for
// the country-level extremeness rating. Not a scientific measure, just a
// consistent way to rank activities that are otherwise apples-to-oranges
// (a Class V rapid vs. a 6000m summit vs. a BASE jump).
export function extremenessScore(activity: Pick<Activity, "difficulty" | "riskLevel">): number {
  return DIFFICULTY_RANK[activity.difficulty] + RISK_RANK[activity.riskLevel];
}
