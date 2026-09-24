"use client";

import { useMemo, useState } from "react";
import { ActivityCardWithModal } from "./ActivityCardWithModal";
import { Select } from "./ui/Select";
import { extremenessScore } from "@/lib/extremeness";
import type { Activity } from "@/lib/types";

type SortKey = "default" | "most-extreme" | "least-extreme" | "free-first";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Default order" },
  { value: "most-extreme", label: "Most extreme first" },
  { value: "least-extreme", label: "Least extreme first" },
  { value: "free-first", label: "Free first" },
];

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
        <Select value={sort} onChange={(v) => setSort(v as SortKey)} className="w-48" options={SORT_OPTIONS} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sorted.map((activity) => (
          <ActivityCardWithModal
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
