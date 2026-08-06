import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-container flex min-h-[60vh] items-center py-20 md:py-28">
      <div className="editorial-width">
        <h1 className="text-4xl md:text-5xl">This page isn&apos;t here.</h1>
        <p className="mt-5 text-lg text-[var(--text-secondary)]">
          The page you were looking for may have moved or is no longer
          available.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 appearance-none items-center justify-center rounded-2xl border border-[#111111] bg-[#111111] px-5 text-sm !text-white shadow-none transition-colors duration-[var(--transition-duration)] ease-[var(--transition-easing)] hover:border-[#2f2f2f] hover:bg-[#2f2f2f] active:border-[#111111] active:bg-[#111111]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
