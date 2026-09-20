/**
 * ============================================================================
 *  STRUKTURÁLT ADATOK (schema.org / JSON-LD)
 * ============================================================================
 *
 *  Vezérelv: a strukturált adat CSAK azt állíthatja, ami az oldalon
 *  ténylegesen látható és igaz.
 *
 *  Ebből következik két szabály, amit a kód betart:
 *
 *   1. `aggregateRating` KIZÁRÓLAG akkor kerül bele, ha az értékelések
 *      száma ismert (business.google.reviewCount != null). A Google
 *      `ratingValue`-t darabszám nélkül érvénytelennek tekinti, ráadásul
 *      a kitalált darabszám félrevezető lenne.
 *
 *   2. `review` elem csak valódi, a configban rögzített véleményekből
 *      készül. Üres tömb esetén nincs review a JSON-LD-ben.
 * ============================================================================
 */

import { business, site, absoluteUrl } from "@/config/business";
import { services, type Service } from "@/config/services";
import { socialProfiles } from "@/config/media";

/** Az üzleti entitás stabil @id-je — erre hivatkozik minden más séma. */
const BUSINESS_ID = `${site.url}/#business`;

/* ------------------------------------------------------------------ */

/**
 * LocalBusiness (AutomotiveBusiness altípus).
 *
 * Az AutomotiveBusiness pontosabb, mint a sima LocalBusiness, mert a
 * tevékenység járműhöz kötött. A `Locksmith` típust szándékosan nem
 * használjuk önmagában, mert az elsősorban épületzár-szakértőt jelöl.
 */
export function localBusinessSchema() {
  const { google, address, geo, phone, hours } = business;

  const schema: Record<string, unknown> = {
    "@type": ["AutomotiveBusiness", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: business.name,
    description: business.description,
    url: site.url,

    /**
     * Ezt a képet mutatja a Google a találat mellett.
     *
     * Korábban egyik kép sem volt megadva, ezért a Google maga választott
     * a lapon lévők közül, és a széles, króm hatású `logo-full.png`-t
     * szedte ki. Az bélyegképméretben elmosódott és a felirata
     * olvashatatlan volt.
     *
     * Az `icon-512.png` a sötét alapú, négyzetes márkajel, ugyanaz, ami a
     * fejlécben is szerepel: nagy a kontrasztja, kicsiben is felismerhető.
     *
     * ⚠️ A Google nem azonnal frissíti a bélyegképet, az újraindexeléstől
     *    függ, ez napokig vagy hetekig is eltarthat.
     */
    image: `${site.url}/icon-512.png`,
    logo: `${site.url}/icon-512.png`,

    telephone: phone.primary.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressCountry: address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Budapest",
      },
      ...business.serviceArea.towns.map((town) => ({
        "@type": "City" as const,
        name: town,
      })),
    ],
    /** A kínált szolgáltatások — ezek az oldalon is végig láthatóak. */
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Autókulcs és autónyitás szolgáltatások",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.nav,
          url: absoluteUrl(`/szolgaltatasok/${service.slug}`),
        },
      })),
    },
  };

  // Több telefonszám esetén mindkettő szerepeljen.
  if (phone.secondary) {
    schema.contactPoint = [
      {
        "@type": "ContactPoint",
        telephone: phone.primary.e164,
        contactType: "customer service",
        areaServed: "HU",
        availableLanguage: "Hungarian",
      },
      {
        "@type": "ContactPoint",
        telephone: phone.secondary.e164,
        contactType: "customer service",
        areaServed: "HU",
        availableLanguage: "Hungarian",
      },
    ];
  }

  if (hours.alwaysOpen) {
    schema.specialOpeningHoursSpecification = undefined;
  }

  if (google.mapsUrl) {
    schema.hasMap = google.mapsUrl;
  }

  /**
   * sameAs: a cég HIVATALOS profiljai. A Google ebből tudja, hogy a
   * weboldal, a Cégprofil, a TikTok és a Facebook ugyanaz az entitás —
   * ez erősíti a márka felismerhetőségét a keresőben.
   */
  const profiles = [
    google.mapsUrl,
    socialProfiles.tiktok?.url,
    socialProfiles.facebook?.url,
  ].filter(Boolean);
  if (profiles.length > 0) schema.sameAs = profiles;

  if (business.email) {
    schema.email = business.email;
  }

  /**
   * ⚠️ Csak akkor, ha a darabszám valóban ismert.
   * Lásd a fájl elején lévő 1. szabályt.
   */
  if (google.reviewCount && google.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: google.rating,
      reviewCount: google.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  /** Csak valódi, a configban rögzített vélemények. */
  if (google.reviews.length > 0) {
    schema.review = google.reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      datePublished: review.date,
      reviewBody: review.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }));
  }

  return schema;
}

/* ------------------------------------------------------------------ */

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: business.name,
    inLanguage: "hu-HU",
    publisher: { "@id": BUSINESS_ID },
  };
}

/* ------------------------------------------------------------------ */

/** Egy konkrét szolgáltatás sémája — a szolgáltatás-aloldalakhoz. */
export function serviceSchema(service: Service) {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`/szolgaltatasok/${service.slug}#service`),
    name: service.nav,
    description: service.metaDescription,
    url: absoluteUrl(`/szolgaltatasok/${service.slug}`),
    serviceType: service.nav,
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: "Budapest",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: business.phone.primary.e164,
      },
      serviceUrl: absoluteUrl(`/szolgaltatasok/${service.slug}`),
    },
  };
}

/* ------------------------------------------------------------------ */

/**
 * FAQPage.
 * Csak olyan oldalon szabad kiadni, ahol a kérdések és a válaszok
 * ténylegesen láthatóak a felhasználó számára is.
 */
export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/* ------------------------------------------------------------------ */

/**
 * Article — a tudásbázis cikkeihez.
 *
 * A szerző maga a vállalkozás (nem találunk ki személynevet). A képet
 * csak akkor adjuk meg, ha a fájl ténylegesen létezik — különben a
 * Google egy nem létező képre mutató hivatkozást kapna.
 */
export function articleSchema(article: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: { src: string };
}) {
  const url = absoluteUrl(`/tudasbazis/${article.slug}`);

  const schema: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    url,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "hu-HU",
    author: { "@id": BUSINESS_ID },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: url,
  };

  if (imageExists(article.image.src)) {
    schema.image = `${site.url}${article.image.src}`;
  }

  return schema;
}

/** Build időben ellenőrzi, hogy a kép valóban létezik-e a /public alatt. */
function imageExists(src: string): boolean {
  try {
    // Csak szerveroldalon fut (build közben).
    const fs = require("node:fs") as typeof import("node:fs");
    const path = require("node:path") as typeof import("node:path");
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */

export interface Crumb {
  name: string;
  /** Relatív útvonal, pl. "/szolgaltatasok". */
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/* ------------------------------------------------------------------ */

/**
 * Egyetlen `@graph` JSON-LD blokkba fűzi a sémákat.
 *
 * Miért egy blokk: így az entitások `@id`-vel hivatkozhatnak egymásra
 * (a Service a LocalBusiness-re), ami tisztább, mint több különálló,
 * egymást ismételő JSON-LD script.
 */
export function jsonLdGraph(...nodes: Array<Record<string, unknown> | null>) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}

/**
 * A JSON-LD `<script>` tartalma.
 *
 * A `<` karaktert escape-eljük, hogy a JSON-ba került szöveg semmilyen
 * esetben ne tudja lezárni a script blokkot (XSS-védelem).
 */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
