

import HeroSection from "@/components/layout/Hero";
import FeaturesSection from "@/components/layout/FeaturesSection";
import PopularDishes from "@/components/layout/PopularDishes";
import AboutSection from "@/components/layout/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-stone-900">

      <HeroSection />
      <FeaturesSection />
      <PopularDishes />
      <AboutSection />
  
    </main>
  );
}