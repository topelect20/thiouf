import { useState } from "react";
import { Menu, X } from "lucide-react";
import { restaurant } from "@/data/menu";

const links = [
  { href: "#carte", label: "La carte" },
  { href: "#maison", label: "La maison" },
  { href: "#reserver", label: "Réserver" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#haut" className="bg-bg/80 px-1 font-display text-xl tracking-wide text-fg backdrop-blur-sm">
          {restaurant.name}
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors duration-200 hover:text-fg">
              {l.label}
            </a>
          ))}
          <a
            href="#reserver"
            className="bg-primary px-4 py-2 text-sm font-medium text-primary-ink"
          >
            Une table
          </a>
        </nav>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center bg-bg/80 text-fg backdrop-blur-sm md:hidden"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <nav className="mx-5 flex flex-col gap-1 bg-surface p-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-3 text-lg text-fg"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
