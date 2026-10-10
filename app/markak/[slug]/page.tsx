import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { brands, getBrand, brandArticles } from "@/config/brands";
import { getService } from "@/config/services";
import { business } from "@/config/business";
import { Container, Section, CallButton, Button, CheckList } from "@/components/ui";
import { AssetImage } from "@/components/AssetImage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/Faq";
import { RatingBadge } from "@/components/Reviews";
import { CtaBand, PageHero, ArticleCardGrid } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import {
  jsonLdGraph,
  faqSchema,
  breadcrumbSchema,
  type Crumb,
} from "@/lib/schema";
import { ClockIcon, MapPinIcon, ArrowRightIcon } from "@/components/Icons";

/** Statikus exporthoz: minden márkaoldal build időben legyártva. */
export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};

  const path = `/markak/${brand.slug}`;

  return {
    title: brand.metaTitle,
    description: brand.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: brand.metaTitle,
      description: brand.metaDescription,
      url: path,
      type: "article",
    },
  };
}

export default async function BrandPage({ params }: Params) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const crumbs: Crumb[] = [
    { name: "Kezdőlap", path: "/" },
    { name: "Márkák", path: "/markak" },
    { name: brand.name, path: `/markak/${brand.slug}` },
  ];

  const posts = brandArticles(brand);
  const linkedServices = brand.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <PageHero
        eyebrow={`${brand.name} autókulcs`}
        title={brand.h1}
        lead={brand.lead}
        image={brand.image}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton size="xl" label="Kérjen árajánlatot telefonon" />
          <Button href="/kapcsolat" variant="onDark" size="xl">
            Villám ajánlatot kérek
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-ink-300">
          <span className="flex items-center gap-2">
            <ClockIcon className="h-4.5 w-4.5 text-accent-400" />
            {business.hours.display}
          </span>
          <span className="flex items-center gap-2">
            <MapPinIcon className="h-4.5 w-4.5 text-accent-400" />
            {business.serviceArea.primary}
          </span>
        </div>
      </PageHero>

      {/* ---- Amiben segíteni tudunk ---- */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-h2">
                Amiben {brand.name} autóknál segíteni tudunk
              </h2>
              <p className="mt-4 leading-relaxed text-ink-600">
                Ezek a feladatok fordulnak elő a leggyakrabban. Hogy a XI.
                kerületi műhelyünkben vagy kiszállással, azt a telefonban
                beszéljük meg.
              </p>

              <CheckList className="mt-8" items={brand.bullets} />

              <div className="mt-9">
                <RatingBadge />
              </div>
            </div>

            <div className="lg:pt-4">
              <div className="rounded-feature bg-ink-900 p-7 text-center text-ink-300 shadow-media on-dark">
                <p className="eyebrow text-accent-400">Sürgős a helyzet?</p>
                <p className="mt-4 text-h3 !text-white">Hívjon minket most</p>
                <p className="mt-2 text-sm text-ink-400">
                  {business.hours.display}
                </p>

                <a
                  href={business.phone.primary.href}
                  className="mt-5 block text-2xl font-extrabold text-white transition-colors hover:text-accent-400"
                >
                  {business.phone.primary.display}
                </a>

                <CallButton
                  size="lg"
                  label="Kérjen árat"
                  className="mt-5 w-full"
                  showNumber={false}
                />

                <p className="mt-5 border-t border-white/10 pt-5 text-[0.8125rem] leading-relaxed text-ink-400">
                  Mondja meg a pontos típust és az évjáratot, konkrét árat még a
                  munka megkezdése előtt mondunk.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Szöveges szakaszok ---- */}
      <Section tone="light" labelledBy={`tudnivalok-${brand.slug}`}>
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 id={`tudnivalok-${brand.slug}`} className="sr-only">
              {brand.name} autókulcs tudnivalók
            </h2>
            {brand.sections.map((section) => (
              <div key={section.heading} className="mb-11 last:mb-0">
                <h3 className="text-h3">{section.heading}</h3>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 leading-[1.75] text-ink-700"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-5 space-y-3">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3.5 leading-relaxed text-ink-700"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- A márkához tartozó VALÓDI munkáink ----
          Ez a lap lényege: nem általános szöveg, hanem elvégzett munkák. */}
      {posts.length > 0 && (
        <Section tone="white" labelledBy={`munkak-${brand.slug}`}>
          <Container>
            <h2 id={`munkak-${brand.slug}`} className="text-h2">
              {brand.name} munkáink
            </h2>
            <p className="text-lead mt-4 max-w-2xl text-ink-600">
              Elvégzett munkák, saját fotókkal. Minden esetben valódi autó,
              valódi helyzet.
            </p>
            <div className="mt-10">
              <ArticleCardGrid posts={posts} />
            </div>
          </Container>
        </Section>
      )}

      {/* ---- Kapcsolódó szolgáltatások ---- */}
      {linkedServices.length > 0 && (
        <Section tone="light" labelledBy={`szolg-${brand.slug}`}>
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 id={`szolg-${brand.slug}`} className="text-h3">
                Kapcsolódó szolgáltatásaink
              </h2>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {linkedServices.map((service) => (
                  <li key={service.slug}>
                    <a
                      href={`/szolgaltatasok/${service.slug}/`}
                      className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 font-semibold text-ink-800 ring-1 ring-ink-200 transition-colors hover:text-accent-700"
                    >
                      <ArrowRightIcon className="h-4 w-4 shrink-0 text-accent-600" />
                      {service.nav}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      )}

      {/* ---- GYIK ---- */}
      <Section tone="white" labelledBy={`gyik-${brand.slug}`}>
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 id={`gyik-${brand.slug}`} className="text-h2">
              Gyakori kérdések: {brand.name} autókulcs
            </h2>
            <div className="mt-8">
              <FaqList faqs={brand.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd
        data={jsonLdGraph(faqSchema(brand.faqs), breadcrumbSchema(crumbs))}
      />
    </>
  );
}
