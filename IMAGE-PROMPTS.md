# Képek — fájlnevek, arányok és AI-promptok

Ez a fájl megmondja, **melyik kép hová kerül**, milyen **fájlnéven**, milyen
**képaránnyal**, és ad hozzá **AI-generáláshoz használható promptot**.

---

## ⚠️ Előbb olvassa el: mit szabad AI-val generálni?

Nem minden képhelyre való AI-kép. A weboldal bizalomra épül, és van, ahol a
kép **konkrét állítást tesz** — ott a generált kép megtévesztő lenne.

| Kategória | AI-kép? | Miért |
| --- | --- | --- |
| **Hero, CTA-háttér, textúra, hangulati képek** | ✅ Igen | Ezek illusztrációk, nem állítanak konkrétat egy elvégzett munkáról. |
| **„Munkáink a gyakorlatban" galéria** | ❌ Nem | A szekció szó szerint azt állítja: *„Nem stockfotók: a saját munkáinkról készült képek."* AI-kép ide megtévesztő. |
| **Rólunk / szakértő fotó** | ❌ Nem | Egy generált „technikus" nem a cég embere. Ha valaki felismeri, az többet árt, mint amennyit a szép kép használ. |
| **Cikkek fejlécképei** | ⚠️ Óvatosan | Szemléltető ábraként rendben, de ne úgy nézzen ki, mint egy dokumentumfotó. |
| **TikTok-borítók** | ❌ Nem | Ezeknek a valódi videó képkockájának kell lenniük. |

**Praktikus javaslat:** a hero és a CTA-háttér mehet AI-val (ezek hangulati
képek), a galéria és a Rólunk fotó viszont a tulajdonos saját telefonos
képeiből legyen. Egy hiteles, telefonnal készült munkafotó **többet ér**, mint
egy tökéletes generált kép — a helyi szolgáltatásnál pont a valódiság ad el.

**A Google Cégprofilban lévő képekről:** ha azokat a tulajdonos töltötte fel,
akkor az eredetik nála megvannak — azokat kérje el közvetlenül. Sokkal jobb
minőségűek, mint amit a Mapsről vissza lehetne szedni, és nincs vele jogi
kérdés sem.

---

## Hogyan használja?

1. Generálja vagy készítse el a képet.
2. Mentse **pontosan a megadott néven** a `/public/images/` mappába.
3. Futtassa: `npm run images`
4. Kész — a kép automatikusan megjelenik, kódot nem kell írni.

Amíg egy fájl hiányzik, a helyén a márka arculatához illő, sötét „fotóhely"
látszik, pontosan akkora, mint a leendő kép. Az elrendezés tehát nem ugrik meg.

---

## Közös stílusleírás (minden prompthoz fűzze hozzá)

```
professional automotive service photography, natural available light,
muted desaturated colour grading, dark charcoal and muted green tones with
a subtle warm orange highlight, shallow depth of field, realistic, documentary
style, no text, no logos, no watermarks, no visible faces, European city setting
```

**Negatív prompt (amit kerüljön):**

```
cartoon, 3d render, cgi, illustration, plastic look, oversaturated, neon,
lens flare, stock photo smile, watermark, text, logo, brand names, license plate
numbers, distorted hands, extra fingers
```

> **Fontos:** a promptokban szándékosan nincs felismerhető arc és rendszám.
> Egyrészt az AI ezeket rontja el a leggyakrabban, másrészt így nem kerül a
> weboldalra olyan „személy", aki nem a cég embere.

---

## 1. Kezdőoldal

### `hero.jpg` — 4:3 (fekvő) · **AI mehet**
A weboldal legfontosabb képe. Ez az LCP-elem, tehát legyen éles és jól tömöríthető.

```
Close-up of a professional automotive locksmith's hands using a diagnostic
programming device connected to a car's OBD port, car door open, modern car
interior visible but out of focus in the background, evening city light,
dark charcoal interior tones, small orange indicator light on the device,
shallow depth of field, documentary automotive photography, no faces, no text
```

### `cta.jpg` — 21:9 (széles, erősen sötétített háttér) · **AI mehet**
Erre 72%-os sötét réteg kerül, tehát a részletek nem fognak látszani —
a kompozíció és a hangulat számít, nem az élesség.

```
Wide atmospheric night shot of a car parked on a quiet European city street,
warm street lamp light reflecting on the wet asphalt, a service van softly
blurred in the background, moody dark green and charcoal tones, cinematic,
no people, no text, no readable license plates
```

### `szakerto.jpg` — 4:5 (álló) · **VALÓDI FOTÓ AJÁNLOTT**
A „Rólunk / szakértelem" szekció fő képe. Ide a tulajdonos vagy a technikus
munka közbeni fotója való.

Ha mégis AI-t használ, tartsa illusztratívnak (kéz és szerszám, ne portré):

```
Hands of a technician cutting a car key on a professional key cutting machine,
metal shavings visible, workshop bench, focused task lighting, muted green
and charcoal workshop tones, vertical composition, documentary style,
no face, no text
```

### `muhely.jpg` — 16:9 · **AI mehet**
A Rólunk és a Galéria oldal fejlécképe.

```
Organised automotive locksmith workbench with key cutting machine, transponder
chips, diagnostic tablet and car key blanks neatly arranged, soft daylight from
a side window, muted charcoal and green tones, top-down or three-quarter view,
no text, no logos
```

### `kapcsolat.jpg` — 16:9 · **AI mehet**

```
Set of modern car keys and a diagnostic tool resting on a car dashboard,
soft daylight through the windscreen, shallow depth of field, muted colours,
calm and professional, no text, no logos
```

---

## 2. Szolgáltatás-oldalak

Mindegyikhez **két** kép tartozik: egy fejléckép (16:9, erősen sötétített) és
egy részletkép (4:3).

| Fájlnév | Arány | Hol jelenik meg |
| --- | --- | --- |
| `autonyitas.jpg` | 16:9 | Autónyitás — fejléc |
| `autonyitas-reszlet.jpg` | 4:3 | Autónyitás — részlet |
| `serulesmentes-autonyitas.jpg` | 16:9 | Sérülésmentes nyitás — fejléc |
| `serulesmentes-autonyitas-reszlet.jpg` | 4:3 | Sérülésmentes nyitás — részlet |
| `autokulcs-masolas.jpg` | 16:9 | Kulcsmásolás — fejléc |
| `autokulcs-masolas-reszlet.jpg` | 4:3 | Kulcsmásolás — részlet |
| `autokulcs-programozas.jpg` | 16:9 | Programozás — fejléc |
| `autokulcs-programozas-reszlet.jpg` | 4:3 | Programozás — részlet |
| `elveszett-autokulcs.jpg` | 16:9 | Elveszett kulcs — fejléc |
| `elveszett-autokulcs-reszlet.jpg` | 4:3 | Elveszett kulcs — részlet |
| `autokulcs-keszites.jpg` | 16:9 | Kulcskészítés — fejléc |
| `autokulcs-keszites-reszlet.jpg` | 4:3 | Kulcskészítés — részlet |

### `autonyitas.jpg` / `-reszlet.jpg`

```
Professional car opening tool inserted between the car door frame and window
of a modern sedan, careful precise work, no damage to the paint or seal,
close-up, evening light, charcoal and muted green tones, documentary style,
no faces, no text, no license plate
```

### `serulesmentes-autonyitas.jpg` / `-reszlet.jpg`

```
Detail shot of an intact car door rubber seal and lock mechanism after a
damage-free opening, clean paintwork, precision locksmith tools resting
nearby, soft daylight, muted colours, macro documentary photography,
no text, no logos
```

### `autokulcs-masolas.jpg` / `-reszlet.jpg`

```
Car key being cut on a professional key cutting machine, fine metal shavings,
the original key clamped beside the blank, workshop task lighting,
charcoal machine body with a small orange control detail, close-up,
realistic, no text, no brand names
```

### `autokulcs-programozas.jpg` / `-reszlet.jpg`

```
Automotive diagnostic device screen connected via cable to a car's OBD port
under the steering wheel, technician's hand holding the unit, dark car
interior, screen glow, muted green and charcoal tones, shallow depth of field,
no readable text on the screen, no faces
```

### `elveszett-autokulcs.jpg` / `-reszlet.jpg`

```
A newly cut car key and a lock cylinder decoding tool on a workbench next to
an open car door, work in progress, evening street setting softly blurred
behind, documentary automotive photography, muted colours, no faces, no text
```

### `autokulcs-keszites.jpg` / `-reszlet.jpg`

```
Several types of car keys arranged on a dark textured surface: a simple
mechanical key, a transponder chip key, a remote key and a flip key,
side lighting, subtle orange reflection, product-style but natural,
no logos, no brand names, no text
```

---

## 3. Galéria — `gallery-01.jpg` … `gallery-06.jpg`

> ❌ **Ide ne tegyen AI-képet.** A szekció kifejezetten azt állítja, hogy ezek
> a saját munkáink. Itt a tulajdonos telefonos fotói kellenek.

| Fájlnév | Arány | Mit ábrázoljon |
| --- | --- | --- |
| `gallery-01.jpg` | 1:1 (nagy vezérkép) | Sérülésmentes autónyitás munka közben |
| `gallery-02.jpg` | 4:3 | Kulcsmarás a gépen |
| `gallery-03.jpg` | 4:3 | Programozás az OBD-csatlakozón |
| `gallery-04.jpg` | 16:9 (széles) | Helyszíni munkavégzés az utcán |
| `gallery-05.jpg` | 4:3 | Szétnyitott kulcsház, chip és elem |
| `gallery-06.jpg` | 4:3 | Különböző kulcstípusok egymás mellett |

**Fotózási tipp a tulajdonosnak:** telefonnal, fekvő tájolásban, jó fényben.
Ne legyen rajta felismerhető rendszám és ügyfél arca. Egy kicsit rendetlen,
valódi munkakörnyezet **hitelesebb**, mint a steril stúdiókép.

---

## 4. Tudásbázis cikkek

| Fájlnév | Arány | Cikk |
| --- | --- | --- |
| `blog/elveszett-autokulcs.jpg` | 16:9 | Elveszett az összes autókulcs |
| `blog/potkulcs-keszites.jpg` | 16:9 | Miért a pótkulcs a legolcsóbb |
| `blog/immobilizer-programozas.jpg` | 16:9 | Az immobilizer magyarázata |

Ezekhez a fenti szolgáltatás-promptok használhatók újra, illusztratív jelleggel.

---

## 5. TikTok-borítók — `tiktok/tiktok-01.jpg` …

> ❌ **AI-kép ide nem való.** Ezeknek a valódi videó képkockájának kell lenniük.

**Arány:** 9:16 (álló)

Menete: nyissa meg a videót TikTokon, készítsen róla képernyőképet, vágja
9:16-ra, mentse `tiktok-01.jpg` néven, majd vegye fel a videót a
`config/media.ts` `socialVideos` tömbjébe (link + cím + borítókép).

---

## 6. Technikai követelmények

| Szempont | Érték |
| --- | --- |
| Formátum feltöltéskor | `.jpg` vagy `.png` (a build csinál belőle AVIF+WebP-t) |
| Ajánlott felbontás | legalább 1600 px széles (fekvő), 1200 px (álló) |
| Fájlnév | ékezet nélkül, kisbetűvel, kötőjellel — ahogy fent szerepel |
| Feldolgozás | `npm run images` — 640/1024/1600 px változatokat gyárt |

A méretezést, a `srcset`-et, a lusta betöltést és a képarány-megtartást a
kód automatikusan intézi — Önnek csak a fájlt kell bemásolnia.
