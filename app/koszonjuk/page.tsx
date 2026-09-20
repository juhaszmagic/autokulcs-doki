import type { Metadata } from "next";

import { business } from "@/config/business";
import { Container, Section, CallButton, Button } from "@/components/ui";
import { PhoneIcon, CheckIcon, WhatsAppIcon, ViberIcon } from "@/components/Icons";

/**
 * KÖSZÖNŐ OLDAL
 *
 * Ide dob át az űrlap-továbbító a sikeres beküldés után.
 *
 * Miért külön oldal, és nem egy „?elkuldve=1” paraméter a kapcsolat
 * oldalon? Mert a weboldal nulla kliensoldali JavaScripttel fut, tehát
 * nincs mivel kiolvasni a query paramétert. Egy statikus oldal viszont
 * mindig működik.
 *
 * A `noindex` szándékos: ez az oldal nem keresési találatnak való, és
 * üresen, előzmény nélkül félrevezető lenne.
 */
export const metadata: Metadata = {
  title: "Köszönjük a megkeresést",
  description: "Megkaptuk az üzenetét, hamarosan keressük.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Section tone="light" size="normal">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white"
              aria-hidden
            >
              <CheckIcon className="h-8 w-8" />
            </span>

            <h1 className="mt-7 text-h1">Köszönjük, megkaptuk!</h1>

            <p className="text-lead mt-5 text-ink-600">
              Az üzenete megérkezett. Munkaidőben rövid időn belül
              visszahívjuk a megadott telefonszámon.
            </p>

            {/*
              A sürgősség itt a legfontosabb üzenet: aki elvesztette a
              kulcsát, annak az űrlap nem megoldás, a hívás az.
            */}
            <div className="mt-9 rounded-feature bg-accent-50 p-6 text-left ring-1 ring-accent-100 sm:p-7">
              <p className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-white"
                  aria-hidden
                >
                  <PhoneIcon className="h-4.5 w-4.5" />
                </span>
                <span>
                  <strong className="block font-bold text-ink-900">
                    Sürgős? Ne várjon a válaszra.
                  </strong>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-700">
                    Ha most áll az autó mellett, hívjon, {business.hours.short}{" "}
                    elérhetők vagyunk és megmondjuk, mikor tudunk ott lenni.
                  </span>
                </span>
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CallButton size="lg" label="Hívjon most" />
                <Button
                  href={business.messaging.whatsapp.url}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </Button>
                <Button
                  href={business.messaging.viber.url}
                  variant="secondary"
                  size="lg"
                >
                  <ViberIcon className="h-5 w-5" />
                  Viber
                </Button>
              </div>
            </div>

            <div className="mt-9">
              <Button href="/" variant="ghost" size="lg">
                Vissza a kezdőlapra
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
