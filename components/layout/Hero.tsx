
export default function HeroSection() {
  return (
    <section
      id="home"
      className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:py-24 lg:px-8"
    >
      <div>
        <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">
          ✦ Traditional taste, made with love
        </span>

        <h1 className="mt-7 text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          Real food.
          <br />
          <span className="text-orange-600">Real flavor.</span>
          <br />
          At your door.
        </h1>

        <p className="mt-6 max-w-lg text-base leading-8 text-stone-600 sm:text-lg">
          Discover the taste of tradition with freshly prepared meals,
          authentic flavors, and convenient delivery right to your home.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#menu"
            className="rounded-full bg-orange-600 px-7 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-1 hover:bg-orange-700"
          >
            Explore Our Menu →
          </a>
          <a
            href="#about"
            className="rounded-full border border-stone-300 bg-white px-7 py-4 font-bold transition hover:border-orange-400"
          >
            Our Story
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-stone-600">
          <span>✓ Fresh ingredients</span>
          <span>✓ Authentic recipes</span>
          <span>✓ Easy ordering</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 rounded-[3rem] bg-orange-200/50 blur-2xl" />
        <div className="relative overflow-hidden rounded-[2rem] bg-orange-100">
          <img
            src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=85"
            alt="Traditional biryani served fresh"
            className="h-[340px] w-full object-cover sm:h-[440px]"
          />

          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Customer favorite
              </p>
              <p className="mt-1 text-lg font-black sm:text-xl">
                Chicken Dum Biryani
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Rich flavor, traditional recipe
              </p>
            </div>
            <span className="shrink-0 text-xl font-black">৳220</span>
          </div>
        </div>
      </div>
    </section>
  );
}
