import Link from "next/link";
import Image from "next/image";
import type { Explorer } from "@/data/explorers";

export function ExplorerCard({ explorer }: { explorer: Explorer }) {
  return (
    <Link
      href={`/explorers/${explorer.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface p-5 transition hover:border-white/25"
    >
      <div className="flex items-center gap-3">
        {explorer.avatarUrl ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image src={explorer.avatarUrl} alt={explorer.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
            {explorer.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
        <div>
          <p className="font-semibold text-white">{explorer.name}</p>
          <p className="text-xs text-white/50">
            {explorer.handle} &middot; {explorer.platform}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/65 line-clamp-3">{explorer.tagline}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        View profile
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
