import Link from "next/link";

export const metadata = {
  title: "Insurance — the gap nobody mentions — Outer Line",
  description:
    "Most travel insurance excludes the exact activities this site is about. Here's what actually covers them.",
};

export default function InsurancePage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          The gap nobody mentions
        </p>
        <h1 className="font-serif mt-2 text-4xl font-semibold text-[#FBF8F3] sm:text-5xl">
          Your travel insurance probably doesn&apos;t cover this.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white/75">
          Most standard travel insurance — the kind bundled with a credit card, or the cheap
          add-on at checkout when you book a flight — carries a blanket exclusion clause,
          usually worded something like &ldquo;hazardous activities&rdquo; or &ldquo;high-risk
          sports.&rdquo; A huge share of what&apos;s on this site falls squarely inside that
          clause. Nobody tells you this until a claim gets denied.
        </p>

        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            What that actually means
          </h2>
          <p className="mt-3 leading-relaxed text-white/70">
            If you get hurt doing an excluded activity, a standard policy can refuse to pay for
            <em> anything</em> related to the incident — medical treatment, evacuation, hospital
            stay, repatriation, even the rest of your unrelated trip in some cases. Search and
            rescue and medical evacuation in a remote area (a helicopter off a mountain, an
            emergency flight out of a jungle) can run to tens of thousands of dollars on their
            own, paid out of pocket, before any medical bill even starts.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            What to actually do about it
          </h2>
          <ul className="mt-4 space-y-4">
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">
                Look for a policy that explicitly lists your activity
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Not a policy that vaguely says &ldquo;adventure sports covered&rdquo; — one that
                names the specific activity (or its category — mountaineering above a stated
                altitude, cave diving, BASE jumping, whitewater grade, etc.) and states any
                limits: altitude caps, depth caps, whether a guide is required for cover to
                apply.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">
                Separate medical evacuation from trip insurance
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Specialist rescue/evacuation coverage (separate from a general travel policy) is
                what actually pays for a helicopter or an emergency flight out of somewhere
                remote. Some travellers carry both a specialist adventure travel policy and a
                standalone evacuation membership on top of it.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">Check what you already have, in writing</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Credit card travel insurance and annual multi-trip policies are the most common
                places a &ldquo;hazardous activities&rdquo; exclusion hides. Ask the insurer
                directly, by name, whether the specific activity is covered — a general
                &ldquo;yes we cover adventure travel&rdquo; from a call centre isn&apos;t worth
                much if the policy wording says otherwise.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            Providers that specialize in this
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            A starting point for research, not a recommendation of any specific plan — coverage,
            exclusions and pricing change, vary by activity, altitude/depth limits, your age and
            country of residence, and need verifying directly with the provider before you rely
            on them.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                name: "World Nomads",
                url: "https://www.worldnomads.com",
                blurb:
                  "Markets specifically to independent and adventure travellers, with a published list of covered activities you can check an activity against before buying.",
              },
              {
                name: "Global Rescue",
                url: "https://www.globalrescue.com",
                blurb:
                  "Focused on medical evacuation and rescue membership rather than general trip insurance — often carried alongside a separate travel policy, not instead of one.",
              },
              {
                name: "IMG (International Medical Group)",
                url: "https://www.imglobal.com",
                blurb:
                  "Offers adventure/expedition-specific riders on top of standard travel medical plans, aimed at higher-risk activities and remote expeditions.",
              },
              {
                name: "Ripcord Rescue Travel Insurance",
                url: "https://www.ripcordrescuetravelinsurance.com",
                blurb:
                  "Combines rescue/evacuation with trip insurance in one policy, marketed specifically at travellers heading somewhere remote or doing something risky.",
              },
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/30"
              >
                <p className="flex items-center gap-1.5 font-semibold text-white">
                  {p.name}
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white/50" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{p.blurb}</p>
              </a>
            ))}
          </div>
        </section>

        <p className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs leading-relaxed text-white/45">
          None of this is financial or insurance advice, and it isn&apos;t exhaustive — it&apos;s
          a starting point for a conversation you should have directly with an insurer before you
          go. Policy details change; verify coverage for your specific activity, dates and
          location before you rely on it.
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
