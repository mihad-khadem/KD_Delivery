

import type { ReactNode } from "react";
import Header from "@/components/layout/HeaderSection";
import Footer from "@/components/layout/Footer";

type ShopLayoutProps = {
  children: ReactNode;
};

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}
