import type { Metadata } from "next";
import Link from "next/link";

import { business } from "@/config/business";
import { legal, providerFullName } from "@/config/legal";
import { Container, Section, CallButton } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, type Crumb } from "@/lib/schema";

/**
 * ADATKEZELÉSI TÁJÉKOZTATÓ
 *
 * A GDPR 13. cikke írja elő: a kapcsolati űrlap személyes adatot gyűjt
 * (név, telefonszám, üzenet), ezért tájékoztatni kell az érintettet.
 *
 * Két dolgot mondunk ki nyíltan, mert ez a becsületes:
 *  1. Az űrlap adatai egy külső szolgáltatón (FormSubmit) haladnak át.
 *  2. Az oldal NEM használ sütit és nem követi a látogatót.
 *
 * A szövegben nincs kitalált adat: minden a config/legal.ts-ből jön.
 */
export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  description:
    "Milyen adatokat kezelünk a kapcsolati űrlapon, meddig őrizzük őket és milyen jogai vannak. A weboldal sütiket nem használ.",
  alternates: { canonical: "/adatkezelesi-tajekoztato" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Adatkezelési tájékoztató", path: "/adatkezelesi-tajekoztato" },
];

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-h3">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-ink-700">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <Section tone="light" size="normal">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-h1">Adatkezelési tájékoztató</h1>
            <p className="text-lead mt-5 text-ink-600">
              Röviden és köntörfalazás nélkül: milyen adatot kérünk, miért,
              meddig tartjuk meg és mit tehet, ha meggondolja magát.
            </p>

            {/* A legfontosabb üzenet előre, ez a látogatót tényleg érdekli. */}
            <p className="mt-8 rounded-feature bg-brand-50 p-6 text-[1.0625rem] font-semibold leading-relaxed text-brand-900 ring-1 ring-brand-200">
              Ez a weboldal nem használ sütiket, nem futtat analitikát és nem
              követi a látogatóit. Ezért nincs rajta süti-elfogadó ablak sem,
              nincs mihez hozzájárulást kérnünk.
            </p>

            <Block title="Ki kezeli az adatait">
              <p>
                Az adatkezelő <strong>{providerFullName()}</strong> (székhely:{" "}
                {legal.provider.address}; adószám: {legal.provider.taxNumber}).
              </p>
              <p>
                Elérhetőség adatvédelmi kérdésben:{" "}
                <a
                  href={`mailto:${legal.provider.email}`}
                  className="font-medium text-brand-700 underline-offset-4 hover:underline"
                >
                  {legal.provider.email}
                </a>{" "}
                vagy{" "}
                <a
                  href={business.phone.primary.href}
                  className="font-medium text-brand-700 underline-offset-4 hover:underline"
                >
                  {business.phone.primary.display}
                </a>
                . További adatok az{" "}
                <Link
                  href="/impresszum"
                  className="font-medium text-brand-700 underline-offset-4 hover:underline"
                >
                  impresszumban
                </Link>
                .
              </p>
            </Block>

            <Block title="Milyen adatot kérünk és miért">
              <p>
                Kizárólag azt, ami a megkeresése megválaszolásához kell. A
                kapcsolati űrlapon:
              </p>
              <ul className="space-y-2.5">
                {[
                  ["Név", "hogy tudjuk, kit hívunk vissza, kötelező"],
                  ["Telefonszám", "hogy vissza tudjuk hívni, kötelező"],
                  [
                    "Az autó márkája, modellje, évjárata",
                    "ebből tudunk árat mondani, nem kötelező",
                  ],
                  [
                    "A probléma típusa és az üzenet",
                    "hogy értsük, mi történt, az üzenet nem kötelező",
                  ],
                ].map(([what, why]) => (
                  <li key={what} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600"
                    />
                    <span>
                      <strong>{what}</strong>, {why}
                    </span>
                  </li>
                ))}
              </ul>
              <p>
                Az adatkezelés jogalapja az <strong>Ön hozzájárulása</strong>{" "}
                (GDPR 6. cikk (1) a) pont), amit az űrlap elküldése előtti
                jelölőnégyzettel ad meg. Ha telefonon vagy üzenetküldőn keres
                minket, ugyanezeket az adatokat a szolgáltatás nyújtása
                érdekében kezeljük.
              </p>
              <p>
                Az űrlapot nem használjuk hírlevélre vagy reklámra és az
                adatait nem adjuk el senkinek.
              </p>
            </Block>

            <Block title="Meddig őrizzük meg">
              <p>
                {legal.retention}. Ezt követően töröljük. Ha korábban szeretné,
                hogy töröljük, elég szólnia, lásd lentebb.
              </p>
            </Block>

            <Block title="Kihez kerül még az adat">
              <p>
                A weboldal statikus, nincs mögötte saját szerver. Emiatt néhány
                szolgáltató technikailag hozzáfér az adatokhoz. Ezeket
                megnevezzük:
              </p>
              <ul className="mt-2 space-y-4">
                {legal.processors.map((proc) => (
                  <li
                    key={proc.name}
                    className="rounded-card bg-white p-5 ring-1 ring-ink-200"
                  >
                    <p className="font-bold text-ink-900">{proc.name}</p>
                    <p className="mt-1 text-[0.9375rem] text-ink-600">
                      {proc.role}
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">
                      {proc.note}
                    </p>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Milyen jogai vannak">
              <p>
                Bármikor kérheti, hogy megmondjuk, milyen adatát kezeljük; hogy
                javítsuk, ha pontatlan; hogy töröljük; hogy korlátozzuk a
                kezelését; vagy hogy adjuk ki Önnek géppel olvasható
                formában. A hozzájárulását bármikor visszavonhatja.
              </p>
              <p>
                Elég egy e-mail a{" "}
                <a
                  href={`mailto:${legal.provider.email}`}
                  className="font-medium text-brand-700 underline-offset-4 hover:underline"
                >
                  {legal.provider.email}
                </a>{" "}
                címre, vagy egy telefonhívás. Legkésőbb egy hónapon belül
                válaszolunk.
              </p>
            </Block>

            <Block title="Ha nem ért egyet velünk">
              <p>
                Panasszal a <strong>Nemzeti Adatvédelmi és
                Információszabadság Hatósághoz</strong> fordulhat (1055
                Budapest, Falk Miksa utca 9–11.; naih.hu) és bírósághoz is
                fordulhat.
              </p>
            </Block>

            <p className="mt-12 text-sm text-ink-500">
              Utolsó frissítés: {legal.lastUpdated}
            </p>

            <div className="mt-8">
              <CallButton size="lg" label="Kérdése van? Hívjon minket" />
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
    </>
  );
}
