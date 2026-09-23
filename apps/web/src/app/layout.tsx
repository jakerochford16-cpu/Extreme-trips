import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-white/10">
          <div className="mx-auto w-full max-w-6xl px-6 py-8 text-xs leading-relaxed text-white/40">
            Curated starting points, not instructions. Conditions, permits, prices and
            regulations change &mdash; verify everything with a local guide or operator
            before you go. Several activities here carry serious risk of injury or death.
          </div>
        </footer>
      </body>
    </html>
  );
}
