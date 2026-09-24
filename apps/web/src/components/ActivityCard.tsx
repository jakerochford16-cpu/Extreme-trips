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
import { GuideLinkButton } from "./GuideLinkButton";
import { operatorReviewFor } from "@/lib/operatorReviews";
import { VerifiedOperatorPanel } from "./VerifiedOperatorPanel";
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
  const operatorReview = operatorReviewFor(activity.id);

  return (
    <article
      id={activity.id}
      className={`scroll-mt-24 overflow-hidden rounded-2xl border bg-surface shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] target:border-accent/60 ${
        activity.sponsored ? "border-accent/35" : "border-white/10"
      }`}
    >
      <div className="relative h-44 w-full">
        <Image
          src={photoForCategoryGroup(activity.categoryGroup)}
          alt={activity.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/15 to-transparent" />
        {activity.sponsored && (
          <span className="absolute left-3.5 top-3.5 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
            Featured
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
              {activity.category} &middot; {activity.region}
            </p>
            <h3 className="font-serif mt-1.5 text-xl font-semibold text-white">{activity.title}</h3>
          </div>
          <div className="flex shrink-0 gap-2">
            <ShareButton title={activity.title} path={`/countries/${countrySlug}#${activity.id}`} />
            <FavoriteButton activityId={activity.id} />
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2">
          <DifficultyBadge difficulty={activity.difficulty} />
          <RiskBadge riskLevel={activity.riskLevel} />
          <CostBadge
            costType={activity.costType}
            costEstimate={activity.costEstimate}
            currency={activity.currency}
          />
          {activity.permitRequired && (
            <span className="inline-flex items-center rounded-full bg-[#a8a294]/[0.14] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#d8d1c4] ring-1 ring-[#a8a294]/25">
              Permit required
            </span>
          )}
          {activity.guideRequired && (
            <span className="inline-flex items-center rounded-full bg-[#a8a294]/[0.14] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#d8d1c4] ring-1 ring-[#a8a294]/25">
              Guide required
            </span>
          )}
        </div>

        {likelyExcludedFromStandardInsurance(activity.riskLevel) && <InsuranceWarning />}

        <p className="mt-4 text-[14.5px] leading-relaxed text-white/70">{activity.description}</p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/45">
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
                className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/55"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {operatorReview && <VerifiedOperatorPanel operator={operatorReview} />}

        <PackingList categoryGroup={activity.categoryGroup} />
        <ReadinessCheck activity={activity} />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
          <GuideLinkButton
            activityId={activity.id}
            href={guideSearchUrl(activity.title, activity.region, countryName)}
          />
        </div>

        <ReviewSection activityId={activity.id} />
      </div>
    </article>
  );
}
