import type { Metadata } from "next";
import Link from "next/link";

import { business } from "@/config/business";
import { Container, Section, CallButton, Button, Card } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero, CtaBand } from "@/components/sections";
import { FaqList } from "@/components/Faq";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, faqSchema, type Crumb } from "@/lib/schema";
import { PhoneIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Autókulcs másolás ára: árajánlat Budapesten",
  description:
    "Mitől függ az autókulcs másolás és az autónyitás ára? Konkrét árat telefonon adunk, még a kiszállás előtt. Hívjon minket!",
  alternates: { canonical: "/arak" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Árak", path: "/arak" },
];

/**
 * SZERKESZTŐI MEGJEGYZÉS
 *
 * A korábbi weboldalon (autokulcsmasolo.com/arak) EGYETLEN ár sem szerepelt,
 * és sokáig itt sem volt egy sem — kitalált árat nem írunk ki.
 *
 * 2026-09-08-tól viszont vannak VALÓS árak: a tulajdonos (Juhász Marcell)
 * adta meg őket, négy munkatípusra bontva. Ezek a config/business.ts →
 * pricing.tiers alatt élnek, hogy egy helyen legyenek karbantarthatók.
 *
 * A lap ezért most kettőt csinál: kiírja a konkrét ársávokat, ÉS elmagyarázza,
 * mitől függ a végleges összeg. A kettő együtt kell — az ársáv önmagában
 * félrevezető lenne, a magyarázat önmagában pedig kitérő válasz.
 */

const priceFactors = [
  {
    title: "Az autó márkája és típusa",
    text: "Ugyanaz a művelet márkánként eltérő eljárást és eltérő eszközt igényel. Egy régebbi, egyszerű rendszerű autó és egy újabb, erősen védett modell között jelentős a különbség.",
  },
  {
    title: "Az évjárat",
    text: "A gyártási év határozza meg, milyen indításgátló és milyen kulcsrendszer van a járműben. Ez az egyik legfontosabb adat, amit telefonon kérdezünk.",
  },
  {
    title: "A kulcs típusa",
    text: "Egyszerű mechanikus kulcs, chipes (transzponderes) kulcs, távirányítós vagy kihajtható kulcs, az alkatrész és a munka is más.",
  },
  {
    title: "Van-e még működő kulcs",
    text: "Ez a legnagyobb tétel. Meglévő kulcsról másolni lényegesen gyorsabb és olcsóbb, mint nulláról kulcsot készíteni egy olyan autóhoz, amihez egyetlen kulcs sem maradt.",
  },
  {
    title: "Szükséges-e programozás",
    text: "Ha a chipet is tanítani kell az indításgátlóhoz, vagy a távirányítót kell beállítani, az külön munkafolyamat.",
  },
  {
    title: "A helyzet sürgőssége és a helyszín",
    text: "A kiszállás helye és időpontja szintén beleszámít. Ezt előre, a telefonban tisztázzuk.",
  },
];

const priceFaqs = [
  {
    q: "Mennyitől indulnak az árak?",
    a:
      "25 000 Ft-tól. Ez a legkisebb reális munka kiindulóára, tájékoztató jelleggel. A végleges " +
      "összeg az autó márkájától, típusától, évjáratától és a kulcs fajtájától függ.",
  },
  {
    q: "Miért nincs részletesebb árlista?",
    a:
      "Mert félrevezető lenne. Ugyanaz a munka két különböző autón többszörös eltérést mutathat a " +
      "kulcs típusa, az évjárat és a szükséges programozás miatt. Ezért a kiindulóárat kiírjuk, a " +
      "pontosat pedig telefonon, WhatsAppon vagy Viberen mondjuk meg, a kiszállás előtt.",
  },
  {
    q: "Mikor tudom meg a pontos árat?",
    a:
      "A telefonhívás során. Ha megmondja az autó márkáját, típusát, évjáratát és azt, hogy van-e " +
      "még működő kulcsa, abból már konkrét árat tudunk mondani, mielőtt elindulnánk.",
  },
  {
    q: "Változhat az ár a helyszínen?",
    a:
      "A telefonban megbeszélt feltételekhez tartjuk magunkat. Ha a helyszínen kiderül, hogy a " +
      "jármű állapota más (például a zár már korábban megsérült), azt a munka megkezdése előtt " +
      "jelezzük és közösen döntünk a folytatásról.",
  },
  {
    q: "Hogyan tudok a legolcsóbban pótkulcshoz jutni?",
    a:
      "Úgy, hogy nem várja meg, amíg az utolsó kulcs is elvész. Amíg van egy működő kulcsa, a " +
      "másolás egyszerű és gyors. Elveszett kulcs esetén előbb ki kell nyitni az autót és ki kell " +
      "olvasni a zár paramétereit, ez több munka és magasabb költség.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <PageHero
        eyebrow="Árak"
        title="Áraink 25 000 Ft-tól indulnak"
        lead="Ez tájékoztató kiindulóár. A végleges összeg az autó márkájától, évjáratától és a kulcs típusától függ, ezért a pontos árat telefonon, WhatsAppon vagy Viberen mondjuk meg, még a kiszállás előtt."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton size="lg" label="Pontos árat kérek" />
          <Button href="#ajanlatkeres" variant="secondary" size="lg">
            Villám ajánlatot kérek
          </Button>
        </div>

        {/* Kiindulóár, nagy, egyértelmű, a magyarázatával együtt. */}
        <div className="mt-8 inline-flex flex-col gap-2 rounded-feature bg-white p-6 shadow-card ring-1 ring-ink-200 sm:flex-row sm:items-center sm:gap-6">
          <span className="flex items-baseline gap-2">
            <span className="text-[2.5rem] font-extrabold leading-none tracking-tight text-ink-900">
              {business.pricing.fromDisplay}
            </span>
            <span className="text-lg font-bold text-accent-700">-tól</span>
          </span>
          <span className="max-w-sm text-[0.9375rem] leading-relaxed text-ink-600 sm:border-l sm:border-ink-200 sm:pl-6">
            Tájékoztató kiindulóár. A pontos összeget telefonon, WhatsAppon vagy
            Viberen egyeztetjük.
          </span>
        </div>
      </PageHero>

      {/* ---- Konkrét ársávok ----
          A tulajdonos által megadott VALÓS árak. Ez a lap legfontosabb
          blokkja: a látogató ezért jött. */}
      <Section tone="white" labelledBy="arsavok-cim">
        <Container>
          <h2 id="arsavok-cim" className="text-h2">
            Mennyibe kerül egy autókulcs?
          </h2>
          <p className="text-lead mt-4 max-w-2xl text-ink-600">
            Négyféle munka fedi le az esetek nagy részét. Keresse meg, melyik
            illik az Ön autójára.
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {business.pricing.tiers.map((tier) => (
              <li
                key={tier.name}
                className={`relative flex flex-col rounded-feature bg-white p-6 shadow-card ring-1 sm:p-7 ${
                  tier.recommended ? "ring-2 ring-brand-600" : "ring-ink-200"
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-[0.75rem] font-bold text-white">
                    A leggyakoribb választás
                  </span>
                )}

                <h3 className="text-[1.125rem] font-bold text-ink-900">
                  {tier.name}
                </h3>

                {/*
                  A `whitespace-nowrap` mindkét részen kell: enélkül az
                  ártartomány mellett a „-tól" kettétört és külön sorba
                  került a kötőjel meg a „tól".
                  A tartományos ár kisebb alapmérettel indul, hogy
                  keskeny telefonon is egy sorban maradjon.
                */}
                <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                  <span
                    className={`whitespace-nowrap font-extrabold leading-none tracking-tight text-ink-900 ${
                      tier.to ? "text-[1.5rem] sm:text-[1.75rem]" : "text-[2rem]"
                    }`}
                  >
                    {tier.to
                      ? `${tier.amount.toLocaleString("hu-HU")}–${tier.to.toLocaleString("hu-HU")}`
                      : tier.amount.toLocaleString("hu-HU")}{" "}
                    Ft
                  </span>
                  {tier.from && (
                    <span className="whitespace-nowrap text-base font-bold text-accent-700">
                      -tól
                    </span>
                  )}
                </p>

                <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                  {tier.text}
                </p>
              </li>
            ))}
          </ul>

          {/*
            A tulajdonos kifejezett kérése, hogy ez piros betűvel, kiemelten
            jelenjen meg. A vörös a márkapalettán kívül esik, szándékosan,
            mert itt épp az a cél, hogy elüssön a többi tartalomtól.
          */}
          {/*
            Két út, egymás mellett. A telephelyi az alapértelmezett, mert
            olcsóbb az ügyfélnek és hatékonyabb a vállalkozásnak; a
            kiszállás a kivétel, felárral. Ezt a tulajdonos pontosította.
          */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-feature bg-brand-50 p-6 ring-2 ring-brand-600 sm:p-7">
              <span className="inline-flex rounded-full bg-brand-600 px-3 py-1 text-[0.75rem] font-bold text-white">
                Ez a jobb választás
              </span>
              <h3 className="mt-4 text-[1.125rem] font-bold text-ink-900">
                Elhozza hozzánk az autót
              </h3>
              <p className="mt-2 text-[1.75rem] font-extrabold leading-none text-ink-900">
                A fenti árak
              </p>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-700">
                {[
                  `Általában ${business.pricing.onSite.workshopDuration} alatt elkészül és már mehet is tovább`,
                  business.pricing.onSite.parking,
                  business.pricing.onSite.appointment,
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-feature bg-white p-6 ring-1 ring-ink-200 sm:p-7">
              <span className="inline-flex rounded-full bg-ink-100 px-3 py-1 text-[0.75rem] font-bold text-ink-700">
                Ha nem tud jönni
              </span>
              <h3 className="mt-4 text-[1.125rem] font-bold text-ink-900">
                Kimegyünk Önhöz
              </h3>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-[1.75rem] font-extrabold leading-none text-ink-900">
                  + {business.pricing.onSite.feeDisplay}
                </span>
                <span className="text-[0.9375rem] font-semibold text-accent-700">
                  kiszállás
                </span>
              </p>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-700">
                {[
                  "A fenti árakra jön rá, a munka díján felül",
                  "Ha az összes autókulcs elveszett, mindig kimegyünk, mert az autó nem tud eljönni",
                  "Budapest és a vonzáskörzete",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ink-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p
            role="note"
            className="mt-6 rounded-feature border-2 border-danger bg-danger-50 p-5 text-[0.9375rem] font-semibold leading-relaxed text-danger sm:p-6 sm:text-base"
          >
            {business.pricing.disclaimer}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton size="lg" label="Pontos árat kérek" />
            <Button href="#ajanlatkeres" variant="secondary" size="lg">
              Villám ajánlatot kérek
            </Button>
          </div>
        </Container>
      </Section>

      {/* ---- Mit kérdezünk telefonon ---- */}
      <Section tone="light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Négy adat és már mondjuk is az árat
              </h2>
              <p className="mt-4 leading-relaxed text-ink-600">
                Amikor felhív, ezt a négy dolgot kérdezzük meg. Ha ezeket előre
                előkészíti, a hívás egy percig sem tart és rögtön tudja, mire
                számíthat.
              </p>

              <ol className="mt-7 space-y-4">
                {[
                  "Az autó márkája és típusa (pl. Volkswagen Golf)",
                  "Az évjárat (pl. 2014)",
                  "Van-e még működő kulcsa",
                  "Mi történt és hol van most az autó",
                ].map((item, index) => (
                  <li key={item} className="flex gap-4">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-bold text-white"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <span className="pt-1 font-medium text-ink-700">{item}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 rounded-card bg-accent-50 p-6 ring-1 ring-accent-100">
                <p className="flex items-start gap-3">
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" />
                  <span className="leading-relaxed text-ink-700">
                    <strong className="font-semibold text-ink-900">
                      Az árat előre megmondjuk.
                    </strong>{" "}
                    Telefonon, WhatsAppon vagy Viberen, nem indulunk el úgy,
                    hogy Ön ne tudná, mennyibe fog kerülni.
                  </span>
                </p>
                <CallButton size="lg" label="Pontos árat kérek" className="mt-5 w-full sm:w-auto" />
              </div>
            </div>

            {/* ---- Ártényezők ---- */}
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Mitől függ az ár?
              </h2>
              <p className="mt-4 leading-relaxed text-ink-600">
                Az autókulcs nem egységes termék. Ez a hat tényező határozza meg,
                mennyi munka van vele:
              </p>

              <ul className="mt-6 space-y-4">
                {priceFactors.map((factor) => (
                  <li
                    key={factor.title}
                    className="rounded-card bg-white p-5 shadow-card ring-1 ring-ink-200/70"
                  >
                    <h3 className="flex items-start gap-2.5 font-bold text-ink-900">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                      {factor.title}
                    </h3>
                    <p className="mt-1.5 pl-6.5 leading-relaxed text-ink-600">
                      {factor.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Tipp: a legolcsóbb megoldás ---- */}
      <Section tone="white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              A legolcsóbb autókulcs az, amit még időben csináltat meg
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-600">
              Ha most egyetlen kulcsa van, érdemes mellé egy tartalékot
              készíttetni. Amíg van működő kulcs, a másolás egyszerű művelet. Ha
              viszont az az egy is elvész, előbb ki kell nyitni az autót, ki kell
              olvasni a zár paramétereit és nulláról kell felépíteni az autókulcsot,
              ez lényegesen több munka és magasabb költség.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <CallButton size="lg" label="Pontos árat kérek" />
              <Button
                href="/szolgaltatasok/autokulcs-masolas"
                variant="secondary"
                size="lg"
              >
                Autókulcs másolás részletei
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Ajánlatkérés ---- */}
      <Section tone="white" id="ajanlatkeres">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Kérjen árajánlatot
              </h2>
              <p className="mt-4 leading-relaxed text-ink-600">
                Ha nem sürgős és inkább írásban egyeztetne, töltse ki az űrlapot.
                Írja meg az autó adatait és visszahívjuk.
              </p>
              <p className="mt-4 leading-relaxed text-ink-600">
                Ha viszont elhagyta vagy elvesztette az autókulcsát,{" "}
                <strong className="font-semibold text-ink-900">
                  kérjük, inkább telefonáljon
                </strong>
                , az űrlapra nem tudunk azonnal válaszolni.
              </p>

              <Card className="mt-7">
                <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                  Telefonos elérhetőség
                </p>
                <a
                  href={business.phone.primary.href}
                  className="mt-2 block text-2xl font-bold text-ink-900 transition-colors hover:text-accent-700"
                >
                  {business.phone.primary.display}
                </a>

                <p className="mt-3 text-sm text-ink-500">
                  {business.hours.display}
                </p>
              </Card>
            </div>

            <ContactForm />
          </div>
        </Container>
      </Section>

      {/* ---- GYIK ---- */}
      <Section tone="light" labelledBy="arak-gyik">
        <Container>
          <h2 id="arak-gyik" className="text-2xl font-bold sm:text-3xl">
            Kérdések az árakról
          </h2>
          <div className="mt-7 max-w-3xl">
            <FaqList faqs={priceFaqs} />
          </div>
          <p className="mt-6 text-ink-600">
            További kérdések:{" "}
            <Link
              href="/gyik"
              className="font-semibold text-brand-700 underline-offset-4 hover:underline"
            >
              gyakori kérdések oldal
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd
        data={jsonLdGraph(breadcrumbSchema(crumbs), faqSchema(priceFaqs))}
      />
    </>
  );
}
