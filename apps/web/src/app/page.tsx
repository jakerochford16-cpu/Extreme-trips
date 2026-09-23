import Image from "next/image";
import { CountryCard } from "@/components/CountryCard";
import { getCountries } from "@/lib/api";

export default async function HomePage() {
  const countries = await getCountries();

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
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white/40">
          Countries ({countries.length})
        </h2>
        {countries.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
            No countries in the dataset yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
