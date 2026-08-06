"use client";

import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export default function GlobalError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <title>We couldn&apos;t open this page | Upbring</title>
        <main className="page-container flex min-h-screen items-center py-20 md:py-28">
          <div className="editorial-width">
            <h1 className="text-4xl md:text-5xl">This page needs a moment.</h1>
            <p className="mt-5 text-lg text-[var(--text-secondary)]">
              Please try again. If the page still does not open, you can
              return home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => unstable_retry()}
                className="inline-flex min-h-11 appearance-none items-center justify-center rounded-2xl border border-[#111111] bg-[#111111] px-5 text-sm text-white shadow-none transition-colors duration-[var(--transition-duration)] ease-[var(--transition-easing)] hover:border-[#2f2f2f] hover:bg-[#2f2f2f] active:border-[#111111] active:bg-[#111111]"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex min-h-11 appearance-none items-center justify-center rounded-2xl border border-[var(--border)] bg-white px-5 text-sm text-[var(--text-primary)] shadow-none transition-colors duration-[var(--transition-duration)] ease-[var(--transition-easing)] hover:bg-gray-50 active:bg-white"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
