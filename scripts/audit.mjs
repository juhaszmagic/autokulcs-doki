/**
 * ============================================================================
 *  KIMENET-ELLENŐRZŐ  (npm run audit — a build után futtatandó)
 * ============================================================================
 *  Végigmegy az `out/` mappa minden legenerált HTML oldalán, és ellenőrzi
 *  azokat a hibákat, amiket egyébként csak élesítés után vennénk észre:
 *
 *    • címsor-hierarchia (pontosan egy H1, nincs átugrott szint)
 *    • title és meta description megléte, hossza, egyedisége
 *    • canonical URL megléte
 *    • JSON-LD strukturált adat: érvényes JSON-e, és mit állít
 *    • minden <img> rendelkezik-e alt szöveggel
 *    • belső linkek: mutat-e valamelyik nem létező oldalra
 *    • telefonlinkek helyessége
 *    • Open Graph alapmezők
 *    • kliensoldali JavaScript mérete
 * ============================================================================
 */

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "out");

const problems = [];
const warnings = [];
const notes = [];

const fail = (page, msg) => problems.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

/* ---------------- segédfüggvények ---------------- */

async function walk(dir, ext) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, ext)));
    else if (entry.name.endsWith(ext)) out.push(full);
  }
  return out;
}

const strip = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

/** Egy oldal URL-útvonala az out-beli fájlútból. */
function routeOf(file) {
  const rel = path.relative(OUT, file).split(path.sep).join("/");
  return "/" + rel.replace(/index\.html$/, "").replace(/\.html$/, "");
}

/* ---------------- futtatás ---------------- */

const files = (await walk(OUT, ".html")).sort();
const routes = new Set(files.map(routeOf));

const titles = new Map();
const descriptions = new Map();

for (const file of files) {
  const route = routeOf(file);
  const html = await readFile(file, "utf8");
  const isErrorPage = /404|_not-found/.test(route);

  /* ---- title ---- */
  const title = html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1]?.trim();
  if (!title) fail(route, "hiányzik a <title>");
  else {
    if (title.length > 65)
      warn(route, `a title ${title.length} karakter (>65, a Google levághatja)`);
    if (title.length < 20) warn(route, `a title csak ${title.length} karakter`);
    /**
     * A Next a 404-et három néven is kiírja (404.html, 404/, _not-found/) —
     * ez a keretrendszer sajátossága, nem valódi duplikált tartalom, és
     * mindhárom noindex. Ezért a duplikátum-ellenőrzésből kihagyjuk.
     */
    if (!isErrorPage) {
      if (titles.has(title))
        fail(route, `duplikált title (ugyanaz mint: ${titles.get(title)})`);
      else titles.set(title, route);
    }
  }

  /* ---- meta description ---- */
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail(route, "hiányzik a meta description");
  else {
    if (desc.length > 165)
      warn(route, `a description ${desc.length} karakter (>165)`);
    if (desc.length < 70)
      warn(route, `a description csak ${desc.length} karakter (<70)`);
    if (!isErrorPage) {
      if (descriptions.has(desc))
        fail(route, `duplikált description (ugyanaz mint: ${descriptions.get(desc)})`);
      else descriptions.set(desc, route);
    }
  }

  /* ---- canonical ---- */
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical) fail(route, "hiányzik a canonical");

  /* ---- lang ---- */
  if (!/<html[^>]+lang="hu"/.test(html)) fail(route, 'hiányzik a lang="hu"');

  /* ---- Open Graph ---- */
  if (!isErrorPage) {
    for (const prop of ["og:title", "og:description", "og:type"]) {
      if (!html.includes(`property="${prop}"`)) warn(route, `hiányzik az ${prop}`);
    }
  }

  /* ---- címsorok ---- */
  const headings = [...html.matchAll(/<(h[1-6])[^>]*>(.*?)<\/\1>/gs)].map((m) => ({
    level: Number(m[1][1]),
    text: strip(m[2]),
  }));

  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) fail(route, "nincs H1");
  else if (h1s.length > 1)
    fail(route, `${h1s.length} db H1 van (pontosan 1 kellene): ${h1s.map((h) => `"${h.text}"`).join(", ")}`);

  let previous = 0;
  for (const heading of headings) {
    if (previous && heading.level > previous + 1) {
      warn(
        route,
        `átugrott címsorszint: H${previous} → H${heading.level} ("${heading.text.slice(0, 45)}")`
      );
    }
    previous = heading.level;
  }

  /* ---- képek alt szövege ---- */
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt=/.test(img[0])) fail(route, `<img> alt nélkül: ${img[0].slice(0, 90)}`);
  }

  /* ---- iframe cím ---- */
  for (const frame of html.matchAll(/<iframe\b[^>]*>/g)) {
    if (!/\stitle=/.test(frame[0])) fail(route, "<iframe> title nélkül");
  }

  /* ---- belső linkek ---- */
  /**
   * Előnézeti buildnél minden belső link elé kerül az alútvonal
   * (pl. /autokulcs-doki/arak/). A kimeneti fájlok viszont a gyökérhez
   * képest vannak, ezért az összevetés előtt le kell venni.
   */
  const BASE = process.env.PREVIEW_BASE_PATH ?? "";
  for (const link of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const target = BASE && link[1].startsWith(BASE + "/")
      ? link[1].slice(BASE.length)
      : link[1];
    if (/\.(xml|txt|jpg|png|webp|avif|svg|ico|css|js|json|mp4)$/i.test(target)) continue;
    if (target.startsWith("/_next/")) continue;
    const normalised = target.endsWith("/") ? target : `${target}/`;
    if (!routes.has(normalised) && !routes.has(target)) {
      fail(route, `törött belső link: ${target}`);
    }
  }

  /* ---- telefonlinkek ---- */
  for (const tel of html.matchAll(/href="tel:([^"]*)"/g)) {
    if (!/^\+36\d{9}$/.test(tel[1]))
      fail(route, `gyanús telefonlink: tel:${tel[1]}`);
  }

  /* ---- JSON-LD ---- */
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs
    ),
  ];
  if (!isErrorPage && blocks.length === 0) warn(route, "nincs JSON-LD");

  for (const block of blocks) {
    try {
      const data = JSON.parse(block[1]);
      const nodes = data["@graph"] ?? [data];
      for (const node of nodes) {
        const type = Array.isArray(node["@type"]) ? node["@type"].join("+") : node["@type"];

        // Az aggregateRating csak reviewCount-tal együtt érvényes.
        if (node.aggregateRating && !node.aggregateRating.reviewCount) {
          fail(route, "aggregateRating reviewCount nélkül");
        }
        // A FAQPage-nek legyen valódi kérdése.
        if (type === "FAQPage" && !(node.mainEntity?.length > 0)) {
          fail(route, "üres FAQPage séma");
        }
      }
    } catch (error) {
      fail(route, `érvénytelen JSON-LD: ${error.message}`);
    }
  }
}

/* ---- kliensoldali JS mérete ---- */
try {
  const scripts = await walk(path.join(OUT, "_next"), ".js");
  let total = 0;
  for (const script of scripts) total += (await stat(script)).size;
  notes.push(
    `Kliensoldali JS összesen: ${(total / 1024).toFixed(0)} kB (${scripts.length} fájl, tömörítés előtt)`
  );
} catch {
  notes.push("Nincs _next/ mappa — nulla kliensoldali JavaScript.");
}

notes.push(`Ellenőrzött oldalak: ${files.length}`);

/* ---- eredmény ---- */
console.log("\n" + "=".repeat(70));
console.log("  KIMENET-ELLENŐRZÉS");
console.log("=".repeat(70));

for (const note of notes) console.log(`  · ${note}`);

if (warnings.length) {
  console.log(`\n  FIGYELMEZTETÉS (${warnings.length}):`);
  for (const w of warnings) console.log(`    ! ${w}`);
}

if (problems.length) {
  console.log(`\n  HIBA (${problems.length}):`);
  for (const p of problems) console.log(`    ✗ ${p}`);
  console.log("");
  process.exit(1);
}

console.log(`\n  ✓ Nincs blokkoló hiba.\n`);
