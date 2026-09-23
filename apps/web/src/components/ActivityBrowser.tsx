"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ActivityCard } from "./ActivityCard";
import { extremenessScore } from "@/lib/extremeness";
import { CATEGORY_GROUPS, labelForGroup } from "@/lib/categoryGroups";
import type { ActivityWithCountry } from "@/lib/types";

type SortKey = "default" | "most-extreme" | "least-extreme" | "free-first";

export function ActivityBrowser({ activities }: { activities: ActivityWithCountry[] }) {
  const [query, setQuery] = useState("");
  const [categorySlug, setCategorySlug] = useState("all");
  const [countrySlug, setCountrySlug] = useState("all");
  const [sort, setSort] = useState<SortKey>("default");

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = activities.filter((a) => {
      if (categorySlug !== "all" && a.categoryGroup !== categorySlug) return false;
      if (countrySlug !== "all" && a.country.slug !== countrySlug) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.region.toLowerCase().includes(q) ||
        a.country.name.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
    if (sort === "most-extreme") {
      result = [...result].sort((a, b) => extremenessScore(b) - extremenessScore(a));
    } else if (sort === "least-extreme") {
      result = [...result].sort((a, b) => extremenessScore(a) - extremenessScore(b));
    } else if (sort === "free-first") {
      const rank = { FREE: 0, VARIES: 1, PAID: 2 };
      result = [...result].sort((a, b) => rank[a.costType] - rank[b.costType]);
    }
    return result;
  }, [activities, query, categorySlug, countrySlug, sort]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search activities, regions, tags..."
            className="w-full rounded-lg border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent/60 focus:bg-white/[0.06]"
          />
        </div>
        <select
          value={countrySlug}
          onChange={(e) => setCountrySlug(e.target.value)}
          className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 outline-none focus:border-accent"
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
          className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 outline-none focus:border-accent"
        >
          <option value="all">All categories</option>
          {groupsPresent.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.label}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 outline-none focus:border-accent"
        >
          <option value="default">Default order</option>
          <option value="most-extreme">Most extreme first</option>
          <option value="least-extreme">Least extreme first</option>
          <option value="free-first">Free first</option>
        </select>
      </div>

      <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-white/40">
        {filtered.length} of {activities.length} activities
        {categorySlug !== "all" ? ` · ${labelForGroup(categorySlug)}` : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
          Nothing matches that search. Try a different keyword, country or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filtered.map((activity) => (
            <div key={activity.id}>
              <Link
                href={`/countries/${activity.country.slug}#${activity.id}`}
                className="mb-1.5 inline-block text-xs font-semibold uppercase tracking-widest text-white/40 hover:text-white/70"
              >
                {activity.country.name} &rarr;
              </Link>
              <ActivityCard activity={activity} countryName={activity.country.name} countrySlug={activity.country.slug} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
