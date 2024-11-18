import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts/fonts';
import "@/app/ui/styles/globals.css";
import React from "react";
import Navbar from "@/app/ui/components/Navbar";
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
    <html lang="en" data-lt-installed>
      <body
        className={`${inter.className} subpixel-antialiased`}
      >
        <NextAuthSessionProvider>
          <Navbar />
          <div className="mx-8">
            {children}
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
