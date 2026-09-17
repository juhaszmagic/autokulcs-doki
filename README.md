# Autókulcs Doki — autokulcsdoki.hu

A vállalkozás weboldalának teljes forráskódja.
Élő oldal: **https://autokulcsdoki.hu**

## Mi ez

Next.js statikus oldal. Nincs mögötte adatbázis, nincs admin felület,
nincs bejelentkezés. A kész fájlokat a GitHub Pages szolgálja ki.

- 19 oldal
- 0 kB kliensoldali JavaScript
- Lighthouse: SEO 100 · Akadálymentesség 100 · Best practices 100 · Teljesítmény 97

## Hol vannak az adatok

Kódot **nem kell írni** ahhoz, hogy adatot módosíts. Minden a `config/` mappában van:

| Fájl | Mit tartalmaz |
|---|---|
| `config/business.ts` | telefonszám, cím, nyitvatartás, árak, Google értékelés, ellátási terület |
| `config/services.ts` | az öt szolgáltatás szövege |
| `config/faq.ts` | gyakori kérdések |
| `config/media.ts` | fotók, galéria, TikTok videók |
| `config/content.ts` | tudásbázis cikkek |
| `config/legal.ts` | impresszum és adatkezelési adatok |

## Hogyan kell módosítani és élesíteni

```bash
npm install          # csak egyszer, az elején
npm run build:site   # build + ellenőrzés
```

Élesítés (a CNAME fájl kötelező, enélkül a saját domain leáll):

```bash
rm -rf /tmp/deploy && mkdir -p /tmp/deploy
cp -R out/. /tmp/deploy/
touch /tmp/deploy/.nojekyll
echo "autokulcsdoki.hu" > /tmp/deploy/CNAME
cd /tmp/deploy && git init -q -b gh-pages && git add -A
git commit -q -m "frissites"
git push --force https://github.com/<FELHASZNALO>/autokulcs-doki.git gh-pages
```

## Fontos

- A `gh-pages` ág a **kész weboldal**. Kézzel ne szerkeszd, a build felülírja.
- A `main` ág a **forráskód**. Itt kell módosítani.
- A repónak **publikusnak kell maradnia**, különben a GitHub Pages ingyenes
  csomagja nem szolgálja ki az egyedi domaint.
