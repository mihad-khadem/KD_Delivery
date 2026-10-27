
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from "@/lib/redux/features/cart/cartSlice";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function formatPrice(amount: number) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export default function CartDrawer({
  open,
  onClose,
}: CartDrawerProps) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close shopping cart"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/40 backdrop-blur-[2px]"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-orange-100 px-5 py-5">
          <div>
            <h2
              id="cart-drawer-title"
              className="text-xl font-black text-stone-900"
            >
              Your Cart
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart drawer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-2xl text-stone-700 transition hover:bg-orange-100"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
                🛒
              </div>

              <h3 className="mt-5 text-lg font-black text-stone-900">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-stone-500">
                Add your favorite Kacchi, Biryani, or Tehari to get started.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-5 rounded-full bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700"
              >
                Explore the Menu
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <article
                  key={item.cartKey}
                  className="flex gap-3 border-b border-orange-100 pb-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 shrink-0 rounded-xl bg-orange-50 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-extrabold leading-5 text-stone-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-stone-500">
                      Serving:{" "}
                      {item.servingSize === "one"
                        ? "1 Person"
                        : item.servingSize === "three"
                          ? "3 Persons"
                          : "5 Persons"}
                    </p>

                    <p className="mt-2 font-black text-orange-600">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 rounded-full border border-orange-100 p-1">
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
                          aria-label={`Decrease ${item.name} quantity`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-lg hover:bg-orange-100"
                        >
                          −
                        </button>

                        <span className="min-w-4 text-center text-sm font-bold">
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
                          aria-label={`Increase ${item.name} quantity`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-lg text-white hover:bg-orange-700"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          dispatch(removeFromCart(item.cartKey))
                        }
                        className="text-xs font-semibold text-stone-400 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-orange-100 bg-white px-5 pb-6 pt-5">
            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="mb-4 text-sm font-semibold text-stone-400 transition hover:text-red-600"
            >
              Clear cart
            </button>

            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-stone-600">
                Subtotal
              </span>
              <span className="text-2xl font-black text-stone-900">
                {formatPrice(subtotal)}
              </span>
            </div>

            <p className="mt-2 text-xs text-stone-400">
              Delivery fee is calculated at checkout.
            </p>

            <Link
              href="/checkout"
              onClick={onClose}
              className="mt-5 flex w-full items-center justify-center rounded-full bg-orange-600 px-5 py-4 font-bold text-white transition hover:bg-orange-700"
            >
              Proceed to Checkout →
            </Link>

            <Link
              href="/cart"
              onClick={onClose}
              className="mt-3 flex w-full items-center justify-center rounded-full border border-orange-200 px-5 py-3 font-bold text-orange-700 transition hover:bg-orange-50"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
