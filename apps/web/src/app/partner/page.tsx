import Link from "next/link";

export const metadata = {
  title: "Partner with Outer Line — for guide & tour operators",
  description:
    "Get a featured placement in front of people already reading about your exact activity, in your exact region.",
};

const CONTACT_EMAIL = "rochford196@gmail.com";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Featured placement on Outer Line"
)}`;

export default function PartnerPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          For guide &amp; tour operators
        </p>
        <h1 className="font-serif mt-2 text-4xl font-semibold text-[#FBF8F3] sm:text-5xl">
          Get in front of people already planning your exact trip.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white/75">
          Outer Line covers 375 curated extreme activities across 50 countries — BASE jumps,
          guided ascents, cave dives, cliff camps. Someone reading a write-up about your
          activity, in your region, is about as high-intent as travel traffic gets. A featured
          placement puts you first in front of them.
        </p>

        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            What a featured placement gets you
          </h2>
          <ul className="mt-4 space-y-4">
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">Top of the list, honestly labeled</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                A visible &ldquo;Featured&rdquo; tag on your activity&apos;s card and first
                position in the default browse order for that country or category — clearly
                marked as paid, never disguised as an organic listing.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">One listing, not a banner rotation</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                No ad network, no rotating banners between operators. A featured slot is a
                specific activity, held for the term you agree, seen by readers already
                interested in that exact category of trip.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">A real write-up, not just a link</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Your activity gets the same honest treatment as every other entry — difficulty,
                risk, cost, what to pack — plus the placement. If it doesn&apos;t hold up to that
                standard, we&apos;ll tell you before it goes live, not after.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            How it works
          </h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
            <li>
              <span className="font-semibold text-white">1. Get in touch</span> — tell us which
              activity or region, and roughly how long you want the placement for.
            </li>
            <li>
              <span className="font-semibold text-white">2. Agree a rate</span> — priced per
              listing, not a fixed rate card; depends on activity, region and term.
            </li>
            <li>
              <span className="font-semibold text-white">3. It goes live</span> — usually within
              a few days of confirming details.
            </li>
          </ol>
        </section>

        <a
          href={MAILTO}
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink shadow-[0_8px_24px_-6px_rgba(193,127,78,0.45)] transition hover:bg-accent-light"
        >
          Get in touch
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
        <p className="mt-2 text-xs text-white/40">{CONTACT_EMAIL}</p>

        <p className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs leading-relaxed text-white/45">
          Featured placements are the only paid content on this site — no display ads, no
          affiliate spam wedged into write-ups. Everything else stays exactly as
          independently curated as it&apos;s always been.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-light"
        >
          &larr; Back to all countries
        </Link>
      </div>
    </main>
  );
}
