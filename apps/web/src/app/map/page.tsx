import { ExploreMap } from "@/components/map/ExploreMap";
import { getActivities } from "@/lib/api";

export default async function MapPage() {
  const activities = await getActivities();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
        Every line, on one map
      </p>
      <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">Explore the map</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
        All {activities.length} activities across every country. Filter by country or
        category, click a pin for the details, then jump straight to the write-up.
      </p>

      <div className="mt-10">
        <ExploreMap activities={activities} />
      </div>
    </main>
  );
}
