import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { Header } from "@/components/thiouf/header";
import { MenuBoard } from "@/components/thiouf/menu-board";
import { Reserve } from "@/components/thiouf/reserve";
import { hours, restaurant } from "@/data/menu";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main id="haut" className="min-h-screen">
      <Header />

      <section className="relative min-h-svh">
        <img
          src="/images/hero.jpg"
          alt="Thiouf entier grillé sur la braise, citron et braises vives"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
        <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-5 pt-28 pb-10 md:px-8 md:pb-16">
          <p className="text-sm tracking-widest text-primary uppercase">
            {restaurant.place} · {restaurant.region}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-6xl leading-none text-fg md:text-8xl">
            Le poisson, au feu.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-fg">
            Grillades du jour et thieboudienne, table ouverte sur la route de la côte. On sert quand la braise est prête.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#carte" className="inline-flex h-12 items-center justify-center bg-primary px-6 font-medium text-primary-ink">
              Voir la carte
            </a>
            <a
              href="#reserver"
              className="inline-flex h-12 items-center justify-center border border-fg/40 px-6 text-fg"
            >
              Réserver une table
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 md:grid-cols-3 md:px-8">
          <p className="flex items-start gap-3 text-sm leading-relaxed text-muted">
            <MapPin className="mt-0.5 shrink-0 text-primary" size={18} />
            {restaurant.address}
            <br />
            {restaurant.city}
          </p>
          <p className="flex items-start gap-3 text-sm leading-relaxed text-muted">
            <Clock className="mt-0.5 shrink-0 text-primary" size={18} />
            Feu allumé du mardi au dimanche. Lundi, porte close.
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Poisson selon arrivage. Prévenez pour un groupe de plus de huit.
          </p>
        </div>
      </section>

      <MenuBoard />

      <section id="maison" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-5">
          <p className="text-sm tracking-widest text-primary uppercase">La maison</p>
          <h2 className="mt-2 font-display text-5xl leading-none md:text-6xl">Un feu, pas une salle climatisée.</h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            THIOUF est né d’un gril posé à Nguékhokh, entre le marché et la route qui file vers Saly. On achète le thiof le matin, on le garde entier, et on ne le met au feu que lorsque la table est là.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            La terrasse est ouverte. Le midi, la marmite. Le soir, surtout la braise. L’attaya se sert si vous ne partez pas tout de suite.
          </p>
        </div>
        <div className="grid gap-4 md:col-span-7">
          <img
            src="/images/thieb.jpg"
            alt="Thieboudienne rouge dans un plat émaillé, légumes et poisson"
            className="aspect-4/3 w-full object-cover"
          />
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/crevettes.jpg"
              alt="Crevettes grillées et poisson, citron et piment"
              className="aspect-square w-full object-cover"
            />
            <img
              src="/images/pastels.jpg"
              alt="Pastels de poisson, bissap et café Touba"
              className="aspect-3/4 w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-12 md:items-center md:px-8">
          <img
            src="/images/braise.jpg"
            alt="Braises vives sous le gril"
            className="aspect-square w-full max-w-xs object-cover md:col-span-4"
          />
          <ul className="md:col-span-8">
            {hours.map((row) => (
              <li
                key={row.day}
                className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display text-2xl">{row.day}</span>
                <span className="text-muted">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Reserve />

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <p className="font-display text-3xl">{restaurant.name}</p>
            <p className="mt-2 text-sm text-muted">
              {restaurant.address}, {restaurant.city}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a className="text-fg underline-offset-4 hover:underline" href={`tel:+${restaurant.phoneWa}`}>
              {restaurant.phoneDisplay}
            </a>
            <a className="text-muted hover:text-fg" href={restaurant.mapsUrl} target="_blank" rel="noreferrer">
              Itinéraire
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
