@AGENTS.md

# Autókulcs Doki — munkajegyzet

A tulajdonos (Juhász Marcell) autós kulcsmásoló / immobilizer szakember,
**nem fejlesztő**. A technikai részt rá ne terheljük: a kérés általában
„írd át ezt a szöveget / árat / telefonszámot", és a mi dolgunk a
módosítás → ellenőrzés → élesítés teljes menete.

Az általános leírás a `README.md`-ben van. Ez a fájl azt rögzíti, ami
azon felül kell, és azokat a csapdákat, amikbe bele lehet futni.

## Ágak — ezt olvasd el, mielőtt bármihez nyúlnál

| Ág | Mi ez |
|---|---|
| `main` | **A forráskód. Itt kell dolgozni.** |
| `gh-pages` | A legenerált, kész oldal — ezt szolgálja ki a GitHub Pages. **Kézzel SOHA ne szerkeszd**, a következő build úgyis felülírja. |

⚠️ **Csapda, amibe már belefutottam:** a munkakörnyezet klónjában
előfordul, hogy **csak a `gh-pages` ág van lehúzva**, és a `main` nem
látszik a `git branch -a` kimenetében. Ilyenkor úgy tűnik, mintha nem
lenne forráskód, csak legenerált HTML. Ez téves. Mindig ezzel kezdd:

```bash
git fetch origin main && git checkout main
```

## Hol van a tartalom

**Kódot nem kell írni adatmódosításhoz.** Minden szöveg és adat a
`config/` mappában van, bőségesen kommentezve magyarul:

| Fájl | Mit tartalmaz |
|---|---|
| `config/business.ts` | telefonszám, cím, nyitvatartás, **árak**, Google-értékelés, ellátási terület |
| `config/services.ts` | az öt szolgáltatás szövege |
| `config/faq.ts` | gyakori kérdések |
| `config/media.ts` | fotók, galéria, TikTok-videók |
| `config/content.ts` | tudásbázis cikkek |
| `config/legal.ts` | impresszum, adatkezelési adatok |

Konkrét értékeket (telefonszám, árak) **ne másolj ide ebbe a fájlba** —
a `config/business.ts` az egyetlen igazságforrás, a másolat elavulna.
A telefonszám és az árak egyetlen helyen vannak definiálva, és onnan
kerülnek minden oldalra: nincs kézi végigvezetés.

Az oldal szerkezete: `app/` (route-onként egy `page.tsx`, záró perjeles
URL-ek), `components/` (újrahasznált elemek), `lib/schema.ts` (JSON-LD
strukturált adat a Google-nek).

## Build és ellenőrzés

```bash
npm install                                  # csak egyszer
SITE_URL=https://autokulcsdoki.hu npm run build:site
```

A `build:site` négy lépés: képoptimalizálás (`sharp` → AVIF/WebP) →
`next build` (statikus export a `out/` mappába) → `strip-js.mjs`
(kiszedi az összes kliensoldali JS-t, ettől lesz 0 kB) → `audit.mjs`
(ellenőrzi: title, description, canonical, H1, alt szövegek, törött
belső linkek, gyanús tel: linkek, JSON-LD érvényessége).

Az audit legyen **„Nincs blokkoló hiba"**. A 3 meglévő figyelmeztetés
(rövid title/description az `/impresszum/` és `/koszonjuk/` oldalon)
ismert és elfogadott, nem kell megjavítani.

Helyi megtekintés: `npm run serve` → http://localhost:4321

⚠️ **A build „bepiszkítja" a munkakönyvtárat.** A képoptimalizálás
újrakódolja a `public/images/` alatti AVIF/WebP fájlokat (a `sharp`
kódolása nem determinisztikus), az `npm install` pedig átírja a
`package-lock.json`-t a futtató gép architektúrája szerint. Ezek
**látszólagos** változások, tartalmilag semmi nem történt. Commit előtt
mindig állítsd vissza őket, különben ~35 bináris fájl és egy hibás
lockfile kerülne a commitba:

```bash
git checkout -- package-lock.json public/
```

## Élesítés (deploy)

⚠️ **A legfontosabb csapda: a `SITE_URL`.** A `config/business.ts`-ben
az alapértelmezés a **régi** domain:

```ts
url: process.env.SITE_URL ?? "https://autokulcsmasolo.com"
```

Ha `SITE_URL` nélkül buildelsz, akkor **minden canonical URL, a teljes
sitemap és az og:image a régi domainre fog mutatni** — ez SEO-katasztrófa
lenne, és ránézésre nem is látszik az oldalon. A `README.md` deploy-
receptje ezt sajnos nem említi. Mindig állítsd be.

A `gh-pages` ág egy külön, előzmény nélküli repóból megy fel force-
pushsal (a README-ben van a pontos recept). Két fájl **nem** a buildből
jön, hanem a deploy során kerül bele — ezek nélkül az oldal leáll:

- `CNAME` → `autokulcsdoki.hu` (enélkül az egyedi domain megszűnik)
- `.nojekyll` (enélkül a GitHub Pages kihagyja a `_next/` mappát)

A repónak **publikusnak kell maradnia**, különben az ingyenes GitHub
Pages nem szolgálja ki az egyedi domaint.

### A build reprodukálhatósága — ellenőrizve

2026-09-17-én a `main`-ből készült build **minden HTML fájlja bájtra
azonos** volt az élő `gh-pages` tartalommal. Egyedül a `sitemap.xml`
tér el, ott is csak a `lastmod` időbélyegekben, illetve a képek AVIF/
WebP változatai (a `sharp` kódolása nem determinisztikus). Vagyis az
élő oldal pontosan a forráskódot tükrözi, nincs kézi módosítás a
`gh-pages`-en. Ha egyszer ez nem így lenne, az azt jelenti, hogy valaki
kézzel nyúlt az élő ághoz — akkor állj meg és kérdezz rá.

## Amit tudni érdemes

- **0 kB kliensoldali JavaScript.** Ezt a `strip-js.mjs` biztosítja a
  build végén. Ha valaha olyan funkció kell, ami tényleg JS-t igényel
  (pl. interaktív elem), az ezzel a lépéssel ütközik — ilyenkor előbb
  egyeztetni kell, nem csak beletenni.
- **Kapcsolati űrlap:** statikus oldal, szerver nélkül — a beküldés egy
  külső továbbítón (FormSubmit) megy a `juhaszmagic@gmail.com` címre
  (`config/business.ts` → `site.formRecipients`).
- **Új oldal létrehozásakor** a `sitemap.ts` generálja a sitemapet, tehát
  külön nem kell karbantartani — de az audit ellenőrzi, hogy van-e
  egyedi title/description/canonical.
- A `public/_redirects` és a gh-pages-en lévő `.htaccess` a régi
  `autokulcsmasolo.com` URL-jeinek 301-es átirányításait tartalmazza.
  **GitHub Pages egyiket sem olvassa**, tehát ezek jelenleg nem élnek —
  csak akkor lennének hasznosak, ha az oldal Apache/Netlify tárhelyre
  kerülne.
- A `package.json`-ban a `deploy:preview` script egy másik GitHub-
  felhasználó (`matteocammisa8`) előnézeti címére mutat — ez az eredeti
  fejlesztő maradványa, éles deploynál nem használjuk.
