import type { Metadata } from "next";
import { getClickCounts } from "@/lib/clickTracking";
import { getActivities } from "@/lib/api";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const SINCE_DAYS = 30;

export default async function ClicksDashboard({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const expectedKey = process.env.ADMIN_DASHBOARD_KEY;

  if (!expectedKey || key !== expectedKey) {
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

  const [clicks, activities] = await Promise.all([getClickCounts(SINCE_DAYS), getActivities()]);
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

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">Internal · not indexed</p>
      <h1 className="font-serif mt-1.5 text-3xl font-semibold text-white">Guide-link clicks</h1>
      <p className="mt-2 text-sm text-white/50">
        Last {SINCE_DAYS} days · {totalClicks} total clicks across {rows.length} activities
      </p>

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
