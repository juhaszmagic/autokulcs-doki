/**
 * ============================================================================
 *  GOOGLE VÉLEMÉNYEK
 * ============================================================================
 *
 *  Ez a komponens SOHA nem generál véleményt.
 *
 *   A) business.google.reviews üres  →  becsületes „nézze meg a Google-ben”
 *      blokk: a valós csillagos értékelés és a valódi profilra mutató gombok.
 *   B) valódi, bemásolt vélemények esetén azok jelennek meg, szó szerint.
 *
 *  Ugyanez a darabszámra: ha a reviewCount null, csak a csillagos érték
 *  látszik. Lásd: config/business.ts
 * ============================================================================
 */

import { business, formattedRating } from "@/config/business";
import { Container, Section, SectionHeading, Button } from "./ui";
import { StarIcon } from "./Icons";

/* ------------------------------------------------------------------ */

/** Csillagsor — a `rating` egészre kerekítve, a maradék halvány. */
export function Stars({
  rating,
  className = "h-5 w-5",
  emptyClass = "text-ink-300",
}: {
  rating: number;
  className?: string;
  emptyClass?: string;
}) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`${className} ${
            star <= Math.round(rating) ? "text-star" : emptyClass
          }`}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Google jelölés: a négyszínű „G” jelvény, mellette opcionálisan a szó.
 *
 * A szót a saját betűtípusunkkal írjuk ki, nem a Google betűképét
 * reprodukáljuk — így egyértelmű a forrás megjelölése anélkül, hogy a
 * Google arculatát utánoznánk.
 */
export function GoogleLogo({
  className = "h-5",
  withWordmark = true,
  tone = "light",
}: {
  className?: string;
  withWordmark?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className="inline-flex items-center gap-2"
      role="img"
      aria-label="Google"
    >
      <svg className={className} viewBox="0 0 48 48" aria-hidden focusable="false">
        <path
          fill="#4285F4"
          d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17Z"
        />
        <path
          fill="#34A853"
          d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46Z"
        />
        <path
          fill="#FBBC05"
          d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7Z"
        />
        <path
          fill="#EA4335"
          d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07Z"
        />
      </svg>
      {withWordmark && (
        <span
          className={`text-[0.9375rem] font-semibold leading-none ${
            tone === "dark" ? "text-white" : "text-ink-700"
          }`}
        >
          Google
        </span>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */

/**
 * VÉLEMÉNYEK SZEKCIÓ — zöld alapon.
 *
 * A zöld itt nem díszítés: ez a „bizalom” szín a design rendszerben,
 * és a szekció így vizuálisan is elválik a körülötte lévő világos
 * blokkoktól.
 */
export function ReviewsSection({
  heading = "Ügyfeleink visszajelzései",
}: {
  heading?: string;
}) {
  const { reviews, reviewCount } = business.google;

  return (
    <Section tone="green" id="velemenyek" labelledBy="velemenyek-cim">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
          {/* ---- Nagy értékelés-blokk ---- */}
          <div className="flex flex-col items-start">
            <span className="flex items-baseline gap-2">
              <span className="text-[4.5rem] font-extrabold leading-none tracking-tight text-white sm:text-[5.5rem]">
                {formattedRating()}
              </span>
              <StarIcon className="h-8 w-8 shrink-0 text-star" />
            </span>

            <Stars
              rating={business.google.rating}
              className="mt-4 h-5 w-5"
              emptyClass="text-white/25"
            />

            <div className="mt-5 flex items-center gap-2.5 rounded-full bg-white px-4 py-2">
              <GoogleLogo className="h-4" />
              <span className="text-sm text-ink-600">
                {reviewCount ? `${reviewCount} értékelés` : "értékelés"}
              </span>
            </div>
          </div>

          {/* ---- Szöveg + CTA ---- */}
          <div>
            <SectionHeading
              eyebrow="Google értékeléseink"
              title={heading}
              align="left"
              tone="dark"
              id="velemenyek-cim"
              lead="A véleményeket nem gépeljük át ide, olvassa el őket ott, ahol hitelesek: közvetlenül a Google Cégprofilunkban. Ott azt is látja, ki és mikor írta."
            />

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href={business.google.mapsUrl}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Összes értékelés megtekintése
              </Button>
              <Button
                href={business.google.reviewUrl}
                variant="onDark"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Írjon értékelést
              </Button>
            </div>
          </div>
        </div>

        {/* ---- Valódi vélemények, ha vannak ---- */}
        {reviews.length > 0 && (
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li
                key={`${review.author}-${review.date}`}
                className="flex flex-col rounded-card bg-white p-6 shadow-card"
              >
                <Stars rating={review.rating} className="h-4 w-4" />
                <blockquote className="mt-3.5 flex-1">
                  <p className="leading-relaxed text-ink-700">„{review.text}”</p>
                </blockquote>
                <footer className="mt-5 border-t border-ink-200 pt-4">
                  <p className="text-sm font-semibold text-ink-900">
                    {review.author}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-500">
                    <time dateTime={review.date}>
                      {new Date(review.date).toLocaleDateString("hu-HU", {
                        year: "numeric",
                        month: "long",
                      })}
                    </time>{" "}
                    · Google értékelés
                  </p>
                </footer>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/** Kompakt értékelés-jelvény. */
export function RatingBadge({ className = "" }: { className?: string }) {
  const { reviewCount } = business.google;
  return (
    <a
      href={business.google.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 rounded-full bg-white px-4 py-2.5 shadow-sm ring-1 ring-ink-200 transition-shadow hover:shadow-md ${className}`}
    >
      <GoogleLogo className="h-4" withWordmark={false} />
      <span className="flex items-center gap-1.5">
        <span className="text-sm font-bold text-ink-900">{formattedRating()}</span>
        <Stars rating={business.google.rating} className="h-3.5 w-3.5" />
      </span>
      <span className="text-sm text-ink-600">
        {reviewCount ? `${reviewCount} értékelés` : "Google értékelés"}
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */

/** Összegző doboz — a Rólunk és a Vélemények oldalhoz. */
export function RatingSummary() {
  const { reviewCount } = business.google;

  return (
    <div className="flex flex-col items-center gap-5 rounded-feature bg-white p-8 text-center shadow-card ring-1 ring-ink-200 sm:flex-row sm:gap-8 sm:text-left">
      <div className="flex shrink-0 flex-col items-center gap-2">
        <GoogleLogo className="h-7" />
        <span className="text-xs font-medium text-ink-500">Cégprofil</span>
      </div>

      <div aria-hidden className="hidden h-16 w-px bg-ink-200 sm:block" />

      <div className="flex flex-col items-center gap-1.5 sm:items-start">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-extrabold leading-none text-ink-900">
            {formattedRating()}
          </span>
          <Stars rating={business.google.rating} className="h-5 w-5" />
        </div>
        <p className="text-sm text-ink-600">
          {reviewCount ? (
            <>
              <strong className="font-semibold text-ink-800">{reviewCount}</strong>{" "}
              értékelés alapján a Google-ben
            </>
          ) : (
            <>Értékelések a Google Cégprofilban</>
          )}
        </p>
      </div>

      <div className="sm:ml-auto">
        <Button
          href={business.google.mapsUrl}
          variant="secondary"
          size="md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google értékelések
        </Button>
      </div>
    </div>
  );
}
