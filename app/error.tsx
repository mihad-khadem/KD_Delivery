"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for debugging.
    console.error("KD Delivery application error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#fffaf3] px-5 py-16">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-orange-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-red-100/50 blur-3xl" />

      <div className="relative mx-auto w-full max-w-2xl text-center">
        {/* Error illustration */}
        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-white shadow-xl shadow-orange-900/5 ring-1 ring-orange-100 sm:h-48 sm:w-48">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-100 sm:h-32 sm:w-32">
            <span className="text-6xl sm:text-7xl">🍲</span>
          </div>

          <span className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600 text-2xl font-black text-white shadow-lg shadow-orange-600/25">
            !
          </span>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-700">
          <span className="h-2 w-2 rounded-full bg-orange-500" />A little
          kitchen hiccup
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-[#2b211b] sm:text-5xl">
          Something went
          <span className="block text-orange-600">wrong!</span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#76675d]">
          Sorry, we hit an unexpected problem. Your food cravings can wait a
          moment while we try to get things back on track.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-600 px-7 py-3 font-bold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
          >
            ↻ Try again
          </button>

          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-orange-200 bg-white px-7 py-3 font-bold text-[#2b211b] transition hover:border-orange-400 hover:bg-orange-50"
          >
            Back to home →
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-[#96877b]">
            Reference code: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
