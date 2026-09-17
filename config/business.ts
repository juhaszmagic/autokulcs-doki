/**
 * ============================================================================
 *  KÖZPONTI ÜZLETI KONFIGURÁCIÓ  —  egyetlen igazságforrás
 * ============================================================================
 *
 *  Ha bármelyik adat változik (telefonszám, cím, nyitvatartás, Google
 *  értékelés), CSAK EZT A FÁJLT kell módosítani. Az egész weboldal — a
 *  fejléc, a lábléc, a strukturált adatok (schema.org), a sitemap és minden
 *  CTA — ebből olvas.
 *
 *  ⚠️  SZABÁLY: ide kizárólag VALÓS, ellenőrzött adat kerülhet.
 *      Kitalált ár, kitalált vélemény vagy kitalált értékelésszám tilos.
 * ============================================================================
 */

export const business = {
  /** Márkanév — ez jelenik meg a fejlécben és a címsorokban. */
  name: "Autókulcs Doki",

  /** Rövid név szűk helyekre (mobil fejléc). */
  shortName: "Autókulcs Doki",

  /**
   * A Google Cégprofilban jelenleg szereplő név.
   * ⚠️ FONTOS: ez eltér a fenti márkanévtől. A lokális SEO akkor a
   * legerősebb, ha a weboldal neve és a Google Cégprofil neve megegyezik.
   * Lásd: AUDIT.md → „Nyitott kérdések”.
   */
  gbpName: "Autókulcs másolás programozás 0-24",

  tagline: "Elveszett autókulcs pótlása Budapesten és környékén, 0–24",

  description:
    "Elveszett autókulcs pótlása, autókulcs másolás és programozás Budapesten és " +
    "környékén. Meglévő kulcs nélkül is készítünk újat, a helyszínen, a hét minden " +
    "napján, a nap 24 órájában.",

  // ——————————————————————————————————————————————————————————————
  //  TELEFON  —  a weboldal elsődleges konverziós csatornája
  // ——————————————————————————————————————————————————————————————
  phone: {
    /**
     * A cég EGYETLEN hivatalos telefonszáma.
     *
     * Ez szerepel a Google Cégprofilon, a TikTok-profil bemutatkozásában
     * és a Facebook-oldalon is — vagyis mindenhol ez a szám azonosítja a
     * vállalkozást. A régi weboldalon szereplő másik szám
     * (+36 30 884 3122) kikerült, hogy a NAP-adat mindenhol egyezzen.
     */
    primary: {
      display: "+36 30 685 01 33",
      href: "tel:+36306850133",
      e164: "+36306850133",
    },
    /** Nincs másodlagos szám. Ha lesz, ide kerülhet ugyanilyen szerkezettel. */
    secondary: null as { display: string; href: string; e164: string } | null,
  },

  /**
   * ÜZENETKÜLDŐK — a telefon mellett ezeken is írhat az ügyfél.
   *
   * Ugyanaz a szám, mint a telefon: +36 30 685 01 33. Ez szerepel a
   * Google Cégprofilon, a TikTokon és a Facebookon is.
   */
  messaging: {
    whatsapp: {
      /** wa.me formátum: ország- és körzetszám, + és szóköz nélkül. */
      url: "https://wa.me/36306850133",
      label: "WhatsApp",
    },
    viber: {
      /** A viber:// séma a telefonon nyitja meg a beszélgetést. */
      url: "viber://chat?number=%2B36306850133",
      label: "Viber",
    },
  },

  /**
   * E-mail cím.
   * A jelenlegi weboldalon SEHOL nem szerepel e-mail cím — ezért nem
   * találunk ki egyet. Amint van hivatalos cím, ide kell beírni, és
   * automatikusan megjelenik a Kapcsolat oldalon és a láblécben.
   */
  email: null as string | null,

  // ——————————————————————————————————————————————————————————————
  //  CÍM (NAP)  —  végig azonosan jelenik meg az egész oldalon
  // ——————————————————————————————————————————————————————————————
  address: {
    street: "Nagyida köz 5/B",
    city: "Budapest",
    /**
     * ⚠️ JAVÍTVA: a régi weboldal minden oldalán „2111 Budapest” szerepelt.
     * A 2111 NEM budapesti irányítószám (az Szada irányítószáma).
     * A Google Cégprofil szerint a helyes irányítószám: 1112 (XI. kerület).
     */
    postalCode: "1112",
    country: "Magyarország",
    countryCode: "HU",

    /**
     * Kerület. Az 1112-es irányítószám a XI. kerülethez tartozik (Újbuda).
     * Külön mezőben, mert a látogatók gyakran kerületben gondolkodnak, nem
     * irányítószámban — és jó, ha rögtön látják, honnan indulunk.
     */
    district: "XI. kerület",
    districtName: "Újbuda",
    /** Egysoros formátum — a strukturált adatokhoz és a láblécbe. */
    full: "1112 Budapest, Nagyida köz 5/B",

    /** Kerülettel kiegészítve — ahol a látogatónak segít tájékozódni. */
    fullWithDistrict: "1112 Budapest, Nagyida köz 5/B (XI. kerület)",

    /**
     * ⚠️ ELTÉRÉS, AMIT TISZTÁZNI KELL
     * A cég Facebook-oldalán MÁS cím szerepel: „Bakfű utca 10, 1112".
     * A Google Cégprofilon és a TikTok-profilon egyaránt a Nagyida köz 5/b
     * áll, ezért a weboldalon ez utóbbi maradt.
     *
     * A lokális SEO-nak árt, ha a három felületen két különböző cím van —
     * a tulajdonosnak el kell döntenie, melyik a hivatalos, és a másikat
     * javítani kell. Ha a Bakfű utca a helyes, csak ezt a fájlt kell átírni.
     */
  },

  /**
   * Földrajzi koordináták a LocalBusiness schemához.
   * Forrás: Google Cégprofil (Nagyida köz 5/B, 1112 Budapest).
   */
  geo: {
    latitude: 47.4708,
    longitude: 19.0128,
  },

  // ——————————————————————————————————————————————————————————————
  //  NYITVATARTÁS  —  forrás: a jelenlegi weboldal („0-24”)
  // ——————————————————————————————————————————————————————————————
  hours: {
    display: "Non-stop, a hét minden napján",
    short: "0–24",
    /** schema.org openingHours formátum. */
    schema: "Mo-Su 00:00-23:59",
    alwaysOpen: true,
  },

  // ——————————————————————————————————————————————————————————————
  //  SZOLGÁLTATÁSI TERÜLET
  // ——————————————————————————————————————————————————————————————
  serviceArea: {
    primary: "Budapest és vonzáskörzete",
    /** Budapest kerületei — a Kapcsolat oldal ellátási terület blokkjához. */
    districts: [
      "I.", "II.", "III.", "IV.", "V.", "VI.", "VII.", "VIII.", "IX.", "X.", "XI.",
      "XII.", "XIII.", "XIV.", "XV.", "XVI.", "XVII.", "XVIII.", "XIX.", "XX.",
      "XXI.", "XXII.", "XXIII.",
    ],
    /**
     * Agglomerációs települések.
     *
     * Forrás kettős, mindkettő valós adat:
     *  • a cég saját Facebook-oldalán felsorolt ellátási terület
     *  • a tulajdonos kiegészítése (2026-09-07): Telki, Páty, Vecsés,
     *    Gyál, Herceghalom, Zsámbék, Üröm
     *
     * Betűrendben, mert így könnyű benne megtalálni a saját települést.
     *
     * ℹ️ „Herceghalom" — z nélkül a hivatalos írásmód. A településnevekre
     *    pontosan így keresnek, ezért a helyes alak a lokális SEO-nak is
     *    jobb; egy elgépelt név ráadásul gondatlanságnak látszik.
     */
    towns: [
      "Biatorbágy",
      "Budakeszi",
      "Budaörs",
      "Dunakeszi",
      "Érd",
      "Gyál",
      "Halásztelek",
      "Herceghalom",
      "Mogyoród",
      "Páty",
      "Szentendre",
      "Telki",
      "Törökbálint",
      "Üröm",
      "Vecsés",
      "Zsámbék",
    ],
  },

  // ——————————————————————————————————————————————————————————————
  //  ÁRAZÁS
  //  Forrás: a tulajdonos közlése (2026-09-07).
  //
  //  ⚠️ SZABÁLY: ez INDIKATÍV kiindulóár, nem árlista. Mindig „-tól"
  //     formában, és mindig a mellette lévő magyarázattal jelenjen meg —
  //     a pontos ár az autó márkájától, évjáratától és a kulcs típusától
  //     függ, és telefonon / WhatsAppon / Viberen dől el.
  //     Konkrét szolgáltatásra lebontott árat NE írjunk ki, amíg a
  //     tulajdonos nem ad meg ilyet.
  // ——————————————————————————————————————————————————————————————
  pricing: {
    /** A legkisebb reális munka kiindulóára, forintban. */
    fromAmount: 25000,
    /** Megjelenítéshez, magyar tagolással. */
    fromDisplay: "25 000 Ft",
    /** Rövid, mindenhol egységes megfogalmazás. */
    fromLabel: "25 000 Ft-tól",
    note:
      "Az ár az autó márkájától, típusától, évjáratától és a kulcs fajtájától " +
      "függ. A pontos árat telefonon, WhatsAppon vagy Viberen egyeztetjük, " +
      "még a kiszállás előtt.",

    /**
     * TÍPUSONKÉNTI ÁRSÁVOK
     *
     * Forrás: a tulajdonos (Juhász Marcell) által megadott valós árak,
     * 2026-09-08. Nem becslés és nem kitalált érték.
     *
     * A `from: true` azt jelenti, hogy az összeg kiindulóár, tehát
     * „-tól" jelöléssel írandó ki.
     */
    tiers: [
      {
        name: "Távirányító nélküli kulcs",
        amount: 25000,
        from: false,
        text:
          "Mechanikus kulcs, távirányító nélkül. Kinyitja az ajtót és elindítja " +
          "az autót, de nincs rajta gomb a központi zárhoz.",
      },
      {
        name: "Távirányítós kulcs",
        amount: 45000,
        from: false,
        text:
          "Gombnyomásra nyit és zár. Ha az autóban van központi zár, ezt érdemes " +
          "választani, ez a legkényelmesebb megoldás.",
        recommended: true,
      },
      {
        name: "Keyless kulcs",
        amount: 60000,
        from: true,
        text:
          "Akkor kell, ha az autó gombnyomásra indul és a kulcsot elég a zsebben " +
          "tartani. Néhány típusnál más a megoldás, Volkswagen, Škoda és Seat " +
          "esetén ezt külön egyeztetjük.",
      },
      {
        name: "Elveszett az összes kulcs",
        amount: 60000,
        to: 70000,
        from: true,
        text:
          "Ha egyetlen működő kulcs sem maradt. Ezt a legnehezebb előre belőni: egy " +
          "25 éves Suzuki és egy 5 éves BMW között nagy a különbség és nem mindig " +
          "az újabb autó a bonyolultabb. A pontos árat itt mindig telefonon mondjuk meg.",
      },
    ] as ReadonlyArray<{
      name: string;
      amount: number;
      to?: number;
      from: boolean;
      text: string;
      recommended?: boolean;
    }>,

    /**
     * MŰKÖDÉSI MODELL — 2026-09-08, a tulajdonos pontosítása.
     *
     * A feltüntetett árak arra az esetre vonatkoznak, amikor az ügyfél
     * ELHOZZA az autót a telephelyre. Ez mindkét félnek jobb: az
     * ügyfélnek olcsóbb, a vállalkozásnak hatékonyabb.
     *
     * Kiszállás esetén +10 000 Ft felár. Kiszállás mindig van akkor, ha
     * az összes kulcs elveszett — olyankor az autó nem is tud eljönni.
     */
    onSite: {
      /** Kiszállási felár forintban. */
      fee: 10000,
      feeDisplay: "10 000 Ft",
      /** Átlagos munkaidő a telephelyen, a tulajdonos szerint. */
      workshopDuration: "20–25 perc",
      /** Ingyenes parkolás a telephelynél. */
      parking: "Ingyenes parkolás a telephelynél",
      /** Időpontfoglalás minden esetben kötelező. */
      appointment: "Érkezés előtt mindig egyeztessen időpontot telefonon",
    },

    /**
     * A tulajdonos kifejezett kérése, hogy ez KIEMELTEN jelenjen meg.
     * Ezért kap saját, piros keretes dobozt az árak alatt.
     */
    disclaimer:
      "A fenti árak akkor érvényesek, ha elhozza hozzánk az autót. Kiszállás esetén " +
      "10 000 Ft felár. Ezek tájékoztató árak, lehet kevesebb és lehet több is. A fix " +
      "árat mindig telefonon, a munka megkezdése ELŐTT mondjuk meg. Az az ár utána " +
      "már nem változik: sem felfelé, sem lefelé.",
  },

  // ——————————————————————————————————————————————————————————————
  //  KIÉRKEZÉSI IDŐ  —  forrás: a jelenlegi weboldal
  //  „30 percen belül érkezünk Budapesten belül” (Rólunk)
  //  „Kiérkezésünk Budapesten belül általában 20-25 percet vesz igénybe”
  // ——————————————————————————————————————————————————————————————
  responseTime: {
    display: "Általában 20–30 perc",
    context: "Budapesten belül, a hívástól számítva",
  },

  // ——————————————————————————————————————————————————————————————
  //  GOOGLE CÉGPROFIL
  // ——————————————————————————————————————————————————————————————
  google: {
    /** A valós Google Cégprofil megosztási linkje. */
    mapsUrl: "https://maps.app.goo.gl/v2dNXvHvq22YWfMK8",

    /**
     * Értékelésíráshoz vezető link.
     * ℹ️ Ha megvan a Place ID, ez lecserélhető a közvetlen űrlapra:
     *    https://search.google.com/local/writereview?placeid=PLACE_ID
     */
    reviewUrl: "https://maps.app.goo.gl/v2dNXvHvq22YWfMK8",

    /**
     * Csillagos értékelés.
     * Forrás: a tulajdonos tájékoztatása (kb. 4,9).
     * ⚠️ Frissítsd, ha a Google-ban változik — a weboldal és a Google
     *    között nem lehet eltérés.
     */
    rating: 4.9,

    /**
     * Értékelések száma.
     * ✅ FRISSÍTVE 2026-09-17-én, a tulajdonos tájékoztatása alapján: 80 vélemény.
     *    (Korábban: 77, a Google Cégprofilból ellenőrizve 2026-09-07-én.)
     *
     *    Ez az érték NEM frissül magától: az oldal statikus, nincs
     *    élő kapcsolat a Google-lel. Ha a Google-ben változik, ide kell
     *    átírni, majd újra kell buildelni és élesíteni — a weboldal és a
     *    Google között nem lehet eltérés. Ha valaha ismeretlenné válik,
     *    állítsd vissza null-ra: akkor a darabszám sehol nem jelenik meg,
     *    és az aggregateRating is kimarad a strukturált adatokból.
     */
    reviewCount: 80 as number | null,

    /**
     * VALÓDI Google-vélemények.
     * ⚠️ SZIGORÚ SZABÁLY: ide KIZÁRÓLAG szó szerinti, valódi vélemény
     *    másolható be a Google Cégprofilból. Kitalált vélemény tilos —
     *    egyrészt megtévesztő, másrészt a Google is bünteti.
     *
     *    Amíg a tömb üres, a Vélemények szekció egy tiszta, becsületes
     *    „nézd meg a véleményeket a Google-ban” blokkot mutat.
     *
     *    Formátum:
     *    { author: "Kovács Péter", rating: 5, date: "2026-07-14",
     *      text: "A vélemény szó szerinti szövege." }
     */
    reviews: [
      {
        author: "Olivér Bukodi",
        rating: 5,
        date: "2026-07-15",
        text:
          "Csak ajánlani tudom! Pontosan érkeztek, a munkát hihetetlenül gyorsan és " +
          "profin elvégezték, az új kulcs tökéletesen működik. Végig nagyon segítőkészek, " +
          "udvariasak és korrektek voltak. Ritka manapság az ilyen színvonalú szolgáltatás. " +
          "Köszönöm még egyszer!",
      },
      {
        author: "Csaba Moldován",
        rating: 5,
        date: "2026-06-15",
        text:
          "Késő este munka után, azonnali segítség! Nem is 5, inkább 10 csillag! " +
          "Elképesztően profik, kedvesek, gyorsak, hatékonyak.",
      },
      {
        author: "Michael Szemiller",
        rating: 5,
        date: "2026-07-15",
        text:
          "Excellent Communication. Excellent Work. Very Fast. 5 Star. " +
          "Thank You Marcell Juhász Master Locksmith!",
      },
    ] as Array<{
      author: string;
      rating: number;
      /** ISO dátum, pl. "2026-07-14" */
      date: string;
      text: string;
    }>,
  },

  // ——————————————————————————————————————————————————————————————
  //  KÖZÖSSÉGI MÉDIA  —  csak valós profil kerülhet ide
  // ——————————————————————————————————————————————————————————————
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    youtube: null as string | null,
  },

  // ——————————————————————————————————————————————————————————————
  //  JÁRMŰTÍPUSOK  —  forrás: a jelenlegi weboldal
  // ——————————————————————————————————————————————————————————————
  vehicleTypes: [
    "személygépkocsi",
    "kisbusz",
  ],
} as const;

// ————————————————————————————————————————————————————————————————
//  WEBOLDAL BEÁLLÍTÁSOK
// ————————————————————————————————————————————————————————————————

export const site = {
  /**
   * A weboldal saját címe, záró perjel NÉLKÜL.
   * Ez adja a canonical URL-eket, a sitemapet és — ami a megosztásnál a
   * legfontosabb — az Open Graph kép ABSZOLÚT URL-jét.
   *
   * Miért környezetfüggő? Mert a WhatsApp/Messenger/Facebook csak akkor
   * tud előnézetet mutatni, ha az og:image ugyanazon a domainen elérhető,
   * ahol a megosztott link van. Az előnézeti buildnél tehát a GitHub Pages
   * címét kell használni, élesben pedig a saját domaint.
   *
   *   előnézet:  SITE_URL=https://matteocammisa8.github.io/autokulcs-doki
   *   éles:      (nincs SITE_URL) -> az alábbi alapértelmezés
   *
   * Az alapértelmezés SZÁNDÉKOSAN az éles domain. Korábban a régi
   * autokulcsmasolo.com volt itt: ha valaki SITE_URL nélkül buildelt,
   * minden canonical link, a sitemap és a megosztási kép a régi domainre
   * mutatott — és ez az oldalon ránézésre egyáltalán nem látszott.
   * Így a felejtés legrosszabb következménye is helyes kimenet.
   */
  url: process.env.SITE_URL ?? "https://autokulcsdoki.hu",
  locale: "hu_HU",
  lang: "hu",

  /**
   * Kapcsolati űrlap fogadó végpontja (pl. Formspree, Web3Forms).
   * Környezeti változóból jön — SOHA ne kerüljön kulcs a kódba.
   * Lásd: .env.example
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? null,

  /**
   * A kapcsolati űrlap CÍMZETTJEI.
   *
   * Az oldal statikus, nincs mögötte szerver, ezért egy külső
   * továbbító szolgáltatás (FormSubmit) küldi el a levelet. Azért ez,
   * mert NEM kell hozzá fiókot regisztrálni: az első beküldés után a
   * címzett kap egy aktiváló levelet, egy kattintás, és él.
   *
   * ⚠️ Adatvédelem: a beküldött nevek, telefonszámok és üzenetek
   * áthaladnak a szolgáltatón. Ez a szokásos működés statikus oldalnál,
   * de az adatkezelési tájékoztatóban meg kell említeni.
   */
  formRecipients: {
    to: "juhaszmagic@gmail.com",
    /**
     * Masolati cim. Ha ures, a _cc mezo be sem kerul az urlapba,
     * tehat a bekuldes csak a `to` cimre megy.
     */
    cc: "",
  },
} as const;

// ————————————————————————————————————————————————————————————————
//  SEGÉDFÜGGVÉNYEK
// ————————————————————————————————————————————————————————————————

/** „4,9” — magyar tizedesvesszővel. */
export function formattedRating(): string {
  return business.google.rating.toLocaleString("hu-HU", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

/**
 * Az értékelés szöveges formája.
 * Darabszámot csak akkor ír ki, ha az valóban ismert.
 */
export function ratingLabel(): string {
  const { reviewCount } = business.google;
  return reviewCount
    ? `${formattedRating()} ★ · ${reviewCount} Google értékelés`
    : `${formattedRating()} ★ Google értékelés`;
}

/**
 * Abszolút URL a relatív útvonalból (canonical / OG / sitemap).
 *
 * Mindig ZÁRÓ PERJELLEL zár, mert a next.config.ts-ben `trailingSlash: true`
 * van beállítva. Így a sitemap, a canonical és a strukturált adatok URL-jei
 * karakterre megegyeznek — eltérő alakú URL-ekből a Google duplikált
 * tartalmat olvasna ki.
 */
export function absoluteUrl(path = "/"): string {
  if (path === "/") return `${site.url}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean.endsWith("/") ? clean : `${clean}/`}`;
}
