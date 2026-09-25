import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllExplorers, getExplorerBySlug } from "@/data/explorers";
import { findActivityById } from "@/lib/clientActivities";
import countriesData from "@/data/countries.json";
import type { CountryDetail } from "@/lib/types";

const COUNTRIES = countriesData as CountryDetail[];

export function generateStaticParams() {
  return getAllExplorers().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const explorer = getExplorerBySlug(slug);
  if (!explorer) return {};
  return {
    title: `${explorer.name} (${explorer.handle}) — Outer Line`,
    description: explorer.tagline,
  };
}

export default async function ExplorerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const explorer = getExplorerBySlug(slug);
  if (!explorer) notFound();

  const featuredActivity = explorer.featuredActivityId ? findActivityById(explorer.featuredActivityId) : null;
  const featuredCountry = explorer.featuredCountrySlug
    ? COUNTRIES.find((c) => c.slug === explorer.featuredCountrySlug)
    : null;

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-2xl px-6 py-16">
        <Link href="/explorers" className="text-sm font-semibold text-accent hover:text-accent-light">
          &larr; All explorers
        </Link>

        <div className="mt-6 flex items-center gap-4">
          {explorer.avatarUrl ? (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image src={explorer.avatarUrl} alt={explorer.name} fill className="object-cover" />
            </div>
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/15 text-lg font-semibold text-accent">
              {explorer.name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </div>
          )}
          <div>
            <h1 className="font-serif text-3xl font-semibold text-white">{explorer.name}</h1>
            <a
              href={explorer.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:text-accent-light"
            >
              {explorer.handle} on {explorer.platform} &rarr;
            </a>
          </div>
        </div>

        <p className="mt-6 text-lg leading-relaxed text-white/80">{explorer.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/65">{explorer.bio}</p>

        {(featuredActivity || featuredCountry) && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Featured for</p>
            {featuredActivity && (
              <Link
                href={`/countries/${featuredActivity.countryId}#${featuredActivity.id}`}
                className="mt-2 block font-semibold text-white hover:text-accent"
              >
                {featuredActivity.title}
              </Link>
            )}
            {!featuredActivity && featuredCountry && (
              <Link
                href={`/countries/${featuredCountry.slug}`}
                className="mt-2 block font-semibold text-white hover:text-accent"
              >
                {featuredCountry.name}
              </Link>
            )}
          </div>
        )}

        <p className="mt-8 text-xs text-white/40">Featured on Outer Line since {explorer.featuredSince}.</p>
      </div>
    </main>
  );
}
