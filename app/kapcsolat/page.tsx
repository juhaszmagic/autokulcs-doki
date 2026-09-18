import type { Metadata } from "next";

import { business } from "@/config/business";
import { Container, Section, CallButton, Button } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero, CtaBand } from "@/components/sections";
import { ContactForm } from "@/components/ContactForm";
import { RatingBadge } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, type Crumb } from "@/lib/schema";
import { PhoneIcon, MapPinIcon, ClockIcon, CarIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Kapcsolat: hívjon minket 0–24 | Budapest",
  description: `${business.name} elérhetőség: ${business.phone.primary.display}. Non-stop, a hét minden napján. Cím: ${business.address.full}. Budapest és környéke.`,
  alternates: { canonical: "/kapcsolat" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Kapcsolat", path: "/kapcsolat" },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <PageHero
        eyebrow="Kapcsolat"
        title="Hívjon minket a nap 24 órájában"
        lead="A leggyorsabb út a megoldáshoz a telefonhívás. Mondja meg az autó típusát és évjáratát, egyeztessünk időpontot, és hozza el az autót a XI. kerületi telephelyünkre. Ha nem tud jönni, kimegyünk Önhöz."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton size="lg" label="Egyeztessünk telefonon" />
          <Button
            href={business.google.mapsUrl}
            variant="secondary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Megnyitás Google Térképen
          </Button>
        </div>
      </PageHero>

      {/* ---- Elérhetőségi adatok ---- */}
      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            {/* --- Bal: NAP adatok --- */}
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Elérhetőségeink</h2>

              {/*
                Az `address` elem a teljes NAP-ot tartalmazza, pontosan
                ugyanabban a formában, ahogy a láblécben és a strukturált
                adatokban is szerepel.
              */}
              <address className="mt-6 space-y-5 not-italic">
                {/* Telefon, a legfontosabb elem, ezért ez a legnagyobb */}
                <div className="rounded-card bg-accent-50 p-6 ring-1 ring-accent-100">
                  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent-800">
                    <PhoneIcon className="h-4.5 w-4.5" />
                    Telefon
                  </p>
                  <a
                    href={business.phone.primary.href}
                    className="mt-2 block text-3xl font-bold text-ink-900 transition-colors hover:text-accent-700 sm:text-4xl"
                    data-cta="call-contact"
                  >
                    {business.phone.primary.display}
                  </a>

                  <CallButton size="lg" label="Egyeztessünk telefonon" className="mt-5 w-full sm:w-auto" />
                </div>

                {/* Nyitvatartás */}
                <div className="flex gap-4 rounded-card bg-ink-50 p-5 ring-1 ring-ink-200">
                  <ClockIcon className="h-6 w-6 shrink-0 text-brand-600" />
                  <div>
                    <h3 className="font-bold">Nyitvatartás</h3>
                    <p className="mt-1 text-ink-600">{business.hours.display}</p>
                    <p className="mt-1 text-sm text-ink-500">
                      Hétvégén és ünnepnapokon is elérhetők vagyunk.
                    </p>
                  </div>
                </div>

                {/* Cím */}
                <div className="flex gap-4 rounded-card bg-ink-50 p-5 ring-1 ring-ink-200">
                  <MapPinIcon className="h-6 w-6 shrink-0 text-brand-600" />
                  <div>
                    <h3 className="font-bold">Telephelyünk</h3>
                    <p className="mt-1 text-ink-600">{business.address.full}</p>
                    <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-1 text-[0.8125rem] font-bold text-brand-800">
                      Budapest {business.address.district} ({business.address.districtName})
                    </p>
                    <a
                      href={business.google.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
                    >
                      Megnyitás Google Térképen →
                    </a>
                  </div>
                </div>

                {/* Ellátási terület */}
                <div className="flex gap-4 rounded-card bg-ink-50 p-5 ring-1 ring-ink-200">
                  <CarIcon className="h-6 w-6 shrink-0 text-brand-600" />
                  <div>
                    <h3 className="font-bold">Ellátási terület</h3>
                    <p className="mt-1 text-ink-600">
                      Budapest mind a 23 kerülete és az agglomeráció.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {business.serviceArea.towns.join(" · ")} és környéke.
                    </p>
                  </div>
                </div>

                {business.email && (
                  <div className="flex gap-4 rounded-card bg-ink-50 p-5 ring-1 ring-ink-200">
                    <div>
                      <h3 className="font-bold">E-mail</h3>
                      <a
                        href={`mailto:${business.email}`}
                        className="mt-1 block text-ink-600 hover:text-accent-700"
                      >
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}
              </address>

              <div className="mt-6">
                <RatingBadge />
              </div>
            </div>

            {/* --- Jobb: űrlap --- */}
            <div id="ajanlatkeres" className="scroll-mt-28">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Térkép ---- */}
      <Section tone="light" labelledBy="terkep-cim" className="!pb-0">
        <Container>
          <h2 id="terkep-cim" className="text-2xl font-bold">
            Hol talál meg minket?
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">
            Telephelyünk Budapest {business.address.district}ében, a{" "}
            {business.address.street} alatt van. Hozza el az autót, a parkolás
            ingyenes, és a munka általában{" "}
            {business.pricing.onSite.workshopDuration} alatt elkészül. Érkezés
            előtt kérjük, egyeztessen időpontot telefonon.
          </p>

          <div className="mt-7 overflow-hidden rounded-card ring-1 ring-ink-200">
            {/*
              A térkép beágyazása LUSTA (`loading="lazy"`), így nem tölt be
              addig, amíg a látogató oda nem görget. Ez a beágyazás nem igényel
              API-kulcsot, tehát nincs titok a kódban.
            */}
            <iframe
              title={`${business.name} térképen: ${business.address.full}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${business.address.full}`
              )}&z=15&output=embed&hl=hu`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full border-0 sm:h-[420px]"
            />
          </div>

          <div className="py-8">
            <Button
              href={business.google.mapsUrl}
              variant="secondary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Megnyitás Google Térképen
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
    </>
  );
}
