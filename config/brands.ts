/**
 * ============================================================================
 *  MÁRKAOLDALAK
 * ============================================================================
 *
 *  Mire való: aki azt írja be, hogy „Volkswagen autókulcs másolás", annak
 *  egy márkára szabott oldal meggyőzőbb, mint egy általános szolgáltatás
 *  oldal. A márkaoldal összefogja az adott márkához tartozó valódi
 *  munkáinkat és a márkára jellemző tudnivalókat.
 *
 *  ⚠️ SZABÁLY: márkaoldal CSAK akkor készülhet, ha legalább HÁROM valódi,
 *     saját fotós munkánk van az adott márkára a tudásbázisban. Enélkül
 *     üres váz lenne, amiből a Google és az olvasó is azonnal kiszúrja,
 *     hogy nincs mögötte tartalom. Kitalált munkát ide sem írunk.
 *
 *     Állapot 2026-10-10-én:
 *       • Volkswagen → 3 cikk, ezért elkészült
 *       • Kia        → 2 cikk, még vár
 *       • Peugeot    → 1 cikk, még vár
 *       • Fiat       → 1 cikk, még vár
 *
 *  ⚠️ A márkanevek és a típusnevek a gyártók védjegyei. Az oldal CSAK azt
 *     állítja, hogy ezekhez a járművekhez készítünk kulcsot, azt NEM, hogy
 *     a gyártóval bármilyen hivatalos kapcsolatban állnánk.
 * ============================================================================
 */

import { articles, type Article } from "./content";

export interface BrandSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Brand {
  slug: string;
  /** A márka neve, ahogy kiírjuk. */
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Rövid összefoglaló a gyűjtőoldalra. */
  cardText: string;
  lead: string;
  /** „Amiben segíteni tudunk ennél a márkánál” felsorolás. */
  bullets: string[];
  sections: BrandSection[];
  faqs: Array<{ q: string; a: string }>;
  /**
   * A márkához tartozó tudásbázis cikkek, kézzel felsorolva.
   * Azért kézzel, mert a cikk slugjából nem mindig derül ki a márka
   * (például a „passat-elveszett-autokulcs-konyveken" nem tartalmazza,
   * hogy Volkswagen), automatikus találgatásból pedig hiba lenne.
   */
  articleSlugs: string[];
  /** Kapcsolódó szolgáltatás-oldalak slugjai. */
  relatedServices: string[];
  /** Fejléckép. Valódi munkafotó legyen, az adott márkáról. */
  image: { src: string; alt: string };
}

/* ================================================================== */

export const brands: Brand[] = [
  {
    slug: "volkswagen-autokulcs",
    name: "Volkswagen",
    h1: "Volkswagen autókulcs készítés és programozás",
    metaTitle: "Volkswagen autókulcs másolás, programozás Budapest",
    metaDescription:
      "Volkswagen autókulcs másolás, pótkulcs készítés és kulcsprogramozás Budapesten. Golf, Passat, Polo, Tiguan és a legújabb keyless modellek, a hét minden napján.",
    cardText:
      "Golftól a legújabb keyless modellekig: pótkulcs, kulcsprogramozás és elveszett autókulcs pótlása.",
    lead:
      "A Volkswagen az egyik leggyakoribb márka, amivel dolgozunk. A régebbi, " +
      "kihajtható kulcsos Golfoktól és Passatoktól egészen a legújabb, kulcs " +
      "nélküli indítású modellekig minden előfordul nálunk. Ezen az oldalon " +
      "összeszedtük, mit érdemes tudni a Volkswagen autókulcsokról. Alatta " +
      "pedig ott vannak azok a munkák, amiket tényleg mi végeztünk el.",
    bullets: [
      "Volkswagen pótkulcs készítése meglévő kulcs alapján",
      "Új autókulcs akkor is, ha egyetlen kulcs sem maradt",
      "Immobilizer tanítás és kulcsprogramozás",
      "Keyless, kulcs nélküli indítású modellek kulcsa",
      "Távirányító gombok tanítása a központi zárhoz",
      "Kulcsház csere és a kulcsszár marása",
    ],
    sections: [
      {
        heading: "Miben más egy Volkswagen autókulcs?",
        paragraphs: [
          "A Volkswagen modelleknél az évjárat sokkal többet számít, mint a típusnév. " +
            "Ugyanaz a Golf vagy Passat több kulcsrendszerrel is készült az évek alatt, " +
            "ezért a megoldás mindig az adott autótól függ, nem attól, hogy mi van a " +
            "csomagtérfedélre írva.",
          "A régebbi, kihajtható kulcsoknál a kulcsszár marása és a chip programozása " +
            "a feladat. Az újabb modelleknél már a jármű elektronikájával kell " +
            "kommunikálni, a legújabbaknál pedig kulcs nélküli indítású rendszerrel, " +
            "ahol a kulcsot elég a zsebben tartani.",
          "Ezért kérdezzük meg telefonon a pontos típust és az évjáratot: ebből derül " +
            "ki, mennyi idő a munka és mennyibe kerül.",
        ],
      },
      {
        heading: "Mit tudunk megoldani Volkswagenhez?",
        paragraphs: [
          "Ha van még működő kulcsa, az a legegyszerűbb és legolcsóbb eset: arról " +
            "készítünk másolatot, kimarjuk a kulcsszárat és beprogramozzuk a chipet.",
          "Ha egyetlen autókulcs sem maradt, az sem zsákutca. Ilyenkor előbb " +
            "sérülésmentesen kinyitjuk az autót, kiolvassuk a szükséges adatokat, " +
            "elkészítjük az új kulcsot és betanítjuk a jármű rendszerébe.",
          "A kopott, repedt vagy ragasztószalaggal összefogott kulcsházakat is " +
            "cseréljük. Ilyenkor a régi kulcs elektronikája kerül át az új házba, " +
            "tehát nem kell újraprogramozni.",
        ],
      },
      {
        heading: "Mire figyeljen Volkswagen tulajdonosként?",
        list: [
          "Amíg van működő kulcsa, a pótlás egyszerűbb és olcsóbb munka",
          "A kihajtható kulcsházak gombja és csuklója idővel elhasználódik",
          "Ha a kulcs már csak többszöri nyomásra reagál, az figyelmeztető jel",
          "Egyetlen kulcs esetén érdemes tartalékot csináltatni, mielőtt elvész",
          "A pontos típus és évjárat nélkül árat sem lehet felelősen mondani",
        ],
      },
    ],
    faqs: [
      {
        q: "Minden Volkswagen típushoz tudnak kulcsot készíteni?",
        a:
          "A legtöbbhöz igen, a régebbi kihajtható kulcsos modellektől a legújabb, " +
          "kulcs nélküli indítású autókig. Hogy az adott járműhöz melyik a jó " +
          "megoldás, azt a típus és az évjárat alapján mondjuk meg telefonon.",
      },
      {
        q: "Elveszett az összes Volkswagen kulcsom, mit tegyek?",
        a:
          "Ez megoldható. Először sérülésmentesen kinyitjuk az autót, majd a " +
          "szükséges adatok kiolvasása után elkészítjük és betanítjuk az új " +
          "autókulcsot. Az autót ehhez nem kell elvontatni.",
      },
      {
        q: "A keyless Volkswagen kulcs is pótolható?",
        a:
          "Igen. A kulcs nélküli indítású modellek kulcsát is elkészítjük és " +
          "betanítjuk a jármű rendszerébe. Ez több munka, mint egy hagyományos " +
          "kulcs, de ugyanúgy megoldható.",
      },
      {
        q: "Mennyibe kerül egy Volkswagen pótkulcs?",
        a:
          "Az ár a típustól, az évjárattól és a kulcs fajtájától függ. Egy egyszerű " +
          "kulcs és egy keyless kulcs között jelentős a különbség, ezért a pontos " +
          "árat telefonon, WhatsAppon vagy Viberen mondjuk meg, még a munka " +
          "megkezdése előtt.",
      },
    ],
    articleSlugs: [
      "passat-elveszett-autokulcs-konyveken",
      "passat-b6-kulcsprogramozas",
      "volkswagen-mqb-keyless-kulcsprogramozas",
    ],
    relatedServices: [
      "autokulcs-masolas",
      "autokulcs-programozas",
      "elveszett-autokulcs",
      "kulcshaz-csere",
    ],
    image: {
      src: "/images/blog/volkswagen-keyless-autokulcs-programozas.jpg",
      alt: "Volkswagen autókulcs programozása a jármű utasterében, diagnosztikai eszközzel",
    },
  },
];

/* ------------------------------------------------------------------ */

export function getBrand(slug: string): Brand | undefined {
  return brands.find((brand) => brand.slug === slug);
}

/** Egy márkához tartozó cikkek, a felsorolás sorrendjében. */
export function brandArticles(brand: Brand): Article[] {
  return brand.articleSlugs
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is Article => article !== undefined);
}

/** Egy cikkhez tartozó márka, ha van ilyen. A cikkoldal linkel rá vissza. */
export function brandForArticle(articleSlug: string): Brand | undefined {
  return brands.find((brand) => brand.articleSlugs.includes(articleSlug));
}
