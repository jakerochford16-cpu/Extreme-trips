import type { Metadata } from "next";
import { getClickCounts, getDailyClickCounts } from "@/lib/clickTracking";
import { getPageViewStats } from "@/lib/pageViews";
import { getActivities } from "@/lib/api";
import { ClicksDashboard, type CountryMarker, type GlobeActivity } from "@/components/admin/ClicksDashboard";

const DAILY_TREND_DAYS = 14;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const SINCE_DAYS = 30;

export default async function ClicksAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const expectedKey = process.env.ADMIN_DASHBOARD_KEY;

  if (!expectedKey || !key || key !== expectedKey) {
    return (
      <main className="mx-auto max-w-md px-6 py-24">
        <h1 className="font-serif text-2xl font-semibold text-white">Admin</h1>
        <p className="mt-3 text-sm text-white/50">
          {expectedKey
            ? "Add ?key=... to the URL to view this page."
            : "ADMIN_DASHBOARD_KEY is not set in the environment."}
        </p>
      </main>
    );
  }

  const [clicks, activities, pageViews, dailyClicks] = await Promise.all([
    getClickCounts(SINCE_DAYS),
    getActivities(),
    getPageViewStats(SINCE_DAYS),
    getDailyClickCounts(DAILY_TREND_DAYS),
  ]);
  const activityById = new Map(activities.map((a) => [a.id, a]));

  const rows = clicks
    .map((c) => {
      const activity = activityById.get(c.activityId);
      return {
        activityId: c.activityId,
        clicks: c.clicks,
        title: activity?.title ?? c.activityId,
        country: activity?.country.name ?? "Unknown",
        sponsored: activity?.sponsored ?? false,
      };
    })
    .sort((a, b) => b.clicks - a.clicks);

  const totalClicks = rows.reduce((sum, r) => sum + r.clicks, 0);
  const sponsoredRows = rows.filter((r) => r.sponsored);

  // Top countries by clicks, for the charts panel — aggregated from `rows`
  // (already joined against activities above), no new query needed.
  const countryClicksMap = new Map<string, number>();
  for (const r of rows) {
    countryClicksMap.set(r.country, (countryClicksMap.get(r.country) ?? 0) + r.clicks);
  }
  const countryClicks = Array.from(countryClicksMap.entries())
    .map(([country, clicks]) => ({ country, clicks }))
    .sort((a, b) => b.clicks - a.clicks);

  const globeActivities: GlobeActivity[] = activities
    .filter((a) => a.latitude != null && a.longitude != null)
    .map((a) => ({
      id: a.id,
      title: a.title,
      country: a.country.name,
      lat: a.latitude as number,
      lng: a.longitude as number,
      sponsored: a.sponsored,
    }));

  // One dim "presence" marker per country, at the centroid of that
  // country's activities with known coordinates, so the globe always looks
  // populated even when click volume is low — layered under the brighter,
  // weighted click points in ClicksGlobe.
  const countryCentroidAcc = new Map<string, { name: string; latSum: number; lngSum: number; count: number }>();
  for (const a of activities) {
    if (a.latitude == null || a.longitude == null) continue;
    const key = a.country.slug;
    const entry = countryCentroidAcc.get(key) ?? { name: a.country.name, latSum: 0, lngSum: 0, count: 0 };
    entry.latSum += a.latitude;
    entry.lngSum += a.longitude;
    entry.count += 1;
    countryCentroidAcc.set(key, entry);
  }
  const countryMarkers: CountryMarker[] = Array.from(countryCentroidAcc.entries()).map(([slug, e]) => ({
    id: slug,
    name: e.name,
    lat: e.latSum / e.count,
    lng: e.lngSum / e.count,
  }));

  const initialCounts = Object.fromEntries(clicks.map((c) => [c.activityId, c.clicks]));

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">Internal · not indexed</p>
      <h1 className="font-serif mt-1.5 text-3xl font-semibold text-white">Guide-link clicks</h1>
      <p className="mt-2 text-sm text-white/50">
        Last {SINCE_DAYS} days · {totalClicks} total clicks across {rows.length} activities
      </p>

      <div className="mt-8">
        <ClicksDashboard
          activities={globeActivities}
          initialCounts={initialCounts}
          adminKey={key}
          pageViews={pageViews}
          dailyClicks={dailyClicks}
          countryClicks={countryClicks}
          countryMarkers={countryMarkers}
        />
      </div>

      {sponsoredRows.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-wide text-white/50">Sponsored</h2>
          <ClickTable rows={sponsoredRows} />
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-wide text-white/50">All activities</h2>
        {rows.length === 0 ? (
          <p className="mt-3 text-sm text-white/40">No clicks recorded yet in this window.</p>
        ) : (
          <ClickTable rows={rows} />
        )}
      </section>
    </main>
  );
}

function ClickTable({
  rows,
}: {
  rows: { activityId: string; clicks: number; title: string; country: string; sponsored: boolean }[];
}) {
  return (
    <table className="mt-3 w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-white/40">
          <th className="py-2 pr-4 font-medium">Activity</th>
          <th className="py-2 pr-4 font-medium">Country</th>
          <th className="py-2 text-right font-medium">Clicks</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.activityId} className="border-b border-white/5">
            <td className="py-2 pr-4 text-white/80">
              {r.title}
              {r.sponsored && (
                <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold uppercase text-accent">
                  Featured
                </span>
              )}
            </td>
            <td className="py-2 pr-4 text-white/50">{r.country}</td>
            <td className="py-2 text-right font-semibold tabular-nums text-white">{r.clicks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
