import { ActivityBrowser } from "@/components/ActivityBrowser";
import { getActivities } from "@/lib/api";

export const metadata = {
  title: "All activities — Outer Line",
};

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Every activity, in one place
        </p>
        <h1 className="font-serif mt-2 text-4xl font-semibold text-[#FBF8F3] sm:text-5xl">All activities</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          Search and filter all {activities.length} activities across every country at once —
          instead of browsing one country at a time.
        </p>

        <div className="mt-10">
          <ActivityBrowser activities={activities} />
        </div>
      </div>
    </main>
  );
}
