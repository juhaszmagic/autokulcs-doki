/**
 * Beágyazott SVG ikonkészlet.
 *
 * Miért így: nincs ikon-könyvtár függőség, nincs extra hálózati kérés,
 * és az ikonok a HTML-lel együtt érkeznek. Minden ikon `aria-hidden`,
 * mert dekoratív — a jelentést mindig a mellette lévő szöveg hordozza.
 */

import type { SVGProps } from "react";
import type { IconName } from "@/config/services";

type Props = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

/* ---- Szolgáltatás-ikonok ------------------------------------------------ */

/** Nyitott lakat — autónyitás */
export function UnlockIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="10.5" width="17" height="10.5" rx="2" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 8.86-1.15" />
      <circle cx="12" cy="15.75" r="1.15" />
    </svg>
  );
}

/** Pajzs pipával — sérülésmentes munkavégzés */
export function ShieldIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.75 4.5 5.9v5.4c0 4.6 3.1 8.4 7.5 9.95 4.4-1.55 7.5-5.35 7.5-9.95V5.9L12 2.75Z" />
      <path d="m8.9 12.1 2.1 2.15 4.1-4.3" />
    </svg>
  );
}

/** Kulcs — kulcsmásolás */
export function KeyIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="7.75" cy="16.25" r="3.75" />
      <path d="m10.6 13.6 8.15-8.15" />
      <path d="m16.4 7.8 2 2" />
      <path d="m13.9 10.3 1.6 1.6" />
    </svg>
  );
}

/** Chip — programozás, immobilizer */
export function ChipIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="7.25" y="7.25" width="9.5" height="9.5" rx="1.6" />
      <path d="M10.4 3.5v3.75M13.6 3.5v3.75M10.4 16.75v3.75M13.6 16.75v3.75" />
      <path d="M3.5 10.4h3.75M3.5 13.6h3.75M16.75 10.4h3.75M16.75 13.6h3.75" />
    </svg>
  );
}

/** Nagyító — elveszett kulcs */
export function SearchIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.75" cy="10.75" r="6.75" />
      <path d="m15.75 15.75 4.25 4.25" />
    </svg>
  );
}

/** Kulcsmarás — kulcskészítés */
export function CutIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6.5h8.5l2 2h5.5v7h-5.5l-2 2H4z" />
      <path d="M7 9.75v4.5M10 9.75v4.5" />
    </svg>
  );
}

/* ---- Felület-ikonok ----------------------------------------------------- */

export function PhoneIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.4 3.5h3.1l1.55 3.9-2 1.3a12.4 12.4 0 0 0 5.25 5.25l1.3-2 3.9 1.55v3.1a2 2 0 0 1-2.2 2A16.9 16.9 0 0 1 4.4 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function ClockIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 6.9V12l3.4 2" />
    </svg>
  );
}

export function MapPinIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M19 10.2c0 5.2-7 11.3-7 11.3s-7-6.1-7-11.3a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function CheckIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="m4.75 12.5 4.75 4.75L19.25 7.5" strokeWidth={2} />
    </svg>
  );
}

export function ChevronDownIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="m5.5 9 6.5 6.5L18.5 9" strokeWidth={2} />
    </svg>
  );
}

export function ArrowRightIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.75 12h14.5" />
      <path d="m13.5 6.25 5.75 5.75-5.75 5.75" />
    </svg>
  );
}

export function MenuIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeWidth={2} />
    </svg>
  );
}

export function CloseIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeWidth={2} />
    </svg>
  );
}

export function CarIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.25 16.5v2.25a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V16.5m15.25 0v2.25a1 1 0 0 0 1 1H18.5a1 1 0 0 0 1-1V16.5" />
      <path d="M3.5 16.5v-4.1l1.9-4.55A2 2 0 0 1 7.25 6.6h9.5a2 2 0 0 1 1.85 1.25l1.9 4.55v4.1Z" />
      <path d="M3.5 12.4h17" />
      <circle cx="7.75" cy="14.5" r="1" />
      <circle cx="16.25" cy="14.5" r="1" />
    </svg>
  );
}

export function ToolsIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M14.4 6.6a3.9 3.9 0 0 1 5.1 5.1l-2.2-2.2-2.6.4-.7-.7.4-2.6Z" />
      <path d="m13.7 10.3-8.4 8.4a1.9 1.9 0 0 0 2.7 2.7l8.4-8.4" />
    </svg>
  );
}

/** Tömör csillag — értékeléshez. */
export function StarIcon(props: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="m12 2.75 2.85 5.78 6.4.93-4.63 4.5 1.1 6.36L12 17.32l-5.72 3-1.1-6.36L.55 9.46l6.4-.93L12 2.75Z" />
    </svg>
  );
}

export function PlayIcon(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M8.25 5.5v13l10.5-6.5-10.5-6.5Z" />
    </svg>
  );
}

/** WhatsApp logó. */
export function WhatsAppIcon(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z"/>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Z"/>
    </svg>
  );
}

/** Viber logó. */
export function ViberIcon(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12.5 1.5c-2.4 0-5.6.3-7.4 2C3.7 4.9 3.2 7 3.1 9.6c0 2.6-.1 7.4 4.6 8.7v2c0 .8.4 1 1 .6l1.9-2.1c.6 0 1.2.1 1.9.1 2.4 0 5.6-.3 7.4-2 1.4-1.4 1.9-3.5 2-6.1 0-2.6-.6-4.7-2-6.1-1.8-1.7-5-2-7.4-2Zm.1 1.6c2.1 0 4.9.2 6.3 1.6 1.1 1.1 1.5 2.8 1.5 5s-.4 3.9-1.5 5c-1.4 1.4-4.2 1.6-6.3 1.6-.7 0-1.4 0-2.1-.1l-1.8 2v-2.3C4.6 15 4.7 11.4 4.7 9.7c0-2.2.4-3.9 1.5-5 1.4-1.4 4.3-1.6 6.4-1.6Z"/>
      <path d="M9.6 6.2c-.3-.1-.6 0-.8.2l-.7.8c-.3.3-.4.8-.2 1.2.7 1.8 2.1 3.2 3.9 3.9.4.2.9.1 1.2-.2l.8-.7c.3-.2.3-.6.1-.9l-1-1.2c-.2-.2-.5-.3-.8-.2l-.6.3c-.5-.3-.9-.7-1.2-1.2l.3-.6c.1-.3 0-.6-.2-.8l-.8-.6Z"/>
      <path d="M12.9 5.6a.5.5 0 0 0 0 1 3.4 3.4 0 0 1 3.4 3.4.5.5 0 0 0 1 0 4.4 4.4 0 0 0-4.4-4.4Zm.1 1.7a.5.5 0 0 0 0 1c.9 0 1.6.7 1.6 1.6a.5.5 0 0 0 1 0 2.6 2.6 0 0 0-2.6-2.6Z"/>
    </svg>
  );
}

/** Facebook „f" logó. */
export function FacebookIcon(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

/** TikTok hangjegy-logó — a közösségi videóblokkhoz. */
export function TikTokIcon(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .52.04.76.12v-3.2a5.86 5.86 0 0 0-.76-.05A5.72 5.72 0 0 0 4.15 15.3a5.72 5.72 0 0 0 5.71 5.71 5.72 5.72 0 0 0 5.72-5.71V9.01a7.35 7.35 0 0 0 4.28 1.37V7.29a4.28 4.28 0 0 1-3.26-1.47Z" />
    </svg>
  );
}

/* ---- Feloldó: szolgáltatás → ikon --------------------------------------- */

const serviceIcons: Record<IconName, (p: Props) => React.ReactElement> = {
  unlock: UnlockIcon,
  shield: ShieldIcon,
  key: KeyIcon,
  chip: ChipIcon,
  search: SearchIcon,
  cut: CutIcon,
};

export function ServiceIcon({
  name,
  ...props
}: { name: IconName } & Props) {
  const Component = serviceIcons[name];
  return <Component {...props} />;
}
