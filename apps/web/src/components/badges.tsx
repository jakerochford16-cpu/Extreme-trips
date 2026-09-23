import type { CostType, Difficulty, RiskLevel } from "@/lib/types";

const pill = "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold";
const base = `${pill} tracking-wide uppercase`;

const stone = "bg-[#a8a294]/[0.14] text-[#d8d1c4] ring-1 ring-[#a8a294]/25";
const copper = "bg-accent/15 text-accent-light ring-1 ring-accent/35";
const rust = "bg-[#b24a3a]/15 text-[#e08e7f] ring-1 ring-[#b24a3a]/35";
const insane = "bg-ink text-accent ring-1 ring-accent";
const sage = "bg-[#7a9b84]/15 text-[#9fc2ac] ring-1 ring-[#7a9b84]/30";

const difficultyStyles: Record<Difficulty, string> = {
  ADVANCED: stone,
  EXPERT: copper,
  EXTREME: rust,
  INSANE: insane,
};

const riskStyles: Record<RiskLevel, string> = {
  MODERATE: stone,
  HIGH: copper,
  SEVERE: rust,
  EXTREME: insane,
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <span className={`${base} ${difficultyStyles[difficulty]}`}>{difficulty}</span>;
}

export function RiskBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  return <span className={`${base} ${riskStyles[riskLevel]}`}>Risk: {riskLevel}</span>;
}

export function CostBadge({
  costType,
  costEstimate,
  currency,
}: {
  costType: CostType;
  costEstimate: string | null;
  currency: string | null;
}) {
  if (costType === "FREE") {
    return <span className={`${base} ${sage}`}>Free</span>;
  }
  const label = costEstimate
    ? `${currency ? currency + " " : ""}${costEstimate}`
    : costType === "VARIES"
      ? "Varies"
      : "Paid";
  return <span className={`${pill} ${stone}`}>{label}</span>;
}
