"use client";

import dynamic from "next/dynamic";
import type { Activity } from "@/lib/types";

const MarkerMap = dynamic(() => import("./MarkerMap").then((m) => m.MarkerMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/40">
      Loading map&hellip;
    </div>
  ),
});

export function CountryMapSection({ activities }: { activities: Activity[] }) {
  return <MarkerMap activities={activities} heightClassName="h-[420px]" />;
}
