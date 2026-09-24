"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GlobePoint, GlobePulse } from "./ClicksGlobe";

const ClicksGlobe = dynamic(() => import("./ClicksGlobe").then((m) => m.ClicksGlobe), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-cyan-300/40">
      Initializing telemetry…
    </div>
  ),
});

export type GlobeActivity = {
  id: string;
  title: string;
  country: string;
  lat: number;
  lng: number;
  sponsored: boolean;
};

type FeedEntry = {
  key: string;
  title: string;
  country: string;
  at: number;
  sponsored: boolean;
};

const POLL_MS = 4000;
const PULSE_LIFETIME_MS = 1700;
const FEED_LIMIT = 8;

function timeAgo(ms: number): string {
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  return `${m}m ago`;
}

export function ClicksDashboard({
  activities,
  initialCounts,
  adminKey,
}: {
  activities: GlobeActivity[];
  initialCounts: Record<string, number>;
  adminKey: string;
}) {
  const activityById = useMemo(() => new Map(activities.map((a) => [a.id, a])), [activities]);

  const [counts, setCounts] = useState<Record<string, number>>(initialCounts);
  const [pulses, setPulses] = useState<GlobePulse[]>([]);
  const [feed, setFeed] = useState<FeedEntry[]>([]);
  const [lastPollOk, setLastPollOk] = useState(true);
  const [, forceTick] = useState(0);

  const sinceRef = useRef(new Date().toISOString());
  const pulseCounter = useRef(0);

  const addPulse = useCallback((lat: number, lng: number) => {
    const id = `p${pulseCounter.current++}`;
    setPulses((prev) => [...prev, { id, lat, lng }]);
    setTimeout(() => {
      setPulses((prev) => prev.filter((p) => p.id !== id));
    }, PULSE_LIFETIME_MS);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch(
          `/api/admin/recent-clicks?key=${encodeURIComponent(adminKey)}&since=${encodeURIComponent(sinceRef.current)}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(String(res.status));
        const data: { clicks: { activityId: string; clickedAt: string }[]; serverTime: string } = await res.json();
        if (cancelled) return;

        sinceRef.current = data.serverTime;
        setLastPollOk(true);

        if (data.clicks.length > 0) {
          setCounts((prev) => {
            const next = { ...prev };
            for (const c of data.clicks) next[c.activityId] = (next[c.activityId] ?? 0) + 1;
            return next;
          });

          const newFeedEntries: FeedEntry[] = [];
          for (const c of data.clicks) {
            const activity = activityById.get(c.activityId);
            if (!activity) continue;
            addPulse(activity.lat, activity.lng);
            newFeedEntries.push({
              key: `${c.activityId}-${c.clickedAt}-${Math.random()}`,
              title: activity.title,
              country: activity.country,
              at: Date.parse(c.clickedAt) || Date.now(),
              sponsored: activity.sponsored,
            });
          }
          if (newFeedEntries.length > 0) {
            setFeed((prev) => [...newFeedEntries.reverse(), ...prev].slice(0, FEED_LIMIT));
          }
        }
      } catch {
        if (!cancelled) setLastPollOk(false);
      }
    }

    const interval = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [adminKey, activityById, addPulse]);

  // Re-render every few seconds purely to refresh the "Xs ago" labels in the feed.
  useEffect(() => {
    const t = setInterval(() => forceTick((n) => n + 1), 3000);
    return () => clearInterval(t);
  }, []);

  const maxCount = useMemo(() => Math.max(1, ...Object.values(counts)), [counts]);

  const points: GlobePoint[] = useMemo(
    () =>
      activities
        .filter((a) => (counts[a.id] ?? 0) > 0)
        .map((a) => ({
          id: a.id,
          lat: a.lat,
          lng: a.lng,
          label: `${a.title} — ${a.country} (${counts[a.id]})`,
          weight: (counts[a.id] ?? 0) / maxCount,
          sponsored: a.sponsored,
        })),
    [activities, counts, maxCount]
  );

  const totalClicks = useMemo(() => Object.values(counts).reduce((s, n) => s + n, 0), [counts]);

  const topActivity = useMemo(() => {
    let best: { activity: GlobeActivity; clicks: number } | null = null;
    for (const a of activities) {
      const c = counts[a.id] ?? 0;
      if (c > 0 && (!best || c > best.clicks)) best = { activity: a, clicks: c };
    }
    return best;
  }, [activities, counts]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#02040a]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 22%, rgba(63,224,255,0.6), transparent), radial-gradient(1px 1px at 78% 14%, rgba(63,224,255,0.5), transparent), radial-gradient(1.5px 1.5px at 34% 68%, rgba(63,224,255,0.4), transparent), radial-gradient(1px 1px at 62% 82%, rgba(63,224,255,0.5), transparent), radial-gradient(1px 1px at 88% 58%, rgba(63,224,255,0.35), transparent), radial-gradient(1.5px 1.5px at 20% 90%, rgba(63,224,255,0.3), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 35%, #02040a 88%)" }}
      />

      <div className="relative flex items-center justify-between border-b border-cyan-400/15 px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/70">
          <span
            className={`h-1.5 w-1.5 rounded-full ${lastPollOk ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`}
          />
          {lastPollOk ? "Live telemetry" : "Reconnecting…"}
        </div>
        <div className="font-mono text-[11px] text-cyan-300/40">Outer Line // Ops Console</div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-[220px_1fr_240px]">
        <div className="order-2 flex flex-col gap-3 border-cyan-400/15 p-4 lg:order-1 lg:border-r">
          <HudStat label="Total clicks · 30d" value={totalClicks} />
          <HudStat label="Locations live" value={points.length} />
          {topActivity && (
            <div className="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.03] p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300/50">Top activity</p>
              <p className="mt-1 text-sm font-semibold text-white/90">{topActivity.activity.title}</p>
              <p className="font-mono text-[11px] text-cyan-300/60">
                {topActivity.activity.country} · {topActivity.clicks} clicks
              </p>
            </div>
          )}
          <div className="mt-auto flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-cyan-300/50">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#3fe0ff]" /> Activity
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ffcf6b]" /> Featured
            </span>
          </div>
        </div>

        <div className="order-1 h-[420px] min-w-0 lg:order-2 lg:h-[560px]">
          <ClicksGlobe points={points} pulses={pulses} />
        </div>

        <div className="order-3 flex flex-col border-cyan-400/15 p-4 lg:border-l">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300/50">Live feed</p>
          <div className="mt-2 flex-1 space-y-2 overflow-y-auto">
            {feed.length === 0 ? (
              <p className="font-mono text-[11px] text-cyan-300/30">Awaiting activity…</p>
            ) : (
              feed.map((entry) => (
                <div
                  key={entry.key}
                  className="rounded-md border border-cyan-400/10 bg-cyan-400/[0.02] px-2.5 py-2 font-mono text-[11px]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={entry.sponsored ? "text-amber-300" : "text-cyan-300/80"}>
                      {entry.sponsored ? "★" : "•"} {entry.title}
                    </span>
                    <span className="shrink-0 text-cyan-300/35">{timeAgo(entry.at)}</span>
                  </div>
                  <div className="text-cyan-300/40">{entry.country}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HudStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.03] p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300/50">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-white">{value}</p>
    </div>
  );
}
