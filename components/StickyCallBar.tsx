/**
 * Ragadós hívássáv — csak mobilon.
 *
 * A weboldal elsődleges konverziós célja a telefonhívás. A tipikus látogató
 * az autója mellett áll, stresszes, és nem olvas: ezért a hívás gomb a
 * képernyő aljára rögzítve mindig egy hüvelykujjnyira van.
 *
 * Grafit alap + narancs gomb — ugyanaz a márkanyelv, mint a fejlécben.
 * A <body> alsó belső margója (globals.css) gondoskodik róla, hogy a sáv
 * ne takarjon el tartalmat a lap alján.
 */

import { business } from "@/config/business";
import { PhoneIcon, ClockIcon } from "./Icons";

export function StickyCallBar() {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-50 bg-ink-900/97 px-3 pb-[env(safe-area-inset-bottom)] pt-3 shadow-[0_-6px_24px_rgb(18_21_15/0.35)] backdrop-blur-sm md:hidden">
      <div className="flex items-center gap-3 pb-3">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-brand-300">
            <ClockIcon className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {business.hours.short} · non-stop ügyelet
            </span>
          </p>
          <p className="truncate text-[1.0625rem] font-bold text-white">
            {business.phone.primary.display}
          </p>
        </div>

        <a
          href={business.phone.primary.href}
          data-cta="call-sticky"
          className="flex shrink-0 items-center gap-2 rounded-xl bg-accent-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors active:bg-accent-800"
          aria-label={`Hívás most: ${business.phone.primary.display}`}
        >
          <PhoneIcon className="h-5 w-5" />
          Hívás most
        </a>
      </div>
    </div>
  );
}
