/**
 * ============================================================================
 *  KAPCSOLATI ŰRLAP
 * ============================================================================
 *
 *  Tervezési döntések:
 *
 *  1. NULLA JAVASCRIPT. A validálást a böngésző natív HTML5 mechanizmusa
 *     végzi (`required`, `type`, `pattern`, `minLength`). Ez azonnal működik,
 *     nem kell hozzá hidratálás, és kikapcsolt JS mellett is véd.
 *
 *  2. SPAMVÉDELEM JS NÉLKÜL: rejtett „honeypot” mező (`_gotcha`). Ember nem
 *     látja és nem tölti ki; a legtöbb automata bot viszont minden mezőt
 *     kitölt. A Formspree ezt a mezőnevet natívan felismeri és eldobja az
 *     ilyen beküldéseket. A mező `tabindex=-1` és `aria-hidden`, tehát
 *     billentyűzettel és képernyőolvasóval sem érhető el.
 *
 *  3. A TELEFON MARAD AZ ELSŐDLEGES ÚT. A cég a saját oldalán is kimondta:
 *     „A hívást részesítjük előnyben.” Ezt az elvet megtartottuk — az űrlap
 *     fölött mindig ott a hívás gomb.
 *
 *  4. HA NINCS BEKÖTVE A VÉGPONT, az űrlap nem tesz úgy, mintha működne.
 *     A beküldés gomb letiltva, és látható magyarázat kerül a helyére.
 *     Bekötés: NEXT_PUBLIC_FORM_ENDPOINT környezeti változó — lásd .env.example
 * ============================================================================
 */

import { business, site } from "@/config/business";
import { CallButton } from "./ui";
import { PhoneIcon, WhatsAppIcon, ViberIcon } from "./Icons";

const inputBase =
  "w-full rounded-lg border-0 bg-white px-4 py-3 text-ink-900 ring-1 ring-inset ring-ink-300 transition-shadow placeholder:text-ink-400 focus:ring-2 focus:ring-inset focus:ring-brand-600";

const labelBase = "block text-sm font-semibold text-ink-800";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={labelBase}>
      {children}
      {required ? (
        <span className="ml-0.5 text-accent-700" aria-hidden>
          *
        </span>
      ) : (
        // ink-500, nem ink-400: 14px-es szövegnél az ink-400 csak 2,61:1
        // kontrasztot ad fehéren — az ink-500 4,83:1, ami megfelel.
        <span className="ml-1.5 font-normal text-ink-500">(nem kötelező)</span>
      )}
    </label>
  );
}

export function ContactForm() {
  /**
   * A végpont alapból a FormSubmit, a config/business.ts-ben megadott
   * címzettel. Ha valaki mégis mást akar (Formspree, Web3Forms), a
   * NEXT_PUBLIC_FORM_ENDPOINT környezeti változó felülírja.
   */
  const endpoint =
    site.formEndpoint ??
    `https://formsubmit.co/${site.formRecipients.to}`;
  const isConnected = Boolean(endpoint);
  const usesFormsubmit = endpoint.includes("formsubmit.co");

  return (
    <div className="rounded-card bg-white p-6 shadow-card ring-1 ring-ink-200 sm:p-8">
      {/* ---- A hívás marad az elsődleges út ---- */}
      <div className="mb-7 rounded-lg bg-accent-50 p-5 ring-1 ring-accent-100">
        <p className="flex items-start gap-3">
          <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" />
          <span className="text-[0.9375rem] leading-relaxed text-ink-700">
            <strong className="font-semibold text-ink-900">
              Sürgős esetben hívjon minket.
            </strong>{" "}
            Ha elhagyta vagy elvesztette az autókulcsát, a telefon a leggyorsabb út,
            az űrlapra nem tudunk azonnal válaszolni.
          </span>
        </p>
        <CallButton size="md" label="Inkább telefonálok" className="mt-4 w-full sm:w-auto" />

        {/* Üzenetküldők: aki nem szeret telefonálni, itt is elér minket. */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <a
            href={business.messaging.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-[0.9375rem] font-semibold text-ink-900 ring-1 ring-inset ring-ink-300 transition-colors hover:bg-ink-50"
          >
            <WhatsAppIcon className="h-5 w-5 text-brand-600" />
            WhatsApp
          </a>
          <a
            href={business.messaging.viber.url}
            className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-[0.9375rem] font-semibold text-ink-900 ring-1 ring-inset ring-ink-300 transition-colors hover:bg-ink-50"
          >
            <ViberIcon className="h-5 w-5 text-brand-600" />
            Viber
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-bold">Villám ajánlat</h3>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-[0.8125rem] font-bold text-brand-800">
          {business.pricing.fromLabel}
        </span>
      </div>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
        Írja meg az autó adatait és visszahívjuk az árral. Minél pontosabban
        adja meg a típust és az évjáratot, annál pontosabb árat tudunk mondani.
      </p>
      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-500">
        {business.pricing.note}
      </p>

      <form
        // Ha nincs végpont, nem adunk action-t — így nem lehet félrevezetően „elküldeni”.
        action={endpoint ?? undefined}
        method="POST"
        className="mt-6 space-y-5"
        aria-describedby={!isConnected ? "form-disabled-note" : undefined}
      >
        {/* ---- Honeypot: emberi szemnek láthatatlan spamcsapda ---- */}
        <div className="absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
          <label htmlFor="_gotcha">Ezt a mezőt hagyja üresen</label>
          <input
            type="text"
            id="_gotcha"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* ---- Név + telefon: a két kötelező mező ---- */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="nev" required>
              Név
            </Label>
            <input
              type="text"
              id="nev"
              name="Név"
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
              placeholder="Kovács Péter"
              className={`mt-1.5 ${inputBase}`}
            />
          </div>

          <div>
            <Label htmlFor="telefon" required>
              Telefonszám
            </Label>
            <input
              type="tel"
              id="telefon"
              name="Telefonszám"
              required
              // Magyar mobil- és vezetékes formátumok, szóközzel/kötőjellel is.
              pattern="[+0-9][0-9\s\-()/]{7,19}"
              maxLength={20}
              autoComplete="tel"
              inputMode="tel"
              placeholder="+36 30 123 4567"
              aria-describedby="telefon-hint"
              className={`mt-1.5 ${inputBase}`}
            />
            <p id="telefon-hint" className="mt-1.5 text-xs text-ink-500">
              Ezen a számon hívjuk vissza.
            </p>
          </div>
        </div>

        {/* ---- E-mail cím ----
            A mező neve szándékosan „email”: a FormSubmit ezt a nevet
            ismeri fel, és a beérkező levél válaszcímét (Reply-To) erre
            állítja. Így a megkeresés nemcsak megmutatja az ügyfél
            e-mail címét, hanem a levélre nyomott „Válasz” is egyenesen
            hozzá megy. Nem kötelező: a visszahívás a telefonszámon
            történik, egy kötelező e-mail mező viszont elriaszthatná azt,
            aki sürgős helyzetben, telefonról tölti ki az űrlapot. */}
        <div>
          <Label htmlFor="email">E-mail cím</Label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength={120}
            autoComplete="email"
            inputMode="email"
            placeholder="kovacs.peter@example.com"
            aria-describedby="email-hint"
            className={`mt-1.5 ${inputBase}`}
          />
          <p id="email-hint" className="mt-1.5 text-xs text-ink-500">
            Ha megadja, e-mailben is tudunk válaszolni.
          </p>
        </div>

        {/* ---- Jármű adatai ---- */}
        <fieldset>
          <legend className="text-sm font-semibold text-ink-800">
            Az autó adatai
          </legend>
          <p className="mt-1 text-xs text-ink-500">
            Ezekből tudunk pontos árat és időpontot mondani.
          </p>

          <div className="mt-3 grid gap-5 sm:grid-cols-3">
            <div>
              <Label htmlFor="marka">Márka</Label>
              <input
                type="text"
                id="marka"
                name="Autó márkája"
                maxLength={40}
                placeholder="pl. Volkswagen"
                className={`mt-1.5 ${inputBase}`}
              />
            </div>
            <div>
              <Label htmlFor="modell">Modell</Label>
              <input
                type="text"
                id="modell"
                name="Modell"
                maxLength={40}
                placeholder="pl. Golf"
                className={`mt-1.5 ${inputBase}`}
              />
            </div>
            <div>
              <Label htmlFor="evjarat">Évjárat</Label>
              <input
                type="number"
                id="evjarat"
                name="Évjárat"
                min={1950}
                max={new Date().getFullYear() + 1}
                inputMode="numeric"
                placeholder="pl. 2014"
                className={`mt-1.5 ${inputBase}`}
              />
            </div>
          </div>
        </fieldset>

        {/* ---- Probléma típusa ---- */}
        <div>
          <Label htmlFor="problema" required>
            Milyen problémával keres minket?
          </Label>
          <select
            id="problema"
            name="Miért keres minket"
            required
            defaultValue=""
            className={`mt-1.5 ${inputBase} appearance-none bg-[length:1.25rem] bg-[right_0.9rem_center] bg-no-repeat pr-11`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5.5 9 6.5 6.5L18.5 9'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Válasszon…
            </option>
            <option value="Elhagyta / elvesztette az autókulcsát">
              Elhagytam / elvesztettem az autókulcsomat
            </option>
            <option value="Bent maradt a kulcs az autóban">Bent maradt a kulcs az autóban</option>
            <option value="Pótkulcs / másolat">Pótkulcsot / másolatot szeretnék</option>
            <option value="Kulcsprogramozás, immobilizer, távirányító">
              Kulcsprogramozás, immobilizer, távirányító
            </option>
            <option value="Új autókulcs készítése">Új autókulcs készítése</option>
            <option value="Eltört kulcs / beletört a zárba">Eltört a kulcs / beletört a zárba</option>
            <option value="Egyéb">Egyéb</option>
          </select>
        </div>

        {/* ---- Üzenet ---- */}
        <div>
          <Label htmlFor="uzenet">Üzenet</Label>
          <textarea
            id="uzenet"
            name="Üzenet"
            rows={4}
            maxLength={1500}
            placeholder="Röviden: mi történt és hol van most az autó?"
            className={`mt-1.5 ${inputBase} resize-y`}
          />
        </div>

        {/* ---- Adatkezelési hozzájárulás ---- */}
        <div className="flex gap-3">
          <input
            type="checkbox"
            id="hozzajarulas"
            name="Adatkezelési hozzájárulás"
            required
            value="Elfogadva"
            className="mt-1 h-4.5 w-4.5 shrink-0 rounded border-ink-300 text-brand-700 focus:ring-brand-600"
          />
          <label htmlFor="hozzajarulas" className="text-sm leading-relaxed text-ink-600">
            Hozzájárulok, hogy a megadott adataimat a megkeresésem
            megválaszolása céljából kezeljék. Részletek az{" "}
            <a
              href="/adatkezelesi-tajekoztato"
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              adatkezelési tájékoztatóban
            </a>
            .
            <span className="ml-0.5 text-accent-700" aria-hidden>
              *
            </span>
          </label>
        </div>

        {/* ---- Beküldés ---- */}
        {isConnected ? (
          <>
            <input
              type="hidden"
              name="_subject"
              value={`Új megkeresés: ${business.name} weboldal`}
            />

            {/* ---- FormSubmit-specifikus beállítások ----
                _cc      – másolatot kap a második cím
                _template– táblázatos, olvasható levélforma
                _captcha – nincs közbeiktatott captcha-oldal
                _honey   – a FormSubmit saját csapdamezője (a fenti
                           _gotcha a Formspree-é; mindkettő ott van,
                           hogy a végpont cseréjekor se essen ki) */}
            {usesFormsubmit && (
              <>
                {site.formRecipients.cc ? (
                  <input type="hidden" name="_cc" value={site.formRecipients.cc} />
                ) : null}
                <input type="hidden" name="_template" value="box" />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value={`${site.url}/koszonjuk/`}
                />
                <div
                  className="absolute h-px w-px overflow-hidden opacity-0"
                  aria-hidden="true"
                >
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-accent-600 px-6 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-accent-700 active:bg-accent-800 sm:w-auto sm:px-10"
            >
              Üzenet küldése
            </button>
            <p className="text-xs text-ink-500">
              A <span aria-hidden>*</span>-gal jelölt mezők kitöltése kötelező.
            </p>
          </>
        ) : (
          /* ---- Nincs bekötve: nem teszünk úgy, mintha működne ---- */
          <div
            id="form-disabled-note"
            className="rounded-lg bg-ink-100 p-5 ring-1 ring-ink-200"
          >
            <p className="text-[0.9375rem] font-semibold text-ink-900">
              Az űrlap küldése még nincs élesítve.
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
              Amíg nincs beállítva a fogadó e-mail cím, kérjük telefonon
              keressen minket, így úgyis gyorsabban tudunk segíteni.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <CallButton size="md" label="Inkább telefonálok" />

            </div>
          </div>
        )}
      </form>
    </div>
  );
}
