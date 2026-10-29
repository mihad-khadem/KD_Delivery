import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fffaf3] px-5 py-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-orange-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-2">
        {/* Illustration */}
        <div className="relative flex min-h-64 items-center justify-center md:min-h-96">
          <div className="absolute h-64 w-64 rounded-full border border-dashed border-orange-200 md:h-80 md:w-80" />
          <div className="absolute h-52 w-52 rounded-full bg-orange-100 md:h-64 md:w-64" />

          <div className="relative flex h-44 w-44 -rotate-6 flex-col items-center justify-center rounded-[2.5rem] border-4 border-white bg-orange-500 shadow-2xl shadow-orange-200/70 md:h-56 md:w-56">
            <span className="text-7xl font-black tracking-tighter text-white md:text-8xl">
              404
            </span>
            <span className="mt-1 rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Lost order?
            </span>
          </div>

          <div className="absolute right-8 top-8 flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg md:right-12 md:top-10">
            🍛
          </div>

          <div className="absolute bottom-8 left-4 flex h-14 w-14 -rotate-12 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg md:bottom-12 md:left-10">
            📍
          </div>

          <span className="absolute left-12 top-12 text-2xl text-orange-400">
            ✦
          </span>
          <span className="absolute bottom-12 right-12 text-3xl text-amber-400">
            ✳
          </span>
        </div>

        {/* Message */}
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Looks like we're lost
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#2b211b] sm:text-5xl lg:text-6xl">
            Oops! This page
            <span className="block text-orange-600">is missing.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#76675d] md:mx-0">
            We couldn't find the page you're looking for. It may have moved, or
            the link might be incorrect. Don't worry — your next delicious meal
            is just a click away.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-600 px-7 py-3 font-bold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
            >
              ← Back to home
            </Link>

            <Link
              href="/menu"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-orange-200 bg-white px-7 py-3 font-bold text-[#2b211b] transition hover:border-orange-400 hover:bg-orange-50"
            >
              Explore menu →
            </Link>
          </div>

          <p className="mt-7 text-sm text-[#96877b]">
            Hungry? Let's get you back to something delicious.
          </p>
        </div>
      </div>
    </main>
  );
}
