import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Outer Line — extreme travel by country",
  description:
    "What a country actually offers extremists: bivouacs, guided climbs, outback hunts, and cliff-edge everything.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-white/10">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
            <Link href="/" className="text-lg font-black tracking-tight text-white">
              OUTER LINE
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/plan"
                className="text-sm font-semibold text-white/70 hover:text-white"
              >
                Plan
              </Link>
              <Link
                href="/map"
                className="text-sm font-semibold text-white/70 hover:text-white"
              >
                Map
              </Link>
              <Link
                href="/favorites"
                className="text-sm font-semibold text-white/70 hover:text-white"
              >
                Favorites
              </Link>
              <p className="hidden text-xs uppercase tracking-widest text-white/40 sm:block">
                Extreme travel, by country
              </p>
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
