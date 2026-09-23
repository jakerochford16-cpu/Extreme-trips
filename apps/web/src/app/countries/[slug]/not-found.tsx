import Link from "next/link";

export default function CountryNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        404
      </p>
      <h1 className="font-serif mt-2 text-3xl font-semibold text-[#FBF8F3]">We haven&apos;t scouted that one yet.</h1>
      <p className="mt-3 text-white/60">No country with that slug in the dataset.</p>
      <Link href="/" className="mt-6 text-sm font-semibold text-accent hover:text-accent-light">
        &larr; Back to all countries
      </Link>
    </main>
  );
}
