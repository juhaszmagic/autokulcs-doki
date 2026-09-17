/**
 * ============================================================================
 *  FOTÓK, VIDEÓK ÉS KÖZÖSSÉGI TARTALOM
 * ============================================================================
 *
 *  A weboldal fotóközpontú: a fényképek adják a felület nagyjából felét.
 *  Ez a fájl mondja meg, MELYIK FOTÓ HOVÁ kerül.
 *
 *  ── HOGYAN TÖLTSÖN FEL FOTÓT? ──────────────────────────────────────
 *   1. Mentse a képet a /public/images mappába PONTOSAN azon a néven,
 *      ami alább szerepel (pl. hero.jpg).
 *   2. Futtassa:  npm run images
 *   3. Kész — a kép automatikusan megjelenik, kódot nem kell írni.
 *
 *  Amíg egy fájl hiányzik, a helyén a márka arculatához illő, sötét
 *  „fotóhely” látszik, pontosan akkora, mint a leendő kép. Az elrendezés
 *  tehát nem ugrik meg a feltöltés után.
 *
 *  ── MILYEN FOTÓ KELL? ──────────────────────────────────────────────
 *  Valódi munkafotó, nem stockfotó. Fekvő tájolás (kivéve, ahol jelezzük).
 *  Lehetőleg jó fényben, tiszta háttérrel. A telefonnal készült képek is
 *  tökéletesen megfelelnek — a hitelesség fontosabb a stúdióminőségnél.
 * ============================================================================
 */

/* ==================================================================
   1. A WEBOLDAL FŐ KÉPEI,  fix helyek, fix fájlnevek
   ================================================================== */

export const images = {
  /** Kezdőoldal hero — a legfontosabb kép. Fekvő, 4:3 körüli. */
  hero: {
    src: "/images/hero.jpg",
    alt: "Autókulcsmásoló szakember autókulcsot programoz egy nyitott autónál Budapesten",
  },

  /** „Rólunk / szakértelem” szekció — a technikus munka közben. */
  expertise: {
    src: "/images/szakerto.jpg",
    alt: "Technikus autókulcsot készít a helyszínen, kézi kulcsmásoló géppel",
  },

  /** Műhely / eszközök — a Rólunk oldalon. */
  workshop: {
    src: "/images/muhely.jpg",
    alt: "Autókulcs-másoló és programozó eszközök a műhelyben",
  },

  /** Nagy, sötétített háttérkép a záró CTA-sávhoz. */
  cta: {
    src: "/images/cta.jpg",
    alt: "Autókulcsmásoló szakember éjszakai kiszálláson nyit egy autót",
  },

  /** A kapcsolat oldal fejlécképe. */
  contact: {
    src: "/images/kapcsolat.jpg",
    alt: "Autókulcsok és diagnosztikai eszköz egy autó műszerfalán",
  },
} as const;

/* ==================================================================
   2. GALÉRIA,  „Munkáink a gyakorlatban”
   ------------------------------------------------------------------
   Szerkesztőségi elrendezés: 1 nagy vezérkép, mellette kisebbek.
   A `span` mező adja meg, mekkora helyet foglaljon a rácsban.
   ================================================================== */

export type GallerySpan = "feature" | "wide" | "tall" | "normal";

export interface GalleryItem {
  src: string;
  alt: string;
  /** Rövid felirat a képen (opcionális) — pl. a munka típusa. */
  caption?: string;
  span: GallerySpan;
  /**
   * A jármű márkája — CSAK akkor kitöltve, ha a fotón ténylegesen
   * azonosítható (embléma, kulcsforma, alkatrészdoboz felirata).
   */
  brand?: string;
  /** Hol készült. Csak annyi, amennyi biztosan tudható. */
  place?: string;
  /**
   * A fotó VALÓDI készítési dátuma (a fájl EXIF-adatából).
   * Nem becslés és nem kitalált érték — ezért merjük kiírni.
   */
  date?: string;
  /**
   * A munkához tartozó VALÓDI Google-értékelés csillagszáma.
   *
   * ⚠️ Ide CSAK akkor kerüljön szám, ha az adott munkáról tényleg
   * született értékelés, és tényleg ennyi csillagot kapott. Ha nincs
   * ilyen, hagyja üresen — akkor a kártyán egyszerűen nem jelenik meg
   * csillag. Kitalált értékelést kiírni megtévesztő, és tiltott is.
   */
  rating?: number;
  /**
   * Függőleges fókuszpont a kivágáshoz.
   *
   * A fotók telefonnal, ÁLLÓ tájolásban készültek, a weboldalon viszont
   * fekvő (4:3) kivágásban jelennek meg. Alapból középre igazít, így a
   * kép alján lévő kulcs kilóghat a kivágásból. A „lower" lejjebbre húzza
   * a kivágást, a „bottom" a kép aljához igazít.
   */
  focus?: "center" | "lower" | "bottom";
}

/**
 * ── VALÓDI MUNKAFOTÓK ──────────────────────────────────────────────
 *
 * Ezek a képek valódi, elvégzett munkákról készültek, és a vállalkozás
 * Google Cégprofiljához tartoznak, ahol a munkák 5 csillagos értékelést
 * kaptak. Semmi nincs kitalálva:
 *
 *   • a dátum a fájl EXIF-adatából jön,
 *   • a márka az, ami a képen ténylegesen látszik,
 *   • a csillag a valódi Google-értékelés.
 *
 * ── HOGYAN BŐVÍTSE? ────────────────────────────────────────────────
 * A `place` mezőbe csak akkor írjon kerületet, ha a munka tényleg ott
 * történt. Ha nem biztos benne, hagyja „Budapest”-en. A `rating` mezőt
 * pedig csak valódi értékelés esetén töltse ki.
 */
export const realWork: GalleryItem[] = [
  /* ---- Eredmények: kész kulcsok, azonosítható autókkal ---- */
  {
    src: "/images/munkak/suzuki-jimny-potkulcs.jpg",
    focus: "lower",
    alt: "Elkészült Suzuki bicskakulcs az eredeti kulcs mellett, a háttérben a fekete Suzuki Jimny",
    caption: "Pótkulcs készítés",
    brand: "Suzuki Jimny",
    place: "Budapest",
    date: "2026-09-04",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/toyota-ket-kulcs.jpg",
    focus: "lower",
    alt: "Két elkészült Toyota kulcs kézben, a háttérben a jármű kormánya",
    caption: "Két új kulcs",
    brand: "Toyota",
    place: "Budapest",
    date: "2026-07-13",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/bmw-helyszini.jpg",
    focus: "lower",
    alt: "BMW kulcs kézben a jármű utasterében, az ölben a csatlakoztatott diagnosztikai eszközzel",
    caption: "Kulcskészítés a helyszínen",
    brand: "BMW",
    place: "Budapest",
    date: "2026-06-29",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/mini-kulcs.jpg",
    alt: "MINI autókulcs a szervizautó munkapultján, mellette a hozzá tartozó alkatrészek",
    caption: "MINI kulcs",
    brand: "MINI",
    place: "Mobil műhely",
    date: "2026-06-29",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/skoda-octavia-kulcs.jpg",
    focus: "lower",
    alt: "Fehér Škoda Octavia nyitott ajtóval, mellette a diagnosztikai eszköz és két elkészült kulcs",
    caption: "Új kulcs a helyszínen",
    brand: "Škoda Octavia",
    place: "Budapest",
    date: "2026-06-19",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/volvo-ket-kulcs.jpg",
    focus: "lower",
    alt: "Két elkészült Volvo kulcs kézben a jármű kormánya előtt, alul a csatlakoztatott diagnosztikai kábel",
    caption: "Két új kulcs",
    brand: "Volvo",
    place: "Budapest",
    date: "2026-06-04",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/skoda-ket-kulcs.jpg",
    focus: "bottom",
    alt: "Két új Škoda okoskulcs kézben, mögötte a fekete Škoda az utcán",
    caption: "Két új okoskulcs",
    brand: "Škoda",
    place: "Budapest",
    date: "2026-05-16",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/vw-kulcsprogramozas.jpg",
    focus: "lower",
    alt: "Volkswagen kulcs programozása a jármű utasterében, kézben az elkészült kulcsokkal",
    caption: "Kulcsprogramozás",
    brand: "Volkswagen",
    place: "Budapest",
    date: "2026-05-11",
    rating: 5,
    span: "normal",
  },

  /* ---- Folyamat és eszközök: hogyan készül a munka ---- */
  {
    src: "/images/munkak/toyota-helyszini.jpg",
    focus: "lower",
    alt: "Toyota utasterében végzett helyszíni kulcsprogramozás diagnosztikai eszközzel",
    caption: "Helyszíni programozás",
    brand: "Toyota",
    place: "Budapest",
    date: "2026-07-13",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/immobilizer-key-learn.jpg",
    focus: "lower",
    alt: "Diagnosztikai eszköz kijelzőjén a sikeres kulcstanítás visszaigazolása, mellette a kiszerelt vezérlőegység",
    caption: "Sikeres kulcstanítás",
    place: "Műhely",
    date: "2026-06-29",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/muhely-kulcshaz.jpg",
    alt: "Elkészült kihajtható autókulcs a műhelyben, a munkapadon forrasztóállomás és kulcsház-alkatrészek",
    caption: "Kulcsház csere",
    place: "Műhely",
    date: "2026-06-14",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/helyszini-kulcsmaras.jpg",
    alt: "Kulcsmarás a szervizautóban működő kulcsmásoló gépen, a kulcs befogva",
    caption: "Kulcsmarás a helyszínen",
    place: "Mobil műhely",
    date: "2026-05-15",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/mobil-muhely.jpg",
    alt: "A szervizautó belseje: munkapad, kulcsmásoló gép, szerszámszekrény és diagnosztikai eszközök",
    caption: "A mobil műhelyünk",
    place: "Mobil műhely",
    date: "2026-04-22",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/immobilizer-kiolvasas.jpg",
    alt: "Kiszerelt indításgátló vezérlőegység panelje, kiolvasáshoz bekötött csatlakozókkal",
    caption: "Immobilizer kiolvasás",
    place: "Műhely",
    date: "2026-04-16",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/skoda-immo-diagnosztika.jpg",
    focus: "lower",
    alt: "Škoda digitális műszerfala, előtte a diagnosztikai eszköz az indításgátló kiolvasása közben",
    caption: "Immobilizer diagnosztika",
    brand: "Škoda",
    place: "Budapest",
    date: "2026-04-15",
    rating: 5,
    span: "normal",
  },
  {
    src: "/images/munkak/muhely-kulcsjavitas.jpg",
    alt: "Kulcsjavítás a műhelyben: szétszerelt kulcsházak, forrasztóállomás és programozó kábelek a munkapadon",
    caption: "Kulcsjavítás",
    place: "Műhely",
    date: "2026-04-15",
    rating: 5,
    span: "normal",
  },
];

/**
 * „Legutóbbi munkáink" — a kezdőoldal tetején, bizonyítékként.
 * A lista eleje, vagyis a legfrissebb munkák, felismerhető autómárkákkal.
 */
export const recentWork: GalleryItem[] = realWork.slice(0, 8);

/**
 * „Munkáink a gyakorlatban" — lejjebb, a folyamatot és az eszközöket
 * mutató fotók. Nyolc kép, hogy a rács pontosan két teli sort adjon.
 */
export const galleryItems: GalleryItem[] = realWork.slice(8);

/** Magyar hónapnév a fotók valódi dátumához — pl. „2026. szeptember”. */
export function workDateLabel(iso?: string): string | null {
  if (!iso) return null;
  const months = [
    "január", "február", "március", "április", "május", "június",
    "július", "augusztus", "szeptember", "október", "november", "december",
  ];
  const [year, month] = iso.split("-");
  const name = months[Number(month) - 1];
  return name ? `${year}. ${name}` : null;
}

/* ==================================================================
   3. VIDEÓK
   ------------------------------------------------------------------
   ⚠️ Szándékosan ÜRES: videólinket nem találunk ki.
   Amint a tulajdonos megadja a videókat, itt kell felvenni őket és a
   videószekció automatikusan megjelenik a kezdőoldalon.

   A beágyazás LUSTA: alapból csak a borítókép és egy lejátszás gomb
   látszik, a videó maga csak kattintásra töltődik be. Így a videók nem
   lassítják az oldalt és nem kerül harmadik fél kódja az oldalba.
   ================================================================== */

export interface VideoItem {
  /** YouTube videóazonosító VAGY teljes URL más platformhoz. */
  url: string;
  title: string;
  description?: string;
  /** Borítókép a /public/images/video mappában. */
  poster?: string;
  /** Hossz, pl. „1:24” — opcionális. */
  duration?: string;
}

export const videos: VideoItem[] = [];

/* ==================================================================
   4. KÖZÖSSÉGI VIDEÓK,  TikTok
   ------------------------------------------------------------------
   A cég TikTok-fiókja: @autkulcsmasolas
   (a fiók profilja szerint: „Autókulcs Masolás Programozás”)

   ⚠️ FONTOS: a videók listája szándékosan ÜRES.
   Nem másolunk le automatikusan TikTok-tartalmat, ez egyrészt a TikTok
   feltételeibe ütközne, másrészt kitalált videócímeket sem írunk ki.

   HOGYAN VEGYEN FEL VIDEÓT?
   1. Nyissa meg a videót TikTokon, másolja ki a linkjét.
   2. Készítsen róla egy képernyőképet, mentse el
      /public/images/tiktok/tiktok-01.jpg néven (álló, 9:16).
   3. Vegye fel az alábbi listába.
   4. npm run images

   Ha a lista üres, a szekció helyett egy elegáns „kövessen minket
   TikTokon” blokk jelenik meg, nem üres lyuk.
   ================================================================== */

export interface SocialVideo {
  platform: "tiktok";
  /** A konkrét videó URL-je. Ha hiányzik, a kártya a profilra visz. */
  url?: string;
  /** A kártyán megjelenő téma. */
  title: string;
  /**
   * A videó VALÓDI borítóképe, a TikTok oEmbed API-jából letöltve.
   * Helyben tárolva, mert a TikTok CDN-linkjei lejárnak.
   */
  cover: string;
  date?: string;
}

/**
 * TikTok borítókártyák.
 *
 * A borítók a saját fotóinkból készültek, álló (9:16) kivágásban.
 * Amíg nincs konkrét `url`, minden kártya a profilra visz.
 *
 * ── HOGYAN LESZ EBBŐL PONTOS? ──────────────────────────────────────
 * 1. A tulajdonos beállítja ezeket a képeket TikTokon a posztok
 *    borítójának (TikTok: poszt szerkesztése > borító) — ekkor a
 *    weboldal és a TikTok pontosan egyezik.
 * 2. VAGY megküldi a videólinkeket, és akkor a hivatalos oEmbed
 *    API-ból (https://www.tiktok.com/oembed?url=...) lehívjuk a
 *    valódi borítót és címet.
 */
/**
 * TikTok videók — VALÓDI adatok.
 *
 * A linkek, a címek és a borítóképek a TikTok HIVATALOS végpontjaiból
 * származnak, nem kitalált vagy generált tartalom:
 *   • videólisták:  https://www.tiktok.com/embed/@autkulcsmasolas
 *   • cím + borító: https://www.tiktok.com/oembed?url=<videó URL>
 *
 * A LEGFRISSEBB 6 videó szerepel (a TikTok azonosító időbélyeg-alapú,
 * ezért csökkenő sorrendbe rendezve a legújabb kerül elöl).
 *
 * A borítóképeket LETÖLTÖTTÜK a /public/images/tiktok mappába. Ennek két
 * oka van: a TikTok CDN-linkjei lejárnak, és így nem kerül harmadik fél
 * kérése a látogató böngészőjébe (az oldal 0 kB JS-sel és külső hívás
 * nélkül működik).
 *
 * ── FRISSÍTÉS ÚJ VIDEÓ UTÁN ────────────────────────────────────────
 * A fenti két végponttal bármikor újra lekérhető a friss lista.
 * A borítót a /public/images/tiktok mappába kell menteni, és felvenni ide.
 */
export const socialVideos: SocialVideo[] = [
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@autkulcsmasolas/video/7514036063560633622",
    title: "Na most figyelj! 💥 Itt az idő, hogy te is beszállj a…",
    cover: "/images/tiktok/tiktok-10.jpg",
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@autkulcsmasolas/video/7505128806458445078",
    title: "Ügyfelünk Nissanjához kért egy új pótkulcsot, mert a régi…",
    cover: "/images/tiktok/tiktok-09.jpg",
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@autkulcsmasolas/video/7503261158850186518",
    title: "Peugeot kulcsjavítás – nem mindig kell újat csinálni!🚙🔑…",
    cover: "/images/tiktok/tiktok-08.jpg",
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@autkulcsmasolas/video/7502901675913415958",
    title: "Elveszett autókulcs? 🤔Nálunk nem para! Volvo XC60 2011 –…",
    cover: "/images/tiktok/tiktok-07.jpg",
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@autkulcsmasolas/video/7479115381735509270",
    title: "Volkswagen kulcsház csere lépései",
    cover: "/images/tiktok/tiktok-06.jpg",
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@autkulcsmasolas/video/7476902707509480726",
    title: "Ma ennek az ötös BMW-nek készítettük el a kulcsát 🔥🔥🚗👌🏽",
    cover: "/images/tiktok/tiktok-05.jpg",
  },
];

export const socialProfiles = {
  tiktok: {
    handle: "@autkulcsmasolas",
    url: "https://www.tiktok.com/@autkulcsmasolas",
    label: "TikTok",
  },
  facebook: {
    url: "https://www.facebook.com/profile.php?id=61558807543572",
    label: "Facebook",
    /** Az oldal neve a Facebookon (eltér a weboldal márkanevétől). */
    pageName: "Autókulcs Másolás-Programozás",
  } as { url: string; label: string; pageName?: string } | null,
} as const;
