import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  // Update metadataBase to the production domain once it's live.
  metadataBase: new URL("https://tijanajones.com"),
  title: "Tijana Jones · Austin Luxury Real Estate",
  description:
    "Buy, sell, or lease with Tijana Jones — luxury real estate in Austin, TX. 365+ homes sold, $102M+ closed, and a 5.0 rating across 44 Zillow reviews. Book a 10-minute call.",
  keywords: [
    "Tijana Jones",
    "Austin realtor",
    "Austin luxury real estate",
    "eXp Luxury",
    "CK Residential Group",
    "homes for sale Austin",
    "Lakeway",
    "Georgetown",
    "Liberty Hill",
  ],
  authors: [{ name: "Tijana Jones" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Tijana Jones Real Estate",
    title: "Tijana Jones · Austin Luxury Real Estate",
    description:
      "Luxury real estate in Austin, TX. 365+ homes sold, $102M+ closed, 5.0★ on Zillow. Book a 10-minute call with Tijana.",
    images: [
      { url: "/tijana-portrait.jpg", width: 904, height: 1200, alt: "Tijana Jones, Austin realtor" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tijana Jones · Austin Luxury Real Estate",
    description:
      "Luxury real estate in Austin, TX. 365+ homes sold, $102M+ closed, 5.0★ on Zillow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
