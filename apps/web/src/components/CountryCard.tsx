import Image from "next/image";
import Link from "next/link";
import type { CountrySummary } from "@/lib/types";
import { visualsForCountry } from "@/lib/countryVisuals";

export function CountryCard({ country }: { country: CountrySummary }) {
  const { photo, accent } = visualsForCountry(country.slug);

  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group block overflow-hidden rounded-2xl border bg-[#121218] transition hover:-translate-y-0.5"
      style={{ borderColor: `${accent}59` }}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={photo}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/10 to-transparent" />
        <span
          className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm"
        >
          {country.activityCount} {country.activityCount === 1 ? "line" : "lines"}
        </span>
      </div>

      <div className="p-6 pt-4">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: accent }}
        >
          {country.continent}
        </p>
        <h3 className="mt-1 text-2xl font-bold text-white">{country.name}</h3>
        <p className="mt-1 text-sm font-medium text-white/50">{country.heroTag}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{country.summary}</p>
        <p
          className="mt-4 text-sm font-semibold transition group-hover:translate-x-1"
          style={{ color: accent }}
        >
          See the extremes &rarr;
        </p>
      </div>
    </Link>
  );
}
