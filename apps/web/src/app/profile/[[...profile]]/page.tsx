import { UserProfile } from "@clerk/nextjs";

export const metadata = {
  title: "Your profile — Outer Line",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Account</p>
        <h1 className="font-serif mt-2 text-3xl font-semibold text-[#FBF8F3] sm:text-4xl">
          Your profile
        </h1>
        <p className="mt-3 max-w-xl text-white/60">
          Manage your sign-in, email and connected accounts.
        </p>
        <div className="mt-10 flex justify-center sm:justify-start">
          <UserProfile path="/profile" routing="path" />
        </div>
      </div>
    </main>
  );
}
