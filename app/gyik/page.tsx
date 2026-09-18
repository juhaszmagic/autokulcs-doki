import type { Metadata } from "next";

import { faqGroups, allFaqs } from "@/config/faq";
import { Container, Section, CallButton, Button } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero, CtaBand, ServiceLinkList } from "@/components/sections";
import { FaqList } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, faqSchema, type Crumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Gyakori kérdések: autókulcs és autónyitás",
  description:
    "Mennyibe kerül az autókulcs másolás? Mennyi idő alatt érkeznek? Elveszett az összes kulcsom, mit tegyek? Válaszok a leggyakoribb kérdésekre.",
  alternates: { canonical: "/gyik" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Gyakori kérdések", path: "/gyik" },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <PageHero
        eyebrow="GYIK"
        title="Gyakori kérdések"
        lead="Összeszedtük, amit a leggyakrabban kérdeznek tőlünk telefonon. Ha nem találja a választ, hívjon, a telefonban minden kérdésre válaszolunk."
      >
        <CallButton size="lg" label="Kérdezzen telefonon" />
      </PageHero>

      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-14">
            {/* ---- Tartalomjegyzék ---- */}
            <nav
              aria-label="Kérdéscsoportok"
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                Témakörök
              </p>
              <ul className="mt-3 space-y-1">
                {faqGroups.map((group) => (
                  <li key={group.title}>
                    <a
                      href={`#${slugify(group.title)}`}
                      className="block rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
                    >
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-card bg-brand-800 p-5 text-center">
                <p className="font-semibold text-white">
                  Nem találja a kérdését?
                </p>
                <p className="mt-1 text-sm text-brand-100">
                  Telefonon minden kérdésre válaszolunk.
                </p>
                <CallButton size="md" label="Kérdezzen telefonon" className="mt-4 w-full" showNumber={false} />
              </div>
            </nav>

            {/* ---- Kérdéscsoportok ---- */}
            <div className="space-y-12">
              {faqGroups.map((group) => (
                <section
                  key={group.title}
                  id={slugify(group.title)}
                  aria-labelledby={`${slugify(group.title)}-cim`}
                  className="scroll-mt-28"
                >
                  <h2
                    id={`${slugify(group.title)}-cim`}
                    className="text-2xl font-bold"
                  >
                    {group.title}
                  </h2>
                  <div className="mt-5">
                    <FaqList faqs={group.faqs} openFirst={false} />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Szolgáltatás-linkek ---- */}
      <Section tone="light">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold">
              Részletek szolgáltatásonként
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              Az egyes szolgáltatásokról külön oldalon írtunk részletesen, ott
              további, témára szabott kérdéseket is talál.
            </p>
            <div className="mt-6">
              <ServiceLinkList />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" label="Kérdezzen telefonon" />
              <Button href="/kapcsolat" variant="secondary" size="lg">
                Kapcsolat
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />

      {/*
        FAQPage strukturált adat.
        Az `allFaqs` PONTOSAN azokat a kérdéseket tartalmazza, amik az oldalon
        láthatóak is, ugyanabból a forrásból. Így a séma nem tud eltérni a
        látható tartalomtól.
      */}
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs), faqSchema(allFaqs))} />
    </>
  );
}

/** Ékezetmentes horgony-azonosító a magyar címekből. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
