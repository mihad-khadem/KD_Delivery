"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/rider", label: "Dashboard", icon: "▦" },
  { href: "/rider/orders", label: "My deliveries", icon: "▣" },
];

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#29231f]">
      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-orange-100 bg-white transition-transform duration-200 lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href="/rider"
          onClick={() => setMenuOpen(false)}
          className="flex h-20 items-center gap-3 border-b border-orange-100 px-6"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-600 text-xl font-black text-white">
            KD
          </span>
          <span>
            <span className="block text-lg font-black">
              KD Delivery<span className="text-orange-600">.</span>
            </span>
            <span className="text-xs font-semibold text-stone-500">
              RIDER PORTAL
            </span>
          </span>
        </Link>

        <div className="px-5 pt-7">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-stone-400">
            Workspace
          </p>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const active =
                item.href === "/rider"
                  ? pathname === "/rider"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${
                    active
                      ? "bg-orange-50 text-orange-700"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                  {active && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-orange-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-5">
          <div className="rounded-2xl bg-[#2b211b] p-5 text-white">
            <p className="font-bold">Ride safe. Deliver with care.</p>
            <p className="mt-2 text-sm leading-6 text-orange-100/70">
              Keep customers updated and handle every order carefully.
            </p>
          </div>
          <p className="mt-4 text-center text-xs text-stone-400">
            KD Delivery · Rider workspace
          </p>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-orange-100 bg-white/95 px-4 backdrop-blur sm:px-7">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 text-xl lg:hidden"
            >
              ☰
            </button>

            <div>
              <p className="font-bold">
                {pathname === "/rider"
                  ? "Dashboard"
                  : pathname.startsWith("/rider/orders")
                    ? "My deliveries"
                    : "Rider workspace"}
              </p>
              <p className="hidden text-xs text-stone-500 sm:block">
                Your delivery day at a glance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:inline-flex">
              ● Demo mode
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-black text-orange-700">
              R
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-7 lg:p-9">
          {children}
        </main>
      </div>
    </div>
  );
}
