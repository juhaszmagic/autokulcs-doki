import type { Metadata } from "next";

import { business } from "@/config/business";
import { services } from "@/config/services";
import { Container, Section, CallButton, Button } from "@/components/ui";
import { ServiceCard } from "@/components/ServiceCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero, CtaBand, HowItWorks, ServiceAreaSection } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, type Crumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Szolgáltatásaink – autónyitás, kulcsmásolás Budapest",
  description:
    "Autónyitás, autókulcs másolás és programozás, elveszett kulcs pótlása, kulcskészítés Budapesten és környékén, 0–24 órában.",
  alternates: { canonical: "/szolgaltatasok" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Szolgáltatások", path: "/szolgaltatasok" },
];

export default function ServicesIndexPage() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <PageHero
        eyebrow="Szolgáltatások"
        title="Autókulcs és autónyitás szolgáltatásaink"
        lead="A nyitástól a kész, működő kulcsig minden egy helyen. Válassza ki, ami az Ön helyzetére illik – vagy egyszerűen hívjon és elmondjuk, mi a teendő."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton size="lg" label="Kérjen árajánlatot telefonon" />
          <Button href="/arak" variant="secondary" size="lg">
            Villám ajánlatot kérek
          </Button>
        </div>
      </PageHero>

      <Section tone="white" labelledBy="lista-cim">
        <Container>
          {/*
            Ez a H2 nem díszítés: enélkül a H1 után rögtön a kártyák H3-jai
            következnének, ami átugrott címsorszint (H1 → H3).
          */}
          <h2 id="lista-cim" className="text-2xl font-bold sm:text-3xl">
            Válassza ki, amire szüksége van
          </h2>

          <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </ul>

          {/* Rövid, hasznos eligazítás, nem kulcsszóhalmozás */}
          <div className="mx-auto mt-14 max-w-3xl rounded-card bg-ink-50 p-7 ring-1 ring-ink-200">
            <h2 className="text-xl font-bold">
              Nem tudja, melyik szolgáltatásra van szüksége?
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              Ez teljesen rendben van, a legtöbb ügyfelünk sem tudja és nem is
              kell tudnia. Elég, ha telefonon elmondja, mi történt és megadja az
              autó típusát és évjáratát. Ebből mi már meg tudjuk mondani, mi a
              megoldás, mennyi ideig tart és mibe kerül.
            </p>
            <ul className="mt-5 space-y-2.5 text-ink-600">
              <li>
                <strong className="font-semibold text-ink-800">
                  Bent maradt a kulcs, de megvan?
                </strong>{" "}
                Autónyitás.
              </li>
              <li>
                <strong className="font-semibold text-ink-800">
                  Van még egy jó kulcsa és tartalékot szeretne?
                </strong>{" "}
                Autókulcs másolás.
              </li>
              <li>
                <strong className="font-semibold text-ink-800">
                  Nincs meg egyetlen kulcs sem?
                </strong>{" "}
                Elveszett autókulcs.
              </li>
              <li>
                <strong className="font-semibold text-ink-800">
                  Megvan a kulcs, de nem indít vagy nem működnek a gombok?
                </strong>{" "}
                Autókulcs programozás.
              </li>
            </ul>
            <div className="mt-6">
              <CallButton size="lg" label="Kérjen árajánlatot telefonon" />
            </div>
          </div>
        </Container>
      </Section>

      <HowItWorks />
      <ServiceAreaSection />
      <CtaBand />

      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
    </>
  );
}
