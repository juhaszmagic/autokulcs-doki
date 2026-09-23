@AGENTS.md

# Autókulcs Doki, munkajegyzet

A tulajdonos (Juhász Marcell) autós kulcsmásoló és immobilizer szakember,
**nem fejlesztő**. A technikai részt rá ne terheljük: a kérés általában
„írd át ezt a szöveget, árat, telefonszámot" és a mi dolgunk a
módosítás, ellenőrzés, élesítés teljes menete.

Az általános leírás a `README.md`-ben van. Ez a fájl azt rögzíti, ami
azon felül kell: a kötelező tartalmi szabályokat és azokat a csapdákat,
amikbe bele lehet futni.

## Tartalmi szabályok, ezek kötelezőek

**Ez egy valódi vállalkozás oldala, nem demó.** Amit ide leírunk, azt az
ügyfelek elhiszik és az alapján hívnak fel. Ezért SOHA ne találj ki:

- **árat.** Ár kizárólag a `config/business.ts` `pricing` értékeiből jöhet.
- **ügyfélvéleményt, értékelésszámot, csillagot.**
- **évszámot, tapasztalati évet, elvégzett munkák számát.**
- **tanúsítványt, díjat, partnercéget, statisztikát.**
- **ellátási területet vagy kiérkezési időt.**

Ha egy állításhoz forrás kellene és nincs, **az állítás kimarad**.
Bizonytalanság esetén kérdezz, ne pótold becsléssel. Egy hiányzó mondat
javítható, egy kitalált adat viszont az ügyfél bizalmába kerül és a
Google is bünteti.

A galéria fotói valódi munkákról készültek, a vélemények valódi
ötcsillagos Google-véleményekből származnak. **Ezt a készletet ne bővítsd
kitalált elemmel.** Új vélemény csak akkor kerülhet be, ha a tulajdonos
szó szerint bemásolja a Google Cégprofilból.

A számszerű adatok (értékelésszám, csillag, árak) nem frissülnek
maguktól: az oldal statikus, nincs élő kapcsolata a Google-lel. Ezeket a
tulajdonos jelzésére kell átírni a `config/business.ts`-ben, majd újra
buildelni és élesíteni.

## Stílus

- **Ne használj hosszú kötőjelet.** Helyette vessző vagy kettőspont.
- **„és" előtt nincs vessző.**
- **Magyar, magázó hangnem.**
- Mindig **„autókulcs"**, ne csak „kulcs".

Ezek a szabályok az oldal szövegeire vonatkoznak és erre a jegyzetre is.

### A tulajdonosnak írt minden szöveg magyar

⚠️ **Nem csak a záró beszámoló magyar, hanem minden, amit a tulajdonos
lát.** Ide tartozik a munka közben kiírt rövid állapotjelzés is, például
„most megnézem a fotókat", „ez kész, jöhet a build". A tulajdonos nem
fejlesztő és nem angolul dolgozik: ha munka közben angol mondatok
jelennek meg, abból nem tudja követni, mi történik az oldalával.

Ez a szabály a commit üzenetekre nem vonatkozik, azok maradnak
ékezet nélküli magyarok, ahogy eddig is.

### A szavak közé tett vonal takarítása

A tulajdonos kifejezett kérése: **ha két szó között olyan vonal áll, ami
nem illik oda, vedd ki, akkor is, ha nem kérte külön.** Ez a jellegzetes
gépi szokás, magyarul nem így írunk. Tehát ha egy fájlon dolgozol és
ilyet látsz benne, javítsd menet közben.

**Ki kell venni** a mondat közepén írásjelként álló gondolatjelet és
nagykötőjelet:

> „nem veszélyes – és jellemzően megoldható" → „nem veszélyes és
> jellemzően megoldható"
> „nem szakmai kérdés – ilyen helyzetben…" → „nem szakmai kérdés: ilyen
> helyzetben…"

**Nem szabad kivenni** ezt a kettőt:

- **Számtartomány:** 0–24, 20–30 perc, 2–3 másodperc. Ez helyes magyar
  írásmód és nem szavak között áll.
- **Összetett szavak kötőjele:** e-mail, CASCO-szerződés,
  ablakemelő-mechanika, immobilizer-rendszer, autókulcs-programozás.
  Ezek a magyar helyesírás szerint kötőjelesek, kivenni hiba lenne.

⚠️ **Soha ne csináld gépi kereséssel és cserével.** Minden helyre más
írásjel illik (vessző, kettőspont, néha külön mondat), és arra is
figyelni kell, hogy a csere ne hozzon létre „és" előtti vesszőt.

**Állapot:** 2026-09-18-án az **egész oldal** megtisztítva, előbb az öt
cikk (26 csere), majd a többi oldal (45 csere a `config/`, `components/`
és `app/` fájlokban). Ellenőrizve: a legenerált oldalakon egyetlen szavak
közötti vonal maradt, egy TikTok-videó címében.

Az a TikTok-cím szándékosan maradt: az a videó valódi, a tulajdonos által
írt címe (`config/media.ts`), tehát idézet, nem gépi szokás. Idézetet nem
írunk át. Ha új ilyen kerül be, ugyanígy hagyd.

## Ágak, ezt olvasd el, mielőtt bármihez nyúlnál

| Ág | Mi ez |
|---|---|
| `main` | **A forráskód. Itt kell dolgozni.** |
| `gh-pages` | A legenerált, kész oldal, ezt szolgálja ki a GitHub Pages. **Kézzel SOHA ne szerkeszd**, a következő build úgyis felülírja. |

⚠️ **Csapda, amibe már belefutottam:** a munkakörnyezet klónjában
előfordul, hogy **csak a `gh-pages` ág van lehúzva** és a `main` nem
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

Konkrét értékeket (telefonszám, árak, értékelésszám) **ne másolj ide
ebbe a fájlba**: a `config/` az egyetlen igazságforrás, a másolat
elavulna. Ezek az értékek egyetlen helyen vannak definiálva és onnan
kerülnek minden oldalra, nincs kézi végigvezetés.

Az oldal szerkezete: `app/` (route-onként egy `page.tsx`, záró perjeles
URL-ek), `components/` (újrahasznált elemek), `lib/schema.ts` (JSON-LD
strukturált adat a Google-nek).

## Build és ellenőrzés

```bash
npm install                                  # csak egyszer
SITE_URL=https://autokulcsdoki.hu npm run build:site
```

A `build:site` négy lépés: képoptimalizálás (`sharp`, AVIF/WebP), majd
`next build` (statikus export az `out/` mappába), majd `strip-js.mjs`
(kiszedi az összes kliensoldali JS-t, ettől lesz 0 kB), végül `audit.mjs`
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

A `SITE_URL` adja a canonical URL-eket, a sitemapet és az og:image
abszolút címét. A `config/business.ts`-ben az alapértelmezése már az
**éles** domain:

```ts
url: process.env.SITE_URL ?? "https://autokulcsdoki.hu"
```

Tehát a `SITE_URL` nélküli build sem okoz SEO-kárt. Korábban a régi
`autokulcsmasolo.com` volt itt, ami néma hibát okozott: minden canonical
link, a sitemap és a megosztási kép a régi domainre mutatott. Ezt a
8d78f13 commit javította. Kiírva továbbra is helyes.

A `README.md` receptje egy előzmény nélküli repóból, force-pushsal
küldi ki az oldalt. A gyakorlatban ehelyett **megtartjuk a `gh-pages` ág
előzményét**, mert így visszakövethető, mikor mi került ki és szükség
esetén vissza lehet állni. Az eredmény az oldalon ugyanaz:

```bash
git fetch origin gh-pages
git worktree add /tmp/ghp origin/gh-pages --detach
find /tmp/ghp -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R out/. /tmp/ghp/
touch /tmp/ghp/.nojekyll
echo "autokulcsdoki.hu" > /tmp/ghp/CNAME
cd /tmp/ghp && git add -A && git status --short   # ellenőrzés a commit előtt
git commit -m "Frissites: <mi valtozott>"
git push origin HEAD:gh-pages
cd - && git worktree remove /tmp/ghp --force
```

A `git status --short` kimenetét **mindig nézd meg** a commit előtt: ha
csak egy szöveget írtál át, ott is csak a várt fájlok szerepelhetnek.

⚠️ **Ha `D` (törlés) sort látsz, állj meg.** Az azt jelenti, hogy az élő
oldalon van valami, ami a forráskódban nincs meg, tehát az élesítés
letörölné. 2026-09-17-én pontosan ez történt: a „Bent maradt az
autókulcs a kocsiban" cikk fel volt töltve a `gh-pages` ágra, de a
forrásba soha nem került be, így a következő élesítés törölte volna a
cikket, a listaoldali hivatkozását és a sitemap-bejegyzését is. A
megoldás nem a törlés kipipálása volt, hanem a cikk visszaemelése a
`config/content.ts`-be, szó szerinti szöveggel. Ilyenkor előbb kérdezz
rá a tulajdonosnál, mert lehet, hogy nála megvan az eredeti forrás.

⚠️ **Ha a `git fetch` „forced update" üzenetet ír a `gh-pages` ágra**,
valaki a README force-push receptjével élesített a saját gépéről. Ez nem
csak az ág előzményét írja felül: **ha az illető forráskódja elavult, a
deploy csendben visszaállítja a régi tartalmat az egész oldalon.**

Megtörtént eset, 2026-09-17: a Google-értékelések száma 77-ről 80-ra lett
javítva és ki is ment élesbe. Nem sokkal később valaki force-pushsal
élesített egy új blogcikket, de a gépén lévő forrás még a régi értéket
tartalmazta, így az oldal **minden** aldalán visszaállt a 77. A következő
élesítés állította helyre. A hiba ránézésre nem látszik, mert a friss
tartalom közben rendben megjelenik, és a Google eközben is crawlolhat,
tehát a téves adat be is indexelődhet.

Ez bármelyik adattal megtörténhet: árral, telefonszámmal, szöveggel.
Ellenszer: élesítés előtt mindig friss `main`-ből buildelni
(`git fetch origin main && git checkout main && git pull`), és a deploy
előtt átnézni a `git status --short` kimenetét. Ha egy változás
megmagyarázhatatlanul „visszaállt" az élő oldalon, először ezt nézd meg:
`git log origin/gh-pages` és a gyanús commit tartalmát.

Két fájl nem a buildből jön, hanem a deploy során kerül bele és ezek
nélkül az oldal leáll:

- `CNAME` → `autokulcsdoki.hu` (enélkül az egyedi domain megszűnik)
- `.nojekyll` (enélkül a GitHub Pages kihagyja a `_next/` mappát)

A repónak **publikusnak kell maradnia**, különben az ingyenes GitHub
Pages nem szolgálja ki az egyedi domaint.

### A build reprodukálhatósága, ellenőrizve

2026-09-17-én a `main`-ből készült build **minden HTML fájlja bájtra
azonos** volt az élő `gh-pages` tartalommal. Egyedül a `sitemap.xml`
tér el, ott is csak a `lastmod` időbélyegekben, illetve a képek AVIF és
WebP változatai (a `sharp` kódolása nem determinisztikus). Vagyis az
élő oldal pontosan a forráskódot tükrözi, nincs kézi módosítás a
`gh-pages`-en. Ha egyszer ez nem így lenne, az azt jelenti, hogy valaki
kézzel nyúlt az élő ághoz: akkor állj meg és kérdezz rá.

## Amit tudni érdemes

- **0 kB kliensoldali JavaScript.** Ezt a `strip-js.mjs` biztosítja a
  build végén. Ha valaha olyan funkció kell, ami tényleg JS-t igényel
  (például interaktív elem), az ezzel a lépéssel ütközik: ilyenkor előbb
  egyeztetni kell, nem csak beletenni.
- **Kapcsolati űrlap:** statikus oldal, szerver nélkül. A beküldés egy
  külső továbbítón (FormSubmit) megy a `juhaszmagic@gmail.com` címre
  (`config/business.ts` → `site.formRecipients`).
- **Új oldal létrehozásakor** a `sitemap.ts` generálja a sitemapet, tehát
  külön nem kell karbantartani, de az audit ellenőrzi, hogy van-e
  egyedi title, description és canonical.
- A `public/_redirects` és a gh-pages-en lévő `.htaccess` a régi
  `autokulcsmasolo.com` URL-jeinek 301-es átirányításait tartalmazza.
  **GitHub Pages egyiket sem olvassa**, tehát ezek jelenleg nem élnek.
  Csak akkor lennének hasznosak, ha az oldal Apache vagy Netlify
  tárhelyre kerülne.

### ⚠️ A régi domain: NE irányítsd át, ez a tulajdonos döntése

Az `autokulcsmasolo.com` **él és szándékosan külön marad.** A tulajdonos
2026-09-24-én megerősítette: azért nem kötjük össze a két oldalt, mert
néha a régi domaint is hirdeti Google Ads-ben, **másik fiókból**, így a
keresőben megjelenő négy hirdetésből kettő az övé.

Tehát a 301-es átirányítás felvetése **lezárt kérdés, ne javasold újra
és főleg ne állítsd be.** SEO szempontból a két külön oldal valóban
gyengébb, mint egy erős, ezt a tulajdonos ismeri, elmondtuk neki, és
üzleti okból így döntött. Ez az ő döntése, nem hiba, amit javítani kell.

(Ha a tulajdonos egyszer mégis az összevonás mellett dönt, akkor lesz
értelme elővenni a `_redirects` fájlt és tárhelyet keresni hozzá.)
- A `package.json`-ban a `deploy:preview` script egy másik GitHub-
  felhasználó (`matteocammisa8`) előnézeti címére mutat: ez az eredeti
  fejlesztő maradványa, éles deploynál nem használjuk.
