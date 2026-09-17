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
  /**
   * Szakaszon belüli fotó, a szöveg után. Csak valódi munkáról készült
   * kép kerülhet ide, illusztráció nem. A fejlécképpel ellentétben nem
   * kötelező: ha nincs megadva, a szakasz csak szöveget mutat.
   */
  image?: { src: string; alt: string };
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
  /**
   * A szöveget és a fotókat a tulajdonos adta, egy 2026 szeptemberi
   * valódi munkáról. A megfogalmazáson csak az oldal stílusszabályai
   * szerint igazítottunk (hosszú kötőjel helyett vessző vagy kettőspont,
   * „és” előtt nincs vessző, „kulcs” helyett „autókulcs”), a tartalmi
   * állításokhoz nem nyúltunk.
   */
  {
    slug: "volkswagen-mqb-keyless-kulcsprogramozas",
    /**
     * A tulajdonos eredeti címe ennél jóval hosszabb volt („…: márkakereskedési
     * minőség, gyorsabban és kedvezőbb áron”). Hat sorban tördelődött a
     * cikkfejlécben és a listakártyán is, ezért a többi cikk hosszához
     * igazítottuk. A teljes állítás a szövegben és a meta leírásban megmaradt.
     */
    title: "Volkswagen MQB 5C Keyless gyári autókulcs programozása",
    excerpt:
      "Egy ügyfelünk Volkswagenjéhez elveszett az egyik Keyless autókulcs. Gyári kulcsot programoztunk hozzá, az elveszett autókulcsot pedig töröltük a járműhöz engedélyezett kulcsok közül.",
    category: "programozas",
    date: "2026-09-17",
    image: {
      src: "/images/blog/volkswagen-keyless-autokulcs-programozas.jpg",
      alt: "Két gyári Volkswagen Keyless autókulcs a jármű utasterében, a programozás után",
    },
    metaTitle: "Volkswagen MQB 5C Keyless gyári autókulcs programozása",
    metaDescription:
      "Elveszett egy Volkswagen Keyless autókulcs? Gyári kulcsot programozunk az MQB 5C rendszerhez, az elveszett autókulcsot pedig töröljük a jármű rendszeréből.",
    readingMinutes: 5,
    lead:
      "Egy újabb Volkswagen autókulcsának elvesztése ma már jóval összetettebb probléma, " +
      "mint egy hagyományos autókulcs egyszerű lemásolása. Az MQB 5C rendszerrel és Keyless " +
      "Go funkcióval szerelt Volkswagen modelleknél az autókulcs az autó elektronikus " +
      "biztonsági rendszerének szerves része, ezért a megfelelő kulcs elkészítéséhez " +
      "professzionális eszközökre, naprakész szakmai tudásra és megfelelő programozási " +
      "eljárásra van szükség.",
    sections: [
      {
        heading: "Gyári Volkswagen autókulcs, kompromisszumok nélkül",
        paragraphs: [
          "Nemrég egy ügyfelünk pontosan ilyen problémával keresett meg minket: Volkswagen " +
            "gépjárművéhez elveszett az egyik Keyless autókulcs, ezért nem egyszerűen egy " +
            "másolatot szeretett volna, hanem egy teljes értékű, az autóhoz megfelelő gyári " +
            "kulcsot, valamint azt, hogy az elveszett autókulcs többé ne legyen használható " +
            "az autóhoz.",
          "Az adott járműhöz gyári Volkswagen autókulcsot tudtunk biztosítani és " +
            "felprogramozni. Ez azért fontos, mert az ügyfél így nem egy gyengébb minőségű " +
            "utángyártott megoldást kapott, hanem olyan autókulcsot, amely minőségében, " +
            "működésében és használati élményében megfelel az eredeti kulcsnak.",
          "A Keyless funkciók, a távirányítás és az immobilizer megfelelő működése egyaránt " +
            "megmaradt. Az elkészült autókulcs tehát nem csupán elindítja az autót: teljes " +
            "értékű kulcsként működik a járművel.",
          "Mindezt úgy tudtuk megoldani, hogy az ügyfél számára a teljes folyamat jóval " +
            "kedvezőbb költséget jelentett, mint egy hagyományos márkakereskedési " +
            "kulcsrendelés, miközben gyári kulcsot kapott.",
        ],
      },
      {
        heading: "Mi történik az elveszett autókulccsal?",
        paragraphs: [
          "Kulcselvesztésnél számunkra nem csak az a fontos, hogy az új autókulcs működjön.",
          "Az elveszett autókulcsot a programozási folyamat során töröltük a járműhöz " +
            "engedélyezett kulcsok közül, így az már nem maradt aktív, használható kulcsként " +
            "az autó rendszerében.",
          "Ez biztonsági szempontból különösen fontos. Ha valaki később megtalálja az " +
            "elveszett autókulcsot, ne maradjon ugyanolyan jogosultsága az autóhoz, mint " +
            "korábban.",
          "A programozás során a jármű kulcsadatait és a kulcsazonosításhoz kapcsolódó " +
            "adatokat is megfelelően rendeztük, így az autó rendszere a ténylegesen meglévő " +
            "kulcsállománynak megfelelő állapotba került.",
          "A művelet után az autó diagnosztikai és kulcskezelési szempontból is rendezett " +
            "állapotban marad: nem egyszerűen hozzáadunk még egy autókulcsot, hanem " +
            "szakszerűen kezeljük a korábbi és az új kulcsok jogosultságát is.",
        ],
        image: {
          src: "/images/blog/volkswagen-muszerfal-key-mode.jpg",
          alt: "A Volkswagen műszerfali kijelzője a programozás után, a Key mode 2-2 kijelzéssel",
        },
      },
      {
        heading:
          "CASCO és biztosítás szempontjából is fontos az elveszett autókulcs törlése",
        paragraphs: [
          "Egy elveszett autókulcs biztosítási szempontból sem elhanyagolható.",
          "Éppen ezért fontos, hogy kulcselvesztés esetén ne csak készüljön egy új " +
            "autókulcs, hanem az elveszett kulcs jogosultságát is megfelelően kezeljük és " +
            "szükség esetén a munkavégzés dokumentálható legyen.",
          "Az adott biztosító vagy CASCO-szerződés feltételei eltérhetnek, ezért egy " +
            "esetleges káreseménynél mindig az adott biztosítási feltételek az irányadók. " +
            "Szakszerű kulcspótlással azonban az autó tényleges kulcsállománya rendezhető, " +
            "az elveszett autókulcs pedig törölhető a rendszerből.",
          "Ez jelentős különbség egy egyszerű kulcsmásoláshoz képest.",
        ],
      },
      {
        heading: "Miért érdemes hozzánk fordulni a márkakereskedés helyett?",
        paragraphs: [
          "Az új generációs Volkswagen autókulcsok programozása speciális terület. Mi napi " +
            "szinten foglalkozunk autókulcsokkal, immobilizer-rendszerekkel és elveszett " +
            "kulcsok pótlásával, ezért az ügyfélnek nem kell heteket töltenie azzal, hogy " +
            "különböző megoldásokat keressen.",
          "Ebben az esetben is az volt a célunk, hogy az ügyfél gyorsan, professzionálisan " +
            "és a lehető legkevesebb kellemetlenséggel kapja vissza az autójához a megfelelő " +
            "számú működő autókulcsot.",
        ],
        list: [
          "Gyári Volkswagen autókulcs az autóhoz.",
          "Az MQB 5C és a Keyless rendszer szakszerű programozása.",
          "Az elveszett autókulcs törlése a jogosult kulcsok közül.",
          "A kulcsadatok megfelelő rendezése.",
          "Az eredeti funkciók megtartása.",
          "Gyorsabb ügyintézés.",
          "Kedvezőbb ár a márkakereskedési megoldáshoz képest.",
          "Professzionális, autókulcsokra specializálódott szolgáltatás.",
        ],
      },
      {
        heading:
          "Elveszett Volkswagen Keyless autókulcs? Nem feltétlenül a márkakereskedés az egyetlen megoldás",
        paragraphs: [
          "Sokan még mindig úgy gondolják, hogy egy modern Volkswagen MQB vagy MQB 5C " +
            "rendszerű autó kulcsának elvesztése esetén kizárólag a márkaszerviz tud " +
            "segíteni. Ez nem feltétlenül igaz.",
          "Megfelelő szakmai háttérrel és technológiával számos esetben gyári minőségű, " +
            "teljes értékű megoldást tudunk biztosítani, ráadásul lényegesen gyorsabban és " +
            "kedvezőbb áron.",
          "Az ügyfél ebben az esetben is úgy távozott, hogy ismét rendelkezett a szükséges " +
            "működő autókulcsokkal, az elveszett kulcsot pedig eltávolítottuk a használható " +
            "kulcsok közül.",
          "Ha Volkswagen MQB 5C Keyless autókulcsát elvesztette, pótkulcsot szeretne, vagy " +
            "teljes kulcsvesztés történt, érdemes először minket keresnie.",
          "Nem egy univerzális kulcsot próbálunk „ráprogramozni” az autóra: az adott " +
            "járműhöz megfelelő megoldást választjuk, szakszerűen programozzuk és a " +
            "kulcsrendszert rendezett állapotban adjuk át.",
        ],
      },
      {
        heading: "Autókulcs Doki: modern autókhoz modern kulcsmegoldások",
        paragraphs: [
          "Gyári autókulcs, professzionális programozás, gyors ügyintézés, kedvezőbb ár.",
          "Volkswagen MQB, MQB 5C és Keyless Go kulcspótlás, elveszett autókulcs pótlása és " +
            "autókulcs-programozás Budapesten és környékén.",
          "Elveszett a Volkswagen autókulcsa? Keressen minket még azelőtt, hogy heteket " +
            "várna egy márkakereskedési kulcsrendelésre.",
        ],
      },
    ],
    relatedServices: [
      "autokulcs-programozas",
      "elveszett-autokulcs",
      "autokulcs-keszites",
    ],
  },

  /**
   * Ez a cikk 2026-09-17-én már élt a weboldalon, de a forráskódba nem
   * került be: csak a legenerált gh-pages ágra volt feltöltve. Emiatt a
   * következő élesítés letörölte volna. A szöveget szó szerint, változtatás
   * nélkül emeltük vissza az élő oldalról. A tömbben azért áll elöl, mert a
   * tudásbázis listaoldala az első elemet mutatja kiemelt cikként.
   */
  {
    slug: "bent-maradt-az-autokulcs",
    title: "Bent maradt az autókulcs a kocsiban – mit tegyen, és mit ne?",
    excerpt:
      "A kulcs az ülésen, az ajtó zárva. Végigvesszük, mit érdemes elsőként végigpróbálni, mikor kell azonnal segítséget hívni, és melyek azok a „házi” módszerek, amik többe kerülnek, mint a nyitás.",
    category: "autonyitas",
    date: "2026-09-17",
    image: {
      src: "/images/autonyitas.jpg",
      alt: "Nyitott ajtajú autó az utcán, mellette kiterített nyitószerszámok",
    },
    metaTitle: "Bent maradt az autókulcs a kocsiban – mi a teendő?",
    metaDescription:
      "Bezárta az autókulcsot a kocsiba? Elmondjuk, mit próbáljon meg elsőként, mikor hívjon azonnal segítséget, és mit ne csináljon semmiképp.",
    readingMinutes: 4,
    lead:
      "Ez néhány másodperc alatt megtörténik: becsapja az ajtót, és abban a pillanatban " +
      "megpillantja az autókulcsot az ülésen. A helyzet kellemetlen, de önmagában nem " +
      "veszélyes – és jellemzően úgy megoldható, hogy az autón nyoma sem marad. A sorrend " +
      "viszont számít.",
    sections: [
      {
        heading: "Először nyugodjon meg, és nézzen körbe",
        paragraphs: [
          "Mielőtt bárkit hív, érdemes végigpróbálni néhány dolgot. Nem ritka, hogy az autó " +
            "mégsem teljesen zárt: próbálja meg mind a négy ajtót és a csomagtartót külön-külön. " +
            "Egy kombinál vagy ferdehátúnál a csomagtér felől a hátsó ülés ledönthető, és így " +
            "hozzá lehet jutni a kulcshoz.",
          "Gondolja át azt is, hol van a második autókulcs. Ha otthon, a munkahelyén vagy egy " +
            "családtagnál megvan, sokszor egyszerűbb érte menni vagy elkérni, mint bármi más. " +
            "Ha viszont nincs második kulcs – vagy megvan, de messze –, akkor jön a hívás.",
          "Amit érdemes még a hívás előtt tisztázni: hol áll pontosan az autó, mi a márkája, " +
            "a típusa és az évjárata. Ezekből a telefonban meg tudjuk mondani, mire számíthat.",
        ],
      },
      {
        heading: "Van, amikor nem szabad várni",
        paragraphs: [
          "Egy eset van, ahol nem a nyitási módszer a kérdés, hanem az idő: ha gyerek vagy házi " +
            "állat maradt a lezárt autóban. Zárt autó belseje napsütésben rövid idő alatt is " +
            "életveszélyesen felmelegszik, és ez nem csak nyáron igaz.",
          "Ilyenkor azonnal hívja a 112-es segélyhívót. Ez nem szakmai kérdés és nem kényelmi " +
            "kérdés – ilyen helyzetben a katasztrófavédelem és a mentők érkeznek elsőként, és ők " +
            "döntenek arról, hogyan nyitják ki a járművet. A gyors nyitás ilyenkor mindennél " +
            "előbbre való, akkor is, ha kár keletkezik.",
        ],
      },
      {
        heading: "Amit semmiképp ne tegyen",
        paragraphs: [
          "Az interneten és a videómegosztókon keringő „házi” módszerek modern autókon nem " +
            "működnek, viszont könnyen kárt okoznak. A leggyakoribb következmény a meggyűrődött " +
            "ajtókeret, a felsértett lakk, a szakadt ajtótömítés és a megsérült " +
            "ablakemelő-mechanika.",
          "A dolog kellemetlen része az, hogy a kár nem mindig derül ki rögtön. A szakadt " +
            "ajtótömítés első esőben vagy autópályán jelentkezik: beázik az ajtó, fütyül a " +
            "menetszél. Ennek a javítása jóval többe kerül, mint maga a szakszerű nyitás.",
        ],
        list: [
          "Ne feszítsen éket, vonalzót vagy csavarhúzót az ajtó és a keret közé.",
          "Ne próbálkozzon dróttal vagy akasztóval a gumitömítés alatt.",
          "A teniszlabdás „trükk” nem működik – ilyen módon egyetlen központi zár sem nyílik.",
          "Ne törjön ablakot, amíg nem életveszélyes a helyzet: az üveg cseréje és a szilánkok " +
            "eltakarítása sokkal nagyobb munka, mint gondolná.",
          "Ne engedje, hogy egy arra járó „ismerős szakember” feszegetni kezdje az autót.",
        ],
      },
      {
        heading: "Mi történik, amikor kiérkezünk?",
        paragraphs: [
          "A nyitás erre a célra fejlesztett szerszámokkal, roncsolásmentesen történik: nem törik " +
            "ablak, nem feszül ki az ajtókeret, és nem kell zárat cserélni. Maga a nyitás " +
            "általában néhány perc; a teljes időt nagyrészt a kiérkezés adja, ami Budapesten " +
            "belül jellemzően 20–30 perc.",
          "Ha a helyszínen az derül ki, hogy a jármű zárja már a hívás előtt hibás volt, vagy " +
            "valaki korábban megpróbálta felfeszíteni, azt munka előtt elmondjuk. Nem kezdünk " +
            "bele úgy, hogy Ön ne tudná, mire számíthat.",
          "Dolgozunk éjjel és hétvégén is, a hét minden napján. A bezárt autókulcs jellemzően " +
            "nem munkaidőben történik meg.",
        ],
      },
      {
        heading: "Bent maradt kulcs vagy elveszett kulcs?",
        paragraphs: [
          "Ez a két helyzet kívülről hasonlít, de nem ugyanaz. Ha a kulcs bent van és jó, akkor " +
            "a nyitással a történet véget ér: kinyitjuk az autót, Ön elveszi a kulcsot, és mehet " +
            "tovább.",
          "Ha viszont a kulcs elveszett vagy eltört, a nyitás csak az első lépés. Utána jön a zár " +
            "adatainak kiolvasása, az új autókulcs elkészítése és a programozás – ezt jellemzően " +
            "ugyanabban a kiszállásban meg tudjuk oldani, ha a hívásnál jelzi.",
          "Külön eset a keyless rendszer: ott előfordul, hogy a kulcs az autóban van, a jármű " +
            "mégis bezárja magát. Ilyenkor gyakran a kulcs elemével van a gond, nem magával a " +
            "kulccsal. Erről is érdemes szólni telefonban.",
        ],
      },
      {
        heading: "Hogy ne fordulhasson elő újra",
        paragraphs: [
          "A bezárt autókulcs azért kellemetlen, mert mindig rosszkor történik. Két egyszerű " +
            "dolog van, ami szinte teljesen kiveszi a képletből.",
          "Az első: legyen egy második, működő autókulcs, és ne ugyanabban a zsebben vagy " +
            "táskában hordja, mint az elsőt. A pótkulcs mindig olcsóbb addig, amíg van egy " +
            "működő kulcs, amiről másolni lehet.",
          "A második: szokja meg, hogy mindig a kulccsal a kezében csapja be az ajtót – nem " +
            "azután. Apróság, de ez az a pillanat, ahol a baj megtörténik.",
        ],
      },
    ],
    faqs: [
      {
        q: "Be kell törni az ablakot, ha bent maradt az autókulcs?",
        a:
          "A szokásos esetekben nem. A járművek túlnyomó részénél a nyitás roncsolásmentesen " +
          "megoldható, erre a célra készült szerszámokkal. Ablaktörésre csak akkor kerül sor, " +
          "ha életveszély áll fenn – például gyerek vagy állat maradt a lezárt autóban –, és " +
          "ilyenkor a 112-t kell hívni.",
      },
      {
        q: "Éjjel vagy hétvégén is kijönnek?",
        a:
          "Igen, a hét minden napján, a nap 24 órájában. Hívja a megadott számot, vagy írjon " +
          "WhatsAppon vagy Viberen.",
      },
      {
        q: "Mit kérdeznek majd telefonban?",
        a:
          "Azt, hogy hol áll az autó, mi a márkája, a típusa és az évjárata, és hogy a kulcs " +
          "bent maradt-e, vagy elveszett. Ebből tudunk időt és árat mondani még a kiszállás " +
          "előtt.",
      },
      {
        q: "Igazolnom kell, hogy az enyém az autó?",
        a:
          "Igen, és ez az Ön érdeke. A munka előtt megkérjük a forgalmi engedélyt és a " +
          "személyazonosító okmányát – pontosan azért, hogy ne lehessen más autójához így " +
          "hozzájutni.",
      },
    ],
    relatedServices: ["serulesmentes-autonyitas", "elveszett-autokulcs", "autokulcs-masolas"],
  },

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
