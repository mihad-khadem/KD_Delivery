import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = {
  title: "KD Delivery",
  description: "Delicious food delivered to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div className="min-h-screen bg-orange-50" />}>
          <StoreProvider>{children}</StoreProvider>
          <SpeedInsights />
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
