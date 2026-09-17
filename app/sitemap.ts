import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/business";
import { services } from "@/config/services";
import { articles } from "@/config/content";

/**
 * XML sitemap.
 *
 * Build időben statikus /sitemap.xml fájllá alakul, tehát bármelyik
 * tárhelyen működik. A szolgáltatás-oldalak a config/services.ts-ből
 * generálódnak — ha új szolgáltatás kerül a listába, automatikusan
 * bekerül a sitemapbe is. Nem lehet elfelejteni.
 *
 * Az URL-eket az `absoluteUrl()` állítja elő, hogy záró perjelben és
 * alakban PONTOSAN megegyezzenek a canonical URL-ekkel.
 */
/**
 * Statikus exportnál kötelező kimondani, hogy ez build időben dől el.
 * (A `new Date()` miatt a Next különben dinamikusnak tekintené.)
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "monthly", priority: 1.0 },
    { path: "/szolgaltatasok", changeFrequency: "monthly", priority: 0.9 },
    { path: "/arak", changeFrequency: "monthly", priority: 0.8 },
    { path: "/kapcsolat", changeFrequency: "monthly", priority: 0.8 },
    { path: "/gyik", changeFrequency: "monthly", priority: 0.7 },
    { path: "/rolunk", changeFrequency: "yearly", priority: 0.6 },
    { path: "/velemenyek", changeFrequency: "monthly", priority: 0.6 },
    { path: "/galeria", changeFrequency: "monthly", priority: 0.5 },
    { path: "/tudasbazis", changeFrequency: "weekly", priority: 0.7 },
    /* Jogi oldalak: kereshetőnek kell lenniük, de alacsony prioritással —
       nem ezekre akarunk rangsorolni. */
    { path: "/impresszum", changeFrequency: "yearly", priority: 0.2 },
    { path: "/adatkezelesi-tajekoztato", changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages = services.map((service) => ({
    path: `/szolgaltatasok/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const articlePages = articles.map((article) => ({
    path: `/tudasbazis/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...articlePages].map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
