/**
 * ============================================================================
 *  AssetImage — a cég saját fotóihoz
 * ============================================================================
 *
 *  A weboldal fotóközpontú: a fényképek a felület nagyjából felét adják.
 *  A tulajdonos fotói viszont még nincsenek feltöltve.
 *
 *  Ez a komponens build időben megnézi, hogy a kért kép létezik-e:
 *
 *   • HA LÉTEZIK  → igazi, reszponzív <picture>: AVIF + WebP forrás,
 *     srcset, fix képarány (nincs elmozduló elrendezés), lusta betöltés.
 *
 *   • HA NEM  → NEM szürke doboz, hanem a márka arculatához illő,
 *     szándékosnak látszó fotóhely: grafit vagy zöld alap, finom
 *     autóipari mintázat, kulcs-jel és a leendő fotó leírása.
 *     Az oldal így a fotók feltöltése ELŐTT is bemutatható.
 *
 *  A tulajdonos teendője: bemásolja a fotót a megadott néven a
 *  /public/images mappába, és lefuttatja: npm run images
 * ============================================================================
 */

import fs from "node:fs";
import path from "node:path";

/**
 * Előnézeti buildnél (GitHub Pages) a weboldal alútvonalon fut, pl.
 * /autokulcsmasolo-doktor/. A Next a saját eszközeit automatikusan
 * átírja, de ez a komponens sima <img src>-t ad ki, amit nem érint —
 * ezért itt kézzel kell elé tenni az alútvonalat, különben a képek
 * 404-et adnának az előnézetben.
 */
const BASE_PATH = process.env.PREVIEW_BASE_PATH ?? "";
export const withBase = (src: string) => (src ? `${BASE_PATH}${src}` : src);

/* ------------------------------------------------------------------ */

interface ManifestEntry {
  width: number;
  height: number;
  widths: number[];
  blur?: string;
}

let manifestCache: Record<string, ManifestEntry> | null = null;

function readManifest(): Record<string, ManifestEntry> {
  if (manifestCache) return manifestCache;
  try {
    const file = path.join(process.cwd(), "public", "images", "manifest.json");
    manifestCache = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    manifestCache = {};
  }
  return manifestCache!;
}

function assetExists(src: string): boolean {
  if (!src) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */

export type SlotTone = "dark" | "green" | "light";

interface AssetImageProps {
  /** /public-hoz képest, pl. "/images/hero.jpg" */
  src: string;
  /** Kötelező. Azt írja le, ami a képen ténylegesen látható. */
  alt: string;
  /** Képarány, pl. "16/9", "4/3", "3/4", "1/1". A helyőrző is ezt tartja. */
  ratio?: string;
  sizes?: string;
  /** Az LCP-képnél true: eager betöltés, magas prioritás. */
  priority?: boolean;
  /** A helyőrző színvilága — illeszkedjen a környező szekcióhoz. */
  tone?: SlotTone;
  className?: string;
  wrapperClassName?: string;
  /** Ha a kép egy sötétített felület alatt van, a helyőrző felirata zavaró. */
  hideSlotLabel?: boolean;
}

export function AssetImage({
  src,
  alt,
  ratio = "16/9",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  tone = "dark",
  className = "",
  wrapperClassName = "",
  hideSlotLabel = false,
}: AssetImageProps) {
  const exists = assetExists(src);

  if (!exists) {
    return (
      <div
        className={`relative overflow-hidden ${wrapperClassName}`}
        style={{ aspectRatio: ratio }}
      >
        <PhotoSlot alt={alt} tone={tone} hideLabel={hideSlotLabel} />
      </div>
    );
  }

  const entry = readManifest()[src];
  const base = withBase(src).replace(/\.(jpe?g|png|webp|avif)$/i, "");
  const widths = entry?.widths ?? [];
  const srcSetFor = (ext: "avif" | "webp") =>
    widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");

  return (
    <div
      className={`relative overflow-hidden bg-ink-200 ${wrapperClassName}`}
      style={{ aspectRatio: ratio }}
    >
      <picture>
        {widths.length > 0 && (
          <>
            <source type="image/avif" srcSet={srcSetFor("avif")} sizes={sizes} />
            <source type="image/webp" srcSet={srcSetFor("webp")} sizes={sizes} />
          </>
        )}
        <img
          src={withBase(src)}
          alt={alt}
          width={entry?.width}
          height={entry?.height}
          sizes={widths.length > 0 ? sizes : undefined}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className={`h-full w-full object-cover ${className}`}
        />
      </picture>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Fotóhely — a márka arculatához tervezve.
 *
 * Nem üres szürke téglalap: mély grafit vagy zöld alap, finom átlós
 * mintázattal, középen egy kulcs-jellel. Így a fotók feltöltése előtt is
 * összeáll a kompozíció, és látszik, hogy ide szándékosan kép kerül.
 */
function PhotoSlot({
  alt,
  tone,
  hideLabel,
}: {
  alt: string;
  tone: SlotTone;
  hideLabel: boolean;
}) {
  const tones: Record<SlotTone, { bg: string; mark: string; text: string; line: string }> = {
    dark: {
      bg: "bg-ink-900",
      mark: "text-brand-400/70",
      text: "text-ink-400",
      line: "#ffffff",
    },
    green: {
      bg: "bg-brand-800",
      mark: "text-brand-300/70",
      text: "text-brand-200",
      line: "#ffffff",
    },
    light: {
      bg: "bg-ink-100",
      mark: "text-brand-600/60",
      text: "text-ink-500",
      line: "#1f2421",
    },
  };
  const t = tones[tone];

  return (
    <div className={`photo-slot absolute inset-0 flex items-center justify-center ${t.bg}`}>
      {/* Finom átlós mintázat, mélységet ad, nem vonja el a figyelmet. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(-38deg, ${t.line} 0 1px, transparent 1px 14px)`,
        }}
      />
      {/* Halvány zöld fénylés a sarokban, mélység, gradiens-túlzás nélkül. */}
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/4 h-2/3 w-2/3 rounded-full opacity-[0.10]"
        style={{ background: "radial-gradient(circle, #7a9b85 0%, transparent 70%)" }}
      />

      <div
        aria-hidden
        className="relative flex max-w-[80%] flex-col items-center gap-3 p-5 text-center"
      >
        {/* Kulcs-jel, ugyanaz a forma, mint a logóban. */}
        <svg
          viewBox="0 0 32 32"
          className={`h-10 w-10 ${t.mark}`}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <circle cx="11" cy="16" r="5.6" strokeWidth={2.2} />
          <path d="M11 13.2v5.6M8.2 16h5.6" strokeWidth={1.9} />
          <path d="M17 16h9.5" strokeWidth={2.2} />
          <path d="M22.5 16v3.6M26 16v2.6" strokeWidth={2.2} />
        </svg>

        {!hideLabel && (
          <p className={`text-[0.6875rem] leading-snug ${t.text}`}>
            <span className="eyebrow mb-1 block opacity-80">Fotó helye</span>
            {alt}
          </p>
        )}
      </div>
    </div>
  );
}
