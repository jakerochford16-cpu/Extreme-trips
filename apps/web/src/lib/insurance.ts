import type { RiskLevel } from "./types";

// Standard travel insurance policies near-universally exclude a blanket
// category usually written as "hazardous activities" — and HIGH-risk-or-above
// is a reasonable proxy for "likely to fall in that bucket." This is a
// general heuristic, not a claim about any specific insurer's policy for any
// specific activity, which is why the copy stays hedged ("commonly", "may").
export function likelyExcludedFromStandardInsurance(riskLevel: RiskLevel): boolean {
  return riskLevel === "HIGH" || riskLevel === "SEVERE" || riskLevel === "EXTREME";
}
