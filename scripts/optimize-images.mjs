/**
 * ============================================================================
 *  KÉPOPTIMALIZÁLÓ
 * ============================================================================
 *
 *  Futtatás:   npm run images
 *
 *  Mit csinál?
 *  Végigmegy a /public/images mappán, és minden ott talált eredeti fotóból
 *  (.jpg / .jpeg / .png) legyárt több méretben AVIF és WebP változatot,
 *  majd összeállít egy manifest.json fájlt a méretadatokkal.
 *
 *  Miért kell?
 *  A weboldal statikusan exportálódik (bármelyik tárhelyen fut, nem kell
 *  Node szerver), így nincs futásidejű képoptimalizálás. Ehelyett a képek
 *  build előtt, egyszer készülnek el — ez a leggyorsabb megoldás, mert a
 *  látogató már kész, kicsi fájlt tölt le.
 *
 *  A tulajdonos teendője:
 *    1. Bemásolja a fotókat a /public/images megfelelő almappájába.
 *    2. Lefuttatja: npm run images
 *    3. Kész — a képek automatikusan megjelennek az oldalon.
 *
 *  A fájlnevek legyenek beszédesek és ékezet nélküliek, mert a fájlnév is
 *  SEO-jel. Jó:  autokulcs-masolas-budapest-01.jpg
 *  Rossz: IMG_20240513_113355.jpg
 * ============================================================================
 */

import { readdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "..", "public", "images");

/** Ezekben a szélességekben készülnek a változatok. */
const WIDTHS = [640, 1024, 1600];

/** Csak ezeket dolgozzuk fel eredetiként. */
const SOURCE_EXT = /\.(jpe?g|png)$/i;

/** A már legenerált változatokat nem dolgozzuk fel újra. */
const GENERATED = /-(\d+)\.(avif|webp)$/i;

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error(
    "\n  A 'sharp' csomag nincs telepítve.\n" +
      "  Telepítés:  npm install --save-dev sharp\n"
  );
  process.exit(1);
}

/** Rekurzívan összegyűjti a feldolgozandó képeket. */
async function collect(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collect(full)));
    } else if (SOURCE_EXT.test(entry.name) && !GENERATED.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

/** Elkészült-e már ez a változat, és frissebb-e az eredetinél? */
async function isUpToDate(target, sourceMtime) {
  try {
    const info = await stat(target);
    return info.mtimeMs >= sourceMtime;
  } catch {
    return false;
  }
}

async function run() {
  const files = await collect(IMAGES_DIR);

  if (files.length === 0) {
    console.log(
      "\n  Nincs feldolgozandó kép a /public/images mappában.\n" +
        "  Másolja be a fotókat, majd futtassa újra: npm run images\n"
    );
    // Üres manifest írása, hogy a build ne akadjon el.
    await writeFile(
      path.join(IMAGES_DIR, "manifest.json"),
      JSON.stringify({}, null, 2)
    );
    return;
  }

  const manifest = {};
  let created = 0;
  let skipped = 0;

  for (const file of files) {
    const rel = "/" + path.relative(path.join(__dirname, "..", "public"), file).split(path.sep).join("/");
    const sourceInfo = await stat(file);
    const image = sharp(file, { failOn: "none" });
    const meta = await image.metadata();

    if (!meta.width || !meta.height) {
      console.warn(`  ! Kihagyva (nem olvasható): ${rel}`);
      continue;
    }

    // Csak a forrásnál nem nagyobb szélességeket generáljuk.
    const widths = WIDTHS.filter((w) => w <= meta.width);
    if (widths.length === 0) widths.push(meta.width);

    const base = file.replace(SOURCE_EXT, "");

    for (const width of widths) {
      for (const [format, options] of [
        ["avif", { quality: 55, effort: 4 }],
        ["webp", { quality: 76 }],
      ]) {
        const target = `${base}-${width}.${format}`;

        if (await isUpToDate(target, sourceInfo.mtimeMs)) {
          skipped++;
          continue;
        }

        await sharp(file)
          .rotate() // EXIF forgatás érvényesítése
          .resize({ width, withoutEnlargement: true })
          .toFormat(format, options)
          .toFile(target);

        created++;
      }
    }

    // Apró, elmosott előnézet — a betöltés alatti üres felület elkerülésére.
    const blurBuffer = await sharp(file)
      .rotate()
      .resize({ width: 16 })
      .webp({ quality: 30 })
      .toBuffer();

    manifest[rel] = {
      width: meta.width,
      height: meta.height,
      widths,
      blur: `data:image/webp;base64,${blurBuffer.toString("base64")}`,
    };

    console.log(`  ✓ ${rel}  (${meta.width}×${meta.height})`);
  }

  await writeFile(
    path.join(IMAGES_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  console.log(
    `\n  Kész. ${files.length} kép · ${created} új változat · ${skipped} változatlan.\n` +
      `  Manifest: public/images/manifest.json\n`
  );
}

run().catch((error) => {
  console.error("\n  Hiba a képfeldolgozás közben:\n", error);
  process.exit(1);
});
