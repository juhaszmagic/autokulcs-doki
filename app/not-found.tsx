import type { Metadata } from "next";

import { Container, CallButton, Button } from "@/components/ui";
import { ServiceLinkList } from "@/components/sections";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "A keresett oldal nem található (404)",
  description:
    "A keresett oldal nem található. Ha sürgős a helyzet, hívjon minket, autónyitás és kulcskészítés Budapesten, 0–24.",
  /** Hibaoldal: ne kerüljön be a keresőbe, de a linkjeit kövesse. */
  robots: { index: false, follow: true },
};

/**
 * 404 oldal.
 *
 * Nem zsákutca: aki ide téved (például egy régi, indexelt linkről),
 * azonnal lát egy hívás gombot és a szolgáltatásokra mutató linkeket.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            404-es hiba
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Ezt az oldalt nem találjuk
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            Lehet, hogy a link elavult, vagy elgépelés történt. Ha sürgős a
            helyzet, ne keresgéljen tovább, hívjon minket és megoldjuk.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CallButton size="lg" label="Segítünk, egyeztessünk" />
            <Button href="/" variant="secondary" size="lg">
              Vissza a kezdőlapra
            </Button>
          </div>

          <p className="mt-4 text-sm text-ink-500">
            {business.hours.display} · {business.serviceArea.primary}
          </p>

          <div className="mt-12 text-left">
            <h2 className="text-center text-lg font-bold">
              Talán ezt kereste?
            </h2>
            <div className="mt-5">
              <ServiceLinkList />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
