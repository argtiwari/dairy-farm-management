import type { Metadata } from "next";
// import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { AuthProvider } from "@/components/auth/auth-provider";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

import "./globals.css";

export const metadata: Metadata = {
  title: "Dairy Farm Manager",
  description: "A simple dairy farm management system for cows, milk, health, workers, and reports.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased bg-[#fdf9f4]">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 pb-24">
            {children}
          </div>

          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
