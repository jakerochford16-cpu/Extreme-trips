import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { ClerkProvider, Show, SignInButton, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AccountSync } from "@/components/AccountSync";
import { AffiliateScript } from "@/components/AffiliateScript";
import { CookieConsent } from "@/components/CookieConsent";
import { PageViewPing } from "@/components/PageViewPing";
import "./globals.css";

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#c17f4e",
    colorBackground: "#131009",
    colorInput: "#1b140d",
    colorInputForeground: "#ede8e0",
    colorForeground: "#ede8e0",
    colorMutedForeground: "#b7ad9d",
    colorNeutral: "#ede8e0",
    colorBorder: "rgba(237,232,224,0.16)",
    colorRing: "#c17f4e",
    borderRadius: "0.625rem",
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  },
  elements: {
    card: "border border-white/10 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)]",
    userButtonPopoverCard: "border border-white/10",
    navbar: "border-r border-white/10",
    navbarButton: "text-[#ede8e0]/70 hover:text-[#ede8e0] data-[active]:text-accent",
    profileSectionTitleText: "text-[#ede8e0]",
    formFieldLabel: "text-[#ede8e0]/85",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const description =
  "What a country actually offers extremists: bivouacs, guided climbs, outback hunts, and cliff-edge everything. 50 countries, 250+ real curated activities.";

export const metadata: Metadata = {
  metadataBase: new URL("https://extreme-trips-web.vercel.app"),
  title: "Outer Line — extreme travel by country",
  description,
  openGraph: {
    title: "Outer Line — extreme travel by country",
    description,
    siteName: "Outer Line",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outer Line — extreme travel by country",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <PageViewPing />
          <AccountSync />
          <AffiliateScript />
          <CookieConsent />
          <header className="no-print border-b border-white/10">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
              <Link
                href="/"
                className="font-serif text-lg font-semibold tracking-wide text-white sm:text-xl"
              >
                Outer Line
              </Link>
              <nav className="flex items-center gap-3 sm:gap-7">
                <Link
                  href="/activities"
                  className="text-[11px] font-semibold uppercase tracking-widest text-white/60 transition hover:text-white sm:text-xs"
                >
                  Activities
                </Link>
                <Link
                  href="/plan"
                  className="text-[11px] font-semibold uppercase tracking-widest text-white/60 transition hover:text-white sm:text-xs"
                >
                  Plan
                </Link>
                <Link
                  href="/map"
                  className="text-[11px] font-semibold uppercase tracking-widest text-white/60 transition hover:text-white sm:text-xs"
                >
                  Map
                </Link>
                <Link
                  href="/favorites"
                  className="hidden h-9 w-9 items-center justify-center rounded-full border border-accent/40 text-accent transition hover:border-accent hover:bg-accent/10 sm:flex"
                  aria-label="Favorites"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s-6.7-4.35-9.3-8.2C.9 9.8 1.9 6 5.2 5.1c2-.55 3.9.35 4.8 2C10.9 5.45 12.8 4.55 14.8 5.1c3.3.9 4.3 4.7 2.5 7.7C18.7 16.65 12 21 12 21z"
                    />
                  </svg>
                </Link>
                <Link
                  href="/favorites"
                  className="text-[11px] font-semibold uppercase tracking-widest text-white/60 transition hover:text-white sm:hidden"
                >
                  Favorites
                </Link>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="text-[11px] font-semibold uppercase tracking-widest text-white/60 transition hover:text-white sm:text-xs"
                    >
                      Sign in
                    </button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <UserButton
                    userProfileUrl="/profile"
                    appearance={{ elements: { userButtonAvatarBox: "h-8 w-8" } }}
                  />
                </Show>
              </nav>
            </div>
          </header>
          {children}
          <footer className="border-t border-white/10">
            <div className="mx-auto w-full max-w-6xl px-6 py-8 text-xs leading-relaxed text-white/50">
              Curated starting points, not instructions. Conditions, permits, prices and
              regulations change &mdash; verify everything with a local guide or operator
              before you go. Several activities here carry serious risk of injury or death.
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link href="/partner" className="font-semibold text-white/50 hover:text-accent">
                  Guide or operator? Partner with us &rarr;
                </Link>
                <Link href="/explorers" className="font-semibold text-white/50 hover:text-accent">
                  Creator? Get featured &rarr;
                </Link>
                <Link href="/privacy" className="text-white/50 hover:text-white/70">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/50 hover:text-white/70">
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </footer>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
