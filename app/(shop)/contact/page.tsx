import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

const contactDetails = [
  {
    icon: "☎",
    title: "Call us",
    value: "+880 1810190832",
    description: "We're happy to help with your order.",
  },
  {
    icon: "✉",
    title: "Email us",
    value: "contact@kddelivery.com",
    description: "Send us your questions or feedback.",
  },
  {
    icon: "⌖",
    title: "Visit us",
    value: "Siam Tower, 79/1 Bus Stand Bazar Road, Joydebpur, Gazipur",
    description: "Your local destination for traditional food.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fffaf4] text-stone-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#fff0df]">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-orange-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-orange-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
              We'd love to hear from you
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s talk about
              <span className="block text-orange-600">good food.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
              Questions about an order, a special request, or just want to say
              hello? The KD Delivery team is here to help.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#contact-form"
                className="rounded-full bg-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
              >
                Send us a message
              </Link>

              <Link
                href="/menu"
                className="rounded-full border border-orange-200 bg-white px-6 py-3.5 text-sm font-bold text-stone-800 transition hover:border-orange-400 hover:text-orange-700"
              >
                Explore our menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
            Get in touch
          </p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            We&apos;re only a message away
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {contactDetails.map((detail) => (
            <div
              key={detail.title}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-700">
                {detail.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold">{detail.title}</h3>

              <p className="mt-2 break-words text-sm font-semibold text-orange-700">
                {detail.value}
              </p>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                {detail.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Form and restaurant information */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24">
        <div
          id="contact-form"
          className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-9"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
            Contact form
          </p>

          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            Send us a message
          </h2>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            Fill in the details below and tell us how we can help.
          </p>

          <div className="mt-7">
            <ContactForm />
          </div>
        </div>
        {/* Opening hours */}

        <div className="space-y-6">
          <div className="rounded-3xl bg-[#2b211b] p-7 text-white sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-2xl">
              ◷
            </div>

            <h2 className="mt-5 text-2xl font-extrabold">Opening hours</h2>

            <p className="mt-3 text-sm leading-6 text-stone-300">
              We prepare delicious meals every day, bringing traditional flavors
              straight to your door.
            </p>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <span className="text-sm text-stone-300">Every day</span>
              <span className="text-right text-sm font-bold text-orange-300">
                11:30 AM – 11:00 PM
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-orange-400/20 bg-orange-500/10 p-4">
              <div className="flex items-start gap-3">
                <span className="text-lg text-orange-300">✦</span>
                <div>
                  <h3 className="text-sm font-bold text-orange-200">
                    Late-night availability
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-stone-300">
                    Late-night orders may be available depending on food
                    availability. Please contact us to confirm before ordering.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white">
            <div className="flex h-48 items-center justify-center bg-[#ffedda] p-6 text-center">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-orange-600 shadow-sm">
                  ⌖
                </div>
                <h3 className="mt-3 font-bold">Find our restaurant</h3>
                <p className="mt-1 text-sm text-stone-500">
                  Visit us or order your favorite meals online.
                </p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold">KD Delivery</h3>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                Serving freshly prepared traditional food to your local
                community, with convenient delivery right to your door.
              </p>
            </div>
          </div>

          <p className="px-2 text-sm leading-6 text-stone-500">
            Need help with an existing order? Please include your order number
            in your message so our team can assist you faster.
          </p>
        </div>
      </section>
    </main>
  );
}
