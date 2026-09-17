/**
 * ============================================================================
 *  JAVASCRIPT-ELTÁVOLÍTÓ  (build után fut)
 * ============================================================================
 *
 *  MIÉRT VAN ERRE SZÜKSÉG?
 *
 *  Ez a weboldal szándékosan úgy készült, hogy EGYETLEN kliensoldali
 *  komponenst se tartalmazzon:
 *    • a mobilmenü és a GYIK natív <details>/<summary> elem,
 *    • a galéria nagyítása CSS `:target` állapottal működik,
 *    • az űrlap a böngésző beépített HTML5 validálását használja.
 *
 *  A Next.js ennek ellenére minden oldalhoz mellékeli a React futtatókörnyezetet
 *  — a mérés szerint ~172 kB tömörített JavaScriptet —, amit a böngésző
 *  letölt, kicsomagol és lefuttat, hogy aztán pontosan semmit ne csináljon.
 *
 *  A tipikus látogatónk mobilneten, az autója mellett állva nyitja meg az
 *  oldalt. Neki ez a 172 kB fölösleges másodperc. Ez a szkript eltávolítja.
 *
 *  MIT CSINÁL PONTOSAN?
 *    1. Ellenőrzi, hogy tényleg nincs-e „use client" komponens a projektben.
 *       Ha van, LEÁLL, és nem nyúl semmihez. (Lásd lentebb a biztosítékot.)
 *    2. Az `out/` mappa minden HTML fájljából kiveszi a Next.js
 *       <script> hivatkozásait és a hidratálási adatokat.
 *    3. A strukturált adatokat (application/ld+json) ÉRINTETLENÜL hagyja —
 *       azokra a Google-nek szüksége van.
 *    4. Törli a feleslegessé vált JS darabokat az out/_next/static/chunks
 *       mappából. A CSS és a betűtípusok maradnak.
 *
 *  MI TÖRTÉNIK, HA A JÖVŐBEN KELL JAVASCRIPT?
 *  Ha valaki felvesz egy „use client" komponenst, ez a szkript magától
 *  leáll és szól. Ilyenkor egyszerűen ne futtassa: a `npm run build`
 *  önmagában is teljes értékű oldalt ad, csak nagyobb JS-sel.
 * ============================================================================
 */

import { readdir, readFile, writeFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "out");

/* ------------------------------------------------------------------ */
/*  BIZTOSÍTÉK: van-e kliensoldali komponens a projektben?             */
/* ------------------------------------------------------------------ */

async function walk(dir, test) {
  const found = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full, test)));
    else if (test(entry.name)) found.push(full);
  }
  return found;
}

const sourceFiles = [
  ...(await walk(path.join(ROOT, "app"), (n) => /\.(tsx|ts|jsx|js)$/.test(n))),
  ...(await walk(path.join(ROOT, "components"), (n) => /\.(tsx|ts|jsx|js)$/.test(n))),
];

const clientComponents = [];
for (const file of sourceFiles) {
  const source = await readFile(file, "utf8");
  // Csak a fájl elején álló direktíva számít.
  if (/^\s*(['"])use client\1/m.test(source.slice(0, 400))) {
    clientComponents.push(path.relative(ROOT, file));
  }
}

if (clientComponents.length > 0) {
  console.error(
    "\n  LEÁLLÍTVA — kliensoldali komponenst találtam:\n" +
      clientComponents.map((f) => `    • ${f}`).join("\n") +
      "\n\n  Ezeknek szükségük van JavaScriptre, ezért NEM távolítom el.\n" +
      "  Használja helyette a sima `npm run build` parancsot.\n"
  );
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/*  1. HTML tisztítása                                                */
/* ------------------------------------------------------------------ */

const htmlFiles = await walk(OUT, (n) => n.endsWith(".html"));

if (htmlFiles.length === 0) {
  console.error("\n  Nincs mit tisztítani: az out/ mappa üres. Előbb: npm run build\n");
  process.exit(1);
}

let bytesBefore = 0;
let bytesAfter = 0;

for (const file of htmlFiles) {
  const original = await readFile(file, "utf8");
  bytesBefore += Buffer.byteLength(original);

  const cleaned = original
    /**
     * Minden <script> elem törlése, KIVÉVE a strukturált adatokat.
     * A negatív előretekintés (?!...) védi a ld+json blokkokat.
     */
    .replace(
      /<script(?![^>]*type="application\/ld\+json")\b[^>]*>[\s\S]*?<\/script>/g,
      ""
    )
    /** Önzáró script hivatkozások (src-vel, tartalom nélkül). */
    .replace(
      /<script(?![^>]*type="application\/ld\+json")\b[^>]*\/>/g,
      ""
    )
    /** A JS darabokra mutató előtöltési utasítások feleslegessé váltak. */
    .replace(/<link[^>]+as="script"[^>]*>/g, "")
    .replace(/<link[^>]+rel="preload"[^>]+\.js"[^>]*>/g, "");

  bytesAfter += Buffer.byteLength(cleaned);
  await writeFile(file, cleaned, "utf8");
}

/* ------------------------------------------------------------------ */
/*  2. A feleslegessé vált JS fájlok törlése                          */
/* ------------------------------------------------------------------ */

/**
 * FONTOS: csak a .js fájlokat töröljük, a mappát NEM.
 * A Next a CSS-t is ide, a chunks mappába teszi — ha az egész könyvtárat
 * kitörölnénk, a weboldal stíluslap nélkül maradna.
 */
let removedBytes = 0;
let removedCount = 0;

const jsFiles = await walk(
  path.join(OUT, "_next", "static"),
  (name) => name.endsWith(".js") || name.endsWith(".js.map")
);

for (const file of jsFiles) {
  removedBytes += (await stat(file)).size;
  await rm(file, { force: true });
  removedCount++;
}

/**
 * A Next az oldalankénti kliensoldali navigációhoz `.txt` adatfájlokat is
 * kiír (index.txt, __next._full.txt). Ezekre JavaScript nélkül nincs
 * szükség, viszont két okból is zavaróak:
 *
 *   • megduplázzák a feltöltendő fájlok méretét,
 *   • ha egy kereső rátalál a /index.txt címre, ott ugyanazt a szöveget
 *     látja, mint az oldalon — vagyis duplikált tartalmat.
 *
 * Ezért töröljük őket.
 */
const rscFiles = await walk(
  OUT,
  (name) => name.endsWith(".txt") && name !== "robots.txt"
);

let rscBytes = 0;
for (const file of rscFiles) {
  rscBytes += (await stat(file)).size;
  await rm(file, { force: true });
}

/* ------------------------------------------------------------------ */

const kb = (bytes) => (bytes / 1024).toFixed(1);

console.log(
  `\n  JavaScript eltávolítva.\n` +
    `    HTML:        ${kb(bytesBefore)} kB → ${kb(bytesAfter)} kB  (${htmlFiles.length} oldal)\n` +
    `    Törölt JS:   ${kb(removedBytes)} kB  (${removedCount} fájl)\n` +
    `    Törölt .txt: ${kb(rscBytes)} kB  (${rscFiles.length} navigációs adatfájl)\n` +
    `    Az oldalon maradt kliensoldali JavaScript: 0 kB\n` +
    `\n  A strukturált adatok (JSON-LD), a CSS és a betűtípusok érintetlenek.\n`
);
