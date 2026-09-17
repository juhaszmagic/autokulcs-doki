import type { NextConfig } from "next";

/**
 * Előnézeti build (GitHub Pages) alútvonalon fut, pl. /autokulcsmasolo-doktor/.
 * Az éles build ezt üresen hagyja, tehát a gyökérből szolgál ki.
 * Beállítás:  PREVIEW_BASE_PATH=/repo-nev npm run build
 */
const basePath = process.env.PREVIEW_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath || undefined,
  /**
   * Statikus export.
   *
   * A build eredménye egy sima HTML/CSS/JS mappa (`out/`), ami BÁRMILYEN
   * tárhelyen fut — nem kell hozzá Node.js szerver. A jelenlegi
   * autokulcsmasolo.com is Apache-on van, oda közvetlenül feltölthető.
   *
   * Mellékhatás: nincs futásidejű képoptimalizálás, ezért a képeket build
   * előtt dolgozzuk fel (npm run images → AVIF/WebP változatok).
   */
  output: "export",

  /**
   * Záró perjel az URL-ekben (/arak/ és nem /arak).
   *
   * Miért: így minden oldal `out/arak/index.html` néven készül el, amit az
   * Apache a DirectoryIndex-szel automatikusan kiszolgál. Extra
   * szerverkonfiguráció nélkül működik.
   *
   * Fontos: a régi oldal is záró perjeles URL-eket használt
   * (/about-us/, /services/), tehát ez a szokás megmarad.
   */
  trailingSlash: true,

  images: {
    /**
     * A next/image optimalizálót statikus exportnál nem lehet használni.
     * Ezért nem is használjuk: a components/AssetImage.tsx saját <picture>
     * elemet ad ki, előre legyártott AVIF/WebP változatokkal.
     */
    unoptimized: true,
  },

  /** Ne szivárogjon ki a keretrendszer verziója a válaszfejlécben. */
  poweredByHeader: false,

  /** Tömörített HTML kimenet. */
  compress: true,
};

export default nextConfig;
