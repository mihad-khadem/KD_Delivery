
const features = [
  {
    icon: "🍲",
    title: "Freshly Prepared",
    description: "Made fresh when you order.",
  },
  {
    icon: "🛵",
    title: "Local Delivery",
    description: "Delivered to your neighborhood.",
  },
  {
    icon: "💵",
    title: "Cash on Delivery",
    description: "Pay when your food arrives.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="border-y border-orange-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:grid-cols-3 lg:px-8">
        {features.map((feature) => (
          <div key={feature.title} className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
              {feature.icon}
            </div>

            <div>
              <h2 className="font-extrabold">{feature.title}</h2>
              <p className="mt-1 text-sm text-stone-500">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
