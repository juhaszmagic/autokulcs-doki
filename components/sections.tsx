/**
 * ============================================================================
 *  OLDALSZEKCIÓK
 * ============================================================================
 *  Mind szerver komponens — nulla kliensoldali JavaScript.
 *
 *  Vizuális elv: a FOTÓ a vezérelem, a szöveg köré tervezve. A lap
 *  ritmusát a szekciók háttere adja (világos → fehér → grafit → zöld),
 *  hogy ne egyetlen végtelen fehér szalag legyen.
 * ============================================================================
 */

import Link from "next/link";
import { business, formattedRating } from "@/config/business";
import { services } from "@/config/services";
import {
  images,
  galleryItems,
  recentWork,
  realWork,
  workDateLabel,
  socialVideos,
  socialProfiles,
  videos,
  type GalleryItem,
} from "@/config/media";
import { latestArticles, categoryLabel, formatDate } from "@/config/content";
import {
  Container,
  Section,
  SectionHeading,
  Button,
  CallButton,
  CheckList,
  TextLink,
  Tag,
} from "./ui";
import { ServiceCard } from "./ServiceCard";
import { AssetImage } from "./AssetImage";
import { GoogleLogo, Stars } from "./Reviews";
import {
  StarIcon,
  ClockIcon,
  ShieldIcon,
  ToolsIcon,
  MapPinIcon,
  PhoneIcon,
  CarIcon,
  CheckIcon,
  ArrowRightIcon,
  PlayIcon,
  TikTokIcon,
  FacebookIcon,
  SearchIcon,
  ChipIcon,
  WhatsAppIcon,
  ViberIcon,
} from "./Icons";

/* ==================================================================
   HERO
   ------------------------------------------------------------------
   Aszimmetrikus: balra a szöveg, jobbra egy nagy fotó, amit egy zöld
   forma és egy lebegő értékelés-kártya rétegez. A fotó a hero
   felületének nagyjából felét adja.
   ================================================================== */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-50">
      {/* Halvány zöld forma a háttérben, mélység, gradiens-túlzás nélkül. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 hidden h-[34rem] w-[34rem] rounded-full bg-brand-100/60 blur-3xl lg:block"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          {/* ---------------- Szöveg ---------------- */}
          <div className="animate-fade-up">
            <p className="eyebrow mb-5 flex items-center gap-2.5 text-accent-700">
              <span aria-hidden className="h-px w-8 bg-accent-600/50" />
              {business.name}
            </p>

            <h1 className="text-display">
              <span className="text-brand-600">Elhagyta</span> autókulcsát?
              Pótoljuk Budapesten és környékén
            </h1>

            <p className="text-lead mt-6 max-w-xl text-ink-600">
              Elvesztette a kulcsot és pótkulcsa sincs? Akkor jó helyen jár.
              Hozza el az autót a XI. kerületi telephelyünkre és általában{" "}
              <strong className="font-semibold text-ink-800">
                20–25 perc alatt
              </strong>{" "}
              elkészítjük az új autókulcsot professzionális eszközeinkkel. Ha
              egyetlen kulcs sem maradt, kimegyünk Önhöz Budapestre és annak
              vonzáskörzetébe, a nap 24 órájában.
            </p>

            {/* ---- CTA-k ---- */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CallButton size="xl" label="Mondja el, mi történt" />
              <Button href="#szolgaltatasok" variant="secondary" size="xl">
                Szolgáltatásaink
              </Button>
            </div>

            {/* ---- Kulcsállítások ---- */}
            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {[
                { icon: CarIcon, text: "Hozza el: 20–25 perc alatt kész" },
                { icon: SearchIcon, text: "Új kulcs meglévő kulcs nélkül" },
                { icon: ChipIcon, text: "Immobilizer programozás" },
                { icon: ClockIcon, text: "Non-stop, 0–24" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm ring-1 ring-ink-200"
                    aria-hidden
                  >
                    <item.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-[0.9375rem] font-medium text-ink-700">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            {/*
              Telephely. A fejléc grafit sávja csak nagy képernyőn látszik,
              ezért a kerület ITT is megjelenik, minden eszközön, nagy
              betűvel. A látogatók kerületben gondolkodnak és ez az első
              válasz a „hol vannak?” kérdésre.
            */}
            <a
              href="/kapcsolat"
              className="mt-8 flex items-center gap-4 rounded-feature bg-white p-4 shadow-card ring-1 ring-ink-200 transition-shadow hover:shadow-card-hover sm:inline-flex sm:pr-7"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white"
                aria-hidden
              >
                <MapPinIcon className="h-7 w-7" />
              </span>
              <span className="min-w-0">
                <span className="block text-[1.375rem] font-extrabold leading-tight text-ink-900 sm:text-[1.5rem]">
                  {business.address.district}
                  <span className="text-brand-600"> · {business.address.districtName}</span>
                </span>
                <span className="mt-0.5 block text-[0.9375rem] leading-snug text-ink-600">
                  Innen indulunk Budapestre és annak vonzáskörzetébe
                </span>
              </span>
            </a>
          </div>

          {/* ---------------- Fotó ---------------- */}
          <div className="relative">
            {/* Zöld hátlap, a fotó mögül kilóg, rétegzettséget ad. */}
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-feature bg-brand-600 sm:block lg:-bottom-5 lg:-right-5"
            />

            <div className="relative overflow-hidden rounded-feature shadow-media">
              <AssetImage
                src={images.hero.src}
                alt={images.hero.alt}
                ratio="4/3"
                sizes="(max-width: 1024px) 100vw, 46vw"
                priority
                tone="dark"
              />
            </div>

            {/* Lebegő értékelés-kártya, a Google-jelenlét azonnal látszik. */}
            <div className="relative z-10 mx-auto -mt-8 w-[min(21rem,90%)] rounded-card bg-white p-5 shadow-card-hover ring-1 ring-ink-200 sm:absolute sm:-bottom-8 sm:-left-6 sm:mx-0 sm:mt-0 lg:-left-10">
              <div className="flex items-center gap-3.5">
                <GoogleLogo className="h-7" withWordmark={false} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold leading-none text-ink-900">
                      {formattedRating()}
                    </span>
                    <Stars rating={business.google.rating} className="h-4 w-4" />
                  </div>
                  <p className="mt-1 text-[0.8125rem] text-ink-600">
                    Google értékelés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ==================================================================
   BIZALMI SÁV, grafit alapon, a Google-értékelés kiemelve
   ================================================================== */

export function TrustStrip() {
  const items = [
    { icon: ClockIcon, value: "0–24", label: "Non-stop elérhetőség" },
    { icon: CarIcon, value: "20–30 perc", label: "Budapesten belül" },
    { icon: ToolsIcon, value: "Helyszínen", label: "Ahol megoldható" },
    { icon: SearchIcon, value: "Kulcs nélkül is", label: "Új kulcs nulláról" },
  ];

  return (
    <section aria-label="Miért bízhat bennünk" className="bg-ink-900 on-dark">
      <Container>
        <div className="grid gap-8 py-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12 lg:py-8">
          {/* ---- Google értékelés: vizuálisan a legerősebb elem ---- */}
          <a
            href={business.google.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.10] lg:pr-8"
          >
            <span className="flex items-baseline gap-1.5">
              <span className="text-5xl font-extrabold leading-none tracking-tight text-white">
                {formattedRating()}
              </span>
              <StarIcon className="h-6 w-6 shrink-0 text-star" />
            </span>
            <span className="border-l border-white/15 pl-5">
              <GoogleLogo className="h-5" tone="dark" />
              <span className="mt-1.5 block text-[0.8125rem] text-ink-400">
                Google értékelés
              </span>
            </span>
          </a>

          {/* ---- További bizalmi pontok ---- */}
          <ul className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4 lg:border-l lg:border-white/10 lg:pl-12">
            {items.map((item) => (
              <li key={item.label} className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/25 text-brand-300"
                  aria-hidden
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold leading-tight text-white">
                    {item.value}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-400">
                    {item.label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}


/* ==================================================================
   KIEMELT KÉRDÉS, az elveszett AUTÓkulcs
   ------------------------------------------------------------------
   Ez a vállalkozás legértékesebb munkája, ezért kap külön, hangsúlyos
   sávot közvetlenül a hero alatt. A látogató itt ismeri fel a saját
   helyzetét és innen egy kattintás a hívás, a WhatsApp vagy a Viber.
   ================================================================== */

export function LostKeyBanner() {
  return (
    <section
      className="bg-accent-600 on-dark"
      aria-labelledby="elhagyott-kulcs-cim"
    >
      <Container>
        <div className="grid items-center gap-8 py-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:py-12">
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2.5 text-white">
              <span aria-hidden className="h-px w-8 bg-white/50" />
              Ebben tudunk a legtöbbet segíteni
            </p>

            <h2
              id="elhagyott-kulcs-cim"
              className="text-h2 !text-white"
            >
              Elvesztette az autókulcsát? Nincs meg a pótkulcs sem?
            </h2>

            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white">
              Ez nem zsákutca. Meglévő kulcs nélkül is tudunk újat készíteni:
              kiolvassuk az autó zárjának adatait, kimarjuk az új autókulcsot és
              beprogramozzuk az indításgátlóhoz. Kimegyünk Budapest egész
              területére és a vonzáskörzetbe, az autót nem kell elvontatni.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.9375rem] font-medium text-white">
              {[
                "Meglévő kulcs nélkül is",
                "A helyszínen",
                "Budapest és vonzáskörzete",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Cselekvés: hívás + üzenetküldők ---- */}
          <div className="rounded-feature bg-ink-950/25 p-6 ring-1 ring-white/20 sm:p-7">
            <p className="text-sm font-semibold text-white">
              Mondja meg az autó típusát és évjáratát:
            </p>

            <a
              href={business.phone.primary.href}
              className="mt-3 block text-[1.75rem] font-extrabold leading-none text-white transition-opacity hover:opacity-90 sm:text-[2rem]"
              data-cta="call-lostkey"
            >
              {business.phone.primary.display}
            </a>

            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={business.phone.primary.href}
                className="flex items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3.5 font-bold text-accent-800 transition-colors hover:bg-white/90"
              >
                <PhoneIcon className="h-5 w-5" />
                Hívás most
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={business.messaging.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/12 px-4 py-3 text-[0.9375rem] font-semibold text-white ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/20"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </a>
                <a
                  href={business.messaging.viber.url}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/12 px-4 py-3 text-[0.9375rem] font-semibold text-white ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/20"
                >
                  <ViberIcon className="h-5 w-5" />
                  Viber
                </a>
              </div>
            </div>

            <p className="mt-4 border-t border-white/25 pt-4 text-center text-[0.8125rem] leading-relaxed text-white">
              <strong className="font-bold text-white">
                {business.pricing.fromLabel}
              </strong> – tájékoztató kiindulóár. A pontosat telefonon, WhatsAppon vagy
              Viberen mondjuk meg, még a kiszállás előtt.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ==================================================================
   SZOLGÁLTATÁSOK, nagy fotós kártyák
   ================================================================== */

export function ServicesShowcase({
  heading = "Szolgáltatásaink",
  lead = "Bármi történt a kulccsal, a megoldás nálunk egy helyen van, a nyitástól a kész, működő kulcsig.",
  tone = "white",
  exclude,
  compact = false,
}: {
  heading?: string;
  lead?: string;
  tone?: "white" | "light";
  exclude?: string;
  /** Kezdőoldalon: fotó nélküli, tömör kártyák. */
  compact?: boolean;
}) {
  const list = exclude ? services.filter((s) => s.slug !== exclude) : services;

  return (
    <Section tone={tone} id="szolgaltatasok" labelledBy="szolgaltatasok-cim">
      <Container wide>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Amiben segítünk"
            title={heading}
            lead={lead}
            align="left"
            id="szolgaltatasok-cim"
          />
          <div className="shrink-0">
            <CallButton size="lg" label="Kérjen árajánlatot telefonon" />
          </div>
        </div>

        {/*
          Minden kártya AZONOS méretű.
          Korábban az első kártya két oszlopot foglalt, amitől 6 kártya
          7 rácshelyet kért, így a harmadik sorban egyetlen árva kártya
          maradt. Egyenlő méretnél a 6 kártya pontosan kitölt két sort.
        */}
        <ul
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${
            compact ? "mt-8" : "mt-12 gap-5"
          }`}
        >
          {list.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              /*
                Az első (elveszett autókulcs) két oszlopot foglal: ez az
                üzletileg legértékesebb munka és így 5 kártya pontosan
                kitölt két sort (2+1 / 1+1+1), nem marad árva kártya.
              */
              featured={!compact && index === 0 && list.length === 5}
              compact={compact}
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ==================================================================
   SZAKÉRTELEM, osztott elrendezés, nagy fotóval
   ================================================================== */

export function ExpertiseSection() {
  return (
    <Section tone="light" labelledBy="szakertelem-cim">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---- Fotó ---- */}
          <div className="relative order-2 lg:order-1">
            <div
              aria-hidden
              className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-feature bg-ink-900 sm:block"
            />
            <div className="relative overflow-hidden rounded-feature shadow-media">
              <AssetImage
                src={images.expertise.src}
                alt={images.expertise.alt}
                ratio="4/5"
                sizes="(max-width: 1024px) 100vw, 46vw"
                tone="green"
              />
            </div>

            {/* Kis narancs statisztika-kártya a fotón */}
            <div className="absolute -right-3 bottom-8 hidden rounded-card bg-accent-600 px-6 py-5 text-white shadow-card-hover sm:block lg:-right-6">
              <p className="text-3xl font-extrabold leading-none">0–24</p>
              <p className="mt-1.5 text-[0.8125rem] font-medium opacity-95">
                minden nap
              </p>
            </div>
          </div>

          {/* ---- Szöveg ---- */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Rólunk"
              title="Autókulcs-szakértelem, amire számíthat"
              align="left"
              id="szakertelem-cim"
              lead="Két dolgot csinálunk és azokat próbáljuk jól: kinyitjuk az autókat, amikbe nem lehet bejutni és kulcsot készítünk azoknak, akiknek nincs."
            />

            <p className="mt-5 leading-relaxed text-ink-600">
              A kiszállás nálunk nem mellékes szolgáltatás, hanem az alap. Nem
              várjuk el, hogy egy nem induló autót elvontasson hozzánk, a
              kulcsmásoló gép és az OBD-diagnosztika velünk együtt érkezik a
              helyszínre.
            </p>

            <CheckList
              className="mt-8"
              items={[
                "Helyszíni munkavégzés, ahol ez megoldható",
                "Modern diagnosztikai technológia és kulcsmásoló gép",
                "Gyors segítség, Budapesten belül általában 20–30 perc",
                "Budapest mind a 23 kerülete és az agglomeráció",
              ]}
            />

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" label="Beszéljünk a részletekről" />
              <Button href="/rolunk" variant="secondary" size="lg">
                Rólunk bővebben
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ==================================================================
   HOGYAN MŰKÖDIK, nagy sorszámok
   ================================================================== */

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Hívjon minket",
      text: "Mondja el az autó típusát, az évjáratot és a problémát. Ebből már a telefonban tudunk tájékoztatást és árat adni.",
    },
    {
      number: "02",
      title: "Egyeztetjük a helyszínt",
      text: "Megbeszéljük, hol van az autó és mikor tudunk ott lenni. Budapesten belül ez jellemzően 20–30 perc.",
    },
    {
      number: "03",
      title: "Megoldjuk a helyszínen",
      text: "Kinyitjuk az autót, elkészítjük vagy beprogramozzuk az autókulcsot és együtt kipróbáljuk, hogy minden működik.",
    },
  ];

  return (
    <Section tone="white" labelledBy="folyamat-cim" size="compact">
      <Container>
        <SectionHeading
          eyebrow="Így dolgozunk"
          title="Három lépés a megoldásig"
          align="left"
          id="folyamat-cim"
          lead="A végeredmény mindig ugyanaz: a kulcs nyit, indít és a gombok is működnek."
        />

        {/*
          A lépések egy sorban, tömören. A korábbi nagy sorszámok és a
          mellettük futó távirányító-animáció külön képernyőnyi helyet
          vittek el egy olyan blokkra, ami valójában három rövid mondat.
        */}
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex gap-4 rounded-card bg-ink-50 p-5 ring-1 ring-ink-200/70"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-[0.9375rem] font-bold text-white"
                aria-hidden
              >
                {step.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.0625rem] font-bold leading-snug text-ink-900">
                  <span className="sr-only">{step.number}. lépés: </span>
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex justify-center">
          <CallButton size="lg" label="Mondja el, mi történt" />
        </div>
      </Container>
    </Section>
  );
}

/* ==================================================================
   MUNKÁINK, szerkesztőségi fotórács
   ================================================================== */

/**
 * A fókuszpontot literál osztálynévre képezzük, nem a configból fűzzük
 * össze — a Tailwind csak a forrásban SZÓ SZERINT szereplő osztályokat
 * generálja le, egy változóból épített név nem kerülne a CSS-be.
 */
function focusClass(item: GalleryItem): string {
  if (item.focus === "bottom") return "object-bottom";
  if (item.focus === "lower") return "object-[50%_72%]";
  return "";
}

/**
 * A kép alá kerülő adatsor: márka · helyszín · dátum.
 * Csak a ténylegesen kitöltött mezőkből épül — üres mező nem hagy
 * maga után lógó elválasztójelet.
 */
function metaLine(item: GalleryItem): string | null {
  const parts = [item.brand, item.place, workDateLabel(item.date)].filter(
    (part): part is string => Boolean(part)
  );
  return parts.length > 0 ? parts.join(" · ") : null;
}

/* ==================================================================
   LEGUTÓBBI MUNKÁINK, bizonyíték közvetlenül a kiemelt kérdés alatt
   ------------------------------------------------------------------
   A látogató itt épp azt olvasta el, hogy elveszett kulcsot is tudunk
   pótolni. A természetes következő kérdés: „tényleg?”, erre ez a
   szekció a válasz, valódi fotókkal, felismerhető autómárkákkal és a
   felvételek valódi dátumával.
   ================================================================== */

export function RecentWork() {
  return (
    <Section tone="light" labelledBy="legutobbi-cim" size="compact">
      <Container wide>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Valódi munkák, valódi fotók"
            title="Legutóbbi munkáink"
            align="left"
            id="legutobbi-cim"
            lead="Nem stockfotók: ezek a saját képeink elvégzett munkákról. A dátum minden képnél a felvétel valódi ideje."
          />
          <a
            href={business.google.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-3 self-start rounded-2xl bg-white px-4 py-3 shadow-card ring-1 ring-ink-200 transition-shadow hover:shadow-card-hover sm:self-auto"
          >
            <GoogleLogo className="h-6" withWordmark={false} />
            <span>
              <span className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold leading-none text-ink-900">
                  {formattedRating()}
                </span>
                <Stars rating={business.google.rating} className="h-3.5 w-3.5" />
              </span>
              {business.google.reviewCount != null && (
                <span className="mt-1 block text-[0.75rem] text-ink-600">
                  {business.google.reviewCount} Google értékelés
                </span>
              )}
            </span>
          </a>
        </div>

        {/* Nyolc kártya = két teli sor, nem marad árva kép a sor végén. */}
        <ul className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {recentWork.map((item, index) => (
            <li
              key={item.src}
              className="group flex flex-col overflow-hidden rounded-media bg-white shadow-card ring-1 ring-ink-200/70"
            >
              <div className="media-zoom overflow-hidden">
                <AssetImage
                  src={item.src}
                  alt={item.alt}
                  ratio="4/3"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  tone={index % 2 === 0 ? "dark" : "green"}
                  className={focusClass(item)}
                  hideSlotLabel
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                {item.rating != null && (
                  <Stars rating={item.rating} className="h-3.5 w-3.5" />
                )}
                <p className="mt-1.5 text-[0.9375rem] font-bold leading-snug text-ink-900">
                  {item.caption}
                </p>
                {metaLine(item) && (
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-600">
                    {metaLine(item)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CallButton size="lg" label="Kérjen árajánlatot telefonon" />
          <TextLink href="/galeria">Összes munkánk</TextLink>
        </div>
      </Container>
    </Section>
  );
}

export function RealWorkGallery({
  heading = "Munkáink a gyakorlatban",
  showAllLink = true,
  items = galleryItems,
}: {
  heading?: string;
  showAllLink?: boolean;
  /** A galéria oldalon MINDEN valódi fotó, a kezdőoldalon csak egy rész. */
  items?: GalleryItem[];
}) {
  return (
    <Section tone="light" labelledBy="munkaink-cim" id="munkaink">
      <Container wide>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Valódi munkák, valódi képek"
            title={heading}
            align="left"
            id="munkaink-cim"
            lead="Elvégzett munkák saját fotóinkon. A dátum minden képnél a felvétel valódi ideje, a csillagok pedig a munkára kapott Google-értékelést mutatják. Kattintson bármelyik képre a nagyításhoz."
          />
          <div className="flex shrink-0 flex-col items-start gap-4 pb-1 sm:items-end">
            {/* Valódi Google-adat, nem díszítés. */}
            <a
              href={business.google.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card ring-1 ring-ink-200 transition-shadow hover:shadow-card-hover"
            >
              <GoogleLogo className="h-6" withWordmark={false} />
              <span>
                <span className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold leading-none text-ink-900">
                    {formattedRating()}
                  </span>
                  <Stars rating={business.google.rating} className="h-3.5 w-3.5" />
                </span>
                {business.google.reviewCount != null && (
                  <span className="mt-1 block text-[0.75rem] text-ink-600">
                    {business.google.reviewCount} Google értékelés
                  </span>
                )}
              </span>
            </a>
            {showAllLink && <TextLink href="/galeria">Teljes galéria</TextLink>}
          </div>
        </div>

        {/*
          Egységes 3 oszlopos rács: 9 kép = pontosan 3 teli sor, nincs
          árva kártya. A felirat a kép ALATT ül, fehér lábon, így a fotó
          végig látszik, a szöveg kontrasztja pedig mindig megfelelő
          (a képre írt szöveg a világos műhelyfényen olvashatatlan volt).
        */}
        <ul className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item, index) => {
            const id = `munka-${index}`;
            return (
              <li key={item.src} className="group relative">
                <a
                  href={`#${id}`}
                  className="flex h-full flex-col overflow-hidden rounded-media bg-white shadow-card ring-1 ring-ink-200/70 transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <span className="sr-only">{item.alt} – nagyítás</span>
                  <span className="media-zoom relative block overflow-hidden">
                    <AssetImage
                      src={item.src}
                      alt={item.alt}
                      ratio="4/3"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      tone={index % 2 === 0 ? "dark" : "green"}
                      className={focusClass(item)}
                      hideSlotLabel
                    />
                    <span
                      aria-hidden
                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/70 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors group-hover:bg-accent-600 group-hover:ring-accent-600"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
                      </svg>
                    </span>
                  </span>

                  <span className="flex flex-1 flex-col p-5">
                    {item.rating != null && (
                      <span className="mb-2 flex items-center gap-2">
                        <Stars rating={item.rating} className="h-4 w-4" />
                        <span className="text-[0.75rem] font-semibold text-ink-600">
                          Google értékelés
                        </span>
                      </span>
                    )}
                    {item.caption && (
                      <span className="block font-bold leading-snug text-ink-900">
                        {item.caption}
                      </span>
                    )}
                    {metaLine(item) && (
                      <span className="mt-1 block text-[0.875rem] leading-snug text-ink-600">
                        {metaLine(item)}
                      </span>
                    )}
                  </span>
                </a>

                {/* Nagyított nézet, CSS :target, nincs hozzá JavaScript. */}
                <div id={id} className="lightbox" role="dialog" aria-label={item.alt}>
                  <a href="#munkaink" className="lightbox-backdrop" aria-label="Bezárás" />
                  <figure className="relative z-10 w-full max-w-4xl">
                    <AssetImage
                      src={item.src}
                      alt={item.alt}
                      ratio="4/3"
                      sizes="90vw"
                      wrapperClassName="rounded-media"
                      tone="dark"
                    />
                    <figcaption className="mt-3 text-center text-sm text-white">
                      {item.alt}
                      {metaLine(item) && (
                        <span className="mt-1 block font-medium">
                          {metaLine(item)}
                        </span>
                      )}
                    </figcaption>
                  </figure>
                  <a
                    href="#munkaink"
                    className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition-colors hover:bg-white/20"
                    aria-label="Bezárás"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/* ==================================================================
   VIDEÓK + TIKTOK, sötét szekció
   ------------------------------------------------------------------
   Nincs harmadik fél beágyazott kódja: a kártyák borítóképek, amik a
   TikTokra visznek. Így az oldal 0 kB JavaScripttel marad és nem
   kerül külső követőkód a látogató böngészőjébe.
   ================================================================== */

export function VideoSection() {
  const hasVideos = videos.length > 0;
  const hasSocial = socialVideos.length > 0;

  return (
    <Section tone="dark" labelledBy="videok-cim" id="videok">
      <Container wide>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Videók"
            title="Nézze meg, hogyan dolgozunk"
            align="left"
            tone="dark"
            id="videok-cim"
            lead="Rövid videók valódi munkákról: nyitás, kulcskészítés, programozás."
          />
          <div className="flex shrink-0 flex-wrap gap-3 pb-1">
            <Button
              href={socialProfiles.tiktok.url}
              variant="onDark"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokIcon className="h-5 w-5" />
              {socialProfiles.tiktok.handle}
            </Button>
            {socialProfiles.facebook && (
              <Button
                href={socialProfiles.facebook.url}
                variant="onDark"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="h-5 w-5" />
                Facebook
              </Button>
            )}
          </div>
        </div>

        {/* ---- Kiemelt videó ---- */}
        {hasVideos && (
          <div className="mt-12 overflow-hidden rounded-feature bg-ink-850 shadow-media">
            <a
              href={videos[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="media-scrim group relative block"
              aria-label={`Videó megtekintése: ${videos[0].title}`}
            >
              <AssetImage
                src={videos[0].poster ?? ""}
                alt={`Előnézeti kép: ${videos[0].title}`}
                ratio="16/9"
                sizes="(max-width: 1024px) 100vw, 80vw"
                tone="dark"
                hideSlotLabel
              />
              <span
                className="absolute inset-0 z-10 flex items-center justify-center"
                aria-hidden
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <PlayIcon className="ml-1 h-8 w-8 text-white" />
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-0 z-10 p-7">
                <span className="block text-h3 !text-white">{videos[0].title}</span>
                {videos[0].description && (
                  <span className="mt-2 block max-w-2xl text-ink-300">
                    {videos[0].description}
                  </span>
                )}
              </span>
            </a>
          </div>
        )}

        {/* ---- TikTok videók ---- */}
        {hasSocial ? (
          <ul className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6">
            {/*
              Mobilon 3 oszlop (nem 2): a 9:16-os kártyák így feleakkora
              helyet foglalnak és a 6 videó két rövid sorba fér.
            */}
            {socialVideos.map((video) => (
              <li key={video.title} className="group">
                {/*
                  Ha nincs konkrét videólink, a kártya a PROFILRA visz.
                  Így soha nem ígérünk egy adott videót olyan borítóval,
                  ami nem annak a videónak a képkockája.
                */}
                <a
                  href={video.url ?? socialProfiles.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-scrim relative block overflow-hidden rounded-media shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <span className="media-zoom block">
                    <AssetImage
                      src={video.cover}
                      alt=""
                      ratio="9/16"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      tone="dark"
                      hideSlotLabel
                    />
                  </span>

                  {/* TikTok címke, egyértelmű, hol van a tartalom */}
                  {/*
                    A címke NEM aria-hidden: így a link akadálymentes neve
                    „TikTok <videócím>" lesz, pontosan az, ami látszik.
                    Külön aria-label elfedné a látható szöveget.
                  */}
                  <span className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1.5 rounded-full bg-accent-600 px-2.5 py-1 text-[0.6875rem] font-bold text-white">
                    <TikTokIcon className="h-3 w-3" aria-hidden />
                    TikTok
                  </span>

                  {/* Lejátszás jel */}
                  <span
                    className="absolute inset-0 z-10 flex items-center justify-center"
                    aria-hidden
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <PlayIcon className="ml-0.5 h-5 w-5 text-white" />
                    </span>
                  </span>

                  <span className="absolute inset-x-0 bottom-0 z-10 p-3">
                    <span className="line-clamp-2 text-[0.8125rem] font-semibold leading-snug text-white">
                      {video.title}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          /* ---- Nincs még felvéve videó: elegáns, őszinte blokk ---- */
          !hasVideos && (
            <div className="mt-12 overflow-hidden rounded-feature bg-ink-850 ring-1 ring-white/10">
              <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <Tag tone="onDark">
                    <TikTokIcon className="h-3.5 w-3.5" />
                    {socialProfiles.tiktok.handle}
                  </Tag>
                  <h3 className="mt-5 text-h3 !text-white">
                    Videóink a TikTokon
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink-400">
                    Valódi munkák, rövid videókban: hogyan nyílik ki egy autó
                    sérülésmentesen, hogyan készül új kulcs, mi történik a
                    programozás közben. Nézze meg a csatornánkat.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button
                      href={socialProfiles.tiktok.url}
                      variant="primary"
                      size="lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TikTokIcon className="h-5 w-5" />
                      Megnézem TikTokon
                    </Button>
                    <CallButton size="lg" label="Kérjen árat" showNumber={false} />
                  </div>
                </div>

                {/* Három üres állókártya, jelzi a leendő elrendezést. */}
                <ul className="grid grid-cols-3 gap-3" aria-hidden>
                  {[0, 1, 2].map((i) => (
                    <li
                      key={i}
                      className="overflow-hidden rounded-xl ring-1 ring-white/10"
                    >
                      <AssetImage
                        src=""
                        alt=""
                        ratio="9/16"
                        tone={i === 1 ? "green" : "dark"}
                        hideSlotLabel
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}
      </Container>
    </Section>
  );
}

/* ==================================================================
   FRISS TARTALMAK, tudásbázis
   ================================================================== */

export function LatestContent() {
  const posts = latestArticles(3);
  if (posts.length === 0) return null;

  return (
    <Section tone="white" labelledBy="tartalom-cim">
      <Container wide>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Tudásbázis"
            title="Friss munkák és hasznos tippek"
            align="left"
            id="tartalom-cim"
            lead="Gyakori helyzetek, érthetően elmagyarázva, hogy tudja, mi vár Önre, mielőtt telefonál."
          />
          <div className="shrink-0 pb-1">
            <TextLink href="/tudasbazis">Minden bejegyzés</TextLink>
          </div>
        </div>

        <ul className="mt-11 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="group relative flex flex-col overflow-hidden rounded-media bg-white shadow-card ring-1 ring-ink-200/70 transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="media-zoom overflow-hidden">
                <AssetImage
                  src={post.image.src}
                  alt={post.image.alt}
                  ratio="16/10"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  tone="green"
                  hideSlotLabel
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Tag tone="green">{categoryLabel(post.category)}</Tag>
                  <time
                    dateTime={post.date}
                    className="text-[0.8125rem] text-ink-500"
                  >
                    {formatDate(post.date)}
                  </time>
                </div>

                <h3 className="mt-4 text-[1.1875rem] font-bold leading-snug">
                  <Link
                    href={`/tudasbazis/${post.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                  {post.excerpt}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand-700">
                  Elolvasom
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ==================================================================
   MIÉRT MINKET
   ================================================================== */

export function WhyUs() {
  const reasons = [
    {
      icon: ClockIcon,
      title: "Gyors reagálás",
      text: `${business.responseTime.display} ${business.responseTime.context.toLowerCase()}. Nem holnapra adunk időpontot, elveszett kulcsnál ez a lényeg.`,
    },
    {
      icon: ShieldIcon,
      title: "Sérülésmentes munkavégzés",
      text: "Erre a célra készült szerszámokkal dolgozunk. Nem törünk ablakot és nem feszítjük ki az ajtót.",
    },
    {
      icon: CarIcon,
      title: "Helyszíni munkavégzés",
      text: "Hozza el az autót a XI. kerületi telephelyre és általában 20–25 perc alatt elkészül. Ha nem tud jönni, kiszállunk Önhöz.",
    },
    {
      icon: ToolsIcon,
      title: "Modern diagnosztika",
      text: "Kulcsmásoló gép és OBD-diagnosztika, amivel a chip programozása és az immobilizer tanítása is megoldható.",
    },
    {
      icon: PhoneIcon,
      title: "Átlátható kommunikáció",
      text: "A telefonban megkérdezzük a típust és az évjáratot és előre megmondjuk, mire számíthat.",
    },
    {
      icon: MapPinIcon,
      title: "Budapest és környéke",
      text: "Budapest mind a 23 kerülete valamint az agglomeráció települései.",
    },
  ];

  return (
    <Section tone="light" labelledBy="miert-minket-cim">
      <Container>
        <SectionHeading
          eyebrow="Miért minket?"
          title="Amiért érdemes minket hívni"
          id="miert-minket-cim"
          lead="Nem ígérünk lehetetlent. Azt vállaljuk, amit ténylegesen meg tudunk csinálni és azt gyorsan."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li
              key={reason.title}
              className="rounded-card bg-white p-7 shadow-card ring-1 ring-ink-200/70"
            >
              <span
                className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white"
                aria-hidden
              >
                <reason.icon className="h-6 w-6" />
              </span>
              <h3 className="text-[1.0625rem] font-bold">{reason.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-600">{reason.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ==================================================================
   ELLÁTÁSI TERÜLET
   ================================================================== */

export function ServiceAreaSection() {
  return (
    <Section tone="light" labelledBy="terulet-cim">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Ellátási terület"
              title="Hol érhető el a szolgáltatás?"
              align="left"
              id="terulet-cim"
              lead="Budapest egész területén dolgozunk és kimegyünk az agglomerációba is. Ha bizonytalan, hogy az Ön címe belefér-e, egy hívás alatt tisztázzuk."
            />

            {/*
              Telephely: a látogatók kerületben gondolkodnak, ezért ezt
              külön kiemeljük, így rögtön tudják, honnan indulunk hozzájuk.
            */}
            <div className="mt-8 flex items-start gap-4 rounded-card bg-white p-5 shadow-card ring-1 ring-ink-200">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white"
                aria-hidden
              >
                <MapPinIcon className="h-5.5 w-5.5" />
              </span>
              <div>
                <p className="text-[0.9375rem] font-bold text-ink-900">
                  Telephelyünk: Budapest {business.address.district} ({business.address.districtName})
                </p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-600">
                  {business.address.full}. A legtöbb munkát itt végezzük,
                  ingyenes parkolással. Kiszállásra is van lehetőség, felárral.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-7">
              <div>
                <h3 className="flex items-center gap-2.5 text-[0.9375rem] font-bold uppercase tracking-wide text-ink-800">
                  <MapPinIcon className="h-4.5 w-4.5 text-accent-600" />
                  Budapest kerületei
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {business.serviceArea.districts.map((district) => (
                    <li
                      key={district}
                      className="rounded-lg bg-white px-2.5 py-1.5 text-[0.8125rem] font-medium text-ink-700 ring-1 ring-ink-200"
                    >
                      {district} kerület
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-2.5 text-[0.9375rem] font-bold uppercase tracking-wide text-ink-800">
                  <CarIcon className="h-4.5 w-4.5 text-accent-600" />
                  Agglomeráció
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {business.serviceArea.towns.map((town) => (
                    <li
                      key={town}
                      className="rounded-lg bg-white px-2.5 py-1.5 text-[0.8125rem] font-medium text-ink-700 ring-1 ring-ink-200"
                    >
                      {town}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Járműtípusok, grafit kártya, hogy legyen súlya */}
          <div className="overflow-hidden rounded-feature bg-ink-900 p-8 text-ink-300 shadow-media on-dark sm:p-10">
            <h3 className="text-h3 !text-white">Milyen járművekhez hívhat?</h3>
            <p className="mt-3 leading-relaxed text-ink-400">
              Nem csak személyautóhoz. A nyitás és a kulcskészítés az alábbi
              járműtípusokra egyaránt vonatkozik:
            </p>
            <CheckList
              tone="dark"
              className="mt-7"
              items={[
                "Személygépkocsi – minden gyakori márka és évjárat",
                "Kisbusz és furgon",
                "Teherautó",
                "Kisteherautó",
              ]}
            />
            <div className="mt-8 rounded-card bg-brand-600/20 p-5 ring-1 ring-brand-400/25">
              <p className="text-[0.9375rem] leading-relaxed text-brand-100">
                <strong className="font-semibold text-white">
                  Nem tudja, belefér-e?
                </strong>{" "}
                Nincs zsákbamacska. Hívjon, mondja meg a jármű típusát és
                évjáratát, őszintén megmondjuk, hogy mennyibe fog kerülni a
                kulcskészítés.
              </p>
            </div>
            <CallButton size="lg" label="Beszéljünk a részletekről" className="mt-6 w-full sm:w-auto" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ==================================================================
   ZÁRÓ CTA, nagy fotó háttérrel
   ================================================================== */

export function CtaBand({
  title = "Elhagyta autókulcsát?",
  text = "Akkor is megoldjuk, ha egyetlen kulcsa sem maradt: kiolvassuk a zár adatait és a helyszínen elkészítjük az új kulcsot. Budapesten és a vonzáskörzetben, a nap 24 órájában.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="cta-cim">
      {/* Háttérfotó, egyenletesen sötétítve, a szöveg mindig olvasható. */}
      <div className="media-scrim-even absolute inset-0 -z-10">
        <AssetImage
          src={images.cta.src}
          alt=""
          ratio="21/9"
          sizes="100vw"
          tone="dark"
          hideSlotLabel
          wrapperClassName="!absolute inset-0 h-full w-full"
          className="h-full w-full"
        />
      </div>

      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center on-dark">
          <span className="eyebrow mb-5 flex items-center gap-2.5 text-accent-400">
            <span aria-hidden className="h-px w-8 bg-accent-400/60" />
            {business.hours.short} · non-stop
          </span>

          <h2 id="cta-cim" className="text-h1 !text-white">
            {title}
          </h2>

          <p className="text-lead mt-6 text-ink-200">{text}</p>

          <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <CallButton size="xl" label="Egyeztessünk telefonon" />
            <Button href="/kapcsolat" variant="onDark" size="xl">
              Villám ajánlatot kérek
            </Button>
          </div>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-300">
            {[
              business.hours.display,
              business.serviceArea.primary,
              "Sérülésmentes nyitás",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-accent-400" /> {item}
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ==================================================================
   KAPCSOLÓDÓ SZOLGÁLTATÁSOK
   ================================================================== */

export function RelatedServices({ slugs }: { slugs: string[] }) {
  const related = slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  if (related.length === 0) return null;

  return (
    <Section tone="light" labelledBy="kapcsolodo-cim">
      <Container wide>
        <h2 id="kapcsolodo-cim" className="text-h2">
          Kapcsolódó szolgáltatásaink
        </h2>
        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ==================================================================
   OLDALFEJLÉC, aloldalak, fotóval
   ================================================================== */

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Ha van kép, sötét, fotós fejléc készül; enélkül világos, letisztult. */
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}) {
  if (image) {
    return (
      <div className="relative isolate overflow-hidden bg-ink-900">
        <div className="media-scrim-even absolute inset-0 -z-10">
          <AssetImage
            src={image.src}
            alt=""
            ratio="21/9"
            sizes="100vw"
            priority
            tone="dark"
            hideSlotLabel
            wrapperClassName="!absolute inset-0 h-full w-full"
            className="h-full w-full"
          />
        </div>

        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl on-dark">
            {eyebrow && (
              <p className="eyebrow mb-5 flex items-center gap-2.5 text-accent-400">
                <span aria-hidden className="h-px w-8 bg-accent-400/60" />
                {eyebrow}
              </p>
            )}
            <h1 className="text-h1 !text-white">{title}</h1>
            {lead && <p className="text-lead mt-6 text-ink-200">{lead}</p>}
            {children && <div className="mt-9">{children}</div>}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="border-b border-ink-200 bg-ink-50 py-14 sm:py-18 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="eyebrow mb-5 flex items-center gap-2.5 text-accent-700">
              <span aria-hidden className="h-px w-8 bg-accent-600/50" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-h1">{title}</h1>
          {lead && <p className="text-lead mt-6 text-ink-600">{lead}</p>}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </Container>
    </div>
  );
}

/* ==================================================================
   BELSŐ LINKEK a szolgáltatásokhoz
   ================================================================== */

export function ServiceLinkList() {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={`/szolgaltatasok/${service.slug}`}
            className="flex items-center gap-2.5 rounded-lg bg-white px-4 py-3 text-[0.9375rem] font-medium text-ink-800 ring-1 ring-ink-200 transition-colors hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200"
          >
            <ServiceIconDot />
            {service.nav}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ServiceIconDot() {
  return (
    <span
      aria-hidden
      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600"
    />
  );
}
