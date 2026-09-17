# Autókulcs Doki weboldal — projekt-jegyzetek

Ez a fájl a `claude/focused-keller-jha2fo` (dev) ágon él, **nem kerül fel a
`gh-pages` ágra**, mert a GitHub Pages a branch minden fájlját nyilvánosan
kiszolgálja (`https://autokulcsdoki.hu/CLAUDE.md` lenne belőle). Ha valaha
mégis erre az ágra kellene kerülnie, azt külön jelezni kell.

## 1. Mi ez a repó, és hogyan megy élesbe

- **Élő oldal:** https://autokulcsdoki.hu (custom domain, `CNAME` fájl a
  repo gyökerében: `autokulcsdoki.hu`)
- **A `gh-pages` ág = a LIVE oldal.** A GitHub Pages beállítás ezt az ágat
  szolgálja ki közvetlenül, fájlról fájlra — **nincs build lépés, nincs
  GitHub Actions workflow** (nincs `.github/workflows` mappa). Amit
  becommitolunk és pusholunk a `gh-pages`-re, az percek múlva (GitHub Pages
  cache) élesben megjelenik.
- **Dev ág:** `claude/focused-keller-jha2fo`. A session indulásakor ez
  bit-pontosan ugyanaz volt, mint a `gh-pages` (ugyanaz a commit:
  `e7b54dc`). Itt dolgozunk, majd a kész, ellenőrzött változást átvisszük a
  `gh-pages`-re is.
- **Nincs különálló forráskód-projekt a repóban.** Nincs `package.json`,
  nincs `pages/`, `src/`, `next.config.*`. A `_next/static/...` elnevezés és
  a HTML szerkezet alapján a site egy **Next.js statikus exportból (`next
  export`)** származik, de a repóban **csak a legenerált kimenet van**
  (nyers `.html`, `.css`, kép- és fontfájlok). Vagyis: a szerkesztés magán a
  legenerált HTML-en történik, nincs "recompile" lépés.
- **Nincs kliens-oldali JavaScript-bundle.** Minden `.html` fájlban csak
  2 db `<script type="application/ld+json">` van (structured data), semmi
  más `<script>`. A böngésző tehát tisztán statikus HTML+CSS-t renderel,
  hidratáció / JS-mismatch kockázat nélkül lehet szöveget módosítani.
- **CSS egyetlen fájlban:** `_next/static/chunks/3t5fag2udav64.css`
  (minifikált, Tailwind-szerű utility class-ok). Ha vizuális stílust kell
  módosítani, ebben a fájlban kell keresni a megfelelő class-t — nincs
  forrás `.scss`/Tailwind-config.
- **Fontok:** `_next/static/media/*.woff2` (Inter betűtípus, több
  unicode-range darab).

### Munkafolyamat változtatásoknál

1. Szerkesztés a dev ágon (`claude/focused-keller-jha2fo`).
2. Ellenőrzés: a HTML jól formázott maradt, a linkek/telefonszám
   konzisztens (lásd lentebb, hány fájlban szerepel ismétlődően).
3. Commit a dev ágra, majd a **gh-pages ágba is átvezetni és pusholni**
   (pl. `git checkout gh-pages && git merge claude/focused-keller-jha2fo`
   vagy a konkrét fájlokat cherry-pickelve), mert **csak a gh-pages ág
   megy élesbe**. A dev ágat is pusholjuk, hogy a history megmaradjon.
4. A `CLAUDE.md` és egyéb dev-only jegyzet **nem** kerül a gh-pages-re.

## 2. Oldaltérkép (route → fájl)

Minden route egy `<útvonal>/index.html` fájl (Next.js statikus export
szokás szerint), a gyökér `index.html` a főoldal.

| URL | Fájl |
|---|---|
| `/` | `index.html` — Főoldal |
| `/szolgaltatasok/` | `szolgaltatasok/index.html` — Szolgáltatások gyűjtőoldal |
| `/szolgaltatasok/elveszett-autokulcs/` | ua. almappa |
| `/szolgaltatasok/autokulcs-masolas/` | ua. |
| `/szolgaltatasok/autokulcs-keszites/` | ua. |
| `/szolgaltatasok/autokulcs-programozas/` | ua. |
| `/szolgaltatasok/serulesmentes-autonyitas/` | ua. |
| `/arak/` | `arak/index.html` — **Árlista** |
| `/kapcsolat/` | `kapcsolat/index.html` — Kapcsolat + űrlap |
| `/rolunk/` | `rolunk/index.html` — Rólunk |
| `/galeria/` | `galeria/index.html` |
| `/gyik/` | `gyik/index.html` — GYIK |
| `/velemenyek/` | `velemenyek/index.html` — Vélemények |
| `/tudasbazis/` | `tudasbazis/index.html` — Tudásbázis gyűjtőoldal |
| `/tudasbazis/elveszett-osszes-autokulcs/` | cikk |
| `/tudasbazis/immobilizer-mit-jelent/` | cikk |
| `/tudasbazis/potkulcs-mielott-elveszik/` | cikk |
| `/koszonjuk/` | űrlap-elküldés utáni köszönő oldal |
| `/impresszum/` | Impresszum |
| `/adatkezelesi-tajekoztato/` | Adatkezelési tájékoztató (GDPR) |
| `/404.html` (+ `/404/`) | Hibaoldal |

Képek: `images/` (minden fotóhoz több felbontás és formátum:
`-640/-1024/-1600` méretek `.avif`/`.webp` + eredeti `.jpg`). Új kép
hozzáadásakor **nem kötelező** minden variánst legenerálni — egy sima `.jpg`
is működik, csak akkor nem lesz olyan optimalizált (responsive
`srcset`), mint a többi.

## 3. Céges adatok (a főoldal JSON-LD structured data alapján, `index.html`)

- **Név:** Autókulcs Doki
- **Telefonszám:** `+36 30 685 01 33` (nemzetközi formátumban `+36306850133`)
  — **23 helyen** szerepel a HTML fájlokban (tel: linkek, szöveg, WhatsApp/
  Viber linkek). Telefonszám-csere esetén mindenhol grep-elni kell:
  `grep -rl "306850133" --include="*.html" .`
- **WhatsApp:** `https://wa.me/36306850133`
- **Viber:** `viber://chat?number=%2B36306850133`
- **Cím:** Nagyida köz 5/B, Budapest, 1112
- **Nyitva tartás:** 0–24, a hét minden napján (non-stop)
- **Kiszolgálási terület (areaServed):** Budapest, Biatorbágy, Budakeszi,
  Budaörs, Dunakeszi, Érd, Gyál, Halásztelek, Herceghalom, Mogyoród, Páty,
  Szentendre, Telki, Törökbálint, Üröm, Vecsés, Zsámbék
- **Közösségi médiák:** TikTok (`@autkulcsmasolas`), Facebook, Google Maps
  bejegyzés (`hasMap` / `sameAs`)
- **Google értékelés:** 4,9 / 5, 77 értékelés (`aggregateRating` a JSON-LD-
  ben) — a `velemenyek/index.html` és az `index.html` JSON-LD-je is
  tartalmaz konkrét vélemény-szövegeket (`review` tömb), ezeket kézzel kell
  frissíteni, ha új kiemelt vélemény kerül fel.

## 4. Szolgáltatások és árak (`arak/index.html` alapján, 2026-09-17 állapot)

Kiindulóár: **25 000 Ft-tól**. Négyféle munka:

| Munka | Ár |
|---|---|
| Távirányító nélküli (mechanikus) kulcs | 25 000 Ft |
| Távirányítós kulcs | 45 000 Ft |
| Keyless kulcs | 60 000 Ft-tól |
| Elveszett az összes kulcs (0 db működő kulcs maradt) | 60 000–70 000 Ft-tól |

Extra: **kiszállási díj +10 000 Ft**, ha nem tudja behozni az autót
(ha az összes kulcs elveszett, mindig kiszállás van).

Az áraknál mindig szerepel a figyelmeztetés, hogy ez tájékoztató
kiindulóár, a pontos ár telefonon/WhatsAppon/Viberen egyeztetve. **Ha árat
módosítunk, érdemes ugyanígy meghagyni a "tájékoztató ár" jellegű
megfogalmazást**, ez tudatos jogi/üzleti döntés volt az oldalon.

Az 5 szolgáltatás (ugyanezek a `szolgaltatasok/` almappák és a JSON-LD
`hasOfferCatalog`-ja is ezt listázza):
1. Elveszett autókulcs
2. Autókulcs másolás
3. Autókulcs készítés
4. Autókulcs programozás
5. Sérülésmentes autónyitás

## 5. SEO elemek

- Minden oldalnak van egyedi `<title>` és `<meta name="description">` —
  ezeket tartalom-módosításnál mindig érdemes átnézni/frissíteni, ha a
  szöveg lényegesen változik.
- **JSON-LD structured data** csak a főoldalon (`index.html`):
  `LocalBusiness`/`AutomotiveBusiness` + `WebSite` + beágyazott
  `aggregateRating` és konkrét `review`-k. Ez adja a Google-nek a cégadatot,
  nyitva tartást, kiszolgálási területet, értékeléseket.
- `sitemap.xml` — statikus, kézzel karbantartott lista `priority` és
  `changefreq` mezőkkel. **Új oldal létrehozásakor ide is fel kell venni**,
  különben a Google nehezebben találja meg.
- `robots.txt` — mindent enged, hivatkozik a sitemapre.
- `.htaccess` — **Apache-specifikus** 301-es átirányítások a régi
  `autokulcsmasolo.com` URL-jeiről + cache/tömörítés/security header
  szabályok. **GitHub Pages ezt NEM olvassa/futtatja** — csak akkor lenne
  élő, ha valaha Apache-tárhelyre kerülne az oldal. Jelenleg tisztán
  dokumentáció/örökség, de tartalmilag hasznos referencia arra, mely régi
  URL-ek léteztek.
- `_redirects` — ugyanaz, csak Netlify/Cloudflare Pages szintaxisban,
  ugyanígy **nem aktív GitHub Pages-en**. Ha valaha migrálnánk egy ilyen
  szolgáltatóra, ez már készen van.
- Reszponzív képek `.avif`/`.webp`/`.jpg` variánsokban (640/1024/1600px) —
  ez adja a jó Core Web Vitals / gyors betöltést, érdemes ezt a mintát
  követni új képeknél is, ha van rá mód (nem kötelező, ld. fentebb).

## 6. Amit érdemes tudni szerkesztés előtt

- A HTML fájlok **egy sorban, minifikáltan** vannak (nincs sortörés) —
  emberi szemmel nehéz olvasni bennük, ezért szöveg keresésekor/
  módosításakor `grep -o`/Python-os szövegkinyerés vagy pontos string-egyezés
  (Edit tool) a célszerű, nem a fájl "megnézése" sima szemmel.
- Ugyanaz a szöveg (pl. telefonszám, header/footer navigáció, CTA gombok)
  **minden egyes oldalon külön-külön szerepel** (nincs shared komponens
  runtime-ban, csak build-time-ban lett szétmásolva) — ismétlődő
  tartalom módosításánál mindig végig kell menni az összes releváns
  fájlon, különben inkonzisztens lesz az oldal.
- Kép hozzáadása/csere: az `images/` mappába kerül, a HTML-ben lévő
  `<img src=... srcset=...>` hivatkozásokat kézzel kell módosítani rá.
