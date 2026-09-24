import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Outer Line",
  description: "What Outer Line collects, why, and who it's shared with — in plain terms.",
};

const CONTACT_EMAIL = "rochford196@gmail.com";

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          In plain terms
        </p>
        <h1 className="font-serif mt-2 text-4xl font-semibold text-[#FBF8F3] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white/75">
          This covers what Outer Line actually collects, why, and who it&apos;s shared with. It&apos;s
          written to match what this specific site really does — not a generic template — but
          it isn&apos;t a substitute for your own legal advice if you need it for a specific
          situation.
        </p>

        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            What&apos;s collected
          </h2>
          <ul className="mt-4 space-y-4">
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">Account data, if you sign in</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Sign-in is handled entirely by Clerk, a third-party authentication provider —
                your email, password (which Outer Line never sees or stores), and session data
                are processed under{" "}
                <a
                  href="https://clerk.com/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-light"
                >
                  Clerk&apos;s own privacy policy
                </a>
                . Once signed in, your favorited activities and any reviews you write (a rating
                and optional note) are stored in a Postgres database, linked to your account id
                — not to your name or email directly.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">Local, device-only data, if you don&apos;t</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Without an account, favorites and reviews are stored only in your browser&apos;s
                local storage — never sent to Outer Line at all. Clearing your browser data
                clears them.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">Trip planner conversations</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Messages you send to the <Link href="/plan" className="text-accent hover:text-accent-light">/plan</Link> AI
                assistant are sent to Google&apos;s Gemini API to generate a reply and are not
                stored by Outer Line afterward. Google processes them under their own terms.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">Cookies</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Clerk sets an essential session cookie to keep you signed in — the site can&apos;t
                function without it, so it&apos;s not optional. Separately, if you accept the
                cookie banner, Skimlinks (an affiliate network) loads a script that can set
                cookies to track when a link you click through leads to a purchase, which is
                how some of this site&apos;s revenue works. Choosing &ldquo;Essential only&rdquo;
                keeps that script from loading at all.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">Anonymous usage analytics</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Vercel Analytics and Speed Insights measure which pages get visited and how fast
                they load, in aggregate — no cookies, no data tied to you individually. This
                runs regardless of the cookie choice above, since it isn&apos;t a cookie or
                personal tracking. Separately, we log our own anonymous counters — a page-visit
                total (just a path and a timestamp) and when a &ldquo;Find a guide /
                operator&rdquo; link is clicked (just the activity) — with no IP address or
                identifier attached to either.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            What&apos;s never done
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Outer Line doesn&apos;t sell personal data to third parties, doesn&apos;t run display
            ad networks that track you across other sites, and doesn&apos;t share your reviews or
            favorites with guide operators or anyone else without your action (e.g. using the
            share button yourself).
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            Your options
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Remove a favorite or review any time from the activity itself. Your{" "}
            <Link href="/profile" className="text-accent hover:text-accent-light">
              profile page
            </Link>{" "}
            manages your sign-in and connected accounts. To delete your account entirely and
            everything linked to it, or for anything else — a question, a data request, a
            correction — email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:text-accent-light">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <p className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs leading-relaxed text-white/50">
          Last updated alongside this page&apos;s most recent code change. This is a real,
          specific description of what this site does today, not a boilerplate template — but
          if you need this reviewed for a specific legal or regulatory requirement, have a
          professional check it against your situation.
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
