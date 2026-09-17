/**
 * GYIK harmonika.
 *
 * Natív <details>/<summary> — nincs hozzá JavaScript, működik kikapcsolt
 * JS mellett is, és a böngésző adja a billentyűzet-kezelést.
 *
 * SEO szempontból fontos: a válaszok szövege akkor is benne van a HTML-ben,
 * ha a harmonika csukva van, tehát a Google indexelni tudja. A FAQPage
 * strukturált adat ugyanebből a tömbből készül — a látható tartalom és a
 * séma nem tud eltérni.
 */

import type { ServiceFaq } from "@/config/services";
import { ChevronDownIcon } from "./Icons";

export function FaqList({
  faqs,
  /** Az első elem alapból nyitva — jelzi, hogy ezek kinyithatók. */
  openFirst = true,
}: {
  faqs: ServiceFaq[];
  openFirst?: boolean;
}) {
  return (
    <div className="divide-y divide-ink-200 overflow-hidden rounded-card bg-white ring-1 ring-ink-200">
      {faqs.map((faq, index) => (
        <details
          key={faq.q}
          className="faq group"
          open={openFirst && index === 0}
        >
          {/*
            FONTOS: a <summary>-ra NEM teszünk `flex`-et.
            iOS Safariban a `display: flex` elveszi a summary
            alapértelmezett `list-item` megjelenítését és ettől a natív
            nyitás-zárás elromlik: koppintásra nem reagál, csak hosszú
            nyomásra. Az elrendezés ezért egy belső <span>-be kerül.
          */}
          <summary>
            <span className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-50 sm:px-6 sm:py-5">
              <h3 className="text-[1.0625rem] font-semibold text-ink-900">
                {faq.q}
              </h3>
              <ChevronDownIcon className="faq-chevron mt-0.5 h-5 w-5 shrink-0 text-ink-500" />
            </span>
          </summary>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <p className="max-w-3xl leading-relaxed text-ink-600">{faq.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
