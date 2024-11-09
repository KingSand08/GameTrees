import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts/fonts';
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Game Trees",
  description: "Search local and larger stores for games, prices, and discounts for many shop fronts, developers, and publishers in one area! You can connect with community and view your gamestats cross platform!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${inter.className} subpixel-antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
