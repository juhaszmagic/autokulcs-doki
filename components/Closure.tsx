/**
 * ============================================================================
 *  IDŐSZAKOS ZÁRVA TARTÁS (szabadság)
 * ============================================================================
 *
 *  Két elem, mindkettő a `config/business.ts` → `closure` beállításból él:
 *
 *   • ClosureStrip — vékony narancs sáv MINDEN oldal tetején, a fejléc
 *     fölött. Ez az, ami elsőre szembetűnik, bárhova érkezik a látogató.
 *
 *   • ClosureNotice — nagy, feltűnő doboz. A kezdőlapon és a kapcsolat
 *     oldalon jelenik meg, ott, ahol a látogató amúgy is hívni akarna.
 *
 *  ⚠️ Ha a `closure.active` hamis, MINDKETTŐ eltűnik, és az oldal
 *     magától visszaáll a megszokott állapotra. A szabadság végén tehát
 *     csak azt az egy kapcsolót kell átbillenteni.
 *
 *  Nulla kliensoldali JavaScript, ahogy az egész oldalon.
 * ============================================================================
 */

import { business } from "@/config/business";
import { Container } from "./ui";
import { ClockIcon, ArrowRightIcon } from "./Icons";

const { closure } = business;

/* ------------------------------------------------------------------ */

/** Vékony sáv az oldal tetején, a fejléc fölött. */
export function ClosureStrip() {
  if (!closure.active) return null;

  return (
    <div className="bg-accent-700 text-white">
      <Container>
        <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 py-2.5 text-center text-sm font-semibold leading-snug">
          <ClockIcon className="h-4 w-4 shrink-0" aria-hidden />
          <span>{closure.short}</span>
          <span aria-hidden className="opacity-50">
            ·
          </span>
          <span className="font-normal text-accent-100">
            Újra elérhetők vagyunk: {closure.reopen}
          </span>
        </p>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Nagy, feltűnő doboz.
 *
 * Szándékosan NEM piros: a piros hibát jelent, itt viszont nincs baj,
 * csak zárva vagyunk. A narancs a márka saját kiemelő színe.
 */
export function ClosureNotice({
  /**
   * A kapcsolat oldalon felesleges egy „Üzenetet hagyok” gomb, ami
   * ugyanarra az oldalra visz: ott az űrlap amúgy is lejjebb van.
   */
  withLink = true,
}: {
  withLink?: boolean;
}) {
  if (!closure.active) return null;

  return (
    <section
      aria-label={closure.headline}
      className="border-y-2 border-accent-600 bg-accent-50"
    >
      <Container>
        <div className="py-8 sm:py-10">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 sm:flex-row sm:gap-7">
            <span
              aria-hidden
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white"
            >
              <ClockIcon className="h-6 w-6" />
            </span>

            <div>
              <h2 className="text-2xl font-extrabold text-accent-900 sm:text-3xl">
                {closure.headline}
              </h2>

              <p className="mt-3 leading-relaxed text-ink-700">
                {closure.body}
              </p>

              <p className="mt-3 leading-relaxed text-ink-700">
                {closure.action}
              </p>

              <p className="mt-5 flex flex-wrap items-center gap-2 text-base font-bold text-accent-800">
                <ArrowRightIcon className="h-4.5 w-4.5 shrink-0" aria-hidden />
                Az első munkanap: {closure.reopen}
              </p>

              {withLink && (
                <a
                  href="/kapcsolat/"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-700"
                >
                  Üzenetet hagyok
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
