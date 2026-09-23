"use client";

import { useMemo, useState } from "react";
import { ActivityCard } from "./ActivityCard";
import { extremenessScore } from "@/lib/extremeness";
import type { Activity } from "@/lib/types";

type SortKey = "default" | "most-extreme" | "least-extreme" | "free-first";

const SORT_LABELS: Record<SortKey, string> = {
  default: "Default order",
  "most-extreme": "Most extreme first",
  "least-extreme": "Least extreme first",
  "free-first": "Free first",
};

export function ActivityListSection({
  activities,
  countryName,
  countrySlug,
  emptyLabel,
}: {
  activities: Activity[];
  countryName: string;
  countrySlug: string;
  emptyLabel: string;
}) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    if (sort === "default") return activities;
    const copy = [...activities];
    if (sort === "most-extreme") {
      copy.sort((a, b) => extremenessScore(b) - extremenessScore(a));
    } else if (sort === "least-extreme") {
      copy.sort((a, b) => extremenessScore(a) - extremenessScore(b));
    } else if (sort === "free-first") {
      const rank = { FREE: 0, VARIES: 1, PAID: 2 };
      copy.sort((a, b) => rank[a.costType] - rank[b.costType]);
    }
    return copy;
  }, [activities, sort]);

  if (activities.length === 0) {
    return (
      <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-white/70 outline-none focus:border-orange-400"
        >
          {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
            <option key={key} value={key}>
              {SORT_LABELS[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {sorted.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            countryName={countryName}
            countrySlug={countrySlug}
          />
        ))}
      </div>
    </div>
  );
}
