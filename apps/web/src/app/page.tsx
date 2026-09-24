import Image from "next/image";
import Link from "next/link";
import { CountryBrowse } from "@/components/CountryBrowse";
import { getCountries, getActivities } from "@/lib/api";
import { isInSeason, pickDiverse } from "@/lib/seasonality";
import { photoForCategoryGroup } from "@/lib/activityPhotos";
import { CATEGORY_GROUPS } from "@/lib/categoryGroups";
import { safeJsonLd } from "@/lib/safeJsonLd";

export const revalidate = 86400; // refresh the "in season now" picks daily

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Outer Line",
  url: "https://extreme-trips-web.vercel.app",
  description:
    "What a country actually offers, if you want to suffer for it — 375 curated extreme activities across 50 countries.",
};

export default async function HomePage() {
  const [countries, activities] = await Promise.all([getCountries(), getActivities()]);
  const inSeason = pickDiverse(activities.filter((a) => isInSeason(a.bestSeason)), 6);

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <section className="relative flex min-h-[460px] items-end overflow-hidden sm:min-h-[600px]">
        <Image
          src="/images/hero-iceclimb.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_78%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] from-5% via-[#0b0a08]/55 via-45% to-[#0b0a08]/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-24">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-7 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Not a sightseeing itinerary
            </span>
          </div>
          <h1 className="font-serif mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] text-[#FBF8F3] drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] sm:text-6xl">
            What a country actually offers, if you want to suffer for it.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            Bivouac on a 500m suspension bridge crossing. Guided ascents that cost more than
            your flight. Outback hunts, cage-free wreck dives, portaledge camps hanging off a
            cliff. Pick a country, see what it&apos;s really got.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink shadow-[0_8px_24px_-6px_rgba(193,127,78,0.45)] transition hover:bg-accent-light"
            >
              Explore 50 countries
            </Link>
            <Link
              href="/extreme"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c1 3-2 4-2 7a2 2 0 104 0c1.5 1 2.5 3 2.5 5a6.5 6.5 0 11-13 0c0-4 3-6 3-9 0-1.5.5-2.5 1.5-3z" />
              </svg>
              The 10 most extreme
            </Link>
            <Link
              href="/surprise"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white/70 transition hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l4 4M4 20l4-4M20 4l-4 4M20 20l-4-4M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
              </svg>
              Surprise me
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0e0c09]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-10 gap-y-3 px-6 py-6">
          <Stat value={countries.length} label="Countries" />
          <Divider />
          <Stat value={activities.length} label="Curated activities" />
          <Divider />
          <Stat value={CATEGORY_GROUPS.length} label="Categories" />
          <Divider />
          <Stat
            value={activities.filter((a) => a.sponsored).length}
            label="Sponsored placements"
          />
        </div>
      </section>

      {inSeason.length > 0 && (
        <section className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto w-full max-w-6xl px-6 py-10">
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              In season right now
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inSeason.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/countries/${activity.country.slug}#${activity.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition hover:border-accent/40"
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
                    <p className="truncate text-sm font-semibold text-white group-hover:text-accent-light">
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
          <>
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                Countries
              </span>
              <h2 className="font-serif mt-1.5 text-3xl font-semibold text-[#FBF8F3]">
                Pick where it gets serious
              </h2>
            </div>
            <CountryBrowse countries={countries} />
          </>
        )}
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-serif text-xl font-semibold text-accent">{value}</span>
      <span className="text-[11px] uppercase tracking-[0.1em] text-white/45">{label}</span>
    </div>
  );
}

function Divider() {
  return <span className="hidden h-4 w-px bg-white/10 sm:block" />;
}
