import type { MetadataRoute } from "next";
import { site } from "@/config/business";

/**
 * robots.txt
 *
 * A régi weboldalon egyáltalán nem volt robots.txt és sitemap.xml sem
 * (mindkettő 404-et adott). Ezt pótoljuk: a keresők így megtalálják a
 * sitemapet, és tudják, mit indexelhetnek.
 */
/** Statikus exportnál kötelező: a fájl build időben készül el. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  /**
   * Az előnézeti (GitHub Pages) build MINDENT tilt a keresőknek.
   * Enélkül a preview duplikált tartalomként versenyezne az éles
   * autokulcsmasolo.com-mal, ami rontaná az éles oldal helyezését.
   */
  if (process.env.PREVIEW_BASE_PATH) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
