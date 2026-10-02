const dishes = [
  ["Thiouf entier braisé", "Poisson du jour, feu de bois, citron, oignon et piment.", 12500, "Feu", "Signature"],
  ["Demi thiouf", "La même braise, pour une faim plus courte.", 7500, "Feu"],
  ["Crevettes flambées", "Citron vert, ail, piment et un trait d’huile rouge.", 9000, "Feu"],
  ["Brochettes de lotte", "Trois pièces, marinade au gingembre.", 6500, "Feu"],
  ["Capitaine fumé", "Fumage du matin, servi tiède avec citron.", 8000, "Feu"],
  ["Thieboudienne rouge", "Riz brisé, poisson, légumes du marché de Mbour.", 4500, "Marmite", "Maison"],
  ["Yassa poulet", "Oignons confits, citron, olives.", 5000, "Marmite"],
  ["Mafé de poisson", "Sauce arachide, douce, un peu longue.", 5500, "Marmite"],
  ["Soupe kandia", "Gombo, poisson fumé, riz à part.", 4000, "Marmite"],
  ["Pastels de poisson", "Quatre beignets, sauce oignon-piment.", 2000, "À partager"],
  ["Accras", "Morue, piment, à manger debout.", 1800, "À partager"],
  ["Salade mangue & avocat", "Citron vert, menthe, sel de mer.", 3500, "À partager"],
  ["Alloco pimenté", "Banane plantain, piment frais.", 2200, "À partager"],
  ["Bissap", "Hibiscus, peu sucré.", 1000, "Verres"],
  ["Bouye", "Jus de pain de singe.", 1000, "Verres"],
  ["Gingembre", "Pressé, vif.", 1000, "Verres"],
  ["Café Touba", "Poivre de Guinée.", 800, "Verres"],
  ["Attaya", "Trois tours, si la table reste.", 500, "Verres"],
  ["Gazelle", "Bière locale, 33 cl.", 1500, "Verres"],
];

const courses = ["Feu", "Marmite", "À partager", "Verres"];
const filters = document.querySelector("#filters");
const board = document.querySelector("#board");
let current = "Tout";

function price(n) {
  return `${n.toLocaleString("fr-FR")} F`;
}

function render() {
  const groups = current === "Tout" ? courses : [current];
  board.innerHTML = groups
    .map((course) => {
      const items = dishes.filter((d) => d[3] === course);
      if (!items.length) return "";
      return `<div><h3>${course}</h3>${items
        .map(
          (d) => `<article class="dish"><div class="top"><b>${d[0]}${
            d[4] ? `<span class="mark">${d[4]}</span>` : ""
          }</b><span class="price">${price(d[2])}</span></div><p>${d[1]}</p></article>`,
        )
        .join("")}</div>`;
    })
    .join("");
}

["Tout", ...courses].forEach((name) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = name;
  b.className = name === current ? "on" : "";
  b.addEventListener("click", () => {
    current = name;
    [...filters.children].forEach((el) => el.classList.toggle("on", el.textContent === name));
    render();
  });
  filters.append(b);
});
render();

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const date = String(data.get("date") || "");
  const time = String(data.get("time") || "");
  const covers = Number(data.get("covers"));
  const note = String(data.get("note") || "").trim();
  const err = document.querySelector("#err");
  const ok = document.querySelector("#ok");
  err.hidden = true;
  if (name.length < 2) return show("Indiquez un nom.");
  if (phone.length < 8) return show("Indiquez un numéro joignable.");
  if (!date) return show("Choisissez une date.");
  if (!Number.isFinite(covers) || covers < 1 || covers > 16) return show("Entre 1 et 16 couverts.");
  const text = [
    "Réservation THIOUF",
    `Nom : ${name}`,
    `Tél : ${phone}`,
    `Date : ${date}`,
    `Heure : ${time}`,
    `Couverts : ${covers}`,
    note ? `Note : ${note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  ok.hidden = false;
  ok.textContent = `${name}, la demande est prête pour le ${date} à ${time}.`;
  window.open(`https://wa.me/221775550190?text=${encodeURIComponent(text)}`, "_blank", "noopener");

  function show(message) {
    err.hidden = false;
    err.textContent = message;
  }
});
