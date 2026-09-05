import { useState } from 'react'

const pizzas = [
  { name: 'OSSJ DEVON', price: 169, icon: '✿', description: 'Klassikern som svänger hela vägen hem.', toppings: 'Tomat, fior di latte, pepperoni, picklad chili & honung' },
  { name: 'EXPRÄ GOGGONZÅLA', price: 179, icon: '☮', description: 'Krämig, kaxig och fullständigt övestyv.', toppings: 'Gorgonzola, päron, valnöt, mozzarella & ruccola' },
  { name: 'GOJIG JORDPÄRA', price: 175, icon: '♥', description: 'Potatis på pizza? Självklart.', toppings: 'Jordpära, rosmarin, västerbottensost & joning-sås' },
  { name: 'PILO SPÄZZIJAL', price: 189, icon: '★', description: 'Benkes mest psykedeliska skapelse.', toppings: 'Nduja, svamp, karamelliserad lök, parmesan & grönt goj' },
]

const events = [
  { day: '12', month: 'SEP', place: 'Huskvana', venue: 'Folkets park', time: '17:00–22:00' },
  { day: '19', month: 'SEP', place: 'i Jönkan', venue: 'Munksjöstranden', time: '16:00–21:00' },
  { day: '27', month: 'SEP', place: 'Gränna', venue: 'Hamnen', time: '12:00–18:00' },
]

function Flower({ className = '' }) {
  return <span className={`flower ${className}`} aria-hidden="true"><i /><i /><i /><i /><i /><b /></span>
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [['hem', 'HEM'], ['pizza', 'PIZZA'], ['events', 'EVÄNTS'], ['kalendarium', 'KALÄNDARIUM'], ['socialt', 'SÅSSIALA KANALER'], ['om', 'OM BENKE'], ['kontakt', 'KÅNTAKT']]
  return <header className="site-header">
    <a className="mini-logo" href="#hem" aria-label="Härlige Benkes – hem"><span>HB</span><small>PIZZA</small></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav">
      <span className="sr-only">Öppna meny</span><b /><b /><b />
    </button>
    <nav id="main-nav" className={open ? 'open' : ''} aria-label="Huvudmeny">
      {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
  </header>
}

function TruckStatus() {
  return <aside className="truck-status" aria-label="Truckstatus">
    <div><span>PLATS</span><strong>HUSKVANA</strong></div>
    <div><span>ÖPPET</span><strong>17:00–22:00</strong></div>
    <div><span>SLICES KVAR</span><strong>37</strong></div>
  </aside>
}

function Hero() {
  return <section className="hero" id="hem">
    <div className="sunburst" aria-hidden="true" />
    <Flower className="flower-one" /><Flower className="flower-two" />
    <div className="hero-copy">
      <p className="eyebrow">PIZZA AROUND THE CLOCK · HUSKVANA</p>
      <h1><span>HÄRLIGE</span> BENKES <em>PIZZA</em></h1>
      <p className="tagline">PEACE <b>·</b> PIZZA <b>·</b> LOVER</p>
      <div className="hero-actions"><a className="button pink" href="#pizza">GET PIZZA!</a><a className="button yellow" href="#kalendarium">FIND THE TRUCK</a></div>
    </div>
    <div className="pizza-art" aria-label="Illustration av en glad pizza">
      <div className="slice"><span className="pep p1" /><span className="pep p2" /><span className="mush">♣</span><span className="face">◉ ᴗ ◉</span></div>
      <div className="rat" aria-hidden="true"><span className="ear left"/><span className="ear right"/><span className="rat-face">•ᴥ•</span></div>
    </div>
    <div className="live"><span /> SÄNDER LAJV <strong>MELLO LAJV JUST NU</strong></div>
    <TruckStatus />
    <div className="ticker"><span>✦ TUNNA SLICES ✦ STORA DRÖMMAR ✦ MYCKET LOVER ✦ TUNNA SLICES ✦ STORA DRÖMMAR ✦</span></div>
  </section>
}

function PizzaMenu() {
  return <section className="section menu-section" id="pizza">
    <div className="section-heading"><p>FÄRSKT FRÅN UGNEN</p><h2>VÅRA <span>PIZZOR</span></h2><p className="intro">Fyra fasta favoriter. Runda, frasiga och gjorda för att muchas.</p></div>
    <div className="pizza-grid">{pizzas.map((pizza, i) => <article className={`pizza-card card-${i + 1}`} key={pizza.name}>
      <div className="card-icon" aria-hidden="true">{pizza.icon}</div><p className="number">0{i + 1} / BENKES ORIGINAL</p>
      <h3>{pizza.name}</h3><p>{pizza.description}</p><p className="toppings"><strong>TÅPPINGS:</strong> {pizza.toppings}</p><div className="price">{pizza.price} <span>LOVER</span></div>
    </article>)}</div>
    <div className="weekly"><div><p className="sticker">HEMLIGT GOJ!</p><h3>VECKANS<br/><span>PIZZA</span></h3></div><p>Något nytt. Något galet. Följ oss så du inte missar'et.</p><a className="button dark" href="#socialt">SE MÄNYN</a></div>
  </section>
}

function Events() {
  return <section className="section events-section" id="events">
    <div className="section-heading light"><p>BENKE RULLAR UT</p><h2>EVÄNTS & <span id="kalendarium">KALÄNDARIUM</span></h2></div>
    <div className="event-list">{events.map(event => <article className="event" key={event.day}>
      <div className="date"><strong>{event.day}</strong><span>{event.month}</span></div><div><span className="demo">DEMO-EVÄNT</span><h3>{event.place}</h3><p>{event.venue} · {event.time}</p></div><span className="event-arrow" aria-hidden="true">↗</span>
    </article>)}</div><a className="button yellow centered" href="#kontakt">SE ALLA EVÄNTS</a>
  </section>
}

function Social() {
  return <section className="section social-section" id="socialt"><Flower className="social-flower" />
    <div className="section-heading"><p>DIREKT FRÅN PIZZA-RYMDEN</p><h2>FÖLJ <span>GALENSKAPET</span></h2><p className="intro">Lajv, deg, dåliga skämt och dagens truckplats.</p></div>
    <div className="social-links">{['Instagram', 'TikTok', 'YouTube', 'Fäjsbook'].map((name, i) => <a href="#socialt" onClick={e => e.preventDefault()} key={name}><span>0{i+1}</span>{name}<b>↗</b></a>)}</div>
  </section>
}

function Payment() {
  return <section className="payment section" aria-labelledby="payment-title"><div className="payment-copy"><p>LOVER IN, PIZZA UT</p><h2 id="payment-title">HUR VILL DU<br/><span>BETALA?</span></h2>
    <ul><li>SWISHA LOVER</li><li>BETALA MÄ KOTT</li><li>KÅNTANTER</li></ul><small>Riktig betalning kopplas in senare. Bössan på disken är märkt KÅNTANTER.</small></div>
    <div className="qr-card"><div className="dummy">DUMMY · EJ BETALNING</div><div className="qr" aria-label="Dummy QR-placeholder"><span>BENKE<br/>DEMO</span></div><strong>SKANNA Å BETALA</strong><p>Inte än, kompis!</p></div>
  </section>
}

function About() {
  return <section className="section about" id="om"><div className="about-art"><div className="mascot"><span className="ear left"/><span className="ear right"/><div>• ◡ •</div><strong>BENKE</strong></div></div>
    <div><p className="kicker">VEM ÄR KARLN?</p><h2>OM <span>BENKE</span></h2><p className="lead">Tunna slices. Stora drömmar. Bra råvaror. Lokal galenskap.</p><p>Benke tror på peace, pizza och att en food truck kan göra Huskvana lite godare. Inga konstigheter — bara långjäst deg, rejäla smaker och precis lagom mycket psykedeliskt goj.</p><blockquote>“Biologiska muchar å gojjer får 10 procent kassarabatt. Spara byst med lover.”</blockquote></div>
  </section>
}

function Contact() {
  return <section className="section contact" id="kontakt"><div><p>SKRIK INTE — SKRIV</p><h2>KÅNTAKT</h2><p>Boka trucken, fråga om tåppings eller föreslå ett samarbete.</p></div><a className="button pink" href="mailto:hej@harligebenkes.se">HEJ@HARLIGEBENKES.SE</a></section>
}

export default function App() {
  return <><a className="skip-link" href="#main">Hoppa till innehållet</a><Header /><main id="main"><Hero /><PizzaMenu /><Events /><Social /><Payment /><About /><Contact /></main><footer><div className="footer-logo">HÄRLIGE BENKES <span>PIZZA</span></div><p>PEACE · PIZZA · LOVER</p><p>© 2026 · GJORT MED ♥ I HUSKVANA</p></footer></>
}
