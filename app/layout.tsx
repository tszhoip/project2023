import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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

const hkgBold = localFont({
  src: "../public/fonts/HKG-Bold.woff2",
  variable: "--hkg-bold-font",
  display: "swap",
});

const n1MonoRegular = localFont({
  src: "../public/fonts/N1-Mono-Regular.woff2",
  variable: "--n1-mono-regular-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MHZ Design Office — Fonts",
  description: "Display fonts by MHZ Design Office. One price, web license, updates included.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${airBlack.variable} ${airBold.variable} ${hkgBold.variable} ${n1MonoRegular.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
