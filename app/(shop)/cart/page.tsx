
"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from "@/lib/redux/features/cart/cartSlice";

function formatPrice(amount: number) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Empty cart
  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-orange-50/40 px-5 py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl bg-white px-6 py-14 text-center shadow-sm">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-5xl">
            🛒
          </div>

          <h1 className="text-3xl font-black text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-sm text-gray-500">
            Looks like you haven't added any delicious food yet.
            Explore our menu and find something you love!
          </p>

          <Link
            href="/menu"
            className="mt-7 rounded-full bg-orange-600 px-8 py-3.5 font-bold text-white transition hover:bg-orange-700"
          >
            Explore Our Menu →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50/40 px-5 py-10 md:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-orange-600">
              KD Delivery
            </p>

            <h1 className="text-3xl font-black text-gray-900 md:text-4xl">
              Your Shopping Cart
            </h1>

            <p className="mt-2 text-gray-500">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="rounded-full border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_360px]">
          {/* Cart items */}
          <section className="space-y-4">
            {items.map((item) => (
              <article
                key={item.cartKey}
                className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Dish image */}
                  <Link
                    href={`/menu`}
                    className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-orange-50 sm:w-28"
                    aria-label={`Browse menu for ${item.name}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  {/* Dish details */}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Serving:{" "}
                      {item.servingSize === "one"
                        ? "1 Person"
                        : item.servingSize === "three"
                          ? "3 Persons"
                          : "5 Persons"}
                    </p>

                    <p className="mt-2 font-bold text-orange-600">
                      {formatPrice(item.unitPrice)}{" "}
                      <span className="text-xs font-normal text-gray-400">
                        per item
                      </span>
                    </p>

                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.cartKey))}
                      className="mt-3 text-sm font-semibold text-gray-400 transition hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Quantity controls and line total */}
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-3 rounded-full border border-orange-100 p-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              cartKey: item.cartKey,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-gray-700 transition hover:bg-orange-100"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>

                      <span className="min-w-5 text-center font-bold tabular-nums">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              cartKey: item.cartKey,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white transition hover:bg-orange-700"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <p className="text-lg font-black text-gray-900">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 py-3 font-bold text-orange-600 transition hover:text-orange-700"
            >
              <span aria-hidden="true">←</span> Continue Shopping
            </Link>
          </section>

          {/* Order summary */}
          <aside className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="text-xl font-black text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between gap-4 text-sm text-gray-500">
                <span>Items ({itemCount})</span>
                <span className="font-semibold text-gray-800">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm text-gray-500">
                <span>Delivery fee</span>
                <span className="text-right text-gray-400">
                  Calculated at checkout
                </span>
              </div>

              <div className="border-t border-dashed border-orange-200 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-bold text-gray-900">
                    Subtotal
                  </span>
                  <span className="text-2xl font-black text-orange-600">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-7 flex w-full items-center justify-center rounded-full bg-orange-600 px-5 py-4 font-bold text-white shadow-sm transition hover:bg-orange-700"
            >
              Proceed to Checkout →
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              Delivery charges and final order details will be confirmed
              at checkout.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
