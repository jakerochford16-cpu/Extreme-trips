"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { ActivityWithCountry } from "@/lib/types";
import { CATEGORY_GROUPS } from "@/lib/categoryGroups";
import { colorForGroup } from "@/lib/categoryColors";
import { Select } from "@/components/ui/Select";

const CountryGlobe = dynamic(() => import("./CountryGlobe").then((m) => m.CountryGlobe), {
  ssr: false,
  loading: () => (
    <div className="flex h-[50vh] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/50 sm:h-[65vh] lg:h-[70vh]">
      Spinning up the globe&hellip;
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
        <Select
          value={countrySlug}
          onChange={setCountrySlug}
          className="w-44"
          options={[{ value: "all", label: "All countries" }, ...countries.map((c) => ({ value: c.slug, label: c.name }))]}
        />
        <Select
          value={categorySlug}
          onChange={setCategorySlug}
          className="w-44"
          options={[{ value: "all", label: "All categories" }, ...groupsPresent.map((g) => ({ value: g.slug, label: g.label }))]}
        />
        <span className="text-sm text-white/50">
          {filtered.length} of {activities.length} activities
        </span>
      </div>

      <CountryGlobe
        activities={filtered}
        countryName={countrySlug === "all" ? "" : (countries.find((c) => c.slug === countrySlug)?.name ?? "")}
        autoRotate={countrySlug === "all"}
        heightClassName="h-[50vh] sm:h-[65vh] lg:h-[70vh]"
      />

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
