
const popularDishes = [
  {
    name: "Chicken Dum Biryani",
    description: "Aromatic rice with tender, spiced chicken.",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=85",
    tag: "BESTSELLER",
    rating: "4.9",
  },
  {
    name: "Mutton Tehari",
    description: "Traditional tehari with rich, fragrant spices.",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=85",
    tag: "POPULAR",
    rating: "4.8",
  },
  {
    name: "Chicken Roast",
    description: "A classic roast with a delicious, rich sauce.",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=85",
    tag: "TRADITIONAL",
    rating: "4.8",
  },
];

export default function PopularDishes() {
  return (
    <section
      id="menu"
      className="bg-[#fffaf5] px-5 py-16 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* SECTION HEADING */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-orange-600">
              Made fresh for you
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-900 sm:text-5xl">
              Customer <span className="text-orange-600">favorites</span>
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-stone-600">
              Discover traditional rice dishes and comforting classics
              for your next meal.
            </p>
          </div>

          <a
            href="/menu"
            className="w-fit font-bold text-orange-600 transition hover:text-orange-800"
          >
            View Full Menu →
          </a>
        </div>

        {/* FOOD CARDS */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularDishes.map((dish) => (
            <article
              key={dish.name}
              className="group overflow-hidden rounded-[26px] border border-orange-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/70"
            >
              {/* FOOD IMAGE */}
              <div className="relative h-60 overflow-hidden bg-[#fff4e9] sm:h-64">
                <img
  src={dish.image}
  alt={dish.name}
  loading="lazy"
  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
/>

                {/* BADGE */}
                <span className="absolute left-4 top-4 rounded-full border border-orange-100 bg-white px-3 py-2 text-xs font-extrabold tracking-wider text-orange-700 shadow-md">
                  {dish.tag}
                </span>
              </div>

              {/* DISH DETAILS */}
              <div className="p-5">
                <h3 className="text-xl font-extrabold text-stone-900">
                  {dish.name}
                </h3>

                <p className="mt-2 min-h-6 text-sm leading-6 text-stone-500">
                  {dish.description}
                </p>

                {/* RATING */}
                <div
                  className="mt-3 flex items-center gap-2"
                  aria-label={`Rated ${dish.rating} out of 5`}
                >
                  <div className="flex gap-0.5 text-base text-orange-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-stone-500">
                    {dish.rating}
                  </span>
                </div>

                {/* PRICE AND ADD BUTTON */}
                <div className="mt-4 flex items-center justify-between border-t border-orange-100 pt-4">
                  <span className="text-2xl font-black text-stone-900">
                    ৳{dish.price}
                  </span>

                  <a
                    href="/menu"
                    aria-label={`Add ${dish.name} from the menu`}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-3xl font-normal leading-none text-white shadow-md shadow-orange-200 transition duration-300 hover:rotate-90 hover:bg-orange-700"
                  >
                    +
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* BOTTOM LINK */}
        <div className="mt-10 text-center">
          <a
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 px-7 py-3.5 font-bold text-orange-700 transition hover:border-orange-600 hover:bg-orange-50"
          >
            Explore All Dishes →
          </a>
        </div>
      </div>
    </section>
  );
}
