import type { Metadata } from "next";

import { business } from "@/config/business";
import { Container, Section, CallButton, Button, CheckList } from "@/components/ui";
import { AssetImage } from "@/components/AssetImage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero, CtaBand, WhyUs, ServiceLinkList } from "@/components/sections";
import { RatingSummary } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, type Crumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Rólunk: autónyitó és kulcsmásoló csapat Budapesten",
  description:
    "Sérülésmentes autónyitás, helyszíni kulcskészítés és modern diagnosztika Budapesten és környékén, a nap 24 órájában.",
  alternates: { canonical: "/rolunk" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Rólunk", path: "/rolunk" },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <PageHero
        eyebrow="Rólunk"
        title="Autónyitás és kulcskészítés ott, ahol az autó áll"
        lead="Telephelyünk Budapest XI. kerületében (Újbuda) van. A legtöbb munkát itt végezzük: hozza el az autót és általában 20–25 perc alatt elkészül az új autókulcs. Ha az összes kulcsa elveszett, vagy egyszerűen nem tud jönni, kimegyünk Önhöz Budapestre és annak vonzáskörzetébe."
      >
        <CallButton size="lg" label="Beszéljünk a részletekről" />
      </PageHero>

      {/*
        A szervizautó, VALÓDI fotó a cég saját járművéről.
        Ez a legerősebb bizalmi elem az oldalon: a látogató pontosan azt
        látja, ami ki fog állni a háza elé. Ezért kap teljes szélességet,
        rögtön a fejléc alatt, még a szöveg előtt.
      */}
      <Section tone="white" size="compact">
        <Container wide>
          <figure>
            <AssetImage
              src="/images/furgon.jpg"
              alt="Az Autókulcs Doki feliratos szervizautója a Duna-parton, háttérben a Budai Várral és a Lánchíddal"
              ratio="3/2"
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
              wrapperClassName="rounded-feature shadow-media"
            />
            <figcaption className="mt-4 text-center text-[0.9375rem] text-ink-600">
              Ez a szervizautónk. A kulcsmarógép, a diagnosztika és az
              alkatrészkészlet ebben utazik, ezért tudunk a helyszínen
              befejezni egy munkát.
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* ---- Bemutatkozás ---- */}
      <Section tone="light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Mit csinálunk és hogyan
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-ink-600">
                <p>
                  Két dolgot csinálunk és azokat próbáljuk jól: kinyitjuk az
                  autókat, amikbe nem lehet bejutni és kulcsot készítünk
                  azoknak, akiknek nincs. Ez a két feladat gyakran összeér,
                  elveszett kulcs esetén a nyitás csak az első lépés.
                </p>
                <p>
                  A legmodernebb eszközökkel dolgozunk, ami lehetővé teszi, hogy
                  minden típusú autót sérülésmentesen, a lehető legrövidebb időn
                  belül kinyissunk és minden gyakori típushoz kulcsot másoljunk
                  vagy készítsünk.
                </p>
                <p>
                  A legtöbb munkát a telephelyünkön végezzük, mert ott minden
                  eszköz kéznél van és így Önnek is olcsóbb. Ha az összes
                  autókulcs elveszett, a kocsi nem tud eljönni, olyankor
                  természetesen kimegyünk.
                  Nem várjuk el, hogy egy nem induló autót elvontasson hozzánk,
                  a kulcsmásoló gép és az OBD-diagnosztika velünk együtt érkezik
                  a helyszínre.
                </p>
                <p>
                  Az ügyfeleink általában nem jókedvükben hívnak minket. Vagy áll
                  az autó mellett esőben, vagy siet valahová, vagy épp
                  megérkezett a parkolóba és nincs meg a kulcs. Ezért próbálunk
                  gyorsan és kertelés nélkül működni: a telefonban megmondjuk,
                  mennyi idő és mennyi pénz és azt is, ha valamit nem tudunk
                  vállalni.
                </p>
              </div>

              <div className="mt-8">
                <CallButton size="lg" label="Beszéljünk a részletekről" />
              </div>
            </div>

            <div className="space-y-5">
              {/*
                A szervizautó hátulról, nyitott ajtókkal. Ez a fotó
                bizonyítja a mellette lévő szöveget: a kulcsmarógép, a
                szerszámszekrény és a diagnosztika tényleg a kocsiban van,
                nem egy műhelyben, ahová be kellene vontatni az autót.
              */}
              <figure>
                <AssetImage
                  src="/images/furgon-belso.jpg"
                  alt="A szervizautó hátulja nyitott ajtókkal: munkapad, kulcsmarógép, szerszámszekrény és diagnosztikai eszközök a raktérben"
                  ratio="3/2"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  wrapperClassName="rounded-card ring-1 ring-ink-200"
                />
                <figcaption className="mt-3 text-[0.875rem] leading-relaxed text-ink-600">
                  A mobil műhely belülről, ez érkezik ki Önhöz.
                </figcaption>
              </figure>

              <div className="rounded-card bg-ink-50 p-6 ring-1 ring-ink-200">
                <h3 className="text-lg font-bold">Amivel foglalkozunk</h3>
                <CheckList
                  className="mt-4"
                  items={[
                    "Minden típusú autó sérülésmentes nyitása",
                    "Teherautó és kisteherautó nyitása",
                    "Autókulcs készítés Budapesten és környékén",
                    "Elhagyott autókulcs pótlása",
                    "Immobilizer programozás",
                    "Autókulcs távirányító tanítás",
                    "Kulcsház elemcsere",
                    "Pótkulcs készítés és kulcsmásolás",
                  ]}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <WhyUs />

      {/* ---- Értékelés ---- */}
      <Section tone="white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Amit az ügyfeleink mondanak
            </h2>
            <p className="mt-4 leading-relaxed text-ink-600">
              Az értékeléseink a Google Cégprofilunkban nyilvánosak, bárki
              megnézheti, ki és mikor írta őket.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl">
            <RatingSummary />
          </div>
        </Container>
      </Section>

      {/* ---- Szolgáltatás-linkek ---- */}
      <Section tone="light">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold">Szolgáltatásaink</h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              Nézze meg részletesen, mit vállalunk és hogyan dolgozunk:
            </p>
            <div className="mt-6">
              <ServiceLinkList />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" label="Beszéljünk a részletekről" />
              <Button href="/kapcsolat" variant="secondary" size="lg">
                Kapcsolat és elérhetőség
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
    </>
  );
}
