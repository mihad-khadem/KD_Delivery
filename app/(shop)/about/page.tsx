import Link from "next/link";

const values = [
  {
    number: "01",
    icon: "🍛",
    title: "Traditional taste",
    description:
      "We celebrate the rich flavors of Bangladeshi cuisine, from aromatic kacchi to comforting biryani and traditional favorites.",
  },
  {
    number: "02",
    icon: "🥘",
    title: "Made with care",
    description:
      "Every meal deserves attention. Our goal is to serve satisfying food prepared with care and a love for good flavor.",
  },
  {
    number: "03",
    icon: "🛵",
    title: "At your convenience",
    description:
      "Enjoy your favorite meals with a convenient ordering experience and delivery to your door where available.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#fffaf4] text-[#2b211b]">
      {/* Hero */}
      <section className="relative px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              <span className="h-2 w-2 rounded-full bg-orange-500" />A little
              about KD Delivery
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Good food.
              <br />
              <span className="text-orange-600">Real tradition.</span>
              <br />
              Made with care.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#75685e] sm:text-lg">
              At KD Delivery, we believe a great meal is more than food. It is
              the comfort of familiar flavors, the joy of sharing, and the
              feeling of enjoying something truly delicious.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full bg-orange-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
              >
                Explore our menu <span className="ml-2">→</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white px-7 py-3.5 font-bold text-[#2b211b] transition hover:border-orange-400 hover:bg-orange-50"
              >
                Get in touch
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-[#75685e]">
              <span>✓ Traditional flavors</span>
              <span>✓ Food made with care</span>
              <span>✓ Convenient ordering</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-orange-200/60 blur-2xl" />
            <div className="absolute -bottom-5 -left-5 h-40 w-40 rounded-full bg-amber-200/50 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white bg-white p-3 shadow-2xl shadow-orange-950/10 sm:rounded-[2.5rem] sm:p-4">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=1200&q=85"
                alt="A delicious plate of aromatic biryani"
                className="h-[350px] w-full rounded-[1.5rem] object-cover sm:h-[480px] sm:rounded-[2rem]"
              />

              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur sm:bottom-9 sm:left-9 sm:right-9 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                  Our philosophy
                </p>
                <p className="mt-2 text-lg font-extrabold sm:text-xl">
                  Every meal should feel special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1100&q=85"
              alt="Food prepared and served for sharing"
              className="h-[320px] w-full rounded-[2rem] object-cover sm:h-[430px]"
            />
            <div className="absolute -bottom-5 right-4 rounded-2xl bg-[#2b211b] px-5 py-4 text-white shadow-xl sm:-right-5 sm:px-7 sm:py-5">
              <p className="text-sm text-orange-200">The heart of our brand</p>
              <p className="mt-1 text-lg font-extrabold">
                Food brings us together.
              </p>
            </div>
          </div>

          <div className="pt-5 lg:pt-0">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-orange-600">
              Our story
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              A love for food,
              <br />
              rooted in tradition.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-8 text-[#75685e]">
              <p>
                KD Delivery is built around a simple idea: make it easier for
                people to enjoy the traditional meals they love.
              </p>
              <p>
                From flavorful kacchi and biryani to comforting favorites, our
                menu celebrates the familiar tastes that make a meal memorable.
                We want ordering food to feel simple, welcoming, and convenient.
              </p>
              <p>
                Whether you are sharing a meal with family, treating yourself,
                or planning a get-together, we want KD Delivery to be part of
                your table.
              </p>
            </div>

            <Link
              href="/menu"
              className="mt-8 inline-flex items-center gap-2 font-bold text-orange-700 transition hover:gap-3"
            >
              Discover what we serve <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-orange-600">
              What matters to us
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
              More than just a meal.
            </h2>
            <p className="mt-5 leading-7 text-[#75685e]">
              The little things that shape the KD Delivery experience, from the
              flavors we celebrate to the way you order.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.number}
                className="group rounded-3xl border border-orange-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-950/5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-3xl transition group-hover:bg-orange-100">
                    {value.icon}
                  </div>
                  <span className="text-sm font-black tracking-widest text-orange-300">
                    {value.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-extrabold">{value.title}</h3>

                <p className="mt-3 leading-7 text-[#75685e]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#2b211b] px-6 py-12 text-center text-white sm:rounded-[2.5rem] sm:px-12 sm:py-20">
          <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-orange-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <span className="text-4xl">🧡</span>
            <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.2em] text-orange-300">
              Our promise
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Bringing the flavors you love, closer to home.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-orange-50/75">
              Great food should be easy to enjoy. Choose your favorites, place
              your order, and let KD Delivery help make mealtime a little more
              special.
            </p>

            <Link
              href="/menu"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 font-extrabold text-white transition hover:bg-orange-400"
            >
              Order your favorites <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
