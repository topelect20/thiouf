export const restaurant = {
  name: "THIOUF",
  place: "Nguékhokh",
  region: "Petite Côte",
  address: "Route de la Petite Côte",
  city: "Nguékhokh, Mbour",
  phoneDisplay: "+221 77 555 01 90",
  phoneWa: "221775550190",
  mapsUrl: "https://maps.google.com/?q=Nguékhokh+Sénégal",
};

export type Course = "Feu" | "Marmite" | "À partager" | "Verres";

export type Dish = {
  name: string;
  detail: string;
  price: number;
  course: Course;
  mark?: string;
};

export const courses: Course[] = ["Feu", "Marmite", "À partager", "Verres"];

export const dishes: Dish[] = [
  {
    name: "Thiouf entier braisé",
    detail: "Poisson du jour, feu de bois, citron, oignon et piment.",
    price: 12500,
    course: "Feu",
    mark: "Signature",
  },
  {
    name: "Demi thiouf",
    detail: "La même braise, pour une faim plus courte.",
    price: 7500,
    course: "Feu",
  },
  {
    name: "Crevettes flambées",
    detail: "Citron vert, ail, piment et un trait d’huile rouge.",
    price: 9000,
    course: "Feu",
  },
  {
    name: "Brochettes de lotte",
    detail: "Trois pièces, marinade au gingembre.",
    price: 6500,
    course: "Feu",
  },
  {
    name: "Capitaine fumé",
    detail: "Fumage du matin, servi tiède avec citron.",
    price: 8000,
    course: "Feu",
  },
  {
    name: "Thieboudienne rouge",
    detail: "Riz brisé, poisson, légumes du marché de Mbour.",
    price: 4500,
    course: "Marmite",
    mark: "Maison",
  },
  {
    name: "Yassa poulet",
    detail: "Oignons confits, citron, olives.",
    price: 5000,
    course: "Marmite",
  },
  {
    name: "Mafé de poisson",
    detail: "Sauce arachide, douce, un peu longue.",
    price: 5500,
    course: "Marmite",
  },
  {
    name: "Soupe kandia",
    detail: "Gombo, poisson fumé, riz à part.",
    price: 4000,
    course: "Marmite",
  },
  {
    name: "Pastels de poisson",
    detail: "Quatre beignets, sauce oignon-piment.",
    price: 2000,
    course: "À partager",
  },
  {
    name: "Accras",
    detail: "Morue, piment, à manger debout.",
    price: 1800,
    course: "À partager",
  },
  {
    name: "Salade mangue & avocat",
    detail: "Citron vert, menthe, sel de mer.",
    price: 3500,
    course: "À partager",
  },
  {
    name: "Alloco pimenté",
    detail: "Banane plantain, piment frais.",
    price: 2200,
    course: "À partager",
  },
  { name: "Bissap", detail: "Hibiscus, peu sucré.", price: 1000, course: "Verres" },
  { name: "Bouye", detail: "Jus de pain de singe.", price: 1000, course: "Verres" },
  { name: "Gingembre", detail: "Pressé, vif.", price: 1000, course: "Verres" },
  { name: "Café Touba", detail: "Poivre de Guinée.", price: 800, course: "Verres" },
  { name: "Attaya", detail: "Trois tours, si la table reste.", price: 500, course: "Verres" },
  { name: "Gazelle", detail: "Bière locale, 33 cl.", price: 1500, course: "Verres" },
];

export function formatPrice(n: number) {
  return `${n.toLocaleString("fr-FR")} F`;
}

export const hours = [
  { day: "Mardi — Jeudi", time: "12h–15h · 19h–23h" },
  { day: "Vendredi — Dimanche", time: "12h–23h, service continu" },
  { day: "Lundi", time: "Fermé — le feu se repose" },
];
