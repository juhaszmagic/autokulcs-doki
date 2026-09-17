/**
 * ============================================================================
 *  LOGÓ
 * ============================================================================
 *
 *  A tulajdonos által megadott, VALÓDI márkajel: körbe zárt autókulcs,
 *  aminek a fejében kereszt ül — a „Doki" névre utalva.
 *
 *  A jel fémes (ezüst) kidolgozású, ezért MINDIG sötét alapra kerül:
 *  világos háttéren a világosszürke felületek elvesznének. A sötét
 *  csempe nem díszítés, hanem az olvashatóság feltétele.
 * ============================================================================
 */

import Link from "next/link";
import { business } from "@/config/business";
import { withBase } from "./AssetImage";

/* ------------------------------------------------------------------ */

/** Csak a jel — a névtábla nélkül. */
export function LogoMark({
  className = "h-10 w-10",
  tone = "dark",
}: {
  className?: string;
  /** dark = grafit alap · green = zöld alap · plain = háttér nélkül */
  tone?: "dark" | "green" | "plain";
}) {
  const bg = {
    dark: "bg-ink-900",
    green: "bg-brand-800",
    plain: "",
  }[tone];

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl ${bg} ${className}`}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBase("/images/logo-mark.png")}
        alt=""
        width={1024}
        height={1024}
        className="h-[76%] w-[76%] object-contain"
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */

/**
 * A teljes, eredeti logó (márkajel + felirat + szlogen) képként.
 * Ott használjuk, ahol van hely a teljes emblémának — például a
 * láblécben. Sötét háttéren mutat jól.
 */
export function LogoLockup({ className = "h-24" }: { className?: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={withBase("/images/logo-full.png")}
      alt={`${business.name} logó`}
      width={1200}
      height={873}
      className={`w-auto object-contain ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */

/**
 * Teljes logó: jel + névtábla.
 * A név a config/business.ts-ből jön, tehát átnevezéskor egy helyen kell írni.
 */
export function Logo({
  href = "/",
  tone = "light",
  className = "",
}: {
  href?: string;
  /** light = világos fejléc · dark = sötét lábléc */
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  /* A nevet két részre bontjuk, hogy a második szó zölden emelkedjen ki. */
  const parts = business.name.split(" ");
  const last = parts.pop() ?? "";
  const first = parts.join(" ");

  const content = (
    <>
      <LogoMark
        className="h-10 w-10 sm:h-11 sm:w-11"
        tone={isDark ? "green" : "dark"}
      />
      <span className="min-w-0 leading-tight">
        <span
          className={`block truncate text-[1.0625rem] font-extrabold tracking-tight lg:overflow-visible lg:text-[1.1875rem] ${
            isDark ? "text-white" : "text-ink-900"
          }`}
        >
          {first}{" "}
          <span className={isDark ? "text-brand-300" : "text-brand-600"}>
            {last}
          </span>
        </span>
        <span
          className={`hidden whitespace-nowrap text-[0.75rem] font-medium sm:block ${
            isDark ? "text-ink-400" : "text-ink-500"
          }`}
        >
          Autónyitás &amp; kulcsmásolás · Budapest
        </span>
      </span>
    </>
  );

  if (!href) {
    return <span className={`flex min-w-0 items-center gap-3 ${className}`}>{content}</span>;
  }

  return (
    <Link href={href} className={`flex min-w-0 items-center gap-3 ${className}`}>
      {content}
    </Link>
  );
}
