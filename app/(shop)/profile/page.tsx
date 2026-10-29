"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Address = {
  _id?: string;
  label: string;
  address: string;
  area: string;
  city: string;
  phone: string;
};

type Profile = {
  id: string;
  name: string;
  phone: string;
  addresses: Address[];
};

const emptyAddress: Address = {
  label: "Home",
  address: "",
  area: "",
  city: "",
  phone: "",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadProfile() {
    try {
      const response = await fetch("/api/profile", {
        cache: "no-store",
      });

      if (response.status === 401) {
        redirect("/login?next=/profile");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load your profile.");
      }

      setProfile(data.profile);
      setName(data.profile.name);
      setPhone(data.profile.phone);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProfile();
  }, []);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save your profile.");
      }

      setProfile(data.profile);
      setName(data.profile.name);
      setPhone(data.profile.phone);
      setMessage("Your profile has been updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function saveAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/profile/addresses", {
        method: editingAddress ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...address,
          ...(editingAddress ? { addressId: editingAddress } : {}),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save the address.");
      }

      setProfile(data.profile);
      setAddress(emptyAddress);
      setEditingAddress(null);
      setMessage("Delivery address saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteAddress(addressId?: string) {
    if (!addressId) return;
    if (!window.confirm("Remove this delivery address?")) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/profile/addresses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addressId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not remove the address.");
      }

      setProfile(data.profile);
      setMessage("Address removed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function startEditingAddress(item: Address) {
    if (!item._id) {
      setError("This address cannot be edited because it has no ID.");
      return;
    }

    setAddress({
      label: item.label,
      address: item.address,
      area: item.area,
      city: item.city,
      phone: item.phone,
    });
    setEditingAddress(item._id);
    setError("");
    setMessage("");
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-[#fffaf3] px-5 py-16">
        <div className="mx-auto max-w-5xl animate-pulse space-y-5">
          <div className="h-10 w-56 rounded-xl bg-orange-100" />
          <div className="h-64 rounded-3xl bg-white" />
          <div className="h-64 rounded-3xl bg-white" />
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#fffaf3] px-5">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-black text-gray-900">
            Profile unavailable
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            {error || "Please sign in to view your profile."}
          </p>
          <Link
            href="/login?next=/profile"
            className="mt-6 inline-flex rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  const initial = profile.name.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#fffaf3] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Your account
            </p>
            <h1 className="mt-2 text-3xl font-black text-gray-950 sm:text-4xl">
              My Profile
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your personal details and delivery addresses.
            </p>
          </div>

          <Link
            href="/orders"
            className="inline-flex w-fit items-center justify-center rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-700 transition hover:bg-orange-50"
          >
            View my orders →
          </Link>
        </div>

        <div className="mb-6 flex items-center gap-4 rounded-3xl bg-[#2b211b] p-6 text-white sm:p-8">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-2xl font-black">
            {initial}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-extrabold">{profile.name}</h2>
            <p className="mt-1 text-sm text-orange-100">{profile.phone}</p>
            <p className="mt-2 text-xs font-semibold text-orange-300">
              KD Delivery customer
            </p>
          </div>
        </div>

        {(error || message) && (
          <div
            role="status"
            className={`mb-6 rounded-2xl border px-4 py-3 text-sm font-medium ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {error || message}
          </div>
        )}

        <section className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-xl font-extrabold text-gray-900">
            Personal information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Keep your contact details up to date.
          </p>

          <form onSubmit={saveProfile} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Full name
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={2}
                maxLength={80}
                autoComplete="name"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                autoComplete="tel"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
              <p className="mt-2 text-xs text-gray-500">
                Changing your phone number must be validated by the server and
                must not duplicate another account.
              </p>
            </div>

            <button
              disabled={saving}
              className="rounded-full bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </section>

        <section className="mt-6 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">
                Delivery addresses
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Save places you often order to.
              </p>
            </div>
            <span className="w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
              {profile.addresses.length} saved
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {profile.addresses.map((item) => (
              <div
                key={item._id || `${item.label}-${item.address}`}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg">
                    {item.label.toLowerCase() === "work" ? "▣" : "⌂"}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {item.address}
                      {item.area ? `, ${item.area}` : ""}
                      {item.city ? `, ${item.city}` : ""}
                    </p>
                    {item.phone && (
                      <p className="mt-1 text-xs text-gray-500">{item.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 gap-3">
                  <button
                    type="button"
                    onClick={() => startEditingAddress(item)}
                    className="text-sm font-bold text-orange-700 hover:text-orange-900"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void deleteAddress(item._id)}
                    className="text-sm font-bold text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {profile.addresses.length === 0 && (
              <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/50 px-5 py-8 text-center">
                <p className="font-bold text-gray-800">
                  No saved addresses yet
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Add a delivery address below to make checkout easier.
                </p>
              </div>
            )}
          </div>

          <form
            onSubmit={saveAddress}
            className="mt-6 rounded-2xl bg-[#fffaf3] p-4 sm:p-6"
          >
            <h3 className="font-extrabold text-gray-900">
              {editingAddress ? "Edit address" : "Add a delivery address"}
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="label"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Address label
                </label>
                <select
                  id="label"
                  value={address.label}
                  onChange={(event) =>
                    setAddress({ ...address, label: event.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 outline-none focus:border-orange-500"
                >
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="addressPhone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Delivery phone
                </label>
                <input
                  id="addressPhone"
                  type="tel"
                  value={address.phone}
                  onChange={(event) =>
                    setAddress({ ...address, phone: event.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="streetAddress"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full address
                </label>
                <textarea
                  id="streetAddress"
                  value={address.address}
                  onChange={(event) =>
                    setAddress({ ...address, address: event.target.value })
                  }
                  required
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 outline-none focus:border-orange-500"
                  placeholder="House, road, building, or landmark"
                />
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Area
                </label>
                <input
                  id="area"
                  value={address.area}
                  onChange={(event) =>
                    setAddress({ ...address, area: event.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  City
                </label>
                <input
                  id="city"
                  value={address.city}
                  onChange={(event) =>
                    setAddress({ ...address, city: event.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                disabled={saving}
                className="rounded-full bg-orange-600 px-5 py-3 text-sm font-bold text-white hover:bg-orange-700 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingAddress
                    ? "Update address"
                    : "Save address"}
              </button>
              {editingAddress && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAddress(null);
                    setAddress(emptyAddress);
                  }}
                  className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
