"use client";

import { useMemo, useState } from "react";
import { CountryCard } from "./CountryCard";
import type { CountrySummary } from "@/lib/types";

export function CountryBrowse({ countries }: { countries: CountrySummary[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.continent.toLowerCase().includes(q) ||
        c.heroTag.toLowerCase().includes(q)
    );
  }, [countries, query]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
          Countries ({filtered.length}{filtered.length !== countries.length ? ` of ${countries.length}` : ""})
        </h2>
        <div className="relative w-full max-w-xs">
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
            placeholder="Search countries or continents..."
            className="w-full rounded-full border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-orange-400/60 focus:bg-white/[0.06]"
          />
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
          No countries match &ldquo;{query}&rdquo;. Try a continent or a different name.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      )}
    </>
  );
}
