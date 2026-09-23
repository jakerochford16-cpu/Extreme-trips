import { FavoritesList } from "@/components/FavoritesList";
import { getActivities } from "@/lib/api";

export const metadata = {
  title: "Favorites — Outer Line",
};

export default async function FavoritesPage() {
  const activities = await getActivities();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
          Saved
        </p>
        <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Your favorites</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Saved on this device only — tap the heart on any activity to add or remove it.
        </p>
        <div className="mt-10">
          <FavoritesList activities={activities} />
        </div>
      </div>
    </main>
  );
}
