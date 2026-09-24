import Image from "next/image";
import Link from "next/link";
import { ActivityCard } from "@/components/ActivityCard";
import { getActivities } from "@/lib/api";
import { extremenessScore } from "@/lib/extremeness";
import { photoForCategoryGroup } from "@/lib/activityPhotos";

export const metadata = {
  title: "The 10 most extreme activities on Earth, ranked | Outer Line",
  description:
    "Ranked by difficulty and risk across all 50 countries — BASE jumps, extreme ascents, and worse. Updated automatically as new activities get added.",
};

export default async function ExtremePage() {
  const activities = await getActivities();

  const top10 = [...activities]
    .sort((a, b) => extremenessScore(b) - extremenessScore(a))
    .slice(0, 10);

  return (
    <main className="flex-1">
      <section className="relative flex min-h-[320px] items-end overflow-hidden sm:min-h-[380px]">
        <Image
          src={photoForCategoryGroup("mountaineering-climbing")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-[#0b0a08]/65 to-[#0b0a08]/20" />
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Ranked by difficulty + risk, across all 50 countries
          </p>
          <h1 className="font-serif mt-2 text-4xl font-semibold text-[#FBF8F3] drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] sm:text-5xl">
            The 10 most extreme things on this site
          </h1>
        </div>
      </section>

      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/70">
          Every activity here is scored on difficulty and risk level. These ten come out on
          top — updated automatically as new countries and activities get added, not a
          fixed list.
        </p>

        <ol className="space-y-8">
          {top10.map((activity, i) => (
            <li key={activity.id} className="relative">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-3xl font-black text-white/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link
                  href={`/countries/${activity.country.slug}#${activity.id}`}
                  className="text-xs font-semibold uppercase tracking-widest text-white/40 hover:text-white/70"
                >
                  {activity.country.name} &rarr;
                </Link>
              </div>
              <ActivityCard activity={activity} countryName={activity.country.name} countrySlug={activity.country.slug} />
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
