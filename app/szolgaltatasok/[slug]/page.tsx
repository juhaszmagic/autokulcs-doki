import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { services, getService } from "@/config/services";
import { business } from "@/config/business";
import { Container, Section, CallButton, Button, CheckList } from "@/components/ui";
import { AssetImage } from "@/components/AssetImage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/Faq";
import {
  RelatedServices,
  RelatedWork,
  CtaBand,
  PageHero,
  RealWorkGallery,
} from "@/components/sections";
import { RatingBadge } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import {
  jsonLdGraph,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  type Crumb,
} from "@/lib/schema";
import { ClockIcon, MapPinIcon, ShieldIcon, ServiceIcon } from "@/components/Icons";

/** Statikus exporthoz: minden szolgáltatás-oldal build időben legyártva. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const path = `/szolgaltatasok/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: path,
      type: "article",
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs: Crumb[] = [
    { name: "Kezdőlap", path: "/" },
    { name: "Szolgáltatások", path: "/szolgaltatasok" },
    { name: service.nav, path: `/szolgaltatasok/${service.slug}` },
  ];

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      {/* ---- Fotós fejléc ---- */}
      <PageHero
        eyebrow="Szolgáltatásunk"
        title={service.h1}
        lead={service.lead}
        image={service.image}
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
          <span className="flex items-center gap-2">
            <ShieldIcon className="h-4.5 w-4.5 text-accent-400" />
            Sérülésmentes munkavégzés
          </span>
        </div>
      </PageHero>

      {/* ---- „Amiben segítünk”, ikonos blokkok fotóval ---- */}
      <Section tone="white">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white"
                aria-hidden
              >
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </span>

              <h2 className="text-h2">Amiben segíteni tudunk</h2>
              <p className="mt-4 leading-relaxed text-ink-600">
                Ezeket a feladatokat végezzük el ennél a szolgáltatásnál, a
                legtöbbjét a helyszínen, a jármű elszállítása nélkül.
              </p>

              <CheckList className="mt-8" items={service.bullets} />

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CallButton size="lg" label="Mondja el, mi történt" />
                <Button href="/arak" variant="secondary" size="lg">
                  Mitől függ az ár?
                </Button>
              </div>
            </div>

            {/* ---- Második fotó ---- */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-feature bg-brand-600 sm:block"
              />
              <div className="relative overflow-hidden rounded-feature shadow-media">
                <AssetImage
                  src={service.detailImage.src}
                  alt={service.detailImage.alt}
                  ratio="4/3"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  tone="green"
                />
              </div>
              <div className="mt-6 flex justify-center lg:justify-start">
                <RatingBadge />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Részletes tartalom ---- */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
            <div className="space-y-12">
              {service.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-h3">{section.heading}</h2>

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

                  {section.image && (
                    <AssetImage
                      src={section.image.src}
                      alt={section.image.alt}
                      ratio="16/9"
                      sizes="(max-width: 1024px) 100vw, 44rem"
                      tone="green"
                      wrapperClassName="mt-7 rounded-card shadow-media"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ---- Ragadós oldalsáv ---- */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="overflow-hidden rounded-feature bg-ink-900 p-7 text-center text-ink-300 shadow-media on-dark">
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

                <CallButton size="lg" label="Kérjen árat" className="mt-5 w-full" showNumber={false} />

                <p className="mt-5 border-t border-white/10 pt-5 text-[0.8125rem] leading-relaxed text-ink-400">
                  Mondja meg az autó típusát és évjáratát, konkrét árat még a
                  kiszállás előtt mondunk.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ---- Valódi munkák ---- */}
      <RealWorkGallery heading="Így néz ki a munkánk" />

      {/* ---- GYIK ---- */}
      <Section tone="white" labelledBy={`gyik-${service.slug}`}>
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 id={`gyik-${service.slug}`} className="text-h2">
              Gyakori kérdések: {service.nav.toLowerCase()}
            </h2>
            <div className="mt-8">
              <FaqList faqs={service.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      <RelatedWork serviceSlug={service.slug} />

      <RelatedServices slugs={service.related} />

      <CtaBand />

      <JsonLd
        data={jsonLdGraph(
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema(crumbs)
        )}
      />
    </>
  );
}
