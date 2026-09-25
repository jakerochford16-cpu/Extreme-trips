import type { Metadata } from "next";
import { getCreatorApplications } from "@/lib/creatorApplications";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const SINCE_DAYS = 90;

export default async function CreatorsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const expectedKey = process.env.ADMIN_DASHBOARD_KEY;

  if (!expectedKey || !key || key !== expectedKey) {
    return (
      <main className="mx-auto max-w-md px-6 py-24">
        <h1 className="font-serif text-2xl font-semibold text-white">Admin</h1>
        <p className="mt-3 text-sm text-white/50">
          {expectedKey
            ? "Add ?key=... to the URL to view this page."
            : "ADMIN_DASHBOARD_KEY is not set in the environment."}
        </p>
      </main>
    );
  }

  const applications = await getCreatorApplications(SINCE_DAYS);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">Internal · not indexed</p>
      <h1 className="font-serif mt-1.5 text-3xl font-semibold text-white">Creator applications</h1>
      <p className="mt-2 text-sm text-white/50">
        Last {SINCE_DAYS} days &middot; {applications.length} application{applications.length === 1 ? "" : "s"}
      </p>
      <p className="mt-1 text-xs text-white/40">
        Approving one doesn&apos;t publish it automatically — add a hand-written entry to
        src/data/explorers.ts for anyone you accept.
      </p>

      <section className="mt-8">
        {applications.length === 0 ? (
          <p className="mt-3 text-sm text-white/40">No applications submitted yet in this window.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="mt-3 w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-white/40">
                  <th className="py-2 pr-4 font-medium">Submitted</th>
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Handle</th>
                  <th className="py-2 pr-4 font-medium">Platform</th>
                  <th className="py-2 pr-4 font-medium">Followers</th>
                  <th className="py-2 pr-4 font-medium">Niche</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 font-medium">Message</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id} className="border-b border-white/5 align-top">
                    <td className="py-2 pr-4 whitespace-nowrap text-white/50">
                      {new Date(application.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 pr-4 text-white/80">{application.name}</td>
                    <td className="py-2 pr-4 text-white/80">{application.handle}</td>
                    <td className="py-2 pr-4 text-white/70">{application.platform}</td>
                    <td className="py-2 pr-4 text-white/70">{application.followerCount}</td>
                    <td className="py-2 pr-4 text-white/70">{application.niche}</td>
                    <td className="py-2 pr-4 text-white/80">
                      <a href={`mailto:${application.email}`} className="text-accent hover:text-accent-light">
                        {application.email}
                      </a>
                    </td>
                    <td className="py-2 max-w-[320px] text-white/60">{application.message || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
