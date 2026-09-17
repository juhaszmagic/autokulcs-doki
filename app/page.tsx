import type { Metadata } from "next";

import { homeFaqs } from "@/config/faq";
import { Container, Section, SectionHeading, CallButton, Button } from "@/components/ui";
import {
  Hero,
  TrustStrip,
  LostKeyBanner,
  RecentWork,
  ServicesShowcase,
  ExpertiseSection,
  HowItWorks,
  RealWorkGallery,
  VideoSection,
  LatestContent,
  ServiceAreaSection,
  CtaBand,
} from "@/components/sections";
import { ReviewsSection } from "@/components/Reviews";
import { FaqList } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, faqSchema } from "@/lib/schema";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Elveszett autókulcs pótlása Budapesten és környékén",
  description:
    "Elhagyta autókulcsát? Meglévő kulcs nélkül is készítünk újat, a helyszínen, programozással. Budapest és vonzáskörzete, 0–24. 25 000 Ft-tól.",
  alternates: { canonical: "/" },
};

/**
 * KEZDŐOLDAL
 *
 * A szekciók sorrendje szándékos: a látogató a hero után azonnal bizalmi
 * jeleket kap (Google-értékelés), majd megtalálja a saját problémáját a
 * szolgáltatások között, és minden blokk végén ott a hívás gomb.
 *
 * A háttérszínek váltakoznak (világos → fehér → grafit → zöld), ez adja a
 * lap vizuális ritmusát.
 */
export default function HomePage() {
  return (
    <>
      {/* 1–2. Hero + bizalmi sáv */}
      <Hero />
      <TrustStrip />

      {/* A legértékesebb munka rögtön a bizalmi sáv után. */}
      <LostKeyBanner />

      {/* Bizonyíték rögtön a kiemelt kérdés után: valódi munkafotók. */}
      <RecentWork />

      {/* 3. Szolgáltatások, nagy fotós kártyák */}
      <ServicesShowcase compact />

      {/* 4. Szakértelem, osztott elrendezés fotóval */}
      <ExpertiseSection />

      {/* 5. Folyamat */}
      <HowItWorks />

      {/* 6. Valódi munkák, szerkesztőségi fotórács */}
      <RealWorkGallery />

      {/* 7. Videók + TikTok */}
      <VideoSection />

      {/* 8. Tudásbázis */}
      <LatestContent />

      {/* 9. Google vélemények, zöld szekció */}
      <ReviewsSection />

      {/* 10. Ellátási terület */}
      <ServiceAreaSection />

      {/* 11. GYIK */}
      <HomeFaq />

      {/* 12. Záró CTA, fotó háttérrel */}
      <CtaBand />

      {/* A kezdőoldalon látható GYIK strukturált adata. */}
      <JsonLd data={jsonLdGraph(faqSchema(homeFaqs))} />
    </>
  );
}

/* ================================================================== */

function HomeFaq() {
  return (
    <Section tone="white" labelledBy="gyik-cim">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Gyakori kérdések"
              title="Amit a leggyakrabban kérdeznek"
              align="left"
              id="gyik-cim"
              lead="A legtöbb kérdésre egy hívás alatt is válaszolunk, de itt is összeszedtük a lényeget."
            />
            <div className="mt-9 space-y-4">
              <CallButton size="lg" label="Kérdezzen telefonon" className="w-full sm:w-auto" />
              <p className="text-sm text-ink-500">
                Nem találja a kérdését?{" "}
                <Link
                  href="/gyik"
                  className="font-semibold text-brand-700 underline-offset-4 hover:underline"
                >
                  Nézze meg az összes gyakori kérdést
                </Link>
                .
              </p>
            </div>
          </div>

          <FaqList faqs={homeFaqs} />
        </div>
      </Container>
    </Section>
  );
}
