"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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

export type CountryMarker = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export type DailyClickPoint = { date: string; clicks: number };
export type CountryClickPoint = { country: string; clicks: number };

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
const HUD_CYAN = "#3fe0ff";
const HUD_CYAN_RGB = "63, 224, 255";

function timeAgo(ms: number): string {
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  return `${m}m ago`;
}

function formatShortDate(iso: string): string {
  const [, month, day] = iso.split("-");
  return `${Number(month)}/${Number(day)}`;
}

export function ClicksDashboard({
  activities,
  initialCounts,
  adminKey,
  pageViews,
  dailyClicks,
  countryClicks,
  countryMarkers,
}: {
  activities: GlobeActivity[];
  initialCounts: Record<string, number>;
  adminKey: string;
  pageViews: { total: number; today: number };
  dailyClicks: DailyClickPoint[];
  countryClicks: CountryClickPoint[];
  countryMarkers: CountryMarker[];
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

  // Brighter, weighted points for activities that have actually received
  // clicks — these are what "Locations live" below counts.
  const activityPoints: GlobePoint[] = useMemo(
    () =>
      activities
        .filter((a) => (counts[a.id] ?? 0) > 0)
        .map((a) => ({
          kind: "activity" as const,
          id: a.id,
          lat: a.lat,
          lng: a.lng,
          label: `${a.title} — ${a.country} (${counts[a.id]})`,
          weight: (counts[a.id] ?? 0) / maxCount,
          sponsored: a.sponsored,
        })),
    [activities, counts, maxCount]
  );

  // Dim, low-altitude presence markers — one per country, always shown —
  // layered underneath the activity points so the globe never looks empty.
  const countryPoints: GlobePoint[] = useMemo(
    () =>
      countryMarkers.map((c) => ({
        kind: "country" as const,
        id: `country-${c.id}`,
        lat: c.lat,
        lng: c.lng,
        label: c.name,
      })),
    [countryMarkers]
  );

  const points: GlobePoint[] = useMemo(
    () => [...countryPoints, ...activityPoints],
    [countryPoints, activityPoints]
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

      <div className="relative grid grid-cols-1 lg:grid-cols-4">
        {/* Quarter 1 — globe */}
        <div className="order-1 h-[420px] min-w-0 border-cyan-400/15 lg:order-1 lg:h-[640px] lg:border-r">
          <ClicksGlobe points={points} pulses={pulses} />
        </div>

        {/* Quarters 2–3 — charts panel */}
        <div className="order-2 flex flex-col gap-4 border-cyan-400/15 p-4 lg:order-2 lg:col-span-2 lg:h-[640px] lg:overflow-y-auto lg:border-r">
          <DailyClicksChart data={dailyClicks} />
          <TopCountriesChart data={countryClicks} />
        </div>

        {/* Quarter 4 — mission control */}
        <div className="order-3 flex flex-col gap-3 p-4 lg:order-3 lg:h-[640px]">
          <div className="grid grid-cols-2 gap-2">
            <HudStat label="Visits · 30d" value={pageViews.total} />
            <HudStat label="Visits · today" value={pageViews.today} />
            <HudStat label="Clicks · 30d" value={totalClicks} />
            <HudStat label="Locations live" value={activityPoints.length} />
          </div>

          {topActivity && (
            <div className="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.03] p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300/50">Top activity</p>
              <p className="mt-1 text-sm font-semibold text-white/90">{topActivity.activity.title}</p>
              <p className="font-mono text-[11px] text-cyan-300/60">
                {topActivity.activity.country} · {topActivity.clicks} clicks
              </p>
            </div>
          )}

          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-cyan-300/50">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#3fe0ff]" /> Activity
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ffcf6b]" /> Featured
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col border-t border-cyan-400/15 pt-3">
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

function ChartPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.03] p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300/50">{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

// Rounds only the far ("data-end") corners of a horizontal bar — the two
// right corners — leaving the baseline-adjacent left corners flat.
function roundedRightBarPath(x: number, y: number, w: number, h: number, r: number): string {
  const radius = Math.max(0, Math.min(r, h / 2, w));
  if (radius <= 0) return `M ${x},${y} L ${x + w},${y} L ${x + w},${y + h} L ${x},${y + h} Z`;
  return `M ${x},${y} L ${x + w - radius},${y} Q ${x + w},${y} ${x + w},${y + radius} L ${x + w},${y + h - radius} Q ${x + w},${y + h} ${x + w - radius},${y + h} L ${x},${y + h} Z`;
}

function DailyClicksChart({ data }: { data: DailyClickPoint[] }) {
  const width = 320;
  const height = 130;
  const padding = { top: 12, right: 8, bottom: 20, left: 26 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const max = Math.max(1, ...data.map((d) => d.clicks));
  const yTicks = Array.from(new Set([0, Math.round(max / 2), max])).sort((a, b) => a - b);

  const xFor = (i: number) => (data.length > 1 ? (i / (data.length - 1)) * chartW : chartW / 2);
  const yFor = (v: number) => chartH - (v / max) * chartH;

  const linePoints = data.map((d, i) => `${padding.left + xFor(i)},${padding.top + yFor(d.clicks)}`).join(" ");
  const areaPoints = `${padding.left},${padding.top + chartH} ${linePoints} ${padding.left + chartW},${padding.top + chartH}`;

  const peakIndex = data.reduce((best, d, i) => (d.clicks > data[best].clicks ? i : best), 0);
  const lastIndex = data.length - 1;

  return (
    <ChartPanel title="Daily clicks — last 14 days">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-32 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Daily guide-link clicks over the last 14 days"
      >
        <defs>
          <linearGradient id="dailyClicksFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={HUD_CYAN} stopOpacity="0.28" />
            <stop offset="100%" stopColor={HUD_CYAN} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Recessive gridlines + exact-value y ticks */}
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={padding.top + yFor(t)}
              y2={padding.top + yFor(t)}
              stroke={`rgba(${HUD_CYAN_RGB}, 0.12)`}
              strokeWidth={1}
            />
            <text
              x={padding.left - 5}
              y={padding.top + yFor(t) + 3}
              textAnchor="end"
              className="font-mono"
              fontSize={8}
              fill={`rgba(${HUD_CYAN_RGB}, 0.45)`}
            >
              {t}
            </text>
          </g>
        ))}

        {data.length > 0 && (
          <>
            <polygon points={areaPoints} fill="url(#dailyClicksFill)" stroke="none" />
            <polyline points={linePoints} fill="none" stroke={HUD_CYAN} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {data.map((d, i) => (
              <circle key={d.date} cx={padding.left + xFor(i)} cy={padding.top + yFor(d.clicks)} r={2.5} fill={HUD_CYAN}>
                <title>{`${d.date}: ${d.clicks} click${d.clicks === 1 ? "" : "s"}`}</title>
              </circle>
            ))}
            {/* Selective direct labels — peak and most-recent day only */}
            {[peakIndex, lastIndex]
              .filter((i, idx, arr) => arr.indexOf(i) === idx)
              .map((i) => (
                <text
                  key={`label-${i}`}
                  x={padding.left + xFor(i)}
                  y={padding.top + yFor(data[i].clicks) - 6}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize={9}
                  fill="#e6fbff"
                >
                  {data[i].clicks}
                </text>
              ))}
          </>
        )}

        {/* X-axis: sparse date labels to avoid crowding 14 points */}
        {data.map((d, i) =>
          i % 3 === 0 || i === lastIndex ? (
            <text
              key={d.date}
              x={padding.left + xFor(i)}
              y={height - 4}
              textAnchor="middle"
              className="font-mono"
              fontSize={8}
              fill={`rgba(${HUD_CYAN_RGB}, 0.4)`}
            >
              {formatShortDate(d.date)}
            </text>
          ) : null
        )}
      </svg>
    </ChartPanel>
  );
}

function TopCountriesChart({ data }: { data: CountryClickPoint[] }) {
  const top = data.slice(0, 7);
  const width = 320;
  const rowH = 20;
  const rowGap = 6;
  const padding = { top: 6, right: 34, bottom: 4, left: 76 };
  const chartW = width - padding.left - padding.right;
  const height = padding.top + padding.bottom + top.length * rowH + Math.max(0, top.length - 1) * rowGap;

  const max = Math.max(1, ...top.map((d) => d.clicks));

  if (top.length === 0) {
    return (
      <ChartPanel title="Top countries by clicks">
        <p className="font-mono text-[11px] text-cyan-300/30">No clicks recorded yet.</p>
      </ChartPanel>
    );
  }

  return (
    <ChartPanel title="Top countries by clicks">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
        role="img"
        aria-label="Top countries by guide-link clicks"
      >
        {top.map((d, i) => {
          const y = padding.top + i * (rowH + rowGap);
          const barW = (d.clicks / max) * chartW;
          return (
            <g key={d.country}>
              <text
                x={padding.left - 8}
                y={y + rowH / 2 + 3}
                textAnchor="end"
                className="font-mono uppercase"
                fontSize={9}
                fill="rgba(103, 232, 249, 0.75)"
              >
                {d.country}
              </text>
              <rect
                x={padding.left}
                y={y}
                width={chartW}
                height={rowH}
                fill={`rgba(${HUD_CYAN_RGB}, 0.06)`}
              />
              <path d={roundedRightBarPath(padding.left, y, Math.max(barW, 2), rowH, 3)} fill={HUD_CYAN} fillOpacity={0.75}>
                <title>{`${d.country}: ${d.clicks} click${d.clicks === 1 ? "" : "s"}`}</title>
              </path>
              <text
                x={padding.left + Math.max(barW, 2) + 6}
                y={y + rowH / 2 + 3}
                className="font-mono"
                fontSize={9}
                fill="#e6fbff"
              >
                {d.clicks}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartPanel>
  );
}
