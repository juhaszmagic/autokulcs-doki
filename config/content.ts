/**
 * ============================================================================
 *  TARTALOM — tudásbázis, friss munkák, hasznos tippek
 * ============================================================================
 *
 *  Cél: a weboldal ne statikus névjegy legyen, hanem élő tartalmi rendszer,
 *  ami a szolgáltatás-oldalakat is erősíti.
 *
 *      Cikk  →  kapcsolódó szolgáltatás  →  telefonhívás
 *
 *  Minden cikk a valós ügyfélkérdésekre válaszol, és belülről linkel a
 *  megfelelő szolgáltatás-oldalra. Ez épít fel valódi téma-lefedettséget
 *  a Google felé — nem tucatnyi üres, kulcsszóra írt szöveg.
 *
 *  ⚠️ SZABÁLY: a cikkek szakmai ismereteket magyaráznak el. Konkrét árat,
 *     ügyfélnevet, teljesített munkára vonatkozó állítást vagy referenciát
 *     NEM tartalmaznak, mert azokat nem tudjuk hitelesen igazolni.
 *
 *  ── ÚJ CIKK ÍRÁSA ──────────────────────────────────────────────────
 *  Vegyen fel egy új elemet az `articles` tömbbe. Az oldal, a lista, a
 *  sitemap, a kezdőoldali „friss tartalmak” blokk és a strukturált adat
 *  automatikusan frissül.
 * ============================================================================
 */

export const contentCategories = [
  { id: "elveszett-kulcs", label: "Elveszett kulcs" },
  { id: "kulcsmasolas", label: "Autókulcs másolás" },
  { id: "programozas", label: "Programozás és immobilizer" },
  { id: "autonyitas", label: "Autónyitás" },
  { id: "tippek", label: "Hasznos tippek" },
] as const;

export type CategoryId = (typeof contentCategories)[number]["id"];

export function categoryLabel(id: CategoryId): string {
  return contentCategories.find((c) => c.id === id)?.label ?? id;
}

/* ------------------------------------------------------------------ */

export interface ArticleSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  /** Rövid összefoglaló — a kártyákon és a meta descriptionben. */
  excerpt: string;
  category: CategoryId;
  /**
   * ISO dátum. A cikkek a weboldal indulásakor készültek — ha a
   * tulajdonos később frissíti valamelyiket, ide új dátum jöhet.
   */
  date: string;
  /** Fejléckép. Ha nincs feltöltve, tervezett fotóhely jelenik meg. */
  image: { src: string; alt: string };
  metaTitle: string;
  metaDescription: string;
  /** Becsült olvasási idő percben. */
  readingMinutes: number;
  lead: string;
  sections: ArticleSection[];
  faqs?: Array<{ q: string; a: string }>;
  /** Kapcsolódó szolgáltatás-oldalak slugjai — belső linkeléshez. */
  relatedServices: string[];
}

/* ==================================================================
   CIKKEK
   ================================================================== */

export const articles: Article[] = [
  {
    slug: "elveszett-osszes-autokulcs",
    title: "Elveszett az összes autókulcs – mi történik ilyenkor?",
    excerpt:
      "Ha egyetlen kulcs sem maradt, az autót előbb ki kell nyitni, majd a zár adataiból új kulcsot építeni. Végigvesszük, mi zajlik lépésről lépésre és mit érdemes előkészíteni.",
    category: "elveszett-kulcs",
    date: "2026-09-07",
    image: {
      src: "/images/blog/elveszett-autokulcs.jpg",
      alt: "Új autókulcs készítése és programozása elveszett kulcs pótlásakor",
    },
    metaTitle: "Elveszett az összes autókulcs – mi a teendő?",
    metaDescription:
      "Nincs meg egyetlen autókulcsa sem? Elmagyarázzuk, hogyan készül új kulcs meglévő kulcs nélkül, mennyi ideig tart és mit vigyen magával.",
    readingMinutes: 4,
    lead:
      "Ez az a helyzet, amitől mindenki tart: nincs meg a kulcs és nincs pótkulcs sem. " +
      "A jó hír az, hogy ez megoldható – és jellemzően anélkül, hogy az autót el kellene vontatni. " +
      "Nézzük meg, mi történik valójában.",
    sections: [
      {
        heading: "Először ki kell nyitni az autót",
        paragraphs: [
          "Amíg nem lehet bejutni a járműbe, semmilyen kulcskészítés nem indulhat el. " +
            "A nyitás erre a célra készült szerszámokkal, roncsolásmentesen történik: nem törik " +
            "ablak, nem feszül ki az ajtó és nem kell zárat cserélni.",
          "Fontos: ilyenkor a legrosszabb, amit tehet, hogy saját maga próbálkozik. A neten " +
            "keringő ékes-drótos módszerek modern autókon nem működnek, viszont könnyen " +
            "megsértik az ajtótömítést vagy az ablakemelő-mechanikát – és annak a javítása " +
            "többe kerül, mint maga a nyitás.",
        ],
      },
      {
        heading: "Ezután jön a zár adatainak kiolvasása",
        paragraphs: [
          "Meglévő kulcs nélkül nincs miről másolni. Ezért a következő lépés az autó zárjának " +
            "kiolvasása: ebből derül ki, milyen mintázattal kell kimarni az új kulcsszárat.",
          "Ez a lépés az, ami miatt az elveszett kulcs pótlása mindig több munka, mint egy " +
            "egyszerű másolás. Ha van még egy működő kulcsa, ez a szakasz teljesen kimarad.",
        ],
      },
      {
        heading: "A kulcs elkészítése és programozása",
        list: [
          "A kiolvasott adatokból elkészül az új kulcsszár.",
          "Kipróbáljuk, hogy elfordul-e az ajtóban és a gyújtáskapcsolóban.",
          "Az OBD-csatlakozón keresztül megtanítjuk a kulcsot az autó indításgátlójához.",
          "Beállítjuk a távirányító gombjait a központi zárhoz.",
          "Végül közösen kipróbáljuk, hogy minden funkció működik-e.",
        ],
      },
      {
        heading: "Mit készítsen elő?",
        paragraphs: [
          "Új kulcs készítéséhez igazolni kell, hogy Ön jogosult a járműhöz – ez az Ön autójának " +
            "védelmét szolgálja. Készítse elő a forgalmi engedélyt és a személyazonosító okmányát.",
          "Segít, ha tudja az autó pontos típusát és évjáratát is: ebből már a telefonban meg " +
            "tudjuk mondani, mire számíthat.",
        ],
      },
      {
        heading: "És ha a kulcs nem elveszett, hanem eltört?",
        paragraphs: [
          "A zárba tört kulcsdarab eltávolítása külön feladat, de rutinmunka. A darabot kiszedjük, " +
            "majd elkészítjük az új kulcsot – a zárat jellemzően nem kell cserélni.",
        ],
      },
    ],
    faqs: [
      {
        q: "El kell vontatni az autót?",
        a:
          "Az esetek nagy részében nem. A nyitás, a kiolvasás, a kulcskészítés és a programozás " +
          "jellemzően a helyszínen elvégezhető.",
      },
      {
        q: "Mennyi ideig tart?",
        a:
          "Ez a jármű márkájától, évjáratától és a kulcs típusától függ. A nyitás percek kérdése, " +
          "a kulcs elkészítése és programozása ennél hosszabb. Reális időbecslést telefonon tudunk " +
          "adni, ha megmondja az autó típusát.",
      },
      {
        q: "A régi kulcs letiltható?",
        a:
          "A jármű típusától függ, hogy a korábbi kulcs érvényteleníthető-e a rendszerben. Ha ez " +
          "fontos – például mert a kulcs idegen kézbe kerülhetett –, jelezze a hívásnál.",
      },
    ],
    relatedServices: ["elveszett-autokulcs", "autokulcs-keszites", "serulesmentes-autonyitas"],
  },

  {
    slug: "potkulcs-mielott-elveszik",
    title: "Miért a pótkulcs a legolcsóbb autókulcs, amit valaha csináltat?",
    excerpt:
      "Amíg van egy működő kulcsa, a másolás egyszerű művelet. Ha az utolsó is elvész, nulláról kell felépíteni a kulcsot – több munka, több idő, magasabb költség.",
    category: "kulcsmasolas",
    date: "2026-09-07",
    image: {
      src: "/images/blog/potkulcs-keszites.jpg",
      alt: "Frissen elkészített pótkulcs az eredeti autókulcs mellett",
    },
    metaTitle: "Pótkulcs: miért érdemes időben elkészíttetni?",
    metaDescription:
      "Amíg van működő autókulcsa, a másolás gyors és egyszerű. Elveszett kulcsnál előbb nyitni és a zárat kiolvasni kell. Megmutatjuk a különbséget.",
    readingMinutes: 3,
    lead:
      "Ez a leggyakoribb tanácsunk és pénzben is ez hozza a legnagyobb különbséget. " +
      "Mégis a legtöbb ember csak akkor gondol a pótkulcsra, amikor már késő.",
    sections: [
      {
        heading: "Két teljesen különböző munka",
        paragraphs: [
          "Kívülről mindkettő ugyanannak látszik: „kell egy autókulcs”. A gyakorlatban viszont " +
            "két külön feladatról van szó.",
          "Ha van egy működő kulcsa, arról tudunk másolatot készíteni: kimarjuk a szárat és " +
            "beprogramozzuk a chipet. Ha viszont egyetlen kulcs sem maradt, előbb ki kell nyitni " +
            "az autót, ki kell olvasni a zár adatait és onnan kell felépíteni a kulcsot. Ez " +
            "lényegesen több lépés.",
        ],
      },
      {
        heading: "Mi történik, ha csak egy kulcsa van?",
        paragraphs: [
          "Egyetlen kulccsal az autó folyamatosan egy hajszálon lóg. Ha az a kulcs elvész, " +
            "eltörik, vagy egyszerűen tönkremegy benne az elektronika, azonnal a drágább " +
            "forgatókönyvben találja magát – jellemzően a legrosszabbkor.",
          "Egy kopott kulcsszár ráadásul figyelmeztet is: ha egyre nehezebben fordul, ha " +
            "„keresgélni” kell vele a zárban, az annak a jele, hogy hamarosan eltörik.",
        ],
      },
      {
        heading: "Miért nem elég a sarki kulcsmásolás?",
        paragraphs: [
          "Egy modern autókulcs két külön dolgot tud. A szár mechanikusan nyitja az ajtót és " +
            "elfordul a gyújtáskapcsolóban. A benne lévő chip pedig az indításgátlóval kommunikál.",
          "Ha csak a szárat másolják le, a kulcs kinyitja az ajtót, de az autó nem indul el – vagy " +
            "beindul, majd pár másodperc után leáll. A chipet is programozni kell a járműhöz.",
        ],
      },
      {
        heading: "Mit vigyen magával?",
        list: [
          "A meglévő, működő autókulcsot",
          "A forgalmi engedélyt",
          "Személyazonosító okmányt",
          "Ha tudja: az autó pontos típusát és évjáratát",
        ],
      },
    ],
    faqs: [
      {
        q: "Mennyibe kerül egy pótkulcs?",
        a:
          "Az autó márkájától, típusától, évjáratától és a kulcs fajtájától függ – egy egyszerű " +
          "kulcs és egy chipes, távirányítós kulcs között jelentős a különbség. Hívjon minket, " +
          "mondja meg az autó típusát és évjáratát és konkrét árat mondunk.",
      },
      {
        q: "A helyszínen is elkészíthető?",
        a:
          "A másolás és a programozás jelentős része a helyszínen elvégezhető, így az autót nem " +
          "kell sehová elvinni.",
      },
    ],
    relatedServices: ["autokulcs-masolas", "autokulcs-keszites", "autokulcs-programozas"],
  },

  {
    slug: "immobilizer-mit-jelent",
    title: "Az autó nem indul a másolt kulccsal – az immobilizer a magyarázat",
    excerpt:
      "A kulcs elfordul, a motor forog, de az autó mégsem indul be. A hiba jellemzően nem a kulcsszárral van, hanem a benne lévő chippel és az indításgátlóval.",
    category: "programozas",
    date: "2026-09-07",
    image: {
      src: "/images/blog/immobilizer-programozas.jpg",
      alt: "Diagnosztikai eszköz csatlakoztatva az autó OBD-portjához immobilizer tanítás közben",
    },
    metaTitle: "Immobilizer: miért nem indul az autó a másolt kulccsal?",
    metaDescription:
      "A kulcs elfordul, de az autó nem indul? Elmagyarázzuk, mi az immobilizer, miért kell a chipet programozni és mikor elég a távirányító újratanítása.",
    readingMinutes: 3,
    lead:
      "Ha a kulcs mechanikusan tökéletesen működik – kinyitja az ajtót, elfordul a " +
      "gyújtáskapcsolóban –, de az autó mégsem indul el, akkor szinte biztosan az " +
      "elektronikával van dolgunk, nem a fémmel.",
    sections: [
      {
        heading: "Mi az az immobilizer?",
        paragraphs: [
          "Az immobilizer az autó gyári indításgátlója. A feladata egyszerű: csak akkor engedi " +
            "elindítani a motort, ha felismeri a kulcsban lévő chip kódját. Ez a lopás elleni " +
            "védelem egyik legfontosabb eleme – és pontosan ezért nem lehet egy autókulcsot " +
            "egyszerűen „lemásolni”.",
          "Amikor elfordítja a kulcsot, a jármű és a chip néhány ezredmásodperc alatt " +
            "kommunikál egymással. Ha a kód nem stimmel, a motorvezérlő nem engedi az indítást.",
        ],
      },
      {
        heading: "Tipikus tünetek",
        list: [
          "A motor forog, de nem kap gyújtást vagy üzemanyagot.",
          "Az autó beindul, majd 2–3 másodperc után magától leáll.",
          "A műszerfalon villog vagy égve marad az indításgátló jelzőfénye.",
          "A kulcs kinyitja az ajtót, de a gyújtáskapcsolóban nem történik semmi érdemi.",
        ],
      },
      {
        heading: "Hogyan lehet megoldani?",
        paragraphs: [
          "A programozás az autó OBD-csatlakozóján keresztül, diagnosztikai eszközzel történik. " +
            "A művelet során a kulcsban lévő chip és a jármű indításgátlója „megtanulják” egymást.",
          "Ezután állítjuk be a távirányító funkciókat is. A munka végén nem elég, hogy a szoftver " +
            "sikert jelez: kipróbáljuk, hogy a kulcs elfordul-e az ajtóban, beindítja-e a motort " +
            "és működik-e vele a központi zár.",
        ],
      },
      {
        heading: "Mikor elég csak a távirányítót újratanítani?",
        paragraphs: [
          "Ha az autó elindul a kulccsal, de a gombok nem működtetik a központi zárat, akkor " +
            "jellemzően nem az immobilizerrel van baj. Ez gyakran elemcsere után fordul elő: " +
            "egyes kulcsoknál ilyenkor újra kell szinkronizálni a távirányítót a járművel. " +
            "Ez rövid művelet és a helyszínen elvégezhető.",
        ],
      },
      {
        heading: "Használt autóhoz kapott második kulcs",
        paragraphs: [
          "Gyakori eset: az autóvásárláskor kapott második kulcs fizikailag illeszkedik, de nem " +
            "indítja a járművet. Ilyenkor szinte mindig a chip programozása hiányzik – a kulcsot " +
            "egyszerűen nem tanították meg ehhez az autóhoz. Ez pótolható.",
        ],
      },
    ],
    faqs: [
      {
        q: "Minden autónál megoldható a programozás?",
        a:
          "A gyakorlatban az autók nagy részénél igen, de a márka, a típus és az évjárat " +
          "meghatározza, milyen eljárás szükséges. Ezért kérjük mindig az autó típusát és " +
          "évjáratát a telefonban – így őszintén meg tudjuk mondani, mit tudunk vállalni.",
      },
      {
        q: "Elemcsere után elromlott a távirányítóm. Javítható?",
        a:
          "Legtöbbször igen: újra kell szinkronizálni a távirányítót a járművel. Ez rövid művelet.",
      },
    ],
    relatedServices: ["autokulcs-programozas", "autokulcs-masolas", "elveszett-autokulcs"],
  },
];

/* ------------------------------------------------------------------ */

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Legfrissebb elöl. */
export function articlesByDate(): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

/** A kezdőoldal „friss tartalmak” blokkjához. */
export function latestArticles(count = 3): Article[] {
  return articlesByDate().slice(0, count);
}

/** Egy cikkhez kapcsolódó további cikkek (azonos kategória előnyben). */
export function relatedArticles(article: Article, count = 2): Article[] {
  const others = articles.filter((a) => a.slug !== article.slug);
  const sameCategory = others.filter((a) => a.category === article.category);
  const rest = others.filter((a) => a.category !== article.category);
  return [...sameCategory, ...rest].slice(0, count);
}

/** Magyar dátumformátum, pl. „2026. szeptember 7.” */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
