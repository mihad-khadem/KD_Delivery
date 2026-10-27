
export default function AboutSection() {
  return (
    <section
      id="about"
      className="mx-5 mb-16 overflow-hidden rounded-[2rem] bg-stone-900 px-6 py-14 text-center text-white sm:mx-8 sm:px-12 sm:py-20"
    >
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
        Food made with care
      </p>

      <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
        Bringing traditional flavors to your table.
      </h2>

      <p className="mx-auto mt-5 max-w-2xl leading-8 text-stone-300">
        At KD Delivery, we believe great food starts with good ingredients
        and recipes worth sharing. Let us make your next meal special.
      </p>

      <a
        href="#menu"
        className="mt-8 inline-flex rounded-full bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-400"
      >
        Find Your Next Favorite →
      </a>
    </section>
  );
}
