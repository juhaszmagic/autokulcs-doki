/**
 * Alap felületi elemek — konténer, szekció, gomb, kártya.
 * Mind szerver komponens: nulla kliensoldali JavaScript.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { PhoneIcon, ArrowRightIcon } from "./Icons";
import { business } from "@/config/business";

/* ---------------------------------------------------------------- */

export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  /** Szélesebb sáv a fotórácsokhoz. */
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${wide ? "max-w-[86rem]" : "max-w-6xl"} px-5 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */

/**
 * Szekció-fejléc.
 *
 * A `tone` azt mondja meg, milyen háttéren ül — ebből dől el a szöveg
 * és a címke színe. Így nem fordulhat elő sötét szöveg sötét háttéren.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  level: Level = "h2",
  id,
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  level?: "h1" | "h2" | "h3";
  id?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={`flex max-w-3xl flex-col ${
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <span
          className={`eyebrow mb-4 flex items-center gap-2.5 ${
            isDark ? "text-accent-400" : "text-accent-700"
          }`}
        >
          <span
            aria-hidden
            className={`h-px w-7 ${isDark ? "bg-accent-400/60" : "bg-accent-600/50"}`}
          />
          {eyebrow}
        </span>
      )}

      <Level id={id} className={`text-h2 ${isDark ? "!text-white" : ""}`}>
        {title}
      </Level>

      {lead && (
        <p
          className={`text-lead mt-5 ${isDark ? "text-ink-300" : "text-ink-600"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */

/**
 * Szekció.
 *
 * A `tone` adja a lap vizuális ritmusát. A kezdőoldal szándékosan
 * váltogatja: világos → fehér → grafit → zöld → világos …
 * Ettől lesz tagolt és rétegzett a lap, nem egy végtelen fehér szalag.
 */
export function Section({
  children,
  className = "",
  tone = "light",
  id,
  labelledBy,
  size = "normal",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "light" | "dark" | "green" | "darker";
  id?: string;
  labelledBy?: string;
  size?: "normal" | "large" | "compact";
}) {
  const tones = {
    white: "bg-white text-ink-800",
    light: "bg-ink-50 text-ink-800",
    dark: "bg-ink-900 text-ink-300 on-dark",
    darker: "bg-ink-950 text-ink-300 on-dark",
    green: "bg-brand-800 text-brand-100 on-dark",
  };

  const sizes = {
    compact: "py-12 sm:py-14",
    normal: "py-16 sm:py-20 lg:py-24",
    large: "py-20 sm:py-28 lg:py-32",
  };

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${sizes[size]} ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

/* ---------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "green" | "onDark" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  /* Narancs — kizárólag az elsődleges konverzióhoz (hívás). */
  primary:
    "bg-accent-600 text-white shadow-sm hover:bg-accent-700 active:bg-accent-800",
  /* Világos háttéren: körvonalas. */
  secondary:
    "bg-white text-ink-900 ring-1 ring-inset ring-ink-300 hover:bg-ink-50 hover:ring-ink-400",
  /* Zöld — másodlagos akció, ahol hangsúly kell, de nem konverzió. */
  green: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800",
  /* Sötét háttéren. */
  onDark:
    "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/20",
  ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
};

const sizes = {
  md: "px-5 py-3 text-[0.9375rem]",
  lg: "px-6 py-3.5 text-base sm:px-7 sm:py-4 sm:text-[1.0625rem]",
  xl: "px-7 py-4 text-[1.0625rem] sm:px-9 sm:py-[1.15rem] sm:text-[1.125rem]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  className?: string;
  [key: string]: unknown;
}) {
  const classes = `inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl font-semibold transition-colors duration-150 ${buttonStyles[variant]} ${sizes[size]} ${className}`;
  const isExternal = /^(https?:|tel:|mailto:)/.test(href);

  if (isExternal) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------- */

/**
 * Az oldal elsődleges CTA-ja.
 * Egy helyen definiálva, hogy a telefonszám és a szöveg mindenhol
 * ugyanaz legyen — és a config-ból jöjjön.
 */
export function CallButton({
  size = "lg",
  className = "",
  label = "Hívás most",
  showNumber = true,
}: {
  size?: keyof typeof sizes;
  className?: string;
  label?: string;
  showNumber?: boolean;
}) {
  return (
    <Button
      href={business.phone.primary.href}
      size={size}
      className={className}
      data-cta="call"
    >
      <PhoneIcon className="h-[1.15em] w-[1.15em] shrink-0" />
      <span>{label}</span>
      {/*
        A telefonszámon nincs `opacity`: a 90%-os áttetszőség 4,11:1-re
        rontotta a kontrasztot a narancs háttéren (a küszöb 4,5:1).
      */}
      {showNumber && (
        <span className="hidden font-normal sm:inline">
          · {business.phone.primary.display}
        </span>
      )}
    </Button>
  );
}

/* ---------------------------------------------------------------- */

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      className={`rounded-card bg-white p-6 shadow-card ring-1 ring-ink-200/70 ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------- */

/** Pipás felsorolás. A `tone` a háttérhez igazítja a színeket. */
export function CheckList({
  items,
  className = "",
  tone = "light",
}: {
  items: readonly string[];
  className?: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <ul className={`space-y-3.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3.5">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              isDark ? "bg-accent-600 text-white" : "bg-brand-100 text-brand-700"
            }`}
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4.75 12.5 4.75 4.75L19.25 7.5" />
            </svg>
          </span>
          <span className={isDark ? "text-ink-200" : "text-ink-700"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------- */

/** Szövegközi „tovább” link, nyíllal. */
export function TextLink({
  href,
  children,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline ${
        tone === "dark"
          ? "text-accent-400 hover:text-accent-200"
          : "text-brand-700 hover:text-brand-800"
      }`}
    >
      {children}
      <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

/* ---------------------------------------------------------------- */

/**
 * Kis színes címke — kategóriákhoz, „Friss” jelzéshez, TikTok jelöléshez.
 */
export function Tag({
  children,
  tone = "green",
  className = "",
}: {
  children: ReactNode;
  tone?: "green" | "orange" | "neutral" | "onDark";
  className?: string;
}) {
  const tones = {
    green: "bg-brand-100 text-brand-800",
    orange: "bg-accent-100 text-accent-800",
    neutral: "bg-ink-100 text-ink-700",
    onDark: "bg-white/12 text-white ring-1 ring-inset ring-white/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.75rem] font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
