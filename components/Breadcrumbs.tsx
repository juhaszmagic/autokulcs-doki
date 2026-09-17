import Link from "next/link";
import type { Crumb } from "@/lib/schema";
import { Container } from "./ui";

/**
 * Morzsamenü.
 *
 * Az utolsó elem az aktuális oldal — az nem link, és `aria-current="page"`
 * jelöli. A megjelenő szöveg és a BreadcrumbList strukturált adat ugyanabból
 * a `crumbs` tömbből készül, így nem tudnak elcsúszni egymástól.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Morzsamenü" className="border-b border-ink-200 bg-ink-50">
      <Container>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-[0.8125rem] text-ink-500">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden className="text-ink-300">
                    /
                  </span>
                )}
                {isLast ? (
                  <span aria-current="page" className="font-medium text-ink-700">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="underline-offset-2 transition-colors hover:text-ink-800 hover:underline"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
