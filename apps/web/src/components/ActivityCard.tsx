import Image from "next/image";
import type { Activity } from "@/lib/types";
import { CostBadge, DifficultyBadge, RiskBadge } from "./badges";
import { FavoriteButton } from "./FavoriteButton";
import { ShareButton } from "./ShareButton";
import { ReviewSection } from "./ReviewSection";
import { PackingList } from "./PackingList";
import { InsuranceWarning } from "./InsuranceWarning";
import { ReadinessCheck } from "./ReadinessCheck";
import { guideSearchUrl } from "@/lib/guideLinks";
import { photoForCategoryGroup } from "@/lib/activityPhotos";
import { likelyExcludedFromStandardInsurance } from "@/lib/insurance";

export function ActivityCard({
  activity,
  countryName,
  countrySlug,
}: {
  activity: Activity;
  countryName: string;
  countrySlug: string;
}) {
  return (
    <article
      id={activity.id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] target:border-orange-400/60"
    >
      <div className="relative h-40 w-full">
        <Image
          src={photoForCategoryGroup(activity.categoryGroup)}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10]/90 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              {activity.category} &middot; {activity.region}
            </p>
            <h3 className="mt-1 text-xl font-bold text-white">{activity.title}</h3>
          </div>
          <div className="flex shrink-0 gap-2">
            <ShareButton title={activity.title} path={`/countries/${countrySlug}#${activity.id}`} />
            <FavoriteButton activityId={activity.id} />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <DifficultyBadge difficulty={activity.difficulty} />
          <RiskBadge riskLevel={activity.riskLevel} />
          <CostBadge
            costType={activity.costType}
            costEstimate={activity.costEstimate}
            currency={activity.currency}
          />
          {activity.permitRequired && (
            <span className="inline-flex items-center rounded-full bg-purple-500/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-purple-300 ring-1 ring-purple-500/30">
              Permit required
            </span>
          )}
          {activity.guideRequired && (
            <span className="inline-flex items-center rounded-full bg-teal-500/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-teal-300 ring-1 ring-teal-500/30">
              Guide required
            </span>
          )}
        </div>

        {likelyExcludedFromStandardInsurance(activity.riskLevel) && <InsuranceWarning />}

        <p className="mt-4 text-sm leading-relaxed text-white/75">{activity.description}</p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/50">
          {activity.bestSeason && <span>Best season: {activity.bestSeason}</span>}
          {activity.latitude != null && activity.longitude != null && (
            <span>
              {activity.latitude.toFixed(3)}, {activity.longitude.toFixed(3)}
            </span>
          )}
        </div>

        {activity.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activity.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <PackingList categoryGroup={activity.categoryGroup} />
        <ReadinessCheck activity={activity} />

        <a
          href={guideSearchUrl(activity.title, activity.region, countryName)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-orange-300"
        >
          Find a guide / operator
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>

        <ReviewSection activityId={activity.id} />
      </div>
    </article>
  );
}
