import Link from "next/link";

type ChipGroup = {
  slug: string;
  label: string;
  count: number;
};

export function CategoryFilterChips({
  countrySlug,
  groups,
  totalCount,
  activeSlug,
}: {
  countrySlug: string;
  groups: ChipGroup[];
  totalCount: number;
  activeSlug?: string;
}) {
  const baseChip =
    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition";
  const activeChip = "border-accent bg-accent/15 text-accent-light";
  const inactiveChip = "border-white/15 bg-white/[0.03] text-white/70 hover:border-white/35 hover:text-white";

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/countries/${countrySlug}`}
        className={`${baseChip} ${!activeSlug ? activeChip : inactiveChip}`}
      >
        All
        <span className="text-xs opacity-70">{totalCount}</span>
      </Link>
      {groups.map((group) => (
        <Link
          key={group.slug}
          href={`/countries/${countrySlug}?category=${group.slug}`}
          className={`${baseChip} ${activeSlug === group.slug ? activeChip : inactiveChip}`}
        >
          {group.label}
          <span className="text-xs opacity-70">{group.count}</span>
        </Link>
      ))}
    </div>
  );
}
