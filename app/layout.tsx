import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { business, site } from "@/config/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCallBar } from "@/components/StickyCallBar";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, localBusinessSchema, websiteSchema } from "@/lib/schema";

/**
 * Inter, önhosztolt (a next/font build időben letölti és beépíti).
 * Nincs futásidejű kérés a Google Fonts felé — se sebességben, se
 * adatvédelemben nem függünk külső szolgáltatótól.
 *
 * `display: swap` → a szöveg azonnal olvasható, nem villan üresen.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"], // latin-ext kell a magyar ő/ű betűkhöz
  display: "swap",
  variable: "--font-inter",
});

/** Előnézeti buildnél alútvonalon fut az oldal (pl. /autokulcs-doki). */
const basePath = process.env.PREVIEW_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  /**
   * Szándékosan sima string, NEM `{ default, template }` sablon.
   *
   * Egy automatikus „%s | Márkanév” sablon 25 karaktert fűzne minden
   * címhez, amitől a legtöbb title 80 karakter fölé nőne — a Google pedig
   * ~60 karakter után levágja. Ezért minden oldal maga adja meg a teljes,
   * hosszra optimalizált címét (lásd az egyes page.tsx fájlokat).
   */
  title: "Elveszett autókulcs pótlása és kulcsmásolás Budapesten",
  description: business.description,
  applicationName: business.name,
  authors: [{ name: business.name }],
  generator: undefined,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: business.name,
    title: `${business.name} | Elveszett autókulcs pótlása Budapesten`,
    description: business.description,
    /**
     * Megosztókép — ez jelenik meg WhatsAppon, Messengeren, Facebookon.
     * A `metadataBase` teszi elé a domaint, tehát ABSZOLÚT URL lesz belőle
     * (a WhatsApp relatív útvonalat nem tud betölteni).
     * Előállítás: npm run og
     */
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${business.name} – autókulcs másolás és autónyitás Budapesten, ${business.phone.primary.display}`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Elveszett autókulcs pótlása Budapesten`,
    description: business.description,
    images: ["/og.jpg"],
  },
  /**
   * Az ikonoknál a Next NEM teszi elé automatikusan a basePath-t, ezért
   * kézzel kell — különben az előnézeti (alútvonalas) buildben 404-esek.
   */
  icons: {
    icon: [
      { url: `${basePath}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: "180x180" }],
  },
  robots: process.env.PREVIEW_BASE_PATH
    ? // Előnézeti build: semmiképp ne kerüljön a keresőbe.
      { index: false, follow: false, nocache: true }
    : {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
      },
  category: "Autószerviz",
  other: {
    // Mobilon így a telefonszámok kattinthatóak maradnak, de a Safari
    // nem alakít át véletlenszerű számsorokat telefonszámmá.
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  themeColor: "#1f4838",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.lang} className={inter.variable}>
      <body>
        {/* Billentyűzetes navigációhoz: ugrás a fő tartalomra. */}
        <a href="#tartalom" className="skip-link">
          Ugrás a tartalomra
        </a>

        <Header />

        <main id="tartalom">{children}</main>

        <Footer />
        <StickyCallBar />

        {/*
          Az oldal alapvető entitásai: maga a vállalkozás és a weboldal.
          Egyetlen @graph blokkban, hogy a többi oldal sémái @id-vel
          tudjanak rá hivatkozni. Lásd: lib/schema.ts
        */}
        <JsonLd data={jsonLdGraph(localBusinessSchema(), websiteSchema())} />
      </body>
    </html>
  );
}
