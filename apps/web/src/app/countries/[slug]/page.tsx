import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivityCard } from "@/components/ActivityCard";
import { CategoryFilterChips } from "@/components/CategoryFilterChips";
import { getCountry } from "@/lib/api";
import { CATEGORY_GROUPS, labelForGroup } from "@/lib/categoryGroups";

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

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <Link href="/" className="text-sm font-medium text-white/50 hover:text-white">
        &larr; All countries
      </Link>

      <section className="mt-4 mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          {country.continent} &middot; {country.heroTag}
        </p>
        <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">{country.name}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          {country.summary}
        </p>
      </section>

      <section className="mb-8">
        <CategoryFilterChips
          countrySlug={country.slug}
          groups={groupsPresent}
          totalCount={country.activities.length}
          activeSlug={activeGroup}
        />
      </section>

      <section>
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white/40">
          {visibleActivities.length}{" "}
          {activeGroup ? labelForGroup(activeGroup) : "extreme"}{" "}
          {visibleActivities.length === 1 ? "line" : "lines"}
        </h2>
        {visibleActivities.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
            Nothing in this category yet for {country.name}.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {visibleActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
