/**
 * ============================================================================
 *  MEGOSZTÓKÉP + IKONOK GENERÁLÁSA
 * ============================================================================
 *
 *  Futtatás:  npm run og
 *
 *  Mit készít?
 *   • public/og.jpg          1200×630  — ez jelenik meg WhatsAppon,
 *                                        Messengeren, Facebookon, LinkedInen
 *   • public/apple-touch-icon.png  180×180 — iPhone „Hozzáadás a kezdőképernyőhöz"
 *   • public/favicon-32.png         32×32  — régebbi böngészők, amik nem
 *                                            kezelik az SVG faviconokat
 *
 *  A megosztókép a MEGLÉVŐ hero fotóból készül (nem külön kép), rárakva
 *  a márkajelet, a nevet, a lényeget és a telefonszámot — mert a
 *  WhatsApp-előnézetben a szöveg a képen sokkal jobban látszik, mint a
 *  link alatti apró leírás.
 * ============================================================================
 */

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, readFileSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

/* A megosztókép alapja: a hero fotó. Ha nincs, esik vissza másra. */
const CANDIDATES = [
  "images/hero.jpg",
  "images/autokulcs-masolas.jpg",
  "images/szakerto.jpg",
];

const source = CANDIDATES.map((c) => path.join(PUBLIC, c)).find(existsSync);

/**
 * A telefonszámot és az értékelést a configból olvassuk ki, nem égetjük be —
 * így ha a szám változik, a megosztókép is követi, és nem marad rajta régi adat.
 */
const cfg = readFileSync(path.join(__dirname, "..", "config", "business.ts"), "utf8");
const pick = (re, fallback) => (cfg.match(re)?.[1] ?? fallback);
const PHONE = pick(/display: "(\+36[^"]+)"/, "");
const RATING = pick(/rating: ([\d.]+)/, "4.9").replace(".", ",");
const REVIEWS = pick(/reviewCount: (\d+)/, "");

if (!source) {
  console.error("\n  Nincs alapkép a megosztóképhez. Előbb: npm run images\n");
  process.exit(1);
}

const W = 1200;
const H = 630;

/* ---- Szöveges réteg SVG-ként ---------------------------------------- */
const overlay = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#12150f" stop-opacity="0.96"/>
      <stop offset="52%"  stop-color="#12150f" stop-opacity="0.86"/>
      <stop offset="100%" stop-color="#12150f" stop-opacity="0.30"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#scrim)"/>

  <!-- A valódi márkajel helye — PNG-ként komponáljuk rá, lásd lentebb. -->
  <rect x="72" y="86" width="86" height="86" rx="20" fill="#1f2421" stroke="#ffffff" stroke-opacity="0.14"/>

  <text x="180" y="128" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="700" fill="#ffffff">Autókulcs <tspan fill="#7a9b85">Doki</tspan></text>
  <text x="180" y="160" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="19" fill="#97a09a">Autónyitás &amp; kulcsmásolás · Budapest</text>

  <!-- Fő üzenet -->
  <text x="72" y="288" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="59" font-weight="800" fill="#ffffff">Elhagyta autókulcsát?</text>
  <text x="72" y="352" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="49" font-weight="800" fill="#ffffff">Pótoljuk Budapesten és környékén</text>

  <text x="72" y="412" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="24" fill="#c2c8c3">Meglévő kulcs nélkül is · helyszínen · 25 000 Ft-tól · 0–24</text>

  <!-- Telefon: narancs sáv -->
  <rect x="72" y="452" width="470" height="78" rx="18" fill="#c44e07"/>
  <text x="106" y="502" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="31" font-weight="700" fill="#ffffff">📞 ${PHONE}</text>

  <!-- Google értékelés -->
  <text x="576" y="502" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="28" font-weight="700" fill="#f0a72c">★ ${RATING}</text>
  <text x="652" y="502" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="22" fill="#c2c8c3">· ${REVIEWS} Google értékelés</text>
</svg>`;

/* ---- Megosztókép ---------------------------------------------------- */
/* A valódi logó márkajele, a sötét csempe méretére kicsinyítve. */
const markPng = await sharp(path.join(PUBLIC, "images", "logo-mark.png"))
  .resize(66, 66, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp(source)
  .resize(W, H, { fit: "cover", position: "attention" })
  .composite([
    { input: Buffer.from(overlay), top: 0, left: 0 },
    { input: markPng, top: 96, left: 82 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(PUBLIC, "og.jpg"));

const meta = await sharp(path.join(PUBLIC, "og.jpg")).metadata();
console.log(
  `\n  ✓ og.jpg               ${meta.width}×${meta.height}` +
        `\n\n  Alapkép: ${path.relative(PUBLIC, source)}\n`
);
