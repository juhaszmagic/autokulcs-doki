/**
 * ============================================================================
 *  TÁVIRÁNYÍTÓ ANIMÁCIÓ
 * ============================================================================
 *
 *  A látogató megnyomja a gombot a kulcson, kiindul a rádiójel, és az autó
 *  index- és fényszórólámpái kétszer felvillannak — pontosan az a pillanat,
 *  amiért minket hívnak: a kulcs újra működik.
 *
 *  Oldalnézetű autó, mert az sokkal felismerhetőbb, mint egy leegyszerűsített
 *  elölnézet. A kulcs modern, három gombos távirányító, lekerekített házzal.
 *
 *  Tisztán SVG + CSS: nincs JavaScript, nincs animációs könyvtár, nincs
 *  videó. Csak `transform` és `opacity` animálódik, amit a böngésző a GPU-n
 *  rajzol. Dekoratív, ezért `aria-hidden`; `prefers-reduced-motion` esetén
 *  a globals.css megállítja.
 * ============================================================================
 */

export function RemoteAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`remote-anim ${className}`} aria-hidden>
      <svg viewBox="0 0 620 300" fill="none" className="w-full">
        {/* ================= AUTÓ (oldalnézet) ================= */}
        <g className="car">
          {/* --- Karosszéria --- */}
          <path
            className="car-body"
            d="M232 214v-26c0-13 7-21 20-25l44-13 34-30c6-5 13-8 21-8h58c9 0 17 4 22 12l26 40 42 9c14 3 21 11 21 24v17"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Küszöb */}
          <path
            className="car-body"
            d="M232 214h288"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* --- Ablakok --- */}
          <path
            className="car-glass"
            d="M310 149l28-25c4-3 8-5 13-5h18v30h-59Z"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            className="car-glass"
            d="M381 119h27c5 0 9 2 12 7l15 23h-54v-30Z"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* --- Ajtóvonal és kilincs --- */}
          <path className="car-line" d="M372 152v62" strokeWidth="3" />
          <path
            className="car-line"
            d="M392 176h18"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* --- Kerékjáratok --- */}
          <path
            className="car-body"
            d="M266 214a34 34 0 0 1 68 0M424 214a34 34 0 0 1 68 0"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* --- Kerekek --- */}
          <g className="wheels">
            <circle cx="300" cy="214" r="30" strokeWidth="5" />
            <circle cx="300" cy="214" r="12" strokeWidth="4" />
            <circle cx="458" cy="214" r="30" strokeWidth="5" />
            <circle cx="458" cy="214" r="12" strokeWidth="4" />
          </g>

          {/* --- Visszapillantó --- */}
          <path
            className="car-line"
            d="M366 146l-13-4"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* ================= LÁMPÁK ================= */}
        <g className="lamps">
          {/* Fényszóró elöl */}
          <path
            className="lamp lamp-front"
            d="M234 176h16c4 0 7 3 7 7v6c0 4-3 7-7 7h-18Z"
          />
          {/* Hátsó lámpa */}
          <path
            className="lamp lamp-rear"
            d="M519 176h-13c-4 0-7 3-7 7v6c0 4 3 7 7 7h15Z"
          />
          {/* Index az első sárvédőn */}
          <circle className="lamp lamp-ind" cx="262" cy="200" r="4.5" />
          <circle className="lamp lamp-ind" cx="496" cy="200" r="4.5" />

          {/* Fényglória */}
          <ellipse className="glow glow-front" cx="240" cy="186" rx="46" ry="26" />
          <ellipse className="glow glow-rear" cx="514" cy="186" rx="42" ry="24" />
        </g>

        {/* ================= JELHULLÁMOK ================= */}
        <g className="waves" strokeWidth="4.5" strokeLinecap="round" fill="none">
          <path className="wave wave-1" d="M132 108a38 38 0 0 1 0 46" />
          <path className="wave wave-2" d="M152 94a58 58 0 0 1 0 74" />
          <path className="wave wave-3" d="M172 80a78 78 0 0 1 0 102" />
        </g>

        {/* ================= TÁVIRÁNYÍTÓ KULCS ================= */}
        <g className="fob">
          {/* Kulcskarika */}
          <circle
            className="fob-line"
            cx="62"
            cy="70"
            r="11"
            strokeWidth="4.5"
          />
          <path className="fob-line" d="M62 81v8" strokeWidth="4.5" />

          {/* Kulcstest */}
          <rect
            className="fob-shell"
            x="26"
            y="89"
            width="72"
            height="118"
            rx="22"
            strokeWidth="5"
          />
          {/* Felső elválasztó él, ettől néz ki rendes kulcsháznak */}
          <path
            className="fob-line"
            d="M30 116h64"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* LED a kulcson */}
          <circle className="fob-led" cx="62" cy="103" r="4" />

          {/* --- Gombok --- */}
          {/* Zárás */}
          <rect
            className="fob-btn-secondary"
            x="44"
            y="129"
            width="36"
            height="20"
            rx="10"
          />
          {/* NYITÁS, ez nyomódik meg */}
          <g className="fob-button">
            <rect x="44" y="155" width="36" height="20" rx="10" />
          </g>
          {/* Csomagtartó */}
          <rect
            className="fob-btn-secondary"
            x="44"
            y="181"
            width="36"
            height="18"
            rx="9"
          />
        </g>
      </svg>
    </div>
  );
}
