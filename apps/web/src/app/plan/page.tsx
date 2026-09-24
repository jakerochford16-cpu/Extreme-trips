import { PlanPageClient } from "./PlanPageClient";

export const metadata = {
  title: "AI trip planner — real routes, costs, day-by-day | Outer Line",
  description:
    "Tell it where you're flying and what you want to do. Real transport options, costs, and a day-by-day breakdown for extreme travel — not a generic list of attractions.",
};

export default function PlanPage() {
  return <PlanPageClient />;
}
