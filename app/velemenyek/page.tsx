import type { Metadata } from "next";

import { business, formattedRating } from "@/config/business";
import { Container, Section, CallButton, Button } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero, CtaBand } from "@/components/sections";
import { ReviewsSection } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, type Crumb } from "@/lib/schema";
import { MapPinIcon, StarIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Vélemények: Google értékeléseink",
  description: `Ügyfeleink véleménye a Google Cégprofilunkban. Jelenlegi értékelésünk: ${formattedRating()} csillag. Olvassa el az értékeléseket, vagy írjon Ön is.`,
  alternates: { canonical: "/velemenyek" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Vélemények", path: "/velemenyek" },
];

export default function ReviewsPage() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <PageHero
        eyebrow="Vélemények"
        title="Ügyfeleink véleménye"
        lead="Nem gépelünk át véleményeket a weboldalra. Az értékeléseink a Google Cégprofilunkban nyilvánosak, ott látja, ki írta, mikor és mit."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            href={business.google.mapsUrl}
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google értékelések megnyitása
          </Button>
          <CallButton size="lg" label="Beszéljünk a részletekről" />
        </div>
      </PageHero>

      <ReviewsSection heading="Értékeléseink a Google-ben" />

      {/* ---- Kérés értékelésre ---- */}
      <Section tone="white">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-card bg-ink-50 p-7 ring-1 ring-ink-200">
              <StarIcon className="h-8 w-8 text-star" />
              <h2 className="mt-4 text-xl font-bold">
                Dolgoztunk már Önnek? Írjon értékelést
              </h2>
              <p className="mt-3 leading-relaxed text-ink-600">
                Ha elégedett volt a munkánkkal, egy rövid Google-értékelés
                sokat segít és másoknak is támpontot ad, akik épp az autójuk
                mellett állnak és nem tudják, kit hívjanak.
              </p>
              <Button
                href={business.google.reviewUrl}
                variant="secondary"
                className="mt-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Értékelés írása
              </Button>
            </div>

            <div className="rounded-card bg-ink-50 p-7 ring-1 ring-ink-200">
              <MapPinIcon className="h-8 w-8 text-brand-600" />
              <h2 className="mt-4 text-xl font-bold">
                Nem volt elégedett valamivel?
              </h2>
              <p className="mt-3 leading-relaxed text-ink-600">
                Szóljon nekünk közvetlenül, mielőtt értékelést ír. A legtöbb
                problémát meg tudjuk oldani, ha tudunk róla. Hívjon minket és
                nézzük meg együtt, mi történt.
              </p>
              <CallButton size="md" label="Kérjen árat" className="mt-5" />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
    </>
  );
}
