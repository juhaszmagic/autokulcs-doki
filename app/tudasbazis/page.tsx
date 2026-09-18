import type { Metadata } from "next";
import Link from "next/link";

import { articlesByDate, categoryLabel, formatDate } from "@/config/content";
import { Container, Section, CallButton, Tag, Button } from "@/components/ui";
import { AssetImage } from "@/components/AssetImage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero, CtaBand, ServiceLinkList } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdGraph, breadcrumbSchema, type Crumb } from "@/lib/schema";
import { ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Tudásbázis: autókulcs tippek és útmutatók",
  description:
    "Hasznos tudnivalók autókulcsról: elveszett kulcs, pótkulcs, immobilizer és programozás. Érthetően elmagyarázva, valós ügyfélkérdések alapján.",
  alternates: { canonical: "/tudasbazis" },
};

const crumbs: Crumb[] = [
  { name: "Kezdőlap", path: "/" },
  { name: "Tudásbázis", path: "/tudasbazis" },
];

export default function KnowledgeBasePage() {
  const posts = articlesByDate();
  const [featured, ...rest] = posts;

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <PageHero
        eyebrow="Tudásbázis"
        title="Friss munkák és hasznos tippek"
        lead="Gyakori helyzetek, érthetően elmagyarázva, hogy tudja, mi vár Önre, mielőtt telefonál."
      >
        <CallButton size="lg" label="Kérdezzen telefonon" />
      </PageHero>

      <Section tone="light">
        <Container wide>
          {/* ---- Kiemelt cikk ---- */}
          {featured && (
            <article className="group relative grid overflow-hidden rounded-feature bg-white shadow-card ring-1 ring-ink-200/70 transition-shadow duration-300 hover:shadow-card-hover lg:grid-cols-2">
              <div className="media-zoom overflow-hidden">
                <AssetImage
                  src={featured.image.src}
                  alt={featured.image.alt}
                  ratio="16/10"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  tone="green"
                  hideSlotLabel
                />
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <Tag tone="orange">Kiemelt</Tag>
                  <Tag tone="green">{categoryLabel(featured.category)}</Tag>
                  <time
                    dateTime={featured.date}
                    className="text-[0.8125rem] text-ink-500"
                  >
                    {formatDate(featured.date)}
                  </time>
                </div>

                <h2 className="mt-5 text-h2">
                  <Link
                    href={`/tudasbazis/${featured.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
                  >
                    {featured.title}
                  </Link>
                </h2>

                <p className="mt-4 leading-relaxed text-ink-600">
                  {featured.excerpt}
                </p>

                <span className="mt-7 inline-flex items-center gap-2 font-semibold text-brand-700">
                  Elolvasom
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          )}

          {/* ---- További cikkek ---- */}
          {rest.length > 0 && (
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {rest.map((post) => (
                <li
                  key={post.slug}
                  className="group relative flex flex-col overflow-hidden rounded-media bg-white shadow-card ring-1 ring-ink-200/70 transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <div className="media-zoom overflow-hidden">
                    <AssetImage
                      src={post.image.src}
                      alt={post.image.alt}
                      ratio="16/9"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      tone="dark"
                      hideSlotLabel
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Tag tone="green">{categoryLabel(post.category)}</Tag>
                      <time
                        dateTime={post.date}
                        className="text-[0.8125rem] text-ink-500"
                      >
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <h2 className="mt-4 text-h3">
                      <Link
                        href={`/tudasbazis/${post.slug}`}
                        className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 leading-relaxed text-ink-600">
                      {post.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-700">
                      Elolvasom
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* ---- Szolgáltatás-linkek ---- */}
          <div className="mt-16 rounded-feature bg-white p-8 shadow-card ring-1 ring-ink-200/70 sm:p-10">
            <h2 className="text-h3">Konkrét problémája van?</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">
              Az olvasás helyett néha egyszerűbb telefonálni. De ha előbb
              tájékozódna, itt találja a szolgáltatásaink részletes leírását:
            </p>
            <div className="mt-7">
              <ServiceLinkList />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" label="Kérdezzen telefonon" />
              <Button href="/szolgaltatasok" variant="secondary" size="lg">
                Összes szolgáltatás
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
    </>
  );
}
