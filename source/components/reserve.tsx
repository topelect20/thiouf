import { useState, type FormEvent } from "react";
import { restaurant } from "@/data/menu";

type Fields = {
  name: string;
  phone: string;
  date: string;
  time: string;
  covers: string;
  note: string;
};

const empty: Fields = { name: "", phone: "", date: "", time: "20:00", covers: "2", note: "" };

export function Reserve() {
  const [fields, setFields] = useState<Fields>(empty);
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (fields.name.trim().length < 2) {
      setError("Indiquez un nom.");
      return;
    }
    if (fields.phone.trim().length < 8) {
      setError("Indiquez un numéro joignable.");
      return;
    }
    if (!fields.date) {
      setError("Choisissez une date.");
      return;
    }
    const covers = Number(fields.covers);
    if (!Number.isFinite(covers) || covers < 1 || covers > 16) {
      setError("Entre 1 et 16 couverts.");
      return;
    }

    const text = [
      `Réservation THIOUF`,
      `Nom : ${fields.name.trim()}`,
      `Tél : ${fields.phone.trim()}`,
      `Date : ${fields.date}`,
      `Heure : ${fields.time}`,
      `Couverts : ${covers}`,
      fields.note.trim() ? `Note : ${fields.note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const key = "thiouf-reservations";
    const prev = JSON.parse(localStorage.getItem(key) || "[]") as string[];
    prev.unshift(`${new Date().toISOString()} — ${fields.name.trim()} · ${fields.date} ${fields.time}`);
    localStorage.setItem(key, JSON.stringify(prev.slice(0, 12)));

    setSent(`${fields.name.trim()}, la demande est prête pour le ${fields.date} à ${fields.time}.`);
    window.open(`https://wa.me/${restaurant.phoneWa}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="reserver" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <p className="text-sm tracking-widest text-primary uppercase">La table</p>
          <h2 className="mt-2 font-display text-5xl leading-none md:text-6xl">Réserver</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Le soir, le feu part vers 19h. Écrivez-nous : la demande part sur WhatsApp du restaurant, on confirme dans l’heure aux heures d’ouverture.
          </p>
          <img
            src="/images/terrasse.jpg"
            alt="Terrasse ouverte de THIOUF à la tombée du jour, tables basses et lanternes"
            className="mt-8 aspect-video w-full object-cover"
          />
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 bg-surface p-5 md:p-8">
          <label className="flex flex-col gap-2 text-sm text-muted">
            Nom
            <input
              value={fields.name}
              onChange={(e) => set("name", e.target.value)}
              autoComplete="name"
              className="h-12 border border-line bg-bg px-3 text-base text-fg outline-none focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            Téléphone
            <input
              value={fields.phone}
              onChange={(e) => set("phone", e.target.value)}
              inputMode="tel"
              autoComplete="tel"
              placeholder="77 …"
              className="h-12 border border-line bg-bg px-3 text-base text-fg outline-none focus:border-primary"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-sm text-muted">
              Date
              <input
                type="date"
                value={fields.date}
                onChange={(e) => set("date", e.target.value)}
                className="h-12 border border-line bg-bg px-3 text-base text-fg outline-none focus:border-primary"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-muted">
              Heure
              <input
                type="time"
                value={fields.time}
                onChange={(e) => set("time", e.target.value)}
                className="h-12 border border-line bg-bg px-3 text-base text-fg outline-none focus:border-primary"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm text-muted">
            Couverts
            <input
              type="number"
              min={1}
              max={16}
              value={fields.covers}
              onChange={(e) => set("covers", e.target.value)}
              className="h-12 border border-line bg-bg px-3 text-base text-fg outline-none focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            Note
            <textarea
              value={fields.note}
              onChange={(e) => set("note", e.target.value)}
              rows={3}
              placeholder="Anniversaire, sans piment, terrasse…"
              className="border border-line bg-bg px-3 py-3 text-base text-fg outline-none focus:border-primary"
            />
          </label>
          {error ? <p className="text-sm text-primary">{error}</p> : null}
          {sent ? <p className="text-sm text-fg">{sent}</p> : null}
          <button type="submit" className="mt-2 h-12 bg-primary text-base font-medium text-primary-ink">
            Envoyer sur WhatsApp
          </button>
          <p className="text-sm text-muted">Ligne du restaurant : {restaurant.phoneDisplay}</p>
        </form>
      </div>
    </section>
  );
}
