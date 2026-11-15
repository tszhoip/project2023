import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FONT } from "@/lib/font";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const airBlack = localFont({
  src: "../public/fonts/Air-Black.woff2",
  variable: "--air-black-font",
  display: "swap",
});

const airBold = localFont({
  src: "../public/fonts/Air-Bold.woff2",
  variable: "--air-bold-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${FONT.name} — ${FONT.designer}`,
  description: FONT.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${airBlack.variable} ${airBold.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
