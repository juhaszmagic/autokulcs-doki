import type { Metadata } from "next";

import { Container, Section, CallButton, Button } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  PageHero,
  CtaBand,
  RealWorkGallery,
  VideoSection,
} from "@/components/sections";
import { images, realWork } from "@/config/media";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, type Crumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Galéria: munkáink és eszközeink",
  description:
    "Fotók a munkánkról: sérülésmentes autónyitás, helyszíni kulcsmásolás, autókulcs programozás és a hozzájuk használt eszközök.",
  alternates: { canonical: "/galeria" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Galéria", path: "/galeria" },
];

export default function GalleryPage() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <PageHero
        eyebrow="Galéria"
        title="Így dolgozunk"
        lead="Fotók a valódi munkáinkról: nyitás, kulcskészítés, programozás és az ezekhez használt eszközök."
        image={images.workshop}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton size="xl" label="Kérjen árajánlatot telefonon" />
          <Button href="#videok" variant="onDark" size="xl">
            Videóink
          </Button>
        </div>
      </PageHero>

      {/* A galéria rács és a lightbox is innen jön, egy forrásból. */}
      <RealWorkGallery
        heading="Minden munkánk"
        items={realWork}
        showAllLink={false}
      />

      <VideoSection />

      <CtaBand
        title="Elhagyta autókulcsát?"
        text="Ha elhagyta, elvesztette vagy eltört a kulcsa, egy telefonhívás elég. Budapesten belül általában fél órán belül ott vagyunk."
      />

      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
    </>
  );
}
