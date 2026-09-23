"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { ActivityWithCountry } from "@/lib/types";
import { CATEGORY_GROUPS } from "@/lib/categoryGroups";
import { colorForGroup } from "@/lib/categoryColors";

const MarkerMap = dynamic(() => import("./MarkerMap").then((m) => m.MarkerMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[70vh] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/40">
      Loading map&hellip;
    </div>
  ),
});

export function ExploreMap({ activities }: { activities: ActivityWithCountry[] }) {
  const [countrySlug, setCountrySlug] = useState<string>("all");
  const [categorySlug, setCategorySlug] = useState<string>("all");

  const countries = useMemo(() => {
    const map = new Map<string, string>();
    for (const a of activities) map.set(a.country.slug, a.country.name);
    return Array.from(map.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [activities]);

  const groupsPresent = useMemo(() => {
    const present = new Set(activities.map((a) => a.categoryGroup));
    return CATEGORY_GROUPS.filter((g) => present.has(g.slug));
  }, [activities]);

  const filtered = activities.filter((a) => {
    if (countrySlug !== "all" && a.country.slug !== countrySlug) return false;
    if (categorySlug !== "all" && a.categoryGroup !== categorySlug) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          value={countrySlug}
          onChange={(e) => setCountrySlug(e.target.value)}
          className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 outline-none focus:border-orange-400"
        >
          <option value="all">All countries</option>
          {countries.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={categorySlug}
          onChange={(e) => setCategorySlug(e.target.value)}
          className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 outline-none focus:border-orange-400"
        >
          <option value="all">All categories</option>
          {groupsPresent.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.label}
            </option>
          ))}
        </select>
        <span className="text-sm text-white/40">
          {filtered.length} of {activities.length} activities
        </span>
      </div>

      <MarkerMap activities={filtered} heightClassName="h-[70vh]" />

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {groupsPresent.map((g) => (
          <span key={g.slug} className="flex items-center gap-1.5 text-xs text-white/50">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: colorForGroup(g.slug) }}
            />
            {g.label}
          </span>
        ))}
      </div>
    </div>
  );
}
