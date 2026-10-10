import type { Metadata } from "next";

import { brands, brandArticles } from "@/config/brands";
import { Container, Section, CallButton, Button } from "@/components/ui";
import { AssetImage } from "@/components/AssetImage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand, PageHero } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, type Crumb } from "@/lib/schema";
import { ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Autókulcs márkák szerint: Volkswagen és társai",
  description:
    "Melyik márkához készítünk autókulcsot? Márkánként összeszedtük a tudnivalókat és azokat a munkákat, amiket tényleg mi végeztünk el, saját fotókkal.",
  alternates: { canonical: "/markak" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Márkák", path: "/markak" },
];

export default function BrandsPage() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <PageHero
        eyebrow="Márkák"
        title="Autókulcs márkák szerint"
        lead="Szinte minden márkához készítünk autókulcsot. Azokról a márkákról van külön oldalunk, amelyeknél több elvégzett munkánkat is meg tudjuk mutatni, saját fotókkal. Ha az Ön autója nincs a listán, attól még hívjon: a megoldás a típustól és az évjárattól függ, nem attól, hogy van-e róla oldalunk."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton size="xl" label="Mondja el, milyen autója van" />
          {/*
            Ez a fejléc kép nélküli, tehát VILÁGOS. Az "onDark" változat itt
            beleolvadna a háttérbe, ezért "secondary" kell.
          */}
          <Button href="/szolgaltatasok" variant="secondary" size="xl">
            Szolgáltatásaink
          </Button>
        </div>
      </PageHero>

      <Section tone="white">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {brands.map((brand) => {
              const posts = brandArticles(brand);
              return (
                <li
                  key={brand.slug}
                  className="group overflow-hidden rounded-media bg-white shadow-card ring-1 ring-ink-200/70 transition-shadow hover:shadow-card-hover"
                >
                  <a href={`/markak/${brand.slug}/`} className="block">
                    <span className="media-zoom block overflow-hidden">
                      <AssetImage
                        src={brand.image.src}
                        alt={brand.image.alt}
                        ratio="21/9"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        tone="dark"
                        hideSlotLabel
                      />
                    </span>
                    <span className="block p-6 sm:p-7">
                      <span className="block text-h3">{brand.name}</span>
                      <span className="mt-3 block leading-relaxed text-ink-600">
                        {brand.cardText}
                      </span>
                      <span className="mt-4 block text-[0.8125rem] text-ink-500">
                        {posts.length} elvégzett munka a tudásbázisban
                      </span>
                      <span className="mt-5 flex items-center gap-2 font-semibold text-accent-700">
                        <ArrowRightIcon className="h-4 w-4 shrink-0" />
                        {brand.name} autókulcs tudnivalók
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/*
            Őszinte megjegyzés: nem minden márkának van oldala, és ezt ki is
            mondjuk. Így nem kelti azt a látszatot, hogy a listán kívüli
            autókhoz nem tudunk kulcsot készíteni.
          */}
          <p className="mt-10 max-w-2xl leading-relaxed text-ink-600">
            Márkaoldal csak ott készül, ahol több elvégzett munkánkat is meg
            tudjuk mutatni. Ez nem jelenti azt, hogy máshoz ne készítenénk
            autókulcsot: a listán kívüli márkákhoz is hívhat minket.
          </p>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
    </>
  );
}
