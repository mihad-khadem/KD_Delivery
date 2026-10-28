"use client";

import Link from "next/link";
import { useState } from "react";

const demoOrders = [
  {
    id: "KD-1042",
    customer: "Rahim Ahmed",
    address: "Nathullabad, Barishal",
    amount: 650,
    status: "Ready for pickup",
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: "KD-1041",
    customer: "Nusrat Jahan",
    address: "Sadar Road, Barishal",
    amount: 420,
    status: "Out for delivery",
    color: "bg-orange-50 text-orange-700",
  },
  {
    id: "KD-1040",
    customer: "Tanvir Hasan",
    address: "Rupatali, Barishal",
    amount: 830,
    status: "Delivered",
    color: "bg-emerald-50 text-emerald-700",
  },
];

const stats = [
  { label: "Assigned orders", value: "4", note: "Orders to handle", icon: "▣" },
  { label: "Completed today", value: "8", note: "Demo daily total", icon: "✓" },
  {
    label: "Today's earnings",
    value: "৳480",
    note: "Example earnings",
    icon: "৳",
  },
  {
    label: "Pending deliveries",
    value: "3",
    note: "Still in progress",
    icon: "◷",
  },
];

export default function RiderDashboard() {
  const [available, setAvailable] = useState(true);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-[#2b211b] p-6 text-white sm:p-9">
        <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-orange-300">
              RIDER OVERVIEW
            </p>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              Ready for your next delivery?
            </h1>
            <p className="mt-3 max-w-xl leading-7 text-stone-300">
              Keep track of your assigned orders, deliver safely, and give every
              customer a great experience.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="font-bold">Your availability</p>
              <p className="mt-1 text-sm text-stone-300">
                {available
                  ? "Available for deliveries"
                  : "Currently unavailable"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAvailable((current) => !current)}
              aria-pressed={available}
              className={`relative h-7 w-12 rounded-full transition ${
                available ? "bg-emerald-500" : "bg-stone-500"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                  available ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-stone-500">
                {stat.label}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl font-bold text-orange-600">
                {stat.icon}
              </span>
            </div>
            <p className="mt-5 text-3xl font-black">{stat.value}</p>
            <p className="mt-1 text-sm text-stone-500">{stat.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-stone-100 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-extrabold">Recent deliveries</h2>
              <p className="mt-1 text-sm text-stone-500">
                Example orders in your workspace
              </p>
            </div>
            <Link
              href="/rider/orders"
              className="shrink-0 text-sm font-bold text-orange-600 hover:text-orange-700"
            >
              View all →
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {demoOrders.map((order) => (
              <article
                key={order.id}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="min-w-0">
                  <p className="font-extrabold">{order.id}</p>
                  <p className="mt-1 font-medium">{order.customer}</p>
                  <p className="mt-1 text-sm text-stone-500">{order.address}</p>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${order.color}`}
                  >
                    {order.status}
                  </span>
                  <span className="font-extrabold">
                    ৳{order.amount.toLocaleString("en-BD")}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-extrabold">Your delivery checklist</h2>
          <p className="mt-1 text-sm text-stone-500">
            A few things to remember before completing an order.
          </p>

          <div className="mt-6 space-y-5">
            {[
              ["01", "Confirm the order", "Check the order number and items."],
              ["02", "Verify the address", "Contact the customer if needed."],
              ["03", "Collect payment", "Follow the order's payment method."],
              ["04", "Confirm delivery", "Mark delivered only after handoff."],
            ].map(([number, title, description]) => (
              <div key={number} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-sm font-black text-orange-600">
                  {number}
                </span>
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/rider/orders"
            className="mt-7 flex w-full items-center justify-center rounded-xl bg-orange-600 px-5 py-3.5 font-bold text-white transition hover:bg-orange-700"
          >
            Manage deliveries →
          </Link>
        </div>
      </section>
    </div>
  );
}
