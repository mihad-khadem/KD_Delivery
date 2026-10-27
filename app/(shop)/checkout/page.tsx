"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/lib/redux/hook";
import {
  DELIVERY_ZONES,
  getDeliveryFee,
  RESTAURANT_PICKUP_TIME,
} from "@/lib/delivery";

type DeliveryMethod = "delivery" | "pickup";
type PaymentMethod = "cod" | "online";

type CheckoutForm = {
  name: string;
  phone: string;
  address: string;
  area: string;
  notes: string;
};

const initialForm: CheckoutForm = {
  name: "",
  phone: "",
  address: "",
  area: "",
  notes: "",
};

const money = (amount: number) => `৳${amount.toLocaleString("en-BD")}`;

export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart.items);

  const [method, setMethod] = useState<DeliveryMethod>("delivery");
  const [zoneId, setZoneId] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      const price = Number(item.unitPrice);
      const quantity = Number(item.quantity);

      return total + price * quantity;
    }, 0);
  }, [items]);
  const selectedZone = DELIVERY_ZONES.find((zone) => zone.id === zoneId);

  const deliveryFee =
    method === "pickup"
      ? 0
      : selectedZone
        ? getDeliveryFee("delivery", zoneId)
        : 0;

  const total = subtotal + deliveryFee;

  function updateField(field: keyof CheckoutForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (items.length === 0) {
      setError("Your cart is empty. Add items before checkout.");
      return;
    }

    if (method === "delivery" && !zoneId) {
      setError("Please select your delivery zone.");
      return;
    }

    if (method === "delivery" && !form.address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    if (method === "delivery" && !form.area.trim()) {
      setError("Please enter your area or neighborhood.");
      return;
    }

    const orderPayload = {
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
      },
      fulfillment: {
        method,
        ...(method === "delivery"
          ? {
              zoneId,
              zoneName: selectedZone?.name,
              address: form.address.trim(),
              area: form.area.trim(),
            }
          : {}),
      },
      payment: {
        method: payment,
        status: "pending",
      },
      items: items.map((item) => ({
        productId: String(item.menuItemId),
        name: item.name,
        unitPrice: Number(item.unitPrice),
        quantity: Number(item.quantity),
      })),
      subtotal,
      deliveryFee,
      total,
      notes: form.notes.trim(),
    };

    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Order submission is not available yet.",
        );
      }

      // Only show success after the backend confirms it saved the order.
      setNotice(`Order placed successfully. Reference: ${result.orderId}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not submit your order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[65vh] bg-[#fffaf5] px-4 py-20">
        <div className="mx-auto max-w-lg rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
            🛒
          </div>
          <h1 className="mt-5 text-2xl font-extrabold text-[#2b211b]">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Add your favorite dishes before checking out.
          </p>
          <Link
            href="/menu"
            className="mt-6 inline-flex rounded-xl bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700"
          >
            Explore the menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf5] px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
            KD Delivery
          </p>
          <h1 className="mt-2 text-3xl font-black text-[#2b211b] sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-stone-500">
            A few details, then your favorite food is on its way.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-8 lg:grid-cols-[1fr_380px]"
        >
          <div className="space-y-6">
            <section className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:p-7">
              <StepTitle number="01" title="Your details" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Enter your name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone number">
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="01XXXXXXXXX"
                    pattern="^(?:\+?8801|01)[3-9]\d{8}$"
                    title="Enter a valid Bangladesh mobile number"
                    className={inputClass}
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:p-7">
              <StepTitle number="02" title="Delivery or pickup" />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Choice
                  active={method === "delivery"}
                  onClick={() => setMethod("delivery")}
                  icon="🛵"
                  title="Home delivery"
                  description="Delivered to your door"
                />
                <Choice
                  active={method === "pickup"}
                  onClick={() => setMethod("pickup")}
                  icon="🏪"
                  title="Restaurant pickup"
                  description="Collect your order yourself"
                />
              </div>

              {method === "delivery" ? (
                <div className="mt-6 space-y-4">
                  <Field label="Delivery zone">
                    <select
                      required
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Choose your area</option>
                      {DELIVERY_ZONES.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.name} — {money(zone.fee)}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {selectedZone && (
                    <p className="rounded-xl bg-orange-50 px-4 py-3 text-sm text-orange-900">
                      Estimated delivery: {selectedZone.estimatedTime}
                    </p>
                  )}

                  <Field label="Area / neighborhood">
                    <input
                      required
                      value={form.area}
                      onChange={(e) => updateField("area", e.target.value)}
                      placeholder="Your area or neighborhood"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Full delivery address">
                    <textarea
                      required
                      rows={3}
                      autoComplete="street-address"
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="House, road, block, landmark..."
                      className={inputClass}
                    />
                  </Field>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl bg-orange-50 p-4">
                  <p className="font-bold text-[#2b211b]">
                    Collect from our restaurant
                  </p>
                  <p className="mt-1 text-sm text-stone-600">
                    Estimated preparation time: {RESTAURANT_PICKUP_TIME}.
                  </p>
                  <p className="mt-2 text-sm font-semibold text-orange-700">
                    Delivery fee: ৳0
                  </p>
                  <p className="mt-2 text-xs text-stone-500">
                    Add your restaurant address to this section before launch.
                  </p>
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:p-7">
              <StepTitle number="03" title="Payment method" />

              <div className="mt-6 space-y-3">
                <Choice
                  active={payment === "cod"}
                  onClick={() => setPayment("cod")}
                  icon="💵"
                  title="Cash on delivery"
                  description="Pay when you receive your order"
                />
                <Choice
                  active={payment === "online"}
                  onClick={() => setPayment("online")}
                  icon="💳"
                  title="Online payment"
                  description="Pay online through a supported payment gateway"
                />
              </div>

              {payment === "online" && (
                <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
                  Online payment is not connected yet. A payment gateway must be
                  configured before online payments can be processed.
                </p>
              )}

              <div className="mt-6">
                <Field label="Order notes (optional)">
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="Special instructions for your order"
                    className={inputClass}
                  />
                </Field>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl bg-[#2b211b] p-6 text-white shadow-xl sm:p-7">
              <h2 className="text-xl font-extrabold">Order summary</h2>
              <p className="mt-1 text-sm text-orange-100/70">
                {items.length} {items.length === 1 ? "item" : "items"} in your
                cart
              </p>

              <div className="mt-6 max-h-64 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.cartKey}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="mt-1 text-orange-100/60">
                        Qty: {item.quantity} × {money(Number(item.unitPrice))}
                      </p>
                    </div>
                    <p className="shrink-0 font-bold">
                      {money(Number(item.unitPrice) * Number(item.quantity))}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-white/15" />

              <div className="space-y-3 text-sm">
                <SummaryRow label="Subtotal" value={money(subtotal)} />
                <SummaryRow
                  label="Delivery fee"
                  value={
                    method === "pickup"
                      ? "Free"
                      : selectedZone
                        ? money(deliveryFee)
                        : "Select a zone"
                  }
                />
              </div>

              <div className="my-5 border-t border-white/15" />

              <div className="flex items-center justify-between gap-3">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-black text-orange-400">
                  {money(total)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-orange-100/60">
                No minimum order. Final delivery fee depends on your selected
                zone.
              </p>

              {error && (
                <p
                  role="alert"
                  className="mt-5 rounded-xl bg-red-950 p-3 text-sm text-red-200"
                >
                  {error}
                </p>
              )}

              {notice && (
                <p
                  role="status"
                  className="mt-5 rounded-xl bg-green-950 p-3 text-sm text-green-200"
                >
                  {notice}
                </p>
              )}

              <button
                type="submit"
                disabled={
                  submitting ||
                  (method === "delivery" && !zoneId) ||
                  payment === "online"
                }
                className="mt-6 w-full rounded-xl bg-orange-500 px-5 py-4 font-extrabold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Submitting..."
                  : payment === "online"
                    ? "Online payment unavailable"
                    : "Place order"}
              </button>

              <p className="mt-3 text-center text-xs text-orange-100/50">
                Your order is not confirmed until the server saves it.
              </p>
            </div>

            <Link
              href="/cart"
              className="mt-4 block text-center text-sm font-bold text-orange-700 hover:text-orange-800"
            >
              ← Return to cart
            </Link>
          </aside>
        </form>
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-xl border border-orange-100 bg-[#fffaf5] px-4 py-3 text-sm text-[#2b211b] outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

function StepTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-sm font-black text-orange-700">
        {number}
      </span>
      <h2 className="text-lg font-extrabold text-[#2b211b]">{title}</h2>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-[#2b211b]">{label}</span>
      {children}
    </label>
  );
}

function Choice({
  active,
  onClick,
  icon,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100"
          : "border-orange-100 bg-white hover:border-orange-300"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-[#2b211b]">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-stone-500">
          {description}
        </span>
      </span>
      <span
        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          active
            ? "border-orange-600 bg-orange-600 text-white"
            : "border-stone-300"
        }`}
      >
        {active && <span className="text-xs">✓</span>}
      </span>
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-orange-100/70">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
