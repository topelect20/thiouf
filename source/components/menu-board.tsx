import { useMemo, useState } from "react";
import { courses, dishes, formatPrice, type Course } from "@/data/menu";

const filters = ["Tout", ...courses] as const;
type Filter = (typeof filters)[number];

export function MenuBoard() {
  const [filter, setFilter] = useState<Filter>("Tout");
  const shown = useMemo(
    () => (filter === "Tout" ? dishes : dishes.filter((d) => d.course === filter)),
    [filter],
  );

  const groups: Course[] =
    filter === "Tout" ? courses : [filter];

  return (
    <section id="carte" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm tracking-widest text-primary uppercase">La carte</p>
            <h2 className="mt-2 font-display text-5xl leading-none md:text-6xl">Ce qui sort du feu</h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink/70">
            Le poisson change avec l’arrivage. Les prix sont en francs CFA, service compris, pour une personne sauf les parts à partager.
          </p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={
                  on
                    ? "shrink-0 bg-ink px-4 py-2 text-sm text-paper"
                    : "shrink-0 border border-line-paper bg-transparent px-4 py-2 text-sm text-ink"
                }
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {groups.map((course) => {
            const items = shown.filter((d) => d.course === course);
            if (!items.length) return null;
            return (
              <div key={course}>
                <h3 className="border-b border-line-paper pb-3 font-display text-3xl">{course}</h3>
                <ul className="mt-2">
                  {items.map((dish) => (
                    <li key={dish.name} className="border-b border-line-paper py-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-medium">
                          {dish.name}
                          {dish.mark ? (
                            <span className="ml-2 text-xs tracking-wide text-primary uppercase">
                              {dish.mark}
                            </span>
                          ) : null}
                        </p>
                        <p className="shrink-0 font-display text-lg">{formatPrice(dish.price)}</p>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink/70">{dish.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
