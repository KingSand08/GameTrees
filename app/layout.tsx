import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts/fonts';
import "@/app/ui/styles/globals.css";
import React from "react";
import Navbar from "@/app/ui/components/Navbar";
import Footer from "@/app/ui/components/structural/Footer";
import NextAuthSessionProvider from "@/nextauth/NextAuthSessionProvider"

export const metadata: Metadata = {
  title: "Game Trees",
  description: "Search local and larger stores for games, prices, and discounts for many shop fronts, developers, and publishers in one area! You can connect with community and view your gamestats cross platform!",
  icons: {
    icon: '/favicon.ico?v=1',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-lt-installed data-theme="dark">
      <body
        className={`${inter.className} subpixel-antialiased`}
      >
        <NextAuthSessionProvider>
          <Navbar />
          <div className="bg-base-300 py-8 px-8 dark:bg-base-100">
            {children}
          </div>
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
