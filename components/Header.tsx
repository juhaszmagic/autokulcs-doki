/**
 * Fejléc — grafit felső sáv + fehér fősáv.
 *
 * A mobil menü natív <details>/<summary> elemmel működik: nincs hozzá
 * JavaScript, nincs hidratálás, a billentyűzet-kezelést a böngésző adja.
 */

import Link from "next/link";
import { business, formattedRating } from "@/config/business";
import { services } from "@/config/services";
import { Container, CallButton } from "./ui";
import { Logo } from "./Logo";
import { MenuIcon, CloseIcon, PhoneIcon, StarIcon, ClockIcon, MapPinIcon } from "./Icons";

const mainNav = [
  { href: "/szolgaltatasok", label: "Szolgáltatások" },
  { href: "/arak", label: "Árak" },
  { href: "/rolunk", label: "Rólunk" },
  { href: "/galeria", label: "Galéria" },
  { href: "/tudasbazis", label: "Tudásbázis" },
  { href: "/gyik", label: "GYIK" },
  { href: "/kapcsolat", label: "Kapcsolat" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-header">
      {/* ---- Grafit felső sáv ---- */}
      <div className="hidden bg-ink-900 lg:block">
        <Container>
          <div className="flex h-10 items-center justify-between text-[0.8125rem] text-ink-400">
            <p className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-brand-400" />
              <span>
                <strong className="font-semibold text-white">
                  {business.hours.short}
                </strong>{" "}
                · {business.hours.display}
              </span>
            </p>
            <p className="flex items-center gap-5">
              <a
                href={business.phone.primary.href}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
                data-cta="call-header"
              >
                <PhoneIcon className="h-4 w-4 text-accent-400" />
                <strong className="font-semibold text-white">
                  {business.phone.primary.display}
                </strong>
              </a>
              <span aria-hidden className="h-3.5 w-px bg-white/15" />
              <span className="flex items-center gap-1.5">
                <MapPinIcon className="h-4 w-4 text-brand-400" />
                <strong className="font-semibold text-white">
                  {business.address.district}
                </strong>
                <span>· {business.serviceArea.primary}</span>
              </span>
              <span aria-hidden className="h-3.5 w-px bg-white/15" />
              <a
                href={business.google.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <StarIcon className="h-4 w-4 text-star" />
                <strong className="font-semibold text-white">
                  {formattedRating()}
                </strong>
                <span>Google értékelés</span>
              </a>
            </p>
          </div>
        </Container>
      </div>

      {/* ---- Fő sáv ---- */}
      <div className="bg-white/95 backdrop-blur-sm">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
            <Logo />

            {/*
                EGYETLEN display-szabály, szándékosan.
                Korábban `hidden xl:block` volt: két versengő szabály
                ugyanazon az elemen, és a kaszkád eldöntése böngészőnként
                eltérően viselkedett — volt gép, ahol a menü eltűnt.
                A `max-xl:hidden` egyetlen media-szabály, nincs mit
                felülírni.
              */}
              <nav aria-label="Fő navigáció" className="max-xl:hidden">
              <ul className="flex items-center gap-0.5">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="whitespace-nowrap rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-2.5">
              {/*
                A láthatóságot a BURKOLÓ elem szabályozza, nem a gomb
                osztálylistája: a CallButton alapból `inline-flex` és egy
                rátett `hidden` osztály nem feltétlenül nyerne.
              */}
              <span className="hidden sm:block">
                <CallButton size="md" showNumber={false} />
              </span>

              {/* ---- Mobil menü (CSS-only) ---- */}
              <details className="nav-drawer xl:hidden">
                {/*
                  FONTOS: a <summary>-ra NEM kerül `flex`.
                  iOS Safariban a `display: flex` elveszi a summary
                  alapértelmezett `list-item` megjelenítését és ettől a
                  menü koppintásra nem nyílik ki, csak hosszú nyomásra.
                  A gomb kinézete ezért egy belső <span>-en van.
                */}
                <summary aria-label="Menü megnyitása és bezárása">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-900 text-white transition-colors hover:bg-ink-800">
                    <MenuIcon className="icon-open h-6 w-6" />
                    <CloseIcon className="icon-close h-6 w-6" />
                  </span>
                </summary>

                <nav
                  aria-label="Mobil navigáció"
                  className="absolute left-0 right-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink-200 bg-white p-5 shadow-lg"
                >
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/"
                        className="block rounded-lg px-4 py-3 text-base font-semibold text-ink-800 hover:bg-ink-100"
                      >
                        Kezdőlap
                      </Link>
                    </li>
                    {mainNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-lg px-4 py-3 text-base font-semibold text-ink-800 hover:bg-ink-100"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <p className="eyebrow mt-6 px-4 text-ink-500">Szolgáltatásaink</p>
                  <ul className="mt-2.5 space-y-0.5 border-l-2 border-brand-200 pl-3">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/szolgaltatasok/${service.slug}`}
                          className="block rounded-lg px-3 py-2.5 text-[0.9375rem] text-ink-600 hover:bg-ink-100 hover:text-ink-900"
                        >
                          {service.nav}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-ink-200 pt-5">
                    <CallButton size="lg" className="w-full" />
                    <p className="mt-3 text-center text-sm text-ink-500">
                      {business.hours.display}
                    </p>
                  </div>
                </nav>
              </details>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
