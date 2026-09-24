"use client";

import dynamic from "next/dynamic";
import type { Activity } from "@/lib/types";

const CountryGlobe = dynamic(() => import("./CountryGlobe").then((m) => m.CountryGlobe), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/50">
      Spinning up the globe&hellip;
    </div>
  ),
});

export function CountryMapSection({
  activities,
  countryName,
}: {
  activities: Activity[];
  countryName: string;
}) {
  return <CountryGlobe activities={activities} countryName={countryName} heightClassName="h-[420px]" />;
}
