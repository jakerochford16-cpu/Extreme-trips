import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivityListSection } from "@/components/ActivityListSection";
import { CategoryFilterChips } from "@/components/CategoryFilterChips";
import { CountryMapSection } from "@/components/map/CountryMapSection";
import { getCountry } from "@/lib/api";
import { CATEGORY_GROUPS, labelForGroup } from "@/lib/categoryGroups";
import { visualsForCountry } from "@/lib/countryVisuals";

export default async function CountryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { slug } = await params;
  const { category } = await searchParams;
  const country = await getCountry(slug);

  if (!country) {
    notFound();
  }

  const groupCounts = new Map<string, number>();
  for (const activity of country.activities) {
    groupCounts.set(activity.categoryGroup, (groupCounts.get(activity.categoryGroup) ?? 0) + 1);
  }
  const groupsPresent = CATEGORY_GROUPS.filter((g) => groupCounts.has(g.slug)).map((g) => ({
    ...g,
    count: groupCounts.get(g.slug)!,
  }));

  const activeGroup = category && groupCounts.has(category) ? category : undefined;
  const visibleActivities = activeGroup
    ? country.activities.filter((a) => a.categoryGroup === activeGroup)
    : country.activities;

  const { photo } = visualsForCountry(country.slug);

  return (
    <main className="flex-1">
      <section className="relative flex h-[300px] items-end overflow-hidden sm:h-[360px]">
        <Image
          src={photo}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-[#0b0a08]/55 to-[#0b0a08]/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-8">
          <Link href="/" className="text-sm font-medium text-white/70 hover:text-white">
            &larr; All countries
          </Link>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {country.continent} &middot; {country.heroTag}
          </p>
          <h1 className="font-serif mt-2 text-4xl font-semibold text-[#FBF8F3] drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] sm:text-5xl">
            {country.name}
          </h1>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/70">
          {country.summary}
        </p>

        <section className="mb-8">
          <CategoryFilterChips
            countrySlug={country.slug}
            groups={groupsPresent}
            totalCount={country.activities.length}
            activeSlug={activeGroup}
          />
        </section>

        <section className="mb-10">
          <CountryMapSection activities={visibleActivities} />
        </section>

        <section>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white/40">
            {visibleActivities.length}{" "}
            {activeGroup ? labelForGroup(activeGroup) : "extreme"}{" "}
            {visibleActivities.length === 1 ? "line" : "lines"}
          </h2>
          <ActivityListSection
            activities={visibleActivities}
            countryName={country.name}
            countrySlug={country.slug}
            emptyLabel={`Nothing in this category yet for ${country.name}.`}
          />
        </section>
      </div>
    </main>
  );
}
