import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — Outer Line",
  description: "The terms for using Outer Line — content, accounts, and risk.",
};

const CONTACT_EMAIL = "rochford196@gmail.com";

export default function TermsPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          The short version, in full
        </p>
        <h1 className="font-serif mt-2 text-4xl font-semibold text-[#FBF8F3] sm:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white/75">
          By using Outer Line, you&apos;re agreeing to these. They&apos;re written to actually mean
          what they say, not to bury a catch — read them, they&apos;re short.
        </p>

        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            The content is a starting point, not an instruction
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Every activity write-up on this site — difficulty, risk level, cost, permits, best
            season — is curated to be accurate at the time it was written, but conditions,
            prices, regulations and operator availability change. You are responsible for
            verifying everything with a local guide or operator before you go, and for your own
            judgment about whether an activity is within your ability. Several activities
            described here carry a real risk of serious injury or death. Outer Line is not
            liable for anything that happens if you do them.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            Guide and operator links
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Links to find a guide or operator, and links from featured/sponsored placements or
            the insurance page, point to third parties Outer Line doesn&apos;t control and isn&apos;t
            responsible for. Some of these links are affiliate links or paid placements (see{" "}
            <Link href="/privacy" className="text-accent hover:text-accent-light">
              Privacy Policy
            </Link>{" "}
            for how) — that never changes what&apos;s written about an activity, which stays
            honest whether or not it&apos;s paid.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            Accounts
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            You&apos;re responsible for keeping your account secure and for what happens under it.
            One account per person — don&apos;t create accounts to abuse rate limits or spam
            reviews. Outer Line can suspend or remove an account used to abuse the site (fake
            reviews, attempting to break in, hammering the API) without notice.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            Reviews you write
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Your reviews are your own honest account, for your own reference — write what&apos;s
            actually true for you. Don&apos;t post anything illegal, someone else&apos;s copyrighted
            work, or content meant to harass or mislead. Outer Line can remove a review that
            violates this.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            Changes
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            These terms and the site itself can change as Outer Line grows — new countries,
            features, or pricing for featured placements. Material changes will be reflected on
            this page.
          </p>
        </section>

        <p className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs leading-relaxed text-white/50">
          Questions about these terms: email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:text-accent-light">
            {CONTACT_EMAIL}
          </a>
          . This is a real, specific policy for how this site actually operates, not a generic
          template — but it isn&apos;t a substitute for your own legal advice if you need
          something reviewed for a specific requirement or jurisdiction.
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
