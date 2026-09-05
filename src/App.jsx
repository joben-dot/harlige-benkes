import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
export const languageProfiles = {
  standard: {
    pizzaNames: {
      ossj: 'PEPPERONI, CHILI & HONUNG',
      gogg: 'GORGONZOLA & PÄRON',
      jord: 'POTATIS & VÄSTERBOTTEN',
      pilo: 'NDUJA & SVAMP',
    },
    places: { huskvarna: 'Huskvarna', jonkoping: 'Jönköping' },
    events: 'Evenemang', calendar: 'Kalender', contact: 'Kontakt',
    ingredients: 'Ingredienser', seeMenu: 'Se menyn', facebook: 'Facebook',
    cash: 'Kontant', payByCard: 'Betala med kort', live: 'Live',
  },
  benke: {
    pizzaNames: {
      ossj: 'OSSJ DEVON',
      gogg: 'EXPRÄ GOGGONZÅLA',
      jord: 'FJOCKLA JORDPÄRA',
      pilo: 'PILO SPÄZZIJAL',
    },
    places: { huskvarna: 'Huskvana', jonkoping: 'Jönnet' },
    events: 'Evänts', calendar: 'Kaländarium', contact: 'Kåntakt',
    ingredients: 'Tåppings', seeMenu: 'Se mänyn', facebook: 'Fäjjsbook',
    cash: 'Kåntanter', payByCard: 'betala mä kott', live: 'Lajv',
  },
};

export const activeLanguageProfile = 'standard';
export const language = languageProfiles[activeLanguageProfile];
export const pizzas = [
    { id: 'ossj', name: language.pizzaNames.ossj, price: 169, icon: '✿', image: 'pizza-1', archived: false, description: 'Klassikern som smakar gott hela vägen hem.', toppings: 'Tomat, fior di latte, pepperoni, picklad chili & honung' },
    { id: 'gogg', name: language.pizzaNames.gogg, price: 179, icon: '☮', image: 'pizza-2', archived: false, description: 'Krämig, smakrik och balanserad.', toppings: 'Gorgonzola, päron, valnöt, mozzarella & ruccola' },
    { id: 'jord', name: language.pizzaNames.jord, price: 175, icon: '♥', image: 'pizza-3', archived: false, description: 'Potatis på pizza? Självklart.', toppings: 'Potatis, rosmarin, västerbottensost & honungssås' },
    { id: 'pilo', name: language.pizzaNames.pilo, price: 189, icon: '★', image: 'pizza-4', archived: false, description: 'Benkes mest färgstarka skapelse.', toppings: 'Nduja, svamp, karamelliserad lök, parmesan & grönt' },
];
const events = [
    { day: '12', month: 'SEP', place: language.places.huskvarna, venue: 'Folkets park', time: '17:00–22:00' },
    { day: '19', month: 'SEP', place: language.places.jonkoping, venue: 'Munksjöstranden', time: '16:00–21:00' },
    { day: '27', month: 'SEP', place: 'Gränna', venue: 'Hamnen', time: '12:00–18:00' },
];
function Flower({ className = '' }) {
    return _jsxs("span", { className: `flower ${className}`, "aria-hidden": "true", children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("b", {})] });
}
function Header() {
    const [open, setOpen] = useState(false);
    const links = [['hem', 'HEM'], ['pizza', 'PIZZA'], ['events', language.events.toUpperCase()], ['kalendarium', language.calendar.toUpperCase()], ['socialt', 'SOCIALA MEDIER'], ['om', 'OM BENKE'], ['kontakt', language.contact.toUpperCase()]];
    return _jsxs("header", { className: "site-header", children: [_jsxs("a", { className: "mini-logo", href: "#hem", "aria-label": "H\u00E4rlige Benkes \u2013 hem", children: [_jsx("span", { children: "HB" }), _jsx("small", { children: "PIZZA" })] }), _jsxs("button", { className: "menu-toggle", onClick: () => setOpen(!open), "aria-expanded": open, "aria-controls": "main-nav", children: [_jsx("span", { className: "sr-only", children: "\u00D6ppna meny" }), _jsx("b", {}), _jsx("b", {}), _jsx("b", {})] }), _jsx("nav", { id: "main-nav", className: open ? 'open' : '', "aria-label": "Huvudmeny", children: links.map(([id, label]) => _jsx("a", { href: `#${id}`, onClick: () => setOpen(false), children: label }, id)) })] });
}
function TruckStatus() {
    return _jsxs("aside", { className: "truck-status", "aria-label": "Truckstatus", children: [_jsxs("div", { children: [_jsx("span", { children: "PLATS" }), _jsx("strong", { children: language.places.huskvarna.toUpperCase() })] }), _jsxs("div", { children: [_jsx("span", { children: "\u00D6PPET" }), _jsx("strong", { children: "17:00\u201322:00" })] }), _jsxs("div", { children: [_jsx("span", { children: "SLICES KVAR" }), _jsx("strong", { children: "37" })] })] });
}
function Hero() {
    return _jsxs("section", { className: "hero", id: "hem", children: [_jsx("div", { className: "sunburst", "aria-hidden": "true" }), _jsx(Flower, { className: "flower-one" }), _jsx(Flower, { className: "flower-two" }), _jsxs("div", { className: "hero-copy", children: [_jsx("p", { className: "eyebrow", children: "PIZZA DYGNET RUNT \u00B7 HUSKVARNA" }), _jsxs("h1", { children: [_jsx("span", { children: "H\u00C4RLIGE" }), " BENKES ", _jsx("em", { children: "PIZZA" })] }), _jsxs("p", { className: "tagline", children: ["PEACE ", _jsx("b", { children: "\u00B7" }), " PIZZA ", _jsx("b", { children: "\u00B7" }), " K\u00C4RLEK"] }), _jsxs("div", { className: "hero-actions", children: [_jsx("a", { className: "button pink", href: "#pizza", children: "BESTÄLL PIZZA!" }), _jsx("a", { className: "button yellow", href: "#kalendarium", children: "HITTA TRUCKEN" })] })] }), _jsxs("div", { className: "pizza-art", "aria-label": "Illustration av en glad pizza", children: [_jsxs("div", { className: "slice", children: [_jsx("span", { className: "pep p1" }), _jsx("span", { className: "pep p2" }), _jsx("span", { className: "mush", children: "\u2663" }), _jsx("span", { className: "face", children: "\u25C9 \u1D17 \u25C9" })] }), _jsxs("div", { className: "rat", "aria-hidden": "true", children: [_jsx("span", { className: "ear left" }), _jsx("span", { className: "ear right" }), _jsx("span", { className: "rat-face", children: "\u2022\u1D25\u2022" })] })] }), _jsxs("div", { className: "live", children: [_jsx("span", {}), " S\u00C4NDER LIVE ", _jsx("strong", { children: "MELLO LIVE JUST NU" })] }), _jsx(TruckStatus, {}), _jsx("div", { className: "ticker", children: _jsx("span", { children: "\u2726 TUNNA SLICES \u2726 STORA DR\u00D6MMAR \u2726 MYCKET KÄRLEK \u2726 TUNNA SLICES \u2726 STORA DR\u00D6MMAR \u2726" }) })] });
}
function PizzaMenu() {
    return _jsxs("section", { className: "section menu-section", id: "pizza", children: [_jsxs("div", { className: "section-heading", children: [_jsx("p", { children: "F\u00C4RSKT FR\u00C5N UGNEN" }), _jsxs("h2", { children: ["V\u00C5RA ", _jsx("span", { children: "PIZZOR" })] }), _jsx("p", { className: "intro", children: "Fyra fasta favoriter. Runda, frasiga och gjorda f\u00F6r att delas." })] }), _jsx("div", { className: "pizza-grid", children: pizzas.map((pizza, i) => _jsxs("article", { className: `pizza-card card-${i + 1}`, children: [_jsx("div", { className: "card-icon", "aria-hidden": "true", children: pizza.icon }), _jsxs("p", { className: "number", children: ["0", i + 1, " / BENKES ORIGINAL"] }), _jsx("h3", { children: pizza.name }), _jsx("p", { children: pizza.description }), _jsxs("p", { className: "toppings", children: [_jsx("strong", { children: `${language.ingredients.toUpperCase()}:` }), " ", pizza.toppings] }), _jsxs("div", { className: "price", children: [pizza.price, " ", _jsx("span", { children: "KRONOR" })] })] }, pizza.name)) }), _jsxs("div", { className: "weekly", children: [_jsxs("div", { children: [_jsx("p", { className: "sticker", children: "HEMLIGT RECEPT!" }), _jsxs("h3", { children: ["VECKANS", _jsx("br", {}), _jsx("span", { children: "PIZZA" })] })] }), _jsx("p", { children: "N\u00E5got nytt. N\u00E5got galet. F\u00F6lj oss s\u00E5 du inte missar det." }), _jsx("a", { className: "button dark", href: "#socialt", children: language.seeMenu.toUpperCase() })] })] });
}
function Events() {
    return _jsxs("section", { className: "section events-section", id: "events", children: [_jsxs("div", { className: "section-heading light", children: [_jsx("p", { children: "BENKE RULLAR UT" }), _jsxs("h2", { children: [`${language.events.toUpperCase()} & `, _jsx("span", { id: "kalendarium", children: language.calendar.toUpperCase() })] })] }), _jsx("div", { className: "event-list", children: events.map(event => _jsxs("article", { className: "event", children: [_jsxs("div", { className: "date", children: [_jsx("strong", { children: event.day }), _jsx("span", { children: event.month })] }), _jsxs("div", { children: [_jsx("span", { className: "demo", children: "DEMO-EVENEMANG" }), _jsx("h3", { children: event.place }), _jsxs("p", { children: [event.venue, " \u00B7 ", event.time] })] }), _jsx("span", { className: "event-arrow", "aria-hidden": "true", children: "\u2197" })] }, event.day)) }), _jsx("a", { className: "button yellow centered", href: "#kontakt", children: "SE ALLA EVENEMANG" })] });
}
function Social() {
    return _jsxs("section", { className: "section social-section", id: "socialt", children: [_jsx(Flower, { className: "social-flower" }), _jsxs("div", { className: "section-heading", children: [_jsx("p", { children: "DIREKT FR\u00C5N PIZZA-RYMDEN" }), _jsxs("h2", { children: ["F\u00D6LJ ", _jsx("span", { children: "GALENSKAPET" })] }), _jsx("p", { className: "intro", children: "Live, deg, d\u00E5liga sk\u00E4mt och dagens truckplats." })] }), _jsx("div", { className: "social-links", children: ['Instagram', 'TikTok', 'YouTube', language.facebook].map((name, i) => _jsxs("a", { href: "#socialt", onClick: e => e.preventDefault(), children: [_jsxs("span", { children: ["0", i + 1] }), name, _jsx("b", { children: "\u2197" })] }, name)) })] });
}
function Payment() {
    return _jsxs("section", { className: "payment section", "aria-labelledby": "payment-title", children: [_jsxs("div", { className: "payment-copy", children: [_jsx("p", { children: "BETALNING IN, PIZZA UT" }), _jsxs("h2", { id: "payment-title", children: ["HUR VILL DU", _jsx("br", {}), _jsx("span", { children: "BETALA?" })] }), _jsxs("ul", { children: [_jsx("li", { children: "BETALA MED SWISH" }), _jsx("li", { children: language.payByCard.toUpperCase() }), _jsx("li", { children: language.cash.toUpperCase() })] }), _jsx("small", { children: "Riktig betalning kopplas in senare. Kontant betalning sker vid luckan." })] }), _jsxs("div", { className: "qr-card", children: [_jsx("div", { className: "dummy", children: "DUMMY \u00B7 EJ BETALNING" }), _jsx("div", { className: "qr", "aria-label": "Dummy QR-placeholder", children: _jsxs("span", { children: ["BENKE", _jsx("br", {}), "DEMO"] }) }), _jsx("strong", { children: "SKANNA OCH BETALA" }), _jsx("p", { children: "Inte tillgängligt ännu." })] })] });
}
function About() {
    return _jsxs("section", { className: "section about", id: "om", children: [_jsx("div", { className: "about-art", children: _jsxs("div", { className: "mascot", children: [_jsx("span", { className: "ear left" }), _jsx("span", { className: "ear right" }), _jsx("div", { children: "\u2022 \u25E1 \u2022" }), _jsx("strong", { children: "BENKE" })] }) }), _jsxs("div", { children: [_jsx("p", { className: "kicker", children: "VEM \u00C4R BENKE?" }), _jsxs("h2", { children: ["OM ", _jsx("span", { children: "BENKE" })] }), _jsx("p", { className: "lead", children: "Tunna slices. Stora dr\u00F6mmar. Bra r\u00E5varor. Lokal galenskap." }), _jsx("p", { children: "Benke tror p\u00E5 peace, pizza och att en food truck kan g\u00F6ra Huskvarna lite godare. Inga konstigheter \u2014 bara l\u00E5ngj\u00E4st deg, rej\u00E4la smaker och en färgstark helhet." }), _jsx("blockquote", { children: "\u201CBra r\u00E5varor, god pizza och k\u00E4rlek till Huskvarna.\u201D" })] })] });
}
function Contact() {
    return _jsxs("section", { className: "section contact", id: "kontakt", children: [_jsxs("div", { children: [_jsx("p", { children: "SKRIK INTE \u2014 SKRIV" }), _jsx("h2", { children: language.contact.toUpperCase() }), _jsx("p", { children: "Boka trucken, fr\u00E5ga om ingredienser eller f\u00F6resl\u00E5 ett samarbete." })] }), _jsx("a", { className: "button pink", href: "mailto:hej@harligebenkes.se", children: "HEJ@HARLIGEBENKES.SE" })] });
}
export default function App() {
    return _jsxs(_Fragment, { children: [_jsx("a", { className: "skip-link", href: "#main", children: "Hoppa till inneh\u00E5llet" }), _jsx(Header, {}), _jsxs("main", { id: "main", children: [_jsx(Hero, {}), _jsx(PizzaMenu, {}), _jsx(Events, {}), _jsx(Social, {}), _jsx(Payment, {}), _jsx(About, {}), _jsx(Contact, {})] }), _jsxs("footer", { children: [_jsxs("div", { className: "footer-logo", children: ["H\u00C4RLIGE BENKES ", _jsx("span", { children: "PIZZA" })] }), _jsx("p", { children: "PEACE \u00B7 PIZZA \u00B7 K\u00C4RLEK" }), _jsx("p", { children: "\u00A9 2026 \u00B7 GJORT MED \u2665 I HUSKVARNA" })] })] });
}
