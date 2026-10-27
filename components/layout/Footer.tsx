
export default function Footer() {
  return (
    <footer id="contact" className="border-t border-orange-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-9 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <a href="#home" className="text-xl font-black">
          <span className="text-orange-600">KD</span> Delivery.
        </a>

        <p className="text-sm text-stone-500">
          Traditional taste, delivered with care.
        </p>

        <p className="text-sm text-stone-500">
          ©  Kacchi Dine Delivery 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
