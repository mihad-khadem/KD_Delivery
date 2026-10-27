
"use client";

import Image from "next/image";
import type { Product } from "@/types/product";

interface FoodCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function FoodCard({
  product,
  onAddToCart,
}: FoodCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 bg-orange-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
        />

        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-red-600">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
          {product.category}
        </p>

        <h2 className="mt-2 text-lg font-extrabold text-stone-900">
          {product.name}
        </h2>

        <p className="mt-2 min-h-12 text-sm leading-6 text-stone-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xl font-black text-stone-900">
            ৳{product.price}
          </span>

          <button
            type="button"
            disabled={!product.isAvailable}
            onClick={() => onAddToCart(product)}
            className="rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}
