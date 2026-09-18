/**
 * ============================================================================
 *  SZOLGÁLTATÁSOK  —  tartalmi igazságforrás
 * ============================================================================
 *  Innen épül fel:
 *    • a kezdőoldal szolgáltatás-kártyái
 *    • a /szolgaltatasok gyűjtőoldal
 *    • minden önálló szolgáltatás-aloldal
 *    • a sitemap.xml
 *    • a Service és FAQPage strukturált adatok
 *
 *  ⚠️ Minden állítás a jelenlegi autokulcsmasolo.com tartalmából származik.
 *     Ár SEHOL nem szerepel, mert a régi oldalon sem szerepelt egyetlen ár sem.
 *
 *  ── A SORREND SZÁNDÉKOS ────────────────────────────────────────────
 *  Az ELVESZETT AUTÓKULCS áll az élen, mert üzletileg ez a legértékesebb
 *  munka: nyitás + a zár kiolvasása + új kulcs + programozás. A puszta
 *  kizáródás ehhez képest rövid, olcsó beavatkozás, ezért a sérülésmentes
 *  autónyitás a lista végére került — megmarad (valódi keresési igény és
 *  az elveszett kulcs első lépése is), de nem ez a kirakat.
 * ============================================================================
 */

export type IconName =
  | "unlock"
  | "shield"
  | "key"
  | "chip"
  | "search"
  | "cut";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Service {
  slug: string;
  /** Rövid név a navigációhoz és a kártyákhoz. */
  nav: string;
  /** Az aloldal H1 címsora. */
  h1: string;
  /** <title> — egyedi, minden oldalon más. */
  metaTitle: string;
  /** <meta name="description"> — 150–160 karakter körül. */
  metaDescription: string;
  icon: IconName;
  /** A kártyán megjelenő rövid leírás. */
  cardText: string;
  /** Az aloldal bevezető bekezdése (a H1 alatt). */
  lead: string;
  /** „Amiben segíteni tudunk” felsorolás. */
  bullets: string[];
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  /** Fejléckép a szolgáltatás-oldal tetején és a kezdőoldali kártyán. */
  image: { src: string; alt: string };
  /** Második fotó a szolgáltatás-oldal bevezető szakaszához. */
  detailImage: { src: string; alt: string };
  /** Kapcsolódó szolgáltatások slugjai — belső linkeléshez. */
  related: string[];
}

export const services: Service[] = [
  // ────────────────────────────────────────────────────────────────
  {
    slug: "elveszett-autokulcs",
    nav: "Elveszett autókulcs",
    h1: "Elveszett autókulcs: mi a teendő?",
    metaTitle: "Elveszett autókulcs Budapest: kulcspótlás 0–24",
    metaDescription:
      "Elveszett az autókulcsa és nincs pótkulcs? Kinyitjuk az autót és a helyszínen új kulcsot készítünk. Budapest, 0–24.",
    icon: "search",
    cardText:
      "Elveszett az utolsó kulcs is? Kinyitjuk az autót és nulláról elkészítjük az újat.",
    lead:
      "Ez a legstresszesebb eset, de megoldható, akkor is, ha egyetlen kulcsa sem maradt. " +
      "Ilyenkor négy lépésből áll a munka: nyitás, kiolvasás, kulcskészítés, programozás. " +
      "Ezt jellemzően egy kiszállás alatt, a helyszínen el tudjuk végezni.",
    bullets: [
      "Sérülésmentes nyitás, ha nincs meg egyetlen kulcs sem",
      "Az autózár paramétereinek kiolvasása",
      "Teljesen új kulcs elkészítése meglévő kulcs nélkül",
      "Immobilizer tanítás és kulcsprogramozás",
      "Távirányító funkciók beállítása",
    ],
    sections: [
      {
        heading: "Hogyan készül új kulcs meglévő kulcs nélkül, lépésről lépésre",
        list: [
          "1. Nyitás: először sérülésmentesen kinyitjuk a járművet, hogy hozzáférjünk.",
          "2. Kiolvasás: kiolvassuk az autó zárjának paramétereit, amelyekből a kulcs elkészíthető.",
          "3. Kulcskészítés: a legmodernebb gépeinkkel, akár a helyszínen, elkészítjük az új kulcsszárat.",
          "4. Próba: ellenőrizzük, hogy a kulcs gond nélkül elfordul-e az ajtóban és a gyújtáskapcsolóban.",
          "5. Programozás: az OBD-csatlakozón keresztül megtanítjuk a kulcsot és az immobilizert, majd beállítjuk a távirányítót.",
        ],
      },
      {
        heading: "Mit tegyen, mielőtt hív minket?",
        paragraphs: [
          "Először nyugodjon meg és keresse át a szokásos helyeket, a kulcs meglepően gyakran " +
            "kerül elő a kabátzsebből vagy a bevásárlótáskából. Ha nincs meg, ne törje be az ablakot " +
            "és ne hívjon autómentőt: a jármű elszállítása nélkül is megoldható a helyzet.",
          "Készítse elő a forgalmi engedélyt és a személyazonosító okmányát. Új kulcs készítéséhez " +
            "igazolnunk kell, hogy Ön jogosult a járműhöz, ez az Ön autójának védelmét szolgálja.",
        ],
      },
      {
        heading: "Ha a kulcs nem elveszett, hanem eltört a zárban",
        paragraphs: [
          "A beletört kulcsdarab eltávolítása külön feladat, de nekünk rutinmunka. A törött darabot " +
            "kiszedjük a zárból, majd elkészítjük az új kulcsot, a zárat jellemzően nem kell cserélni.",
        ],
      },
    ],
    faqs: [
      {
        q: "Elveszett az összes autókulcsom. Tényleg megoldható a helyszínen?",
        a:
          "Az esetek nagy részében igen. Kinyitjuk az autót sérülésmentesen, kiolvassuk a zár " +
          "paramétereit, elkészítjük az új kulcsot, majd beprogramozzuk. Ehhez nem kell az autót " +
          "elvontatni. A pontos menetet a jármű típusa és évjárata alapján a telefonban tisztázzuk.",
      },
      {
        q: "Mi szükséges új autókulcs készítéséhez?",
        a:
          "A járműhöz való jogosultság igazolása, jellemzően forgalmi engedély és személyazonosító " +
          "okmány, valamint az autó pontos típusa és évjárata. A többi a mi dolgunk.",
      },
      {
        q: "Mennyi ideig tart az egész folyamat?",
        a:
          "Ez erősen függ az autó márkájától, évjáratától és a kulcs típusától. A nyitás jellemzően " +
          "percek kérdése, a kulcs elkészítése és programozása ennél hosszabb. Reális időbecslést " +
          "a telefonban tudunk adni, ha megmondja az autó típusát.",
      },
      {
        q: "Az elveszett kulcsot le lehet tiltani, hogy más ne tudja használni?",
        a:
          "A jármű típusától függ, hogy a régi kulcs érvényteleníthető-e a rendszerben. Ha ez fontos " +
          "Önnek, például mert a kulcs idegen kézbe kerülhetett, jelezze a hívásnál és " +
          "megnézzük, hogy az adott autónál mi a lehetőség.",
      },
    ],
    image: {
      src: "/images/elveszett-autokulcs.jpg",
      alt: "Új autókulcs készítése elveszett kulcs pótlásaként, a helyszínen",
    },
    detailImage: {
      src: "/images/elveszett-autokulcs-reszlet.jpg",
      alt: "Az autózár paramétereinek kiolvasása az új kulcs elkészítéséhez",
    },
    related: ["autokulcs-keszites", "autokulcs-masolas", "autokulcs-programozas"],
  },
  // ────────────────────────────────────────────────────────────────
  {
    slug: "autokulcs-masolas",
    nav: "Autókulcs másolás",
    h1: "Autókulcs másolás Budapesten: pótkulcs a helyszínen",
    metaTitle: "Autókulcs másolás Budapest: pótkulcs helyszínen",
    metaDescription:
      "Autókulcs másolás és pótkulcs készítés Budapesten, akár a helyszínen, immobilizer-programozással és távirányító-tanítással.",
    icon: "key",
    cardText:
      "Van még működő kulcsa? Készítünk róla másolatot, a programozással együtt.",
    lead:
      "A legolcsóbb és leggyorsabb eset az, amikor még van egy működő kulcsa. Ilyenkor a meglévő " +
      "kulcsról tudunk másolatot készíteni: kimarjuk a kulcsszárat és felprogramozzuk a benne lévő " +
      "chipet, hogy az autó valóban elinduljon vele.",
    bullets: [
      "Pótkulcs készítése meglévő kulcs alapján",
      "Kulcsszár marása modern kulcsmásoló géppel",
      "Immobilizer (indításgátló) chip programozása",
      "Távirányító gombok tanítása a központi zárhoz",
      "Kulcsház-elemcsere",
      "Kihajtható és távirányítós kulcsházak",
    ],
    sections: [
      {
        heading: "Miért ne várja meg, amíg elveszik az utolsó kulcs?",
        paragraphs: [
          "Ez a legfontosabb tanácsunk és pénzben is ez a legnagyobb különbség. Amíg van egy " +
            "működő kulcsa, a másolás egyszerű, gyors és jóval olcsóbb művelet.",
          "Ha viszont az utolsó kulcs is elvész, előbb ki kell nyitni az autót, ki kell olvasni a " +
            "zár paramétereit és nulláról kell felépíteni a kulcsot, ez több munka, több idő és " +
            "magasabb költség. Ha csak egyetlen kulcsa van, érdemes most csináltatni mellé egy pótkulcsot.",
        ],
      },
      {
        heading: "Mit jelent, hogy „a kulcs másolása nem elég”?",
        paragraphs: [
          "Egy modern autókulcs két külön dolgot tud. A kulcsszár mechanikusan nyitja az ajtót és " +
            "elfordul a gyújtáskapcsolóban. A benne lévő transzponder chip pedig az indításgátlóval " +
            "kommunikál, enélkül az autó elfordítja a motort, de nem indul be, vagy pár másodperc " +
            "után leáll.",
          "Ezért nem elég egy „sarki” kulcsmásolás: a chipet is programozni kell az autóhoz. " +
            "Mi mindkettőt elvégezzük és a helyszínen ki is próbáljuk, hogy a kulcs az ajtóban, " +
            "a gyújtáskapcsolóban és a központi záron is működik-e.",
        ],
      },
      {
        heading: "Mit hozzon magával?",
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
        q: "Mennyi idő alatt készül el egy pótkulcs?",
        a:
          "Ha van meglévő működő kulcs, a másolás és a programozás jellemzően a helyszínen, " +
          "egy kiszállás alatt elvégezhető. A pontos időt a kulcs típusa és az autó márkája " +
          "határozza meg, hívjon és megmondjuk.",
      },
      {
        q: "Mennyibe kerül az autókulcs másolás?",
        a:
          "Ez az autó márkájától, típusától, évjáratától és a kulcs fajtájától függ, egy egyszerű " +
          "kulcs és egy távirányítós, chipes kulcs között jelentős a különbség. Ezért nem adunk " +
          "általános árlistát: hívjon minket, mondja meg az autó típusát és évjáratát és konkrét " +
          "árat mondunk, mielőtt bármibe belekezdenénk.",
      },
      {
        q: "A helyszínen is tudnak kulcsot másolni?",
        a:
          "Igen, a kiszálló felszereléssel a másolás és a programozás jelentős része a helyszínen " +
          "elvégezhető, így Önnek nem kell az autót sehová elvinnie.",
      },
      {
        q: "A távirányító gombjait is beprogramozzák?",
        a:
          "Igen. A kulcs tanítása után a gomboknak működtetniük kell a központi zárat is, ezt a " +
          "munka végén közösen ki is próbáljuk.",
      },
    ],
    image: {
      src: "/images/autokulcs-masolas.jpg",
      alt: "Autókulcs marása professzionális kulcsmásoló gépen",
    },
    detailImage: {
      src: "/images/autokulcs-masolas-reszlet.jpg",
      alt: "Elkészült pótkulcs az eredeti autókulcs mellett",
    },
    related: ["autokulcs-programozas", "autokulcs-keszites", "elveszett-autokulcs"],
  },
  // ────────────────────────────────────────────────────────────────
  {
    slug: "autokulcs-keszites",
    nav: "Autókulcs készítés",
    h1: "Autókulcs készítés: új kulcs minden gyakori járműtípushoz",
    metaTitle: "Autókulcs készítés Budapest: új kulcs, pótkulcs",
    metaDescription:
      "Autókulcs készítés Budapesten: chipes, távirányítós és kihajtható kulcsok, programozással. Személyautó, kisteherautó, teherautó.",
    icon: "cut",
    cardText:
      "Új kulcs személyautóhoz, kisteherautóhoz és teherautóhoz, marással és programozással.",
    lead:
      "Kulcsot készíteni többféle helyzetben kell: elveszett az eredeti, eltört, elhasználódott, " +
      "vagy egyszerűen csak szeretne egy tartalékot. Mindegyik esetben ugyanaz az elv, a kulcs " +
      "akkor kész, ha nyit, indít és a gombjai is működnek.",
    bullets: [
      "Új kulcs készítése meglévő kulccsal vagy anélkül",
      "Chipes (transzponderes) kulcsok",
      "Távirányítós és kihajtható kulcsházak",
      "Elhasználódott, kopott kulcs cseréje",
      "Eltört kulcs pótlása",
      "Személygépkocsi, kisteherautó és teherautó",
    ],
    sections: [
      {
        heading: "Milyen kulcstípusokkal találkozunk leggyakrabban?",
        list: [
          "Egyszerű mechanikus kulcs, chip nélkül, jellemzően régebbi járműveken.",
          "Chipes (transzponderes) kulcs, a szárban vagy a fejben chip, ami az indításgátlóval kommunikál.",
          "Távirányítós kulcs, a chip mellett gombok is vannak a központi zárhoz.",
          "Kihajtható („bicska”) kulcs, a szár a házba hajtható, gyakran távirányítóval együtt.",
        ],
      },
      {
        heading: "Elkopott, nehezen forduló autókulcs",
        paragraphs: [
          "Nem csak akkor érdemes kulcsot csináltatni, ha elveszett. Egy évek óta használt kulcsszár " +
            "idővel lekopik, egyre nehezebben fordul és végül eltörik, jellemzően a legrosszabbkor, " +
            "a zárban. Ha azt veszi észre, hogy mozgatni, „keresgélni” kell a kulccsal a zárban, " +
            "az figyelmeztető jel.",
          "Ilyenkor a kulcsot nem a kopott darabról, hanem a zár paraméterei alapján érdemes " +
            "elkészíteni, hogy az új kulcs a gyári méretekhez illeszkedjen.",
        ],
      },
      {
        heading: "Mit érdemes megmondani telefonon?",
        list: [
          "Az autó márkája és típusa",
          "Az évjárat",
          "Van-e még működő kulcs",
          "Chipes vagy távirányítós-e a kulcs",
          "Hol van az autó",
        ],
      },
    ],
    faqs: [
      {
        q: "Minden autótípushoz tudnak kulcsot készíteni?",
        a:
          "A gyakorlatban az autók túlnyomó részéhez igen: személygépkocsihoz, kisteherautóhoz és " +
          "teherautóhoz. Kamionhoz és motorkerékpárhoz nem vállalunk munkát. Mivel a márka, a típus és az évjárat " +
          "meghatározza a megoldást, hívásnál mindig ezt kérdezzük először és őszintén megmondjuk, " +
          "ha valamit nem tudunk vállalni.",
      },
      {
        q: "Szükség van a régi kulcsra az újhoz?",
        a:
          "Nem feltétlenül. Ha van meglévő kulcs, a folyamat gyorsabb és olcsóbb. Ha nincs, akkor a " +
          "zár paramétereinek kiolvasásából készítjük el az új kulcsot.",
      },
      {
        q: "A kulcsházat is tudják cserélni, ha eltört?",
        a:
          "Igen, kihajtható és távirányítós kulcsházakkal is foglalkozunk, elemcserével együtt.",
      },
    ],
    image: {
      src: "/images/autokulcs-keszites.jpg",
      alt: "Különböző autókulcs-típusok: chipes, távirányítós és kihajtható kulcsok",
    },
    detailImage: {
      src: "/images/autokulcs-keszites-reszlet.jpg",
      alt: "Frissen kimart autókulcsszár a marógép satujában",
    },
    related: ["autokulcs-masolas", "autokulcs-programozas", "elveszett-autokulcs"],
  },
  // ────────────────────────────────────────────────────────────────
  {
    slug: "autokulcs-programozas",
    nav: "Autókulcs programozás",
    h1: "Autókulcs programozás és immobilizer tanítás",
    metaTitle: "Autókulcs programozás Budapest: immobilizer",
    metaDescription:
      "Autókulcs programozás, immobilizer tanítás és távirányító beállítás Budapesten. Nem indít a kulcs? A helyszínen megoldjuk.",
    icon: "chip",
    cardText:
      "Nem indít a kulcs, vagy nem működnek a gombjai? Programozzuk az immobilizert és a távirányítót.",
    lead:
      "Ha a kulcs mechanikusan elfordul, de az autó nem indul, vagy a gombok nem nyitják a " +
      "központi zárat, akkor rendszerint nem a kulcsszárral, hanem az elektronikával van baj. " +
      "Ezt OBD-csatlakozón keresztül, diagnosztikai eszközzel lehet rendezni.",
    bullets: [
      "Immobilizer (indításgátló) tanítása",
      "Új és meglévő kulcsok programozása az autóhoz",
      "Távirányító gombok tanítása a központi zárhoz",
      "Kulcsház elemcsere",
      "Programozás az autó OBD-csatlakozóján keresztül",
      "A zár paramétereinek kiolvasása",
    ],
    sections: [
      {
        heading: "Mikor van szükség programozásra?",
        list: [
          "Új vagy másolt kulcs készült és azt az autóhoz kell tanítani",
          "A kulcs elfordul, a motor forog, de nem indul be, vagy azonnal leáll",
          "A távirányító gombjai nem működtetik a központi zárat",
          "Elemcsere után „elfelejtette” magát a távirányító",
          "Használt autóhoz kapott kulcsot, ami nem kommunikál a járművel",
        ],
      },
      {
        heading: "Hogyan zajlik?",
        paragraphs: [
          "A programozás az autó OBD-csatlakozóján keresztül történik, diagnosztikai eszközzel. " +
            "A művelet során a kulcsban lévő chip és a jármű indításgátlója „megtanulják” egymást, " +
            "majd beállítjuk a távirányító funkciókat is.",
          "A munka végén nem elégszünk meg annyival, hogy a szoftver sikert jelez: kipróbáljuk, " +
            "hogy a kulcs elfordul-e az ajtóban, beindítja-e a motort és működik-e vele a központi zár.",
        ],
      },
      {
        heading: "Minden autónál megoldható?",
        paragraphs: [
          "A gyakorlatban az autók nagy részénél igen, de a márka, a típus és az évjárat " +
            "meghatározza, hogy pontosan milyen eljárás szükséges és néhány újabb, erősen " +
            "védett rendszernél a folyamat összetettebb. Ezért kérjük mindig az autó típusát " +
            "és évjáratát már a telefonban: így őszintén meg tudjuk mondani, mit tudunk vállalni.",
        ],
      },
    ],
    faqs: [
      {
        q: "Mit jelent az immobilizer tanítás?",
        a:
          "Az immobilizer az autó gyári indításgátlója. Csak akkor engedi elindítani a motort, ha a " +
          "kulcsban lévő chip kódját felismeri. A tanítás során ezt a kódot rögzítjük az autó " +
          "rendszerében, hogy az adott kulccsal el lehessen indítani a járművet.",
      },
      {
        q: "Elemcsere után nem működik a távirányítóm. Ez javítható?",
        a:
          "Legtöbbször igen. Elemcsere után egyes kulcsoknál újra kell szinkronizálni a távirányítót " +
          "a járművel, ez rövid művelet és a helyszínen elvégezhető.",
      },
      {
        q: "Használt autóhoz kaptam egy második kulcsot, de nem indít. Mit lehet tenni?",
        a:
          "Ha a kulcsszár fizikailag illeszkedik, jellemzően a chip programozása hiányzik. Ezt " +
          "tudjuk pótolni. Hozza magával mindkét kulcsot és a forgalmi engedélyt.",
      },
    ],
    image: {
      src: "/images/autokulcs-programozas.jpg",
      alt: "Autókulcs programozása diagnosztikai eszközzel az OBD-csatlakozón keresztül",
    },
    detailImage: {
      src: "/images/autokulcs-programozas-reszlet.jpg",
      alt: "Diagnosztikai készülék kijelzője az immobilizer tanítása közben",
    },
    related: ["autokulcs-masolas", "autokulcs-keszites", "elveszett-autokulcs"],
  },
  // ────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────
  {
    slug: "serulesmentes-autonyitas",
    nav: "Sérülésmentes autónyitás",
    h1: "Sérülésmentes autónyitás: hogyan dolgozunk?",
    metaTitle: "Sérülésmentes autónyitás Budapesten",
    metaDescription:
      "Hogyan zajlik a sérülésmentes autónyitás? Milyen szerszámmal dolgozunk és miért nem sérül a zár vagy a tömítés? Budapest, 0–24.",
    icon: "shield",
    cardText:
      "Roncsolásmentes technika, erre kifejlesztett szerszámokkal, az ajtó, a zár és a tömítés sértetlen marad.",
    lead:
      "A „sérülésmentes” nálunk nem marketingszó, hanem munkamódszer. Az a cél, hogy a nyitás után " +
      "az autón semmi ne emlékeztessen arra, hogy ki volt zárva belőle: ne legyen karc a lakkon, " +
      "ne legyen meggyűrődött ajtókeret és ne kelljen zárat cserélni.",
    bullets: [
      "Erre a célra fejlesztett, professzionális nyitószerszámok",
      "A zárszerkezet és az ajtótömítés épségben marad",
      "Nincs betört ablak és nincs kifeszített ajtókeret",
      "A helyszínen, a jármű elszállítása nélkül",
      "Minden gyakori járműtípusra",
    ],
    sections: [
      {
        heading: "Miért nem érdemes saját kezűleg próbálkozni?",
        paragraphs: [
          "A neten keringő módszerek, ék és drót, teniszlabda, vonalzó, modern autókon nem " +
            "működnek, viszont könnyen kárt okoznak. A leggyakoribb következmény a meggyűrődött " +
            "ajtókeret, a felsértett lakk, a szakadt ajtótömítés (ami után az autó beázik és fütyül " +
            "az ajtó), illetve a megsérült ablakemelő-mechanika.",
          "Ezek javítása rendszerint sokszorosa a szakszerű nyitás költségének és a kár egy része " +
            "később, esőben vagy autópályán derül ki. Egy telefonhívás mindig olcsóbb.",
        ],
      },
      {
        heading: "És ha az ablak be van törve, vagy a zár már hibás?",
        paragraphs: [
          "Ha a jármű zárja már a hívás előtt meghibásodott, vagy valaki korábban megpróbálta " +
            "felfeszíteni, azt a helyszínen, munka előtt jelezzük. Nem kezdünk bele úgy, hogy " +
            "Ön ne tudná pontosan, mire számíthat. Az őszinte helyzetértékelés része a szolgáltatásnak.",
        ],
      },
      {
        heading: "A nyitás gyakran csak az első lépés",
        paragraphs: [
          "Ha a kulcs nem egyszerűen bent maradt, hanem elveszett vagy eltört, a nyitás után " +
            "jön a munka érdemi része: a zár paramétereinek kiolvasása, az új kulcs elkészítése " +
            "és programozása. Ezt jellemzően ugyanott, ugyanabban a kiszállásban meg tudjuk oldani.",
        ],
      },
    ],
    faqs: [
      {
        q: "Mit jelent pontosan a sérülésmentes autónyitás?",
        a:
          "Azt, hogy a jármű kinyitása nem jár roncsolással: nem törünk ablakot, nem feszítjük ki az " +
          "ajtót és nem cseréljük a zárat. Erre a célra készült szerszámokkal dolgozunk, hogy az " +
          "autó a nyitás után is ugyanolyan állapotban legyen, mint előtte.",
      },
      {
        q: "Minden autótípusnál működik ez a módszer?",
        a:
          "A gyakorlatban az autók túlnyomó részénél igen: személygépkocsinál, kisteherautónál és " +
          "teherautónál. Kamionnál és motorkerékpárnál nem vállalunk munkát. A típus és az évjárat ismeretében a telefonban " +
          "meg tudjuk mondani, mire számíthat.",
      },
      {
        q: "Mennyi ideig tart maga a nyitás?",
        a:
          "A nyitás maga általában néhány perc. A teljes idő nagyobb részét a kiérkezés teszi ki, " +
          "ami Budapesten belül jellemzően 20–30 perc.",
      },
    ],
    image: {
      src: "/images/autonyitas.jpg",
      alt: "Nyitott ajtajú autó az utcán, mellette kiterített szerszámkészlet",
    },
    detailImage: {
      src: "/images/serulesmentes-autonyitas-reszlet.jpg",
      alt: "Sértetlen ajtótömítés és zárszerkezet a roncsolásmentes nyitás után",
    },
    related: ["elveszett-autokulcs", "autokulcs-masolas", "autokulcs-keszites"],
  },
];

/** Egy szolgáltatás keresése slug alapján. */
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Kapcsolódó szolgáltatások feloldása (belső linkeléshez). */
export function relatedServices(service: Service): Service[] {
  return service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));
}
