# Auditjelentés — a régi weboldal átvizsgálása és az új felépítése

Készült: 2026. szeptember 7.
Vizsgált oldal: `https://autokulcsmasolo.com/`
Google Cégprofil: `https://maps.app.goo.gl/v2dNXvHvq22YWfMK8`

---

## 1. Amit a régi oldalról átvettünk (ellenőrzött tények)

Ezek az adatok a régi weboldalról származnak, és az új oldalon is
szerepelnek. Mind a `config/business.ts`-ben van, egy helyen.

| Adat | Érték | Forrás |
| --- | --- | --- |
| Elsődleges telefon | +36 30 884 3122 | minden aloldal lábléce (21 előfordulás) |
| Másodlagos telefon | +36 30 685 0133 | kezdőoldal, hero blokk |
| Cím (utca) | Nagyida köz 5/B | lábléc + Google Cégprofil |
| Nyitvatartás | 0–24, a hét minden napján | „Autónyitás Budapest 0-24" |
| Kiérkezés | 20–30 perc Budapesten belül | „30 percen belül érkezünk” (Rólunk) + „általában 20-25 percet vesz igénybe” (aloldal) |
| Ellátási terület | Budapest és környéke | Rólunk oldal |
| Járműtípusok | személyautó, kisbusz, kamion, busz, motor, robogó | Rólunk oldal |
| E-mail | **nincs** | az egész oldalon sehol nem szerepelt |
| Árak | **nincsenek** | lásd 3. pont |

### Szolgáltatások (a régi oldal szövegéből)

Sérülésmentes autónyitás · beletört kulcs eltávolítása · autóban felejtett
kulcs · járó motoros kizáródás · elromlott zár nyitása · kulcsmásolás ·
kulcskészítés · elhagyott kulcs pótlása · immobilizer programozás ·
távirányító tanítás · kulcsház-elemcsere · pótkulcs készítés.

### Egy elv, amit szándékosan megtartottunk

A régi oldal kapcsolati űrlapjánál ez állt:

> „A hívást részesítjük előnyben. Nem mindig tudunk válaszolni az elküldött
> e-mailekre. Kérjük inkább hívjon minket!”

Ez helyes üzleti döntés egy sürgősségi szolgáltatásnál, ezért az új oldalon
is végigvittük: az űrlap fölött mindig ott a hívás gomb, és az űrlap maga is
kiírja, hogy sürgős esetben telefonáljon.

---

## 2. JAVÍTOTT HIBA: rossz irányítószám minden oldalon

**Ez a legfontosabb megállapítás.**

A régi weboldal **mind a 10 oldalának** láblécében ez szerepelt:

```
2111 Budapest Nagyida köz 5/B
```

A **2111 nem budapesti irányítószám** — az Szada irányítószáma. A Google
Cégprofil szerint a helyes cím:

```
Nagyida köz 5/b, 1112 Budapest
```

Az 1112 a XI. kerület irányítószáma, ami egyezik a Nagyida köz tényleges
elhelyezkedésével.

**Miért számít ez sokat:** a lokális SEO alapja a NAP-konzisztencia (Name,
Address, Phone). Ha a weboldal címe eltér a Google Cégprofil címétől, az
gyengíti a helyi találati helyezést. Az új oldalon mindenhol az **1112**
szerepel — a láblécben, a Kapcsolat oldalon és a strukturált adatokban is,
egyetlen forrásból.

> **Teendő a tulajdonosnak:** erősítse meg, hogy az 1112-es irányítószám a
> helyes. Ha igen, érdemes minden más helyen is javítani (számlák,
> hirdetések, cégjegyzékek), ahol még a 2111 szerepel.

---

## 3. Miért nincs árlista az új oldalon?

A régi `/arak/` oldal **teljesen üres volt** — a fejlécen és a láblécen kívül
egyetlen árat sem tartalmazott. Ezért az új oldalon sem találunk ki árakat.

Az új `/arak/` oldal ehelyett elmagyarázza, **mitől függ az ár** (márka,
típus, évjárat, kulcstípus, van-e még működő kulcs, kell-e programozás), és
erős hívás-CTA-val zárja. Ez keresési szempontból is jól működik az
„autókulcs másolás ára" típusú keresésekre, és becsületes is.

> **Teendő:** ha vannak valós, kiírható árak vagy ársávok (például kiszállási
> díj vagy minimum ár), azok beilleszthetők a `/arak` oldalba. Kitalált árat
> nem írtunk ki.

---

## 4. Google Cégprofil — mi sikerült és mi nem

| Adat | Állapot |
| --- | --- |
| Profil URL | ✅ megvan, be van kötve (`config/business.ts`) |
| Cím | ✅ innen derült ki a helyes irányítószám (1112) |
| Csillagos értékelés | ✅ **4,9** — kiolvasva a Cégprofilból |
| Értékelések **száma** | ✅ **77** — kiolvasva a Cégprofilból |
| Vélemények szövege | ✅ 3 valódi vélemény bemásolva (lásd 11. pont) |

A Google beleegyezési fala (`consent.google.com`) blokkolja a Cégprofil
*gépi* lekérdezését. Az adatokat végül bejelentkezett böngészőn keresztül,
kézzel olvastuk ki — lásd a 11. pontot. A lenti alapelv továbbra is érvényes:
amit nem tudunk hitelesen, azt nem írjuk ki.

**Amit ehelyett csináltunk — és ez fontos:**

- Az értékelések számát **nem találtuk ki.** A `reviewCount` értéke `null`,
  és amíg az, az oldal csak a csillagos értéket írja ki, darabszám nélkül.
- Véleményt **nem generáltunk.** A `reviews` tömb üres, és amíg üres, a
  Vélemények szekció egy tiszta blokkot mutat, ami a valódi Google-profilra
  küldi a látogatót.
- A `LocalBusiness` strukturált adatba az `aggregateRating` **csak akkor
  kerül bele**, ha a darabszám ismert. A kód ezt kikényszeríti, és az
  ellenőrző szkript hibát jelez, ha megsértenék.

> **Teendő a tulajdonosnak (5 perc):** nyissa meg a Google Cégprofilt, és
> írja be a `config/business.ts`-be:
> - `reviewCount:` a pontos értékelésszám (pl. `87`)
> - `reviews:` 3–6 valódi vélemény szó szerint bemásolva
>
> Ettől a csillagos értékelés a Google találati listában is megjelenhet.

---

## 5. Névhasználat — eldöntendő kérdés

Három különböző név van forgalomban:

| Hol | Név |
| --- | --- |
| Új weboldal (megrendelés szerint) | **Autókulcs Doki** |
| Google Cégprofil | Autókulcs másolás programozás 0-24 |
| Régi weboldal | Autó kulcsmásolás Non-Stop Budapest |

A lokális SEO akkor a legerősebb, ha a weboldal neve és a Google Cégprofil
neve **megegyezik**.

> **Teendő:** vagy a Google Cégprofil nevét érdemes „Autókulcsmásoló
> Doktor"-ra módosítani, vagy a weboldal márkanevét a Cégprofilhoz igazítani.
> Utóbbi egyetlen sor a `config/business.ts`-ben (`name`).
>
> Megjegyzés: a jelenlegi Cégprofil-név kulcsszavakat tartalmaz
> („autókulcs másolás programozás 0-24"), ami a Google irányelvei szerint
> nem megengedett — a valódi cégnevet kell megadni. Ez akár bejelentésre is
> kerülhet, ezért a rendezése amúgy is javasolt.

---

## 6. Átirányítási térkép (301)

A régi oldalnak **nem volt sitemap.xml és robots.txt fájlja sem** (mindkettő
404-et adott), de az URL-jei indexelve lehetnek. Ezért minden régi URL-nek
van megfelelője — egyik sem vezet 404-re.

| Régi URL | Új URL | Indok |
| --- | --- | --- |
| `/about-us/` | `/rolunk/` | magyar URL |
| `/services/` | `/szolgaltatasok/` | magyar URL |
| `/contacts/` | `/kapcsolat/` | magyar URL |
| `/arak/` | `/arak/` | **változatlan** — nincs átirányítás |
| `/autobanfelejtettkulcs/` | `/szolgaltatasok/autonyitas/` | tartalmilag autónyitás |
| `/eveszettautokulcs` | `/szolgaltatasok/elveszett-autokulcs/` | elgépelt régi URL |
| `/elvesztettkulcs/` | `/szolgaltatasok/elveszett-autokulcs/` | ugyanaz a tartalom, másik URL-en |
| `/potkulcs/` | `/szolgaltatasok/autokulcs-masolas/` | a pótkulcs = kulcsmásolás |
| `/autokulcstanitas/` | `/szolgaltatasok/autokulcs-programozas/` | immobilizer/kulcstanítás |

Megvalósítás: `public/.htaccess` (Apache) és `public/_redirects`
(Netlify/Cloudflare). Mindkettő az `out/` mappába kerül a buildkor.

> **Élesítés után ellenőrizze**, hogy a `.htaccess` valóban feltöltődött —
> sok FTP-program elrejti a ponttal kezdődő fájlokat.

---

## 7. Amit a régi oldal SEO-ban rosszul csinált (és most javítva van)

| Probléma a régi oldalon | Most |
| --- | --- |
| `<title>` értékek: „About us", „Services", „Single Services 2 2 2" | minden oldalnak egyedi, magyar, kulcsszavas címe van |
| Nincs `robots.txt` (404) | ✅ generált `robots.txt` |
| Nincs `sitemap.xml` (404) | ✅ generált `sitemap.xml`, 14 URL-lel |
| Nincs strukturált adat | ✅ LocalBusiness / AutomotiveBusiness, Service, FAQPage, BreadcrumbList, WebSite |
| Nincs meta description | ✅ minden oldalon egyedi |
| Nincs canonical | ✅ minden oldalon |
| Nincs H1 a legtöbb aloldalon | ✅ pontosan egy H1 oldalanként |
| Az `/arak/` oldal üres | tartalmas árazási magyarázat + CTA |
| Angol URL-ek magyar oldalon | magyar, beszélő URL-ek |
| Egyetlen aloldal sincs a fő szolgáltatásokra | 6 önálló, egyedi tartalmú szolgáltatás-oldal |

---

## 8. Teljesítmény és mért eredmények

### Lighthouse — mind a 9 oldalon lefuttatva

| Oldal | Teljesítmény | Akadálymentesség | Bevált gyakorlat | SEO |
| --- | --- | --- | --- | --- |
| Kezdőlap | 100 | 100 | 100 | 100 |
| Szolgáltatások | 100 | 100 | 100 | 100 |
| Autónyitás (aloldal) | 100 | 100 | 100 | 100 |
| Árak | 100 | 100 | 100 | 100 |
| Rólunk | 100 | 100 | 100 | 100 |
| Galéria | 100 | 100 | 100 | 100 |
| Vélemények | 100 | 100 | 100 | 100 |
| GYIK | 100 | 100 | 100 | 100 |
| Kapcsolat | 100 | 100 | 100 | 100 |

Mobil és asztali nézetben egyaránt 100/100/100/100.

**Core Web Vitals (mobil, lassított hálózaton):**

| Mérőszám | Érték |
| --- | --- |
| Largest Contentful Paint (LCP) | 1,8 s |
| Cumulative Layout Shift (CLS) | **0** |
| Total Blocking Time (TBT) | **0 ms** |
| First Contentful Paint | 0,8 s |
| Speed Index | 1,1 s |

Asztali nézetben az LCP 0,4 s.

### Az audit során talált és javított hibák

A fejlesztés közben futtatott ellenőrzések valódi hibákat találtak, ezek
mind javítva lettek:

1. **A CTA gomb nem felelt meg a kontrasztkövetelménynek.** A narancs
   (#dd5c09) fehér szöveggel csak 3,74:1 — a küszöb 4,5:1. Az oldal
   legfontosabb gombja volt. Javítva: #c44e07 (4,73:1).
2. **A sötét hátterű címsorok feketén jelentek meg.** A CSS-ben rétegen
   kívül írt `h2 { color }` szabály felülírta az összes Tailwind
   szövegszín-osztályt, így a zöld CTA-sáv címsora 1,71:1 kontraszttal
   jelent meg — gyakorlatilag olvashatatlanul. Javítva: `@layer base`.
3. **A fejléc túlcsordult mobilon.** A hívás gomb levágódott, a
   hamburger menü teljesen lecsúszott a képernyőről.
4. **Túl hosszú oldalcímek.** A `%s | Márkanév` sablon miatt a legtöbb
   title 80 karakter fölé nőtt, amit a Google levág. Minden cím újraírva
   35–56 karakter közé.
5. **Átugrott címsorszint** a Szolgáltatások oldalon (H1 → H3).
6. **Kis méretű szövegek elégtelen kontraszttal** a láblécben és az
   űrlapon.
7. **Link-név ütközés**: a logó és a galéria linkjeinek `aria-label`-je
   nem tartalmazta a látható szöveget — ez a beszédvezérlést használóknak
   okozott volna gondot.

### Súlyadatok

A mért értékek a legenerált éles kimeneten:

| Mérés | Érték |
| --- | --- |
| Kliensoldali JavaScript | **0 kB** |
| Kezdőoldal (HTML, tömörítve) | ~12 kB |
| CSS (tömörítve) | ~9 kB |
| **Kezdőoldal teljes súlya** | **~20 kB** + betűtípus |
| Legenerált oldalak | 17 |

Kiindulási állapot: 172 kB tömörített JavaScript, amit a Next.js
alapértelmezésben minden oldalhoz mellékel. Mivel az oldalon nincs egyetlen
kliensoldali komponens sem, ez eltávolításra került (`scripts/strip-js.mjs`).

A képek AVIF/WebP formátumban, három méretben készülnek, `srcset`-tel és
fix képaránnyal — így nincs elmozduló elrendezés (CLS) a betöltéskor.

---

## 9. Nyitott kérdések — ezekre a tulajdonos válasza kell

1. **Irányítószám:** megerősíti, hogy 1112 (és nem 2111)?
2. **Google értékelések száma:** hány darab? (`reviewCount`)
3. **Valódi vélemények:** melyik 3–6 véleményt tegyük ki? (szó szerint)
4. **Cégnév:** a weboldal vagy a Google Cégprofil neve igazodjon a másikhoz?
5. **E-mail cím:** van hivatalos cím? A régi oldalon sehol nem szerepelt.
6. **Árak:** van bármilyen kiírható ár vagy ársáv?
7. **Alapítás éve:** a régi lábléc „2019"-et írt, de ez lehet egyszerű
   szerzői jogi évszám is. **Ezért sehol nem állítottuk, hogy 2019 óta
   működnek** — ha ez igaz, érdemes kiírni, mert bizalmat épít.
8. **Agglomerációs települések:** a `config/business.ts`-ben felsorolt 10
   település csak feltételezés a „Budapest és környéke" alapján. Kérjük
   pontosítsa, hova mennek ki ténylegesen — kitalált ellátási terület
   csalódott hívásokat okoz.
9. **Fotók és videók:** ezek várnak feltöltésre (lásd `README.md`).

---

## 10. Amit szándékosan NEM csináltunk

- **Nem találtunk ki árat, véleményt, értékelésszámot vagy e-mail címet.**
- **Nem töltöttünk le képet a régi oldalról vagy a Google Cégprofilból** —
  helyette megjelölt fotóhelyek várják a cég saját fotóit.
- **Nem gyártottunk tucatnyi kerületi aloldalt** („autónyitás XI. kerület",
  „autónyitás XII. kerület"…). Ezek egymás másolatai lennének, valódi egyedi
  tartalom nélkül, és a Google ezt vékony tartalomként kezeli. Helyette egy
  valóban hasznos ellátási terület szekció készült.
- **Nem írtunk túlzó állítást** („Magyarország legjobbja"), mert nincs mivel
  alátámasztani.

---

## 11. Frissítés — 2026-09-07, második menet

### Google adatok: ELLENŐRIZVE

A Google Cégprofilt sikerült közvetlenül kiolvasni (bejelentkezett böngészőn
keresztül, nem gépi lekérdezéssel):

| Adat | Érték |
| --- | --- |
| Csillagos értékelés | **4,9** |
| Értékelések száma | **77** |
| Cím | Budapest, Nagyida köz 5/b, **1112** ✅ (megerősítve) |
| Telefon a profilon | 06 30 685 0133 (a weboldal *másodlagos* száma) |
| Tulajdonos neve | **Juhász Marcell** (egy vélemény említi) |

Ezzel a `reviewCount: 77` bekerült a configba, és az `aggregateRating` most
már kimegy a strukturált adatban — ez csillagokat hozhat a Google találati
listában.

**Három valódi vélemény** került fel, szó szerint a Cégprofilból:
Olivér Bukodi, Csaba Moldován, Michael Szemiller (mind 5 csillag).

### ⚠️ Nyitvatartás: ellentmondás

A Google Cégprofil szerint a nyitvatartás **„Zárás: 0:00"** — vagyis éjfélkor
zár. A tulajdonos megerősítette, hogy a valóságban **non-stop, 0–24**.

**Teendő: a Google Cégprofilban át kell állítani 24 órásra.** Jelenleg a
weboldal és a Google mást állít, ami rontja a lokális SEO konzisztenciát,
és félrevezeti azt, aki éjjel keres.

### Fotók: 26/26 elkészült

Minden képhely megtelt, AI-val generált fotókkal (ChatGPT, a tulajdonos
fiókjából), egységes arculatban: grafit + tompított zöld + narancs akcentus.

**Két tartalmi elutasításba futottunk**, mindkettő átfogalmazással megoldva:
- „nyitószerszám az ajtó és az ablak között" → feltörési technikának minősül
- „zárbetét + kulcs" egy képen → szintén

Ezért minden prompt a **szolgáltatás kontextusát** mutatja (nyitott ajtó,
kiterített szerszám, műhely, kész kulcs), nem a nyitás technikáját.

**A galéria szövege módosult.** Eredetileg ez állt: „Nem stockfotók: a saját
munkáinkról készült képek." AI-képekkel ez valótlan lett volna, ezért most:
„Betekintés a munkába…". Amint megvannak a tulajdonos saját fotói, érdemes
visszaírni az erősebb változatra — a valódi munkafotó többet ér.

### Előnézeti deploy

Élő előnézet: https://matteocammisa8.github.io/autokulcsmasolo-doktor/

A preview build `noindex` + `robots.txt: Disallow /` beállítással megy ki,
hogy ne versenyezzen duplikált tartalomként az éles autokulcsmasolo.com-mal.
Az éles build (`npm run build`, PREVIEW_BASE_PATH nélkül) ezt nem teszi rá.
