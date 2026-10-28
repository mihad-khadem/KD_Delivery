"use client";

import { useState } from "react";

type DeliveryStatus = "Assigned" | "Picked up" | "Delivered";

type DeliveryOrder = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: string;
  amount: number;
  payment: string;
  status: DeliveryStatus;
};

const initialOrders: DeliveryOrder[] = [
  {
    id: "KD-1042",
    customer: "Rahim Ahmed",
    phone: "01700000001",
    address: "Nathullabad, Barishal",
    items: "Basmati Kacchi × 2",
    amount: 650,
    payment: "Cash on delivery",
    status: "Assigned",
  },
  {
    id: "KD-1041",
    customer: "Nusrat Jahan",
    phone: "01700000002",
    address: "Sadar Road, Barishal",
    items: "Chicken Roast × 2",
    amount: 420,
    payment: "Cash on delivery",
    status: "Picked up",
  },
  {
    id: "KD-1040",
    customer: "Tanvir Hasan",
    phone: "01700000003",
    address: "Rupatali, Barishal",
    items: "Kacchi with Borhani × 1",
    amount: 830,
    payment: "Paid online",
    status: "Delivered",
  },
];

const filters = ["All", "Assigned", "Picked up", "Delivered"] as const;

function statusStyle(status: DeliveryStatus) {
  switch (status) {
    case "Assigned":
      return "bg-blue-50 text-blue-700";
    case "Picked up":
      return "bg-orange-50 text-orange-700";
    case "Delivered":
      return "bg-emerald-50 text-emerald-700";
  }
}

function nextStatus(status: DeliveryStatus): DeliveryStatus | null {
  if (status === "Assigned") return "Picked up";
  if (status === "Picked up") return "Delivered";
  return null;
}

export default function RiderOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visibleOrders = orders.filter(
    (order) => filter === "All" || order.status === filter,
  );

  function updateStatus(id: string) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order;

        const next = nextStatus(order.status);
        return next ? { ...order, status: next } : order;
      }),
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
          Delivery management
        </p>
        <h1 className="mt-2 text-3xl font-black">My deliveries</h1>
        <p className="mt-2 text-stone-500">
          Review your orders and update their delivery progress.
        </p>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((item) => {
          const count =
            item === "All"
              ? orders.length
              : orders.filter((order) => order.status === item).length;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                filter === item
                  ? "bg-orange-600 text-white"
                  : "border border-stone-200 bg-white text-stone-600 hover:border-orange-200"
              }`}
            >
              {item} ({count})
            </button>
          );
        })}
      </div>

      {visibleOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
          <p className="text-lg font-extrabold">No orders in this filter</p>
          <p className="mt-2 text-sm text-stone-500">
            Try selecting another status.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {visibleOrders.map((order) => {
            const next = nextStatus(order.status);

            return (
              <article
                key={order.id}
                className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-orange-600">
                      ORDER {order.id}
                    </p>
                    <h2 className="mt-2 text-lg font-extrabold">
                      {order.customer}
                    </h2>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${statusStyle(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 space-y-4 border-y border-stone-100 py-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Delivery address
                    </p>
                    <p className="mt-1 font-medium">{order.address}</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Order items
                    </p>
                    <p className="mt-1">{order.items}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        Order total
                      </p>
                      <p className="mt-1 text-lg font-black">
                        ৳{order.amount.toLocaleString("en-BD")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        Payment
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        {order.payment}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`tel:${order.phone}`}
                    className="flex flex-1 items-center justify-center rounded-xl border border-stone-200 px-4 py-3 font-bold transition hover:bg-stone-50"
                  >
                    ☎ Call customer
                  </a>

                  {next ? (
                    <button
                      type="button"
                      onClick={() => updateStatus(order.id)}
                      className="flex flex-1 items-center justify-center rounded-xl bg-orange-600 px-4 py-3 font-bold text-white transition hover:bg-orange-700"
                    >
                      {next === "Picked up"
                        ? "Confirm pickup →"
                        : "Mark delivered →"}
                    </button>
                  ) : (
                    <div className="flex flex-1 items-center justify-center rounded-xl bg-emerald-50 px-4 py-3 font-bold text-emerald-700">
                      ✓ Delivery complete
                    </div>
                  )}
                </div>

                <p className="mt-3 text-xs leading-5 text-stone-400">
                  Demo order — customer details and status are sample data.
                </p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
