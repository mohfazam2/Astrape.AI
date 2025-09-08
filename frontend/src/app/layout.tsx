"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  
  const hideNavbarPages = ['/signin', '/signup'];
  const showNavbar = !hideNavbarPages.includes(pathname);

  return (
    <html lang="en">
      <link rel="icon" href="/cart.webp" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {showNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}