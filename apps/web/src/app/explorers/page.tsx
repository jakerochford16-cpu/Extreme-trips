import { getAllExplorers } from "@/data/explorers";
import { ExplorerCard } from "@/components/ExplorerCard";
import { CreatorApplicationForm } from "@/components/CreatorApplicationForm";

export const metadata = {
  title: "Featured Explorers — Outer Line",
  description: "Get a real profile page on Outer Line in exchange for a shoutout to your audience.",
};

export default function ExplorersPage() {
  const explorers = getAllExplorers();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">For creators</p>
        <h1 className="font-serif mt-2 text-4xl font-semibold text-[#FBF8F3] sm:text-5xl">
          Get a real profile, not a shoutout-for-shoutout DM.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white/75">
          Outer Line covers 375 curated extreme activities across 50 countries. If your feed is
          climbing, diving, backcountry skiing, or anything else that belongs here, we&apos;ll build
          you a real profile page — your bio, your links, your best trip — and link it from the
          activity or country it fits. In exchange, a story or post pointing your audience at the
          site.
        </p>

        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            What you get
          </h2>
          <ul className="mt-4 space-y-4">
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">A dedicated page, not a mention</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Your own <code className="text-white/80">/explorers/you</code> page — photo, bio,
                links to your socials — plus a credit on the specific activity or country page you&apos;re
                known for.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">No cost, no catch</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                This isn&apos;t a paid placement — see <code className="text-white/80">/partner</code> for
                that, which is for operators. This is a straight trade: a page for a shoutout.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">Honest fit, not mass outreach</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                We&apos;re looking for people whose actual content matches something on the site —
                not follower count for its own sake.
              </p>
            </li>
          </ul>
        </section>

        {explorers.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Currently featured
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {explorers.map((explorer) => (
                <ExplorerCard key={explorer.slug} explorer={explorer} />
              ))}
            </div>
          </section>
        )}

        <CreatorApplicationForm />
      </div>
    </main>
  );
}
