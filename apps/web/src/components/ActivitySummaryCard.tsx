import Image from "next/image";
import type { Activity } from "@/lib/types";
import { CostBadge, DifficultyBadge, RiskBadge } from "./badges";
import { FavoriteButton } from "./FavoriteButton";
import { photoForCategoryGroup } from "@/lib/activityPhotos";

// Curated cost estimates range from short ("~$40") to a full sentence —
// fine in the modal's detail view, but it dominates this compact tile, so
// clip it here only; the modal still shows the full text via CostBadge.
const MAX_SUMMARY_COST_LENGTH = 24;

function summaryCostEstimate(costEstimate: string | null): string | null {
  if (!costEstimate || costEstimate.length <= MAX_SUMMARY_COST_LENGTH) return costEstimate;
  return `${costEstimate.slice(0, MAX_SUMMARY_COST_LENGTH - 1).trimEnd()}…`;
}

export function ActivitySummaryCard({
  activity,
  onOpen,
}: {
  activity: Activity;
  onOpen: () => void;
}) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-surface shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] transition hover:border-white/25 ${
        activity.sponsored ? "border-accent/35" : "border-white/10"
      }`}
    >
      <button type="button" onClick={onOpen} className="flex flex-1 flex-col text-left">
        <div className="relative h-36 w-full shrink-0">
          <Image
            src={photoForCategoryGroup(activity.categoryGroup)}
            alt={activity.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
          {activity.sponsored && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
              Featured
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-accent">
            {activity.category} &middot; {activity.region}
          </p>
          <h3 className="font-serif mt-1 text-lg font-semibold leading-snug text-white">
            {activity.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <DifficultyBadge difficulty={activity.difficulty} />
            <RiskBadge riskLevel={activity.riskLevel} />
            <CostBadge
              costType={activity.costType}
              costEstimate={summaryCostEstimate(activity.costEstimate)}
              currency={activity.currency}
            />
          </div>

          <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-white/60">
            {activity.description}
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
            View details
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </button>

      <div className="absolute right-4 top-4" onClick={(e) => e.stopPropagation()}>
        <FavoriteButton activityId={activity.id} />
      </div>
    </article>
  );
}
