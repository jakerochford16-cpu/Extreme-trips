import Image from "next/image";
import Link from "next/link";
import type { CountrySummary } from "@/lib/types";
import { visualsForCountry } from "@/lib/countryVisuals";

export function CountryCard({ country }: { country: CountrySummary }) {
  const { photo } = visualsForCountry(country.slug);

  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] transition hover:-translate-y-0.5 hover:border-accent/30"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={photo}
          alt={country.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
        <span className="absolute right-3.5 top-3.5 rounded-full bg-[#0b0a08]/55 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm">
          {country.activityCount} {country.activityCount === 1 ? "line" : "lines"}
        </span>
      </div>

      <div className="p-6 pt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
          {country.continent}
        </p>
        <h3 className="font-serif mt-1.5 text-2xl font-semibold text-white">{country.name}</h3>
        <p className="mt-1 text-[13px] font-medium text-white/45">{country.heroTag}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/65">{country.summary}</p>
        <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-accent transition group-hover:gap-2.5">
          See the extremes
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </p>
      </div>
    </Link>
  );
}
