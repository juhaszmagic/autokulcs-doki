# Autókulcs Doki — weboldal

Autónyitás és autókulcsmásolás Budapesten. Statikusan generált weboldal,
telefonhívásra optimalizálva.

---

## Gyors kezdés

```bash
npm install
npm run dev          # fejlesztői szerver → http://localhost:3000
```

Éles build:

```bash
npm run build:site   # képfeldolgozás + build + JS-eltávolítás + ellenőrzés
```

Az eredmény az `out/` mappában van. Ezt a mappát kell feltölteni a tárhelyre.

---

## Parancsok

| Parancs | Mit csinál |
| --- | --- |
| `npm run dev` | Fejlesztői szerver |
| `npm run images` | A `/public/images` fotóiból AVIF/WebP változatokat gyárt |
| `npm run build` | Statikus oldal generálása az `out/` mappába |
| `npm run audit` | A legenerált HTML ellenőrzése (SEO, címsorok, linkek, JSON-LD) |
| `npm run build:site` | **Ez az éles build.** A fentieket futtatja egymás után |
| `npm run serve` | Az elkészült `out/` mappa kiszolgálása helyben |

---

## Hol kell szerkeszteni?

A weboldal **minden ténybeli adata négy fájlban** van. Kódot nem kell írni.

### `config/business.ts` — cégadatok

Telefonszám, cím, nyitvatartás, Google-értékelés, ellátási terület.
Ha bármelyik változik, itt kell átírni — az egész weboldal, a lábléc, a
strukturált adatok és a sitemap ebből dolgozik.

**Itt található két dolog, ami kitöltésre vár:**

```ts
reviewCount: null   // ide jön a Google értékelések darabszáma
reviews: []         // ide jönnek a valódi Google-vélemények
email: null         // ide jön a hivatalos e-mail cím, ha lesz
```

### `config/services.ts` — szolgáltatások

Minden szolgáltatás szövege, GYIK-je és SEO-adata. Új szolgáltatás
felvételekor automatikusan létrejön az aloldala, bekerül a menübe,
a láblécbe és a sitemapbe.

### `config/faq.ts` — gyakori kérdések

A kezdőoldal és a GYIK oldal kérdései.

### `config/media.ts` — galéria és videók

Melyik fotó melyik kategóriába kerüljön, milyen alt szöveggel.

---

## Fotók feltöltése

1. Másolja a képeket a megfelelő mappába:

   ```
   public/images/hero/            — a kezdőoldal nagy képe
   public/images/szolgaltatasok/  — szolgáltatás-oldalak képei
   public/images/galeria/         — galéria
   public/images/rolunk/          — a Rólunk oldal képe
   ```

2. **Beszédes, ékezet nélküli fájlnevet** használjon — a fájlnév is SEO-jel:

   - jó: `autokulcs-masolas-budapest-01.jpg`
   - rossz: `IMG_2841.jpg`

3. Futtassa:

   ```bash
   npm run images
   ```

Ez legyártja minden képből az AVIF és WebP változatokat három méretben,
és elkészíti a `manifest.json`-t a méretadatokkal.

**Amíg egy fotó nincs feltöltve**, a helyén egy megjelölt „fotóhely"
látszik, ami pontosan ugyanakkora, mint a leendő kép lesz. Az elrendezés
tehát nem ugrik meg a feltöltés után, és sehol nincs törött kép.

A képek elvárt fájlneveit a `config/media.ts` és a `config/services.ts`
tartalmazza.

---

## Videók

A `config/media.ts` `videos` tömbje **szándékosan üres**. Amint vannak
videók, itt kell felvenni őket, és a videószekció magától megjelenik a
galéria oldalon.

YouTube-videó esetén a beágyazás **lusta**: alapból csak a borítókép
töltődik be, a nehéz lejátszó pedig csak kattintásra. Így a videók nem
lassítják az oldalt.

---

## Kapcsolati űrlap élesítése

Az oldal statikus, ezért az űrlapot külső szolgáltatás fogadja.

1. Regisztráljon a [Formspree](https://formspree.io) oldalán (ingyenes csomaggal indítható).
2. Másolja a `.env.example` fájlt `.env.local` néven.
3. Írja be a kapott végpontot:

   ```
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/AZ_ON_AZONOSITOJA
   ```

4. Építse újra: `npm run build:site`

**Amíg ez nincs beállítva**, az űrlap nem tesz úgy, mintha működne: a
beküldés gomb helyén magyarázat és a telefonszámok jelennek meg.

A spamvédelem JavaScript nélkül működik, rejtett „honeypot" mezővel
(`_gotcha`), amit a Formspree automatikusan felismer.

---

## Élesítés

A build eredménye (`out/`) sima HTML — bármilyen tárhelyen fut, nem kell
hozzá Node.js szerver.

### Apache tárhelyre (a jelenlegi megoldás)

Töltse fel az `out/` mappa **teljes tartalmát** a webgyökérbe, a rejtett
`.htaccess` fájllal együtt.

A `.htaccess` tartalmazza:

- a régi URL-ek 301-es átirányítását (lásd `AUDIT.md`),
- a gyorsítótárazást és a tömörítést,
- az alapvető biztonsági fejléceket.

> **Fontos:** sok FTP-program alapból elrejti a ponttal kezdődő fájlokat.
> Ellenőrizze, hogy a `.htaccess` valóban feltöltődött-e.

### Netlify / Cloudflare Pages

Az átirányításokat a `_redirects` fájl tartalmazza, az is az `out/` mappában van.

- Build parancs: `npm run build:site`
- Kimeneti mappa: `out`

---

## Miért nincs JavaScript az oldalon?

Az oldal **0 kB kliensoldali JavaScriptet** tölt be. Ez szándékos.

A tipikus látogató mobilneten, az autója mellett állva, stresszesen nyitja
meg az oldalt. Neki minden letöltött kilobyte késleltetés.

Ezért minden interakció a böngésző beépített képességeire épül:

| Funkció | Megoldás |
| --- | --- |
| Mobilmenü | natív `<details>` / `<summary>` |
| GYIK harmonika | natív `<details>` |
| Galéria nagyítás | CSS `:target` |
| Űrlap-ellenőrzés | HTML5 `required`, `pattern`, `type` |

A `scripts/strip-js.mjs` a build után eltávolítja a React futtatókörnyezetét,
amire így nincs szükség (~172 kB tömörített JavaScript).

**Ha a jövőben mégis kell JavaScript:** vegyen fel egy `"use client"`
komponenst. A szkript ilyenkor magától leáll és figyelmeztet — ilyenkor
egyszerűen `npm run build`-et használjon a `build:site` helyett.

---

## Ellenőrzés

```bash
npm run audit
```

Végigmegy a legenerált HTML-en, és hibát jelez, ha:

- hiányzik vagy duplikált a `<title>` / meta description,
- nincs pontosan egy `H1`, vagy átugrott címsorszint van,
- hiányzik a canonical,
- `<img>` maradt alt szöveg nélkül,
- belső link nem létező oldalra mutat,
- hibás a telefonlink,
- érvénytelen a JSON-LD, vagy `aggregateRating` szerepel darabszám nélkül.

Ez a `build:site` részeként automatikusan lefut.

---

## Fontos szabály a tartalomról

Ezen a weboldalon **nincs kitalált adat**. Nincs kitalált ár, kitalált
vélemény és kitalált értékelésszám.

Amit nem tudunk hitelesen, azt nem írjuk ki — helyette a valódi Google
Cégprofilra mutatunk. Ez nem óvatoskodás: a kitalált vélemény megtévesztő,
és a Google is bünteti.

A részleteket és a nyitott kérdéseket lásd: **`AUDIT.md`**.
