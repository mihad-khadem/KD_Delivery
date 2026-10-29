"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hook";
import { selectCartItemCount } from "@/lib/redux/features/cart/cartSlice";
import CartDrawer from "@/components/cart/CartDrawer";

type CurrentUser = {
  id: string;
  name: string;
  phone: string;
  role: "customer" | "admin" | "rider";
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Menu", href: "/menu" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function ProfileIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export default function Header() {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const cartCount = useAppSelector(selectCartItemCount);

  const closeCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  const loadCurrentUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });

      const data = await response.json();

      setUser(response.ok ? (data.user ?? null) : null);
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCurrentUser();
  }, [loadCurrentUser]);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);
      setProfileOpen(false);
      setMobileMenuOpen(false);
      router.refresh();
      router.push("/");
    } catch {
      // Keep the current session UI if logout fails.
      await loadCurrentUser();
    } finally {
      setLoggingOut(false);
    }
  };

  const profileHref =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "rider"
        ? "/rider"
        : "/profile";

  const initial = user?.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
          <Link
            href="/"
            className="shrink-0 text-2xl font-black tracking-tight"
            aria-label="KD Delivery home"
          >
            <span className="text-orange-600">KD</span> Delivery
            <span className="text-orange-600">.</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-gray-700 transition-colors hover:text-orange-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Profile badge */}
            <div className="relative">
              {authLoading ? (
                <div
                  className="h-11 w-11 animate-pulse rounded-full bg-orange-50"
                  aria-label="Loading profile"
                />
              ) : user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setProfileOpen((open) => !open)}
                    aria-label="Open profile menu"
                    aria-expanded={profileOpen}
                    className="flex h-11 items-center gap-2 rounded-full border border-orange-100 bg-white p-1 pr-3 transition hover:border-orange-300 hover:bg-orange-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-extrabold text-white">
                      {initial}
                    </span>
                    <span className="hidden max-w-24 truncate text-sm font-bold text-gray-800 lg:block">
                      {user.name.split(" ")[0]}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="hidden h-4 w-4 text-gray-500 sm:block"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m7 10 5 5 5-5"
                      />
                    </svg>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full z-[60] mt-3 w-64 overflow-hidden rounded-2xl border border-orange-100 bg-white p-2 shadow-xl">
                      <div className="border-b border-orange-100 px-3 py-3">
                        <p className="truncate text-sm font-extrabold text-gray-900">
                          {user.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-gray-500">
                          {user.phone}
                        </p>
                        <span className="mt-2 inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold capitalize text-orange-700">
                          {user.role}
                        </span>
                      </div>

                      <Link
                        href={profileHref}
                        onClick={() => setProfileOpen(false)}
                        className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-700"
                      >
                        <ProfileIcon className="h-4 w-4" />
                        {user.role === "customer"
                          ? "My Profile"
                          : user.role === "admin"
                            ? "Admin Dashboard"
                            : "Rider Dashboard"}
                      </Link>

                      {user.role === "customer" && (
                        <Link
                          href="/orders"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-700"
                        >
                          <span aria-hidden="true">▤</span>
                          My Orders
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                      >
                        <span aria-hidden="true">↪</span>
                        {loggingOut ? "Signing out..." : "Logout"}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  aria-label="Login to your account"
                  className="flex h-11 items-center gap-2 rounded-full border border-orange-100 px-3 text-sm font-bold text-gray-800 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <ProfileIcon />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}
            </div>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open shopping cart, ${cartCount} items`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-orange-100 text-gray-800 transition hover:border-orange-300 hover:bg-orange-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6"
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            <Link
              href="/menu"
              className="hidden rounded-full bg-orange-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700 sm:inline-flex"
            >
              Order Now <span className="ml-2">→</span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-100 text-gray-800 transition hover:bg-orange-50 md:hidden"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 6 12 12M18 6 6 18"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-orange-100 bg-white px-5 py-4 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  {link.label}
                </Link>
              ))}

              {!authLoading &&
                (user ? (
                  <>
                    <Link
                      href={profileHref}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      {user.role === "customer"
                        ? "My Profile"
                        : `${user.role === "admin" ? "Admin" : "Rider"} Dashboard`}
                    </Link>
                    {user.role === "customer" && (
                      <Link
                        href="/orders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        My Orders
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      {loggingOut ? "Signing out..." : "Logout"}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  >
                    Login / Register
                  </Link>
                ))}

              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-xl bg-orange-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-700"
              >
                Order Now →
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Close dropdown when clicking elsewhere */}
      {profileOpen && (
        <button
          type="button"
          aria-label="Close profile menu"
          onClick={() => setProfileOpen(false)}
          className="fixed inset-0 z-40 cursor-default"
        />
      )}

      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  );
}
