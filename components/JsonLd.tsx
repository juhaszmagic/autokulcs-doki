import { jsonLdString } from "@/lib/schema";

/**
 * JSON-LD strukturált adat beillesztése.
 * A tartalom a szerveren generálódik, kliensoldali JS nélkül.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // A jsonLdString escape-eli a `<` karaktert, így a blokk nem törhető ki.
      dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
    />
  );
}
