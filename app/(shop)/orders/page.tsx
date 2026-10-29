"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type OrderItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  servingSize?: string;
};

type Order = {
  _id: string;
  orderNumber?: string;
  items: OrderItem[];
  total: number;
  status: string;
  paymentMethod?: string;
  paymentStatus?: string;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-blue-50 text-blue-700",
  preparing: "bg-purple-50 text-purple-700",
  "ready for pickup": "bg-indigo-50 text-indigo-700",
  "out for delivery": "bg-orange-50 text-orange-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

function formatMoney(value: number) {
  return `৳${value.toLocaleString("en-BD")}`;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function prettyStatus(value: string) {
  return value.replace(/[_-]/g, " ");
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch("/api/orders", {
          cache: "no-store",
        });

        if (response.status === 401) {
          window.location.href = "/login?next=/orders";
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load your orders.");
        }

        setOrders(data.orders ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    void loadOrders();
  }, []);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status.toLowerCase() === filter);

  const deliveredCount = orders.filter(
    (order) => order.status.toLowerCase() === "delivered",
  ).length;

  const totalSpent = orders
    .filter((order) => order.status.toLowerCase() !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <main className="min-h-screen bg-[#fffaf3] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
            Your KD Delivery account
          </p>
          <h1 className="mt-2 text-3xl font-black text-gray-950 sm:text-4xl">
            My Orders
          </h1>
          <p className="mt-2 text-gray-600">
            Track your food, check previous orders, and order your favourites
            again.
          </p>
        </div>

        {!loading && !error && (
          <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-orange-100 bg-white p-5">
              <p className="text-sm font-semibold text-gray-500">
                Total orders
              </p>
              <p className="mt-2 text-3xl font-black text-gray-950">
                {orders.length}
              </p>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-white p-5">
              <p className="text-sm font-semibold text-gray-500">Delivered</p>
              <p className="mt-2 text-3xl font-black text-green-700">
                {deliveredCount}
              </p>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-white p-5">
              <p className="text-sm font-semibold text-gray-500">
                Order value (excluding cancelled)
              </p>
              <p className="mt-2 text-3xl font-black text-orange-600">
                {formatMoney(totalSpent)}
              </p>
            </div>
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-orange-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">
                Order history
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {loading
                  ? "Loading your orders..."
                  : `${filteredOrders.length} orders shown`}
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex w-fit items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
            >
              Order food →
            </Link>
          </div>

          <div className="border-b border-orange-100 px-4 py-4 sm:px-6">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                { label: "All orders", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "Preparing", value: "preparing" },
                { label: "Out for delivery", value: "out for delivery" },
                { label: "Delivered", value: "delivered" },
                { label: "Cancelled", value: "cancelled" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold capitalize transition ${
                    filter === item.value
                      ? "bg-orange-600 text-white"
                      : "bg-orange-50 text-gray-600 hover:bg-orange-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-orange-50">
            {loading && (
              <div className="space-y-4 p-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-32 animate-pulse rounded-2xl bg-orange-50"
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="p-8 text-center">
                <p className="font-bold text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-full bg-orange-600 px-5 py-3 text-sm font-bold text-white hover:bg-orange-700"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && filteredOrders.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
                  🍛
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-gray-900">
                  {orders.length === 0
                    ? "Your first meal is waiting"
                    : "No orders in this category"}
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  {orders.length === 0
                    ? "You haven't placed an order yet. Explore our menu and find your next favourite."
                    : "Try another status filter to see more of your orders."}
                </p>
                {orders.length === 0 && (
                  <Link
                    href="/menu"
                    className="mt-6 inline-flex rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-700"
                  >
                    Explore the menu
                  </Link>
                )}
              </div>
            )}

            {!loading &&
              !error &&
              filteredOrders.map((order) => {
                const status = order.status.toLowerCase();

                return (
                  <article key={order._id} className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-extrabold text-gray-900">
                            Order #
                            {order.orderNumber ||
                              order._id.slice(-8).toUpperCase()}
                          </h3>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                              statusStyles[status] ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {prettyStatus(order.status)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-xs font-semibold text-gray-500">
                          Order total
                        </p>
                        <p className="mt-1 text-xl font-black text-orange-600">
                          {formatMoney(order.total)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-[#fffaf3] p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        Items
                      </p>
                      <ul className="mt-3 space-y-2">
                        {order.items.map((item, index) => (
                          <li
                            key={`${item.name}-${index}`}
                            className="flex items-start justify-between gap-3 text-sm"
                          >
                            <span className="text-gray-700">
                              <span className="font-bold">
                                {item.quantity}×
                              </span>{" "}
                              {item.name}
                              {item.servingSize ? ` · ${item.servingSize}` : ""}
                            </span>
                            <span className="shrink-0 font-semibold text-gray-800">
                              {formatMoney(item.unitPrice * item.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs text-gray-500">
                        {order.paymentMethod && (
                          <span>
                            Payment: {prettyStatus(order.paymentMethod)}
                          </span>
                        )}
                        {order.paymentStatus && (
                          <span> · {prettyStatus(order.paymentStatus)}</span>
                        )}
                      </div>

                      <Link
                        href={`/orders/${order._id}`}
                        className="inline-flex items-center justify-center rounded-full border border-orange-200 px-5 py-2.5 text-sm font-bold text-orange-700 transition hover:bg-orange-50"
                      >
                        View order details →
                      </Link>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>

        <div className="mt-6 text-center">
          <Link
            href="/profile"
            className="text-sm font-bold text-orange-700 hover:text-orange-900"
          >
            ← Back to my profile
          </Link>
        </div>
      </div>
    </main>
  );
}
