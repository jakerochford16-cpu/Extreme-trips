import Image from "next/image";
import Link from "next/link";
import { CountryBrowse } from "@/components/CountryBrowse";
import { getCountries, getActivities } from "@/lib/api";
import { isInSeason, pickDiverse } from "@/lib/seasonality";
import { photoForCategoryGroup } from "@/lib/activityPhotos";

export const revalidate = 86400; // refresh the "in season now" picks daily

export default async function HomePage() {
  const [countries, activities] = await Promise.all([getCountries(), getActivities()]);
  const inSeason = pickDiverse(activities.filter((a) => isInSeason(a.bestSeason)), 6);

  return (
    <main className="flex-1">
      <section className="relative flex min-h-[420px] items-end overflow-hidden sm:min-h-[520px]">
        <Image
          src="/images/hero-iceclimb.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_78%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-[#06060a]/55 to-[#06060a]/15" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-24">
          <span className="inline-block rounded-full border border-orange-400/50 bg-black/50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-300 backdrop-blur-sm">
            Not a sightseeing app
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] sm:text-5xl">
            Find out what a country actually offers if you want to suffer for it.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            Bivouac on a 500m suspension bridge crossing. Guided ascents that cost more than
            your flight. Outback hunts, cage-free wreck dives, portaledge camps hanging off a
            cliff. Pick a country, see what it&apos;s really got.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/surprise"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-orange-400/60 hover:text-orange-300"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l4 4M4 20l4-4M20 4l-4 4M20 20l-4-4M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
              </svg>
              Surprise me with a random one
            </Link>
            <Link
              href="/extreme"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-orange-400/60 hover:text-orange-300"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c1 3-2 4-2 7a2 2 0 104 0c1.5 1 2.5 3 2.5 5a6.5 6.5 0 11-13 0c0-4 3-6 3-9 0-1.5.5-2.5 1.5-3z" />
              </svg>
              The top 10 most extreme
            </Link>
          </div>
        </div>
      </section>

      {inSeason.length > 0 && (
        <section className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto w-full max-w-6xl px-6 py-10">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white/40">
              In season right now
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inSeason.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/countries/${activity.country.slug}#${activity.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition hover:border-orange-400/40"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={photoForCategoryGroup(activity.categoryGroup)}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white group-hover:text-orange-300">
                      {activity.title}
                    </p>
                    <p className="truncate text-xs text-white/50">
                      {activity.country.name} &middot; {activity.bestSeason}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        {countries.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
            No countries in the dataset yet.
          </p>
        ) : (
          <CountryBrowse countries={countries} />
        )}
      </section>
    </main>
  );
}
