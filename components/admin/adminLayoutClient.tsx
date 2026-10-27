
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "▦",
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: "▤",
  },
  {
    label: "Menu Management",
    href: "/admin/menu",
    icon: "♨",
  },
  {
    label: "Riders",
    href: "/admin/riders",
    icon: "♙",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: "⚙",
  },
];

function getPageTitle(pathname: string) {
  const current = navigation.find(
    (item) =>
      item.href === pathname ||
      (item.href !== "/admin" &&
        pathname.startsWith(`${item.href}/`))
  );

  return current?.label ?? "Admin Panel";
}

export default function AdminLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-900">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-100 bg-white p-5 transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/admin"
            onClick={closeMobileMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-xl font-extrabold text-white">
              KD
            </div>

            <div>
              <h2 className="text-lg font-extrabold">
                KD Delivery
              </h2>
              <p className="text-xs text-gray-500">
                Restaurant Admin
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
          Workspace
        </p>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <span className="w-6 text-center text-lg">
                  {item.icon}
                </span>
                {item.label}
                {item.label === "Orders" && (
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 text-xs ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar bottom */}
        <div className="mt-auto">
          <div className="rounded-2xl bg-orange-50 p-4">
            <p className="text-sm font-bold text-gray-800">
              Your restaurant
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Manage your dishes, orders and delivery operations.
            </p>
          </div>

          <Link
            href="/"
            className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100"
          >
            <span className="text-lg">↗</span>
            View customer shop
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="min-h-screen md:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-xl hover:bg-gray-50 md:hidden"
            >
              ☰
            </button>

            <div>
              <h1 className="text-base font-bold sm:text-lg">
                {getPageTitle(pathname)}
              </h1>
              <p className="hidden text-xs text-gray-500 sm:block">
                KD Delivery / {getPageTitle(pathname)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">Administrator</p>
              <p className="text-xs text-gray-500">
                Restaurant Manager
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
