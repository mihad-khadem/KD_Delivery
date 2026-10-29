"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8 || password.length > 72) {
      setError("Your password must be between 8 and 72 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-orange-100 bg-[#fffaf6] px-4 py-3.5 text-sm text-[#2b211b] outline-none transition placeholder:text-[#b7aaa0] focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10";

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#fffaf3] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-4xl bg-white shadow-xl shadow-orange-950/5 ring-1 ring-orange-100 md:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#2b211b] p-10 text-white md:flex lg:p-14">
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />

          <Link
            href="/"
            className="relative text-2xl font-black tracking-tight"
          >
            <span className="text-orange-400">KD</span> Delivery
            <span className="text-orange-400">.</span>
          </Link>

          <div className="relative py-12">
            <span className="text-7xl">🍽️</span>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
              Join our family
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight lg:text-5xl">
              Good food.
              <span className="block text-orange-400">Good moments.</span>
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-white/65">
              Create your account to enjoy traditional flavors and make ordering
              your favorite meals easier.
            </p>
          </div>

          <p className="relative text-sm text-white/45">
            Freshly prepared. Delivered with care.
          </p>
        </section>

        <section className="p-6 sm:p-10 lg:p-12">
          <Link
            href="/"
            className="text-lg font-black tracking-tight text-[#2b211b] md:hidden"
          >
            <span className="text-orange-600">KD</span> Delivery.
          </Link>

          <div className="mt-6 md:mt-2">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Get started
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#2b211b]">
              Create account
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#76675d]">
              Join KD Delivery for a delicious experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-[#2b211b]"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-bold text-[#2b211b]"
              >
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={20}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="01XXXXXXXXX"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-[#2b211b]"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={72}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                className={inputClass}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-bold text-[#2b211b]"
                >
                  Confirm password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-xs font-bold text-orange-700"
                >
                  {showPassword ? "Hide passwords" : "Show passwords"}
                </button>
              </div>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter your password again"
                className={inputClass}
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-full bg-orange-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating your account..." : "Create account →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#76675d]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-orange-700 hover:text-orange-800"
            >
              Sign in
            </Link>
          </p>

          <div className="mt-7 border-t border-orange-100 pt-5 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-[#96877b] hover:text-orange-700"
            >
              ← Back to home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
