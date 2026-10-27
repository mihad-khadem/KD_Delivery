"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // UI demonstration only: no message is sent or stored yet.
    setSubmitted(true);
    event.currentTarget.reset();
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-200 bg-[#fffdfb] px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitted && (
        <div
          role="status"
          className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800"
        >
          Form preview submitted. Message delivery is not connected yet.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="text-sm font-semibold text-stone-700"
          >
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            required
            maxLength={100}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="text-sm font-semibold text-stone-700"
          >
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="text-sm font-semibold text-stone-700"
        >
          Phone number{" "}
          <span className="font-normal text-stone-400">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Your phone number"
          maxLength={30}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="text-sm font-semibold text-stone-700"
        >
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Choose a subject
          </option>
          <option value="order">Existing order</option>
          <option value="delivery">Delivery question</option>
          <option value="menu">Menu or food question</option>
          <option value="feedback">Feedback or suggestion</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-sm font-semibold text-stone-700"
        >
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell us how we can help..."
          required
          minLength={10}
          maxLength={3000}
          className={`${inputClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-200"
      >
        Send message <span aria-hidden="true">→</span>
      </button>

      <p className="text-center text-xs leading-5 text-stone-400">
        This demo form does not send or save your message yet.
      </p>
    </form>
  );
}
