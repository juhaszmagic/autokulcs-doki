import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import {
  articles,
  getArticle,
  relatedArticles,
  categoryLabel,
  formatDate,
} from "@/config/content";
import { getService } from "@/config/services";
import { business, absoluteUrl, site } from "@/config/business";
import { Container, Section, CallButton, Button, Tag } from "@/components/ui";
import { AssetImage } from "@/components/AssetImage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand, ArticleCardGrid } from "@/components/sections";
import { FaqList } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import {
  jsonLdGraph,
  breadcrumbSchema,
  faqSchema,
  articleSchema,
  type Crumb,
} from "@/lib/schema";
import { ClockIcon, PhoneIcon, ArrowRightIcon } from "@/components/Icons";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const path = `/tudasbazis/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: path,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const crumbs: Crumb[] = [
    { name: "Kezdőlap", path: "/" },
    { name: "Tudásbázis", path: "/tudasbazis" },
    { name: article.title, path: `/tudasbazis/${article.slug}` },
  ];

  const related = relatedArticles(article);
  const linkedServices = article.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <article>
        {/* ---- Cikk fejléc ---- */}
        <div className="bg-ink-50 py-12 sm:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Tag tone="green">{categoryLabel(article.category)}</Tag>
                <time
                  dateTime={article.date}
                  className="text-[0.8125rem] text-ink-500"
                >
                  {formatDate(article.date)}
                </time>
                <span className="flex items-center gap-1.5 text-[0.8125rem] text-ink-500">
                  <ClockIcon className="h-4 w-4" />
                  {article.readingMinutes} perc olvasás
                </span>
              </div>

              <h1 className="mt-5 text-h1">{article.title}</h1>
              <p className="text-lead mt-6 text-ink-600">{article.lead}</p>
            </div>
          </Container>
        </div>

        {/* ---- Fejléckép ---- */}
        <Container className="-mt-2">
          <div className="mx-auto max-w-4xl">
            <AssetImage
              src={article.image.src}
              alt={article.image.alt}
              ratio="16/9"
              sizes="(max-width: 1024px) 100vw, 56rem"
              priority
              tone="green"
              wrapperClassName="rounded-feature shadow-media"
            />
          </div>
        </Container>

        {/* ---- Cikktörzs ---- */}
        <Section tone="white" size="normal">
          <Container>
            <div className="mx-auto max-w-3xl">
              {article.sections.map((section) => (
                <section key={section.heading} className="mb-11 last:mb-0">
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
                      sizes="(max-width: 1024px) 100vw, 48rem"
                      tone="green"
                      wrapperClassName="mt-7 rounded-card shadow-media"
                    />
                  )}
                </section>
              ))}

              {/* ---- Kapcsolódó szolgáltatások ---- */}
              {linkedServices.length > 0 && (
                <div className="mt-14 rounded-feature bg-ink-50 p-7 ring-1 ring-ink-200 sm:p-8">
                  <h2 className="text-h3">Kapcsolódó szolgáltatásaink</h2>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {linkedServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/szolgaltatasok/${service.slug}`}
                          className="group flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3.5 font-medium text-ink-800 ring-1 ring-ink-200 transition-colors hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200"
                        >
                          {service.nav}
                          <ArrowRightIcon className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ---- Cikk végi CTA ---- */}
              <div className="mt-8 overflow-hidden rounded-feature bg-ink-900 p-8 text-ink-300 on-dark sm:p-10">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-600 text-white"
                  aria-hidden
                >
                  <PhoneIcon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-h3 !text-white">
                  Hasonló problémája van?
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-ink-400">
                  Hívjon minket, mondja meg az autó típusát és évjáratát és
                  megmondjuk, mi a megoldás és mibe kerül, még a kiszállás előtt.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <CallButton size="lg" label="Mondja el, mi történt" />
                  <Button href="/kapcsolat" variant="onDark" size="lg">
                    Villám ajánlatot kérek
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ---- GYIK ---- */}
        {article.faqs && article.faqs.length > 0 && (
          <Section tone="light" labelledBy="cikk-gyik">
            <Container>
              <div className="mx-auto max-w-3xl">
                <h2 id="cikk-gyik" className="text-h2">
                  Gyakori kérdések
                </h2>
                <div className="mt-8">
                  <FaqList faqs={article.faqs} />
                </div>
              </div>
            </Container>
          </Section>
        )}
      </article>

      {/* ---- Kapcsolódó cikkek ---- */}
      {related.length > 0 && (
        <Section tone="white" labelledBy="tovabbi-cikkek">
          <Container>
            <h2 id="tovabbi-cikkek" className="text-h2">
              További hasznos tartalmak
            </h2>
            <ArticleCardGrid posts={related} />
          </Container>
        </Section>
      )}

      <CtaBand />

      <JsonLd
        data={jsonLdGraph(
          articleSchema(article),
          article.faqs && article.faqs.length > 0 ? faqSchema(article.faqs) : null,
          breadcrumbSchema(crumbs)
        )}
      />
    </>
  );
}
