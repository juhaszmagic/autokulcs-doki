import Link from "next/link";
import type { Service } from "@/config/services";
import { ServiceIcon, ArrowRightIcon } from "./Icons";
import { AssetImage } from "./AssetImage";

/**
 * Szolgáltatás-kártya — kompakt.
 *
 * Korábban a fotó töltötte ki a kártyát, és a szöveg RÁ került. Ez azt
 * jelentette, hogy a képnek akkorának kellett lennie, hogy a cím és a
 * leírás is elférjen rajta — a szolgáltatás-blokk emiatt aránytalanul
 * sok helyet foglalt.
 *
 * Most a kép egy alacsony (16:9) sáv a kártya tetején, a szöveg pedig
 * alatta, fehéren. Így a kártya jóval alacsonyabb, a szöveg kontrasztja
 * pedig mindig megfelelő — nem a fotó világos részein kell olvasni.
 *
 * A teljes kártya kattintható (stretched link), de a képernyőolvasó
 * egyetlen, értelmes linket lát a szolgáltatás nevével.
 */
export function ServiceCard({
  service,
  featured = false,
  priority = false,
  compact = false,
}: {
  service: Service;
  /** Kiemelt kártya: két oszlopot foglal a rácsban. */
  featured?: boolean;
  priority?: boolean;
  /**
   * Kompakt változat — fotó nélkül.
   *
   * A kezdőoldalon a szolgáltatások csak egy köztes lépcső: a látogató
   * fölötte már látott hero-fotót és valódi munkafotókat is. Ott a
   * kártyaképek csak hosszabbítják az oldalt, ezért elmaradnak. A
   * szolgáltatás-oldalon viszont maradnak, mert ott a fotó a tartalom.
   */
  compact?: boolean;
}) {
  if (compact) {
    return (
      <li className="group relative isolate flex gap-4 rounded-media bg-white p-4 shadow-card ring-1 ring-ink-200/70 transition-shadow duration-300 hover:shadow-card-hover focus-within:ring-2 focus-within:ring-accent-600 focus-within:ring-offset-2 sm:p-5">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white"
          aria-hidden
        >
          <ServiceIcon name={service.icon} className="h-5.5 w-5.5" />
        </span>
        <span className="min-w-0">
          <h3 className="text-[1.0625rem] font-bold leading-snug text-ink-900">
            <Link
              href={`/szolgaltatasok/${service.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
            >
              {service.nav}
            </Link>
          </h3>
          <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
            {service.cardText}
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-brand-700">
            Részletek
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </span>
      </li>
    );
  }

  return (
    <li
      className={`group relative isolate flex flex-col overflow-hidden rounded-media bg-white shadow-card ring-1 ring-ink-200/70 transition-shadow duration-300 hover:shadow-card-hover focus-within:ring-2 focus-within:ring-accent-600 focus-within:ring-offset-2 ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      {/* ---- Fotó: keskeny sáv, csak jelzésértékű ---- */}
      <div className="media-zoom overflow-hidden">
        <AssetImage
          src={service.image.src}
          alt={service.image.alt}
          ratio={featured ? "32/9" : "21/9"}
          sizes={
            featured
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          priority={priority}
          tone="dark"
          hideSlotLabel
        />
      </div>

      {/* ---- Szöveg a kép alatt ----
          Az ikon a címsor MELLETT ül, nem a kép szélére lógva: a lógó
          jelvény miatt kellett extra felső belső margó, ami minden
          kártyát megnyújtott. */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="flex items-center gap-2.5 text-[1.0625rem] font-bold leading-snug text-ink-900">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-white"
            aria-hidden
          >
            <ServiceIcon name={service.icon} className="h-4.5 w-4.5" />
          </span>
          <Link
            href={`/szolgaltatasok/${service.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
          >
            {service.nav}
          </Link>
        </h3>

        <p
          className={`mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-600 ${
            featured ? "max-w-xl" : ""
          }`}
        >
          {service.cardText}
        </p>

        <span className="mt-3 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-brand-700">
          Részletek
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </li>
  );
}
