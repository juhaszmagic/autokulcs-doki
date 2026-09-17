/**
 * Lábléc — mély grafit, zöld és narancs akcentusokkal.
 *
 * Itt jelenik meg a teljes NAP (név, cím, telefon) pontosan ugyanabban a
 * formában, mint a Kapcsolat oldalon és a strukturált adatokban. A lokális
 * SEO szempontjából ez a konzisztencia a lényeg, ezért minden adat a
 * config/business.ts-ből jön.
 */

import Link from "next/link";
import { business, formattedRating } from "@/config/business";
import { services } from "@/config/services";
import { socialProfiles } from "@/config/media";
import { Container } from "./ui";
import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  TikTokIcon,
  FacebookIcon,
  WhatsAppIcon,
  ViberIcon,
  ArrowRightIcon,
} from "./Icons";
import { GoogleLogo } from "./Reviews";
import { LogoLockup } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-300 on-dark">
      {/* ---- Narancs csík: vizuális lezárás ---- */}
      <div aria-hidden className="h-1 bg-accent-600" />

      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          {/* ---- Cég + NAP ---- */}
          <div className="lg:col-span-4">
            {/* A teljes, eredeti logó, a sötét lábléc a fémes jel
                természetes közege, itt van rá elég hely is. */}
            <LogoLockup className="h-28" />

            <p className="mt-5 max-w-xs leading-relaxed text-ink-400">
              {business.description}
            </p>

            <address className="mt-7 space-y-4 not-italic">
              <a
                href={business.phone.primary.href}
                className="flex items-start gap-3.5 transition-colors hover:text-accent-400"
                data-cta="call-footer"
              >
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-white"
                  aria-hidden
                >
                  <PhoneIcon className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-lg font-bold text-white">
                    {business.phone.primary.display}
                  </span>
                </span>
              </a>



              <div className="flex gap-2.5 pt-1">
                <a
                  href={business.messaging.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2.5 text-[0.8125rem] font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={business.messaging.viber.url}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2.5 text-[0.8125rem] font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]"
                >
                  <ViberIcon className="h-4 w-4" />
                  Viber
                </a>
              </div>

              <p className="flex items-start gap-3.5 text-sm">
                <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-brand-400" />
                <span>
                  {business.address.full}
                  <span className="mt-0.5 block text-xs font-semibold text-brand-300">
                    Budapest {business.address.district} · {business.address.districtName}
                  </span>
                </span>
              </p>

              <p className="flex items-start gap-3.5 text-sm">
                <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-brand-400" />
                <span>{business.hours.display}</span>
              </p>
            </address>
          </div>

          {/* ---- Szolgáltatások ---- */}
          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <p id="footer-services" className="eyebrow text-white">
              Szolgáltatások
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/szolgaltatasok/${service.slug}`}
                    className="text-ink-400 transition-colors hover:text-white"
                  >
                    {service.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Oldalak ---- */}
          <nav aria-labelledby="footer-pages" className="lg:col-span-2">
            <p id="footer-pages" className="eyebrow text-white">
              Az oldalról
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { href: "/", label: "Kezdőlap" },
                { href: "/szolgaltatasok", label: "Szolgáltatások" },
                { href: "/arak", label: "Árak" },
                { href: "/rolunk", label: "Rólunk" },
                { href: "/galeria", label: "Galéria" },
                { href: "/tudasbazis", label: "Tudásbázis" },
                { href: "/velemenyek", label: "Vélemények" },
                { href: "/gyik", label: "GYIK" },
                { href: "/kapcsolat", label: "Kapcsolat" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Google + közösségi ---- */}
          <div className="lg:col-span-3">
            <p className="eyebrow text-white">Google Cégprofil</p>

            <a
              href={business.google.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block rounded-card bg-white/[0.06] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.10]"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold leading-none text-white">
                  {formattedRating()}
                </span>
                <span className="flex" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} className="h-4 w-4 text-star" />
                  ))}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <GoogleLogo className="h-4" tone="dark" />
                <span className="text-xs text-ink-400">
                  {business.google.reviewCount
                    ? `${business.google.reviewCount} értékelés`
                    : "értékelés"}
                </span>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400">
                Értékelések megnyitása
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </a>

            <a
              href={business.google.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2.5 rounded-card bg-white/[0.06] px-5 py-4 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/[0.10]"
            >
              <MapPinIcon className="h-5 w-5 text-brand-400" />
              Megnyitás Google Térképen
            </a>

            {/* ---- TikTok ---- */}
            <p className="eyebrow mt-8 text-white">Kövessen minket</p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={socialProfiles.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/[0.10]"
              >
                <TikTokIcon className="h-5 w-5" />
                {socialProfiles.tiktok.handle}
              </a>
              {socialProfiles.facebook && (
                <a
                  href={socialProfiles.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/[0.10]"
                >
                  <FacebookIcon className="h-5 w-5" />
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ---- Alsó sor ---- */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-7 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. Minden jog fenntartva.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/impresszum"
              className="transition-colors hover:text-white"
            >
              Impresszum
            </Link>
            <Link
              href="/adatkezelesi-tajekoztato"
              className="transition-colors hover:text-white"
            >
              Adatkezelési tájékoztató
            </Link>
          </p>
          <p>
            Autónyitás · autókulcsmásolás · autókulcs-programozás ·{" "}
            {business.serviceArea.primary}
          </p>
        </div>
      </Container>
    </footer>
  );
}
