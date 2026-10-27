
"use client";

import { useMemo, useState } from "react";
import {
  menuItems,
  categories,
  type MenuItem,
  type ServingKey,
} from "@/public/data/menu";
import { useAppDispatch } from "@/lib/redux/hook";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";

const servingOptions: {
  key: ServingKey;
  label: string;
  shortLabel: string;
}[] = [
  { key: "one", label: "1 Person", shortLabel: "1/1" },
  { key: "three", label: "3 Persons", shortLabel: "1/3" },
  { key: "five", label: "5 Persons", shortLabel: "1/5" },
];

export default function MenuPage() {
  const dispatch = useAppDispatch();

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<
    Record<number, ServingKey>
  >({});

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        item.category === activeCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  function getServingSize(item: MenuItem): ServingKey {
    const selected = selectedSizes[item.id];

    if (selected && item.prices[selected] !== undefined) {
      return selected;
    }

    return "one";
  }

  function selectServingSize(item: MenuItem, size: ServingKey) {
    if (item.prices[size] === undefined) return;

    setSelectedSizes((previous) => ({
      ...previous,
      [item.id]: size,
    }));
  }

  function handleAddToCart(item: MenuItem) {
    const servingSize = getServingSize(item);
    const price = item.prices[servingSize];

    if (price === undefined) return;

    dispatch(
      addToCart({
        menuItemId: item.id,
        name: item.name,
        slug: item.slug,
        image: item.image,
        servingSize,
        unitPrice: price,
      })
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf5]">
      {/* HERO */}
      <section className="bg-[#fff0e2] px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-orange-600">
            Freshly prepared with love
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-stone-900 sm:text-6xl">
            Our <span className="text-orange-600">Menu</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-stone-600">
            Explore our Kacchi, Biryani, Tehari and traditional
            Bangladeshi favorites. Choose the perfect serving for
            your meal.
          </p>

          {/* SEARCH */}
          <div className="mx-auto mt-8 max-w-xl">
            <label htmlFor="menu-search" className="sr-only">
              Search menu
            </label>

            <div className="flex items-center gap-3 rounded-full border border-orange-100 bg-white px-5 py-4 shadow-sm focus-within:border-orange-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 shrink-0 text-orange-600"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>

              <input
                id="menu-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Kacchi, Biryani, Tehari..."
                className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MENU GRID */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {/* CATEGORY FILTERS */}
        <div className="flex gap-3 overflow-x-auto pb-3">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`shrink-0 rounded-full border px-5 py-3 text-sm font-bold transition ${
                activeCategory === category
                  ? "border-orange-600 bg-orange-600 text-white shadow-md shadow-orange-100"
                  : "border-orange-200 bg-white text-stone-600 hover:border-orange-400 hover:text-orange-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* RESULTS HEADER */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-stone-900 sm:text-3xl">
              {activeCategory === "All"
                ? "All Dishes"
                : activeCategory}
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Choose your favorite and select a serving size.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-orange-100 px-3 py-2 text-xs font-bold text-orange-700">
            {filteredItems.length} items
          </span>
        </div>

        {/* FOOD CARDS */}
        {filteredItems.length > 0 ? (
          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => {
              const selectedSize = getServingSize(item);
              const price = item.prices[selectedSize];

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-[26px] border border-orange-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/70"
                >
                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden bg-[#fff0e2]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full border border-orange-100 bg-white/95 px-3 py-2 text-[10px] font-extrabold tracking-wider text-orange-700 shadow-sm">
                      {item.category.toUpperCase()}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold leading-6 text-stone-900">
                      {item.name}
                    </h3>

                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-stone-500">
                      {item.description}
                    </p>

                    {/* SERVING SIZE */}
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                        Serving size
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {servingOptions.map((option) => {
                          const available =
                            item.prices[option.key] !== undefined;

                          const selected =
                            selectedSize === option.key;

                          if (!available) return null;

                          return (
                            <button
                              key={option.key}
                              type="button"
                              onClick={() =>
                                selectServingSize(item, option.key)
                              }
                              aria-pressed={selected}
                              className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                                selected
                                  ? "border-orange-600 bg-orange-600 text-white"
                                  : "border-orange-200 bg-white text-stone-600 hover:border-orange-400"
                              }`}
                            >
                              {option.shortLabel}
                            </button>
                          );
                        })}
                      </div>

                      <p className="mt-2 text-xs text-stone-400">
                        {
                          servingOptions.find(
                            (option) => option.key === selectedSize
                          )?.label
                        }
                      </p>
                    </div>

                    {/* PRICE + ADD TO CART */}
                    <div className="mt-4 flex items-center justify-between border-t border-orange-100 pt-4">
                      <div>
                        <p className="text-xs font-medium text-stone-500">
                          Price
                        </p>

                        <p className="text-2xl font-black text-stone-900">
                          ৳{price?.toLocaleString("en-BD")}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        aria-label={`Add ${item.name} to cart`}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-3xl font-normal leading-none text-white shadow-md shadow-orange-100 transition hover:scale-110 hover:bg-orange-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* EMPTY SEARCH RESULTS */
          <div className="mt-8 rounded-3xl border border-orange-100 bg-white px-6 py-16 text-center">
            <p className="text-4xl">🍽️</p>

            <h3 className="mt-4 text-xl font-black text-stone-900">
              No dishes found
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              Try another search or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 rounded-full bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700"
            >
              Show All Dishes
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
