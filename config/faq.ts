/**
 * ============================================================================
 *  GYAKORI KÉRDÉSEK
 * ============================================================================
 *  A válaszok kizárólag a vállalkozás valós, ellenőrzött adataira épülnek.
 *  Ahol az ár a jármű típusától függ, ott ezt őszintén ki is mondjuk —
 *  kitalált árat sehol nem írunk.
 * ============================================================================
 */

import type { ServiceFaq } from "./services";
import { business } from "./business";

/** A kezdőoldalon megjelenő, legfontosabb kérdések. */
export const homeFaqs: ServiceFaq[] = [
  {
    q: "Elvigyem az autót, vagy kijönnek hozzám?",
    a:
      "Ha el tudja hozni, azzal jár jobban: a XI. kerületi telephelyünkön nincs " +
      "kiszállási díj, ingyenesen tud parkolni és általában 20-25 perc alatt végzünk. " +
      "Ha nem tud jönni, kimegyünk Önhöz, ennek díja 10 000 Ft kiszállási felár. Ha " +
      "az összes autókulcsa elveszett, mindig kimegyünk, hiszen olyankor az autó nem " +
      "tud eljönni.",
  },
  {
    q: "Mennyibe kerül az autókulcs másolás?",
    a:
      "Az áraink 25 000 Ft-tól indulnak. Ez tájékoztató kiindulóár: a végleges összeg az autó " +
      "márkájától, típusától, évjáratától és a kulcs fajtájától függ, egy egyszerű mechanikus " +
      "kulcs és egy chipes, távirányítós kulcs között jelentős a különbség. Ezek az árak akkor " +
      "érvényesek, ha elhozza hozzánk az autót; kiszállás esetén 10 000 Ft felár. A pontos " +
      "árat mindig telefonon, WhatsAppon vagy Viberen egyeztetjük.",
  },
  {
    q: "Mennyi idő alatt érnek ki Budapesten?",
    a:
      "Budapesten belül a hívástól számítva általában 20–30 perc. A pontos időt a telefonban " +
      "mondjuk meg, a helyszín és az aktuális forgalom ismeretében.",
  },
  {
    q: "Ki tudják nyitni az autót sérülésmentesen?",
    a:
      "Igen. Erre a célra készült szerszámokkal dolgozunk: nem törünk ablakot, nem feszítjük ki " +
      "az ajtót és nem cseréljük a zárat. Ha egy ritka esetben a zár már a kiérkezésünk előtt " +
      "meghibásodott, azt a helyszínen, munka előtt jelezzük.",
  },
  {
    q: "Elveszett az összes autókulcsom, mit tegyek?",
    a:
      "Ez megoldható, akkor is, ha egyetlen kulcs sem maradt. Először sérülésmentesen kinyitjuk " +
      "az autót, majd kiolvassuk a zár paramétereit, elkészítjük az új kulcsot és " +
      "beprogramozzuk az autóhoz. Ehhez nem kell a járművet elvontatni. Készítse elő a forgalmi " +
      "engedélyt és a személyazonosító okmányát.",
  },
  {
    q: "Helyszínre is kiszállnak?",
    a:
      "Igen, de a legtöbb esetben érdemesebb elhoznia az autót: nálunk 20-25 perc alatt " +
      "elkészül és olcsóbb is. Ha mégis kiszállás kell, kimegyünk Önhöz; a nyitást, a kulcsmásolást és a " +
      "programozás jelentős részét a helyszínen elvégezzük, hogy az autót ne kelljen elszállítani.",
  },
  {
    q: "Éjszaka és hétvégén is hívhatom Önöket?",
    a:
      "Igen. A szolgáltatás a hét minden napján, a nap 24 órájában elérhető, hétvégén és " +
      "ünnepnapokon is.",
  },
];

/** A /gyik oldal teljes listája — tematikus csoportokban. */
export const faqGroups: Array<{ title: string; faqs: ServiceFaq[] }> = [
  {
    title: "Árak és időtartam",
    faqs: [
      homeFaqs[0],
      {
        q: "Mennyi idő alatt készül el egy autókulcs?",
        a:
          `Ha elhozza az autót a XI. kerületi telephelyünkre (${business.address.street}), ` +
          "az új autókulcs átlagosan 20-25 perc alatt elkészül és meg is tudja várni. Egyeztetett " +
          "időpontra érkezik, így nem kell sorban állnia: egyből az Ön autójával foglalkozunk, " +
          "utána pedig már mehet is tovább. Kiszállásnál, ha van " +
          "meglévő működő kulcs, a másolás és a programozás jellemzően egy kiszállás alatt, a " +
          "helyszínen elvégezhető. Ha egyetlen autókulcs sem maradt, a folyamat hosszabb: nyitás, " +
          "a zár paramétereinek kiolvasása, kulcskészítés, majd programozás. A reális időt a jármű " +
          "típusa és évjárata alapján a telefonban tudjuk megmondani.",
      },
      {
        q: "Miért nem szerepel részletes árlista a weboldalon?",
        a:
          "A kiindulóárat kiírjuk: 25 000 Ft-tól. Ennél részletesebb listát azért nem adunk, mert " +
          "félrevezető lenne, ugyanaz a munka két különböző autón többszörös eltérést mutathat a " +
          "kulcs típusa, az évjárat és a szükséges programozás miatt. Ezért a pontos árat telefonon, " +
          "WhatsAppon vagy Viberen mondjuk meg, még a kiszállás előtt.",
      },
      {
        q: "Kell fizetni a kiszállásért, ha végül nem sikerül a munka?",
        a:
          "A feltételeket a telefonban, előre tisztázzuk, beleértve azt is, mi történik, ha a " +
          "helyszínen kiderül, hogy az adott járműnél más megoldás kell. Meglepetés nem lesz.",
      },
    ],
  },
  {
    title: "Autónyitás",
    faqs: [
      homeFaqs[2],
      homeFaqs[1],
      {
        q: "Mit tegyek, amíg megérkeznek?",
        a:
          "Ne próbálja meg saját kezűleg feszegetni az ajtót vagy az ablakot. A drótos-ékes " +
          "módszerek modern autókon nem működnek, viszont könnyen megsértik az ajtótömítést vagy " +
          "a zárszerkezetet, a javítás pedig többe kerül, mint maga a nyitás. Készítse elő az " +
          "autó típusát, évjáratát és a pontos helyszínt.",
      },
      {
        q: "Járó motorral zártam be a kulcsot. Ez is megoldható?",
        a:
          "Igen, ez gyakori eset, különösen télen. A nyitás ugyanúgy sérülésmentesen történik. " +
          "Érdemes azonnal hívni, mert a járó motor feleslegesen fogyaszt.",
      },
      {
        q: "Beletört a kulcs a zárba. Ki kell cserélni a zárat?",
        a:
          "Jellemzően nem. A beletört kulcsdarab eltávolítása rutinfeladat: kiszedjük a zárból, " +
          "majd elkészítjük az új kulcsot. A zárcsere ritkán szükséges.",
      },
      {
        q: "Milyen járműveket tudnak kinyitni?",
        a:
          "Személygépkocsit, kisteherautót és teherautót. Kamionhoz és motorkerékpárhoz " +
          "nem vállalunk munkát. " +
          "Ha bizonytalan, hogy az Ön járműve belefér-e, hívjon, a telefonban tisztázzuk.",
      },
    ],
  },
  {
    title: "Kulcsmásolás és kulcskészítés",
    faqs: [
      homeFaqs[3],
      {
        q: "Minden autótípushoz tudnak kulcsot készíteni?",
        a:
          "A gyakorlatban az autók túlnyomó részéhez igen. Mivel a márka, a típus és az évjárat " +
          "meghatározza a megoldást, hívásnál mindig ezt kérdezzük először és őszintén " +
          "megmondjuk, ha valamit nem tudunk vállalni.",
      },
      {
        q: "Mi szükséges új autókulcs készítéséhez?",
        a:
          "A járműhöz való jogosultság igazolása, jellemzően forgalmi engedély és " +
          "személyazonosító okmány, valamint az autó pontos típusa és évjárata. Ez az Ön " +
          "autójának védelmét is szolgálja.",
      },
      {
        q: "Miért olcsóbb a pótkulcs, amíg van működő kulcsom?",
        a:
          "Mert akkor a meglévő kulcsról tudunk másolni és nem kell kinyitni az autót, illetve " +
          "kiolvasni a zár paramétereit. Ha csak egyetlen kulcsa van, érdemes most csináltatni " +
          "mellé egy tartalékot, jóval olcsóbb, mint később, elveszett kulcs után pótolni.",
      },
      {
        q: "Elég egyszerűen lemásoltatni a kulcsot egy kulcsmásolónál?",
        a:
          "Modern autóknál nem. A kulcsszár mechanikus másolása önmagában csak az ajtót nyitja: " +
          "a benne lévő chipet is programozni kell az indításgátlóhoz, különben az autó nem indul " +
          "el, vagy pár másodperc után leáll. Mi mindkettőt elvégezzük.",
      },
    ],
  },
  {
    title: "Programozás és elektronika",
    faqs: [
      {
        q: "Tudják programozni az autókulcsot?",
        a:
          "Igen. A programozás az autó OBD-csatlakozóján keresztül, diagnosztikai eszközzel " +
          "történik: a kulcsban lévő chip és a jármű indításgátlója „megtanulják” egymást. " +
          "Ezután beállítjuk a távirányító funkciókat is és a helyszínen ki is próbáljuk.",
      },
      {
        q: "A kulcs elfordul, de az autó nem indul. Mi lehet a baj?",
        a:
          "Jellemzően az indításgátlóval (immobilizerrel) van gond: a kulcs mechanikusan jó, de a " +
          "chip nem kommunikál a járművel. Ez programozással rendezhető.",
      },
      {
        q: "Elemcsere után nem működik a távirányítóm. Ez javítható?",
        a:
          "Legtöbbször igen. Egyes kulcsoknál elemcsere után újra kell szinkronizálni a " +
          "távirányítót a járművel, ez rövid művelet és a helyszínen elvégezhető.",
      },
      {
        q: "A kulcsház elemcseréjét is vállalják?",
        a: "Igen, kulcsház-elemcserével és kulcsházcserével is foglalkozunk.",
      },
    ],
  },
  {
    title: "Ha elhozza az autót",
    faqs: [
      homeFaqs[0],
      {
        q: "Kell időpontot foglalni?",
        a:
          "Igen, kérjük, hogy érkezés előtt mindig hívjon és egyeztessen időpontot. " +
          "Így nem kell várnia és biztosan ott leszünk a szükséges alkatrésszel.",
      },
      {
        q: "Mennyi ideig tart, ha elviszem az autót?",
        a:
          "Átlagosan 20-25 perc. Ez alatt elkészül és beprogramozódik az autókulcs " +
          "és már mehet is tovább. A pontos időt a típus és az évjárat ismeretében " +
          "a telefonban mondjuk meg.",
      },
      {
        q: "Hol tudok parkolni?",
        a:
          "A telephelyünknél ingyenesen tud parkolni a munka idejére, " +
          "Budapest XI. kerületében.",
      },
      {
        q: "Mennyi a kiszállás díja?",
        a:
          "10 000 Ft, ami a munka díján felül értendő. Ha az összes autókulcsa " +
          "elveszett, mindig kimegyünk, hiszen olyankor az autó nem tud eljönni " +
          "a telephelyre.",
      },
    ],
  },
  {
    title: "Elérhetőség és terület",
    faqs: [
      homeFaqs[4],
      homeFaqs[5],
      {
        q: "Budapest egész területén elérhető a szolgáltatás?",
        a:
          "Igen, Budapest mind a 23 kerületében dolgozunk és kimegyünk az agglomerációba is " +
          "(például Budaörs, Törökbálint, Érd, Budakeszi, Dunakeszi, Vecsés). Ha bizonytalan, " +
          "hogy az Ön címe belefér-e, egy hívás alatt tisztázzuk.",
      },
      {
        q: "Miért a telefonhívást kérik és nem az e-mailt?",
        a:
          "Mert a legtöbb esetünk sürgős. Telefonon azonnal meg tudjuk kérdezni az autó típusát és " +
          "a pontos helyszínt és rögtön indulni tudunk. Az űrlapos megkeresésekre nem tudunk " +
          "azonnal válaszolni, ha sürgős, mindig hívjon.",
      },
    ],
  },
];

/** Lapos lista a FAQPage strukturált adathoz a /gyik oldalon. */
export const allFaqs: ServiceFaq[] = faqGroups.flatMap((group) => group.faqs);
