import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          404
        </p>
        <h1 className="font-serif mt-3 text-3xl font-semibold text-[#FBF8F3] sm:text-4xl">
          You've wandered off the map.
        </h1>
        <p className="mt-4 text-white/60">
          Whatever you were looking for isn&apos;t here. Maybe that&apos;s the point —
          this whole site is about going where the path runs out.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-light"
        >
          Back to all countries
        </Link>
      </div>
    </main>
  );
}
