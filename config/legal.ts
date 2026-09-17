/**
 * ============================================================================
 *  JOGI ADATOK — impresszum és adatkezelési tájékoztató
 * ============================================================================
 *
 *  Minden jogi adat EGY helyen. Az impresszum és az adatkezelési
 *  tájékoztató is innen dolgozik, tehát változás esetén csak itt kell
 *  átírni, és mindkét oldal követi.
 *
 *  ⚠️ Ide KIZÁRÓLAG a tulajdonos által megadott, valós adat kerülhet.
 *  Hiányzó adatot nem pótolunk becsléssel: az üresen hagyott mezők
 *  egyszerűen nem jelennek meg az oldalon (lásd a komponensekben a
 *  feltételes megjelenítést).
 *
 *  Jogszabályi háttér:
 *   • 2001. évi CVIII. tv. (Ekertv.) 4. § — az impresszum kötelező elemei
 *   • 2009. évi CXV. tv. 16. § (4) — az egyéni vállalkozó köteles a neve
 *     mellett feltüntetni az „egyéni vállalkozó" megjelölést és a
 *     nyilvántartási számát
 *   • GDPR 13. cikk — tájékoztatás a személyes adatok kezeléséről
 * ============================================================================
 */

export const legal = {
  /** A SZOLGÁLTATÓ — aki a munkát végzi és az oldalt üzemelteti. */
  provider: {
    name: "Juhász Marcell",
    /** Jogi forma. Egyéni vállalkozónál ezt a törvény kötelezővé teszi. */
    form: "egyéni vállalkozó",
    address: "1112 Budapest, Nagyida köz 5/B",
    email: "juhaszmagic@gmail.com",
    taxNumber: "51007490-1-42",

    /**
     * ⚠️ HIÁNYZIK — és az Ekertv. szerint KÖTELEZŐ.
     *
     * Az egyéni vállalkozói nyilvántartási szám. Megtalálható:
     *  • a vállalkozói igazolványon / a nyilvántartásba vételi
     *    értesítőn,
     *  • a saját kiállított számlákon (ott is kötelező szerepelnie),
     *  • Ügyfélkapuval a magyarorszag.hu felületén.
     *
     * Amíg üres, az impresszum ezt a sort nem jeleníti meg, és a lap
     * tetején figyelmeztetés hívja fel rá a figyelmet.
     */
    registrationNumber: "",

    /** A nyilvántartást a NAV vezeti (Egyéni Vállalkozók Nyilvántartása). */
    registrationAuthority: "Nemzeti Adó- és Vámhivatal (Egyéni Vállalkozók Nyilvántartása)",
  },

  /**
   * ADATFELDOLGOZÓK — akiken az adat áthalad.
   * A GDPR szerint ezeket néven kell nevezni.
   */
  processors: [
    {
      name: "FormSubmit",
      role: "A kapcsolati űrlap továbbítása e-mailben",
      note:
        "Az űrlapon megadott adatok a szolgáltató szerverein haladnak át, " +
        "mielőtt e-mailben megérkeznének hozzánk.",
      url: "https://formsubmit.co/",
    },
    {
      name: "GitHub, Inc. (GitHub Pages)",
      role: "A weboldal kiszolgálása",
      note:
        "A weboldal statikus fájljait szolgálja ki. A kiszolgálás során a " +
        "technikai működéshez szükséges naplóadatok keletkezhetnek.",
      url: "https://pages.github.com/",
    },
    {
      name: "Google LLC (Google Cégprofil)",
      role: "Értékelések és térképes megjelenés",
      note:
        "A weboldalról a Google Cégprofilra mutató linkek vezetnek. A " +
        "Cégprofilon leadott értékeléseket a Google kezeli.",
      url: "https://business.google.com/",
    },
  ],

  /**
   * ADATMEGŐRZÉS.
   *
   * ⚠️ Ezt a tulajdonosnak kell jóváhagynia — ez üzleti döntés, nem
   * technikai. A megadott 1 év a szokásos gyakorlat egy árajánlatkérésnél
   * (visszatérő ügyfél, garanciális kérdés), de rövidíthető.
   */
  retention: "1 év a megkeresés lezárásától számítva",

  /** Az utolsó érdemi frissítés dátuma — a tájékoztató alján jelenik meg. */
  lastUpdated: "2026-09-08",
} as const;

/** Egy sorban a szolgáltató neve a jogi formájával — több helyen kell. */
export function providerFullName(): string {
  return `${legal.provider.name} ${legal.provider.form}`;
}
