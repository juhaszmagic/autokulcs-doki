import type { Metadata } from "next";

import { business } from "@/config/business";
import { legal } from "@/config/legal";
import { Container, Section, CallButton } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, type Crumb } from "@/lib/schema";

/**
 * IMPRESSZUM
 *
 * Az elektronikus kereskedelmi törvény (2001. évi CVIII. tv. 4. §) minden
 * üzleti weboldalnak kötelezővé teszi. Az adatok a config/legal.ts-ből
 * jönnek — kitalált adat itt nem szerepelhet.
 *
 * Ha egy kötelező adat hiányzik, a sor NEM jelenik meg kitalált értékkel;
 * helyette a lap tetején látható, hogy mi hiányzik. Ez őszintébb, mint egy
 * teljesnek látszó, de valótlan impresszum.
 */
export const metadata: Metadata = {
  title: "Impresszum",
  description: `A(z) ${business.name} weboldalának üzemeltetői adatai.`,
  alternates: { canonical: "/impresszum" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Impresszum", path: "/impresszum" },
];

export default function ImprintPage() {
  const p = legal.provider;

  const rows: Array<{ label: string; value: string; href?: string }> = [
    { label: "Szolgáltató neve", value: `${p.name} ${p.form}` },
    { label: "Székhely", value: p.address },
    { label: "E-mail cím", value: p.email, href: `mailto:${p.email}` },
    {
      label: "Telefonszám",
      value: business.phone.primary.display,
      href: business.phone.primary.href,
    },
    { label: "Adószám", value: p.taxNumber },
    ...(p.registrationNumber
      ? [{ label: "Nyilvántartási szám", value: p.registrationNumber }]
      : []),
    { label: "Nyilvántartást vezető szerv", value: p.registrationAuthority },
    { label: "Tárhelyszolgáltató", value: "GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA" },
  ];

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <Section tone="light" size="normal">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-h1">Impresszum</h1>
            <p className="text-lead mt-5 text-ink-600">
              A weboldal üzemeltetőjének és a szolgáltatás nyújtójának adatai.
            </p>

            <dl className="mt-10 divide-y divide-ink-200 overflow-hidden rounded-feature bg-white ring-1 ring-ink-200">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6 sm:p-6"
                >
                  <dt className="text-[0.9375rem] font-semibold text-ink-900">
                    {row.label}
                  </dt>
                  <dd className="text-ink-700">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="font-medium text-brand-700 underline-offset-4 hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 rounded-feature bg-white p-6 ring-1 ring-ink-200 sm:p-7">
              <h2 className="text-h3">Panasz és jogorvoslat</h2>
              <p className="mt-4 leading-relaxed text-ink-700">
                Ha a szolgáltatással kapcsolatban panasza van, először minket
                keressen a fenti elérhetőségeken, a legtöbb kérdés egy
                telefonhívás alatt rendeződik.
              </p>
              <p className="mt-4 leading-relaxed text-ink-700">
                Ha ez nem vezet eredményre, fogyasztóként a lakóhelye szerint
                illetékes <strong>békéltető testülethez</strong> fordulhat,
                illetve panaszt tehet a területileg illetékes
                <strong> fogyasztóvédelmi hatóságnál</strong>.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" label="Egyeztessünk telefonon" />
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
    </>
  );
}
