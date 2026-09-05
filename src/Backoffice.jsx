import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';

const areas = ['DAGENS MENY', 'PIZZABIBLIOTEK', 'TRUCKSTATUS', 'FRÅN LUCKAN', 'BESTÄLLNINGAR', 'SÄNDER LAJV'];
const statuses = ['TILLGÄNGLIG', 'NÄSTAN SLUT', 'SLUTSÅLD'];

function Picture({ pizza, onImage, camera = false }) {
  const load = event => {
    const file = event.target.files?.[0];
    if (file) onImage?.(URL.createObjectURL(file));
  };
  return _jsxs('div', { className: `bo-picture ${pizza.image?.startsWith('blob:') ? '' : pizza.image}`, style: pizza.image?.startsWith('blob:') ? { backgroundImage: `url(${pizza.image})` } : {}, children: [
    _jsx('span', { children: pizza.icon || '🍕' }),
    onImage && _jsxs('div', { className: 'photo-actions', children: [
      _jsx('button', { type: 'button', onClick: event => event.currentTarget.nextElementSibling.click(), children: camera ? 'TA BILD' : 'BYT BILD' }),
      _jsx('input', { type: 'file', accept: 'image/*', capture: camera ? 'environment' : undefined, onChange: load, className: 'sr-only' })
    ] })
  ] });
}

function LibraryCard({ pizza, selected, toggle, update }) {
  return _jsxs('article', { className: `bo-pizza ${selected ? 'selected' : ''} ${pizza.archived ? 'archived' : ''}`, children: [
    _jsx(Picture, { pizza, onImage: image => update({ image }) }),
    _jsx('p', { className: 'ingredients', children: pizza.toppings }),
    _jsxs('div', { className: 'bo-card-copy', children: [
      _jsx('h3', { children: pizza.name }), _jsx('p', { children: pizza.description }),
      _jsxs('strong', { children: [pizza.price, ' KR'] }),
      _jsx('button', { className: `select-button ${selected ? 'remove' : ''}`, onClick: toggle, disabled: pizza.archived, 'aria-pressed': selected, children: pizza.archived ? 'ARKIVERAD' : selected ? '✓ PÅ DAGENS MENY · TA BORT' : '+ LÄGG PÅ DAGENS MENY' }),
      _jsx('button', { className: 'text-button', onClick: () => update({ archived: !pizza.archived }), children: pizza.archived ? 'AKTIVERA' : 'ARKIVERA' })
    ] })
  ] });
}

function NewPizza({ close, save }) {
  const [draft, setDraft] = useState({ name: '', toppings: '', description: '', price: 169, image: 'pizza-new', icon: '🍕', archived: false });
  const field = key => event => setDraft({ ...draft, [key]: event.target.value });
  return _jsxs('form', { className: 'pizza-editor', onSubmit: event => { event.preventDefault(); save({ ...draft, id: `pizza-${Date.now()}` }); }, children: [
    _jsxs('div', { className: 'editor-title', children: [_jsx('h2', { children: 'NY PIZZA' }), _jsx('button', { type: 'button', onClick: close, 'aria-label': 'Stäng', children: '×' })] }),
    _jsx(Picture, { pizza: draft, onImage: image => setDraft({ ...draft, image }), camera: true }),
    _jsxs('label', { children: ['NAMN', _jsx('input', { required: true, value: draft.name, onChange: field('name'), placeholder: 'BENKES NYA...' })] }),
    _jsxs('label', { children: ['INGREDIENSER', _jsx('textarea', { required: true, value: draft.toppings, onChange: field('toppings'), placeholder: 'Tomat, ost...' })] }),
    _jsxs('label', { children: ['KORT BESKRIVNING', _jsx('textarea', { value: draft.description, onChange: field('description') })] }),
    _jsxs('label', { children: ['STANDARDPRIS (KR)', _jsx('input', { required: true, type: 'number', min: '0', value: draft.price, onChange: field('price') })] }),
    _jsx('button', { className: 'bo-primary', children: 'SPARA PIZZA' })
  ] });
}

function DailyMenu({ pizzas, menu, setMenu }) {
  const update = (id, patch) => setMenu(menu.map(item => item.id === id ? { ...item, ...patch } : item));
  return _jsxs('section', { children: [
    _jsxs('div', { className: 'bo-section-title', children: [_jsx('span', { children: '01' }), _jsxs('div', { children: [_jsx('h2', { children: 'DAGENS MENY' }), _jsx('p', { children: 'Tryck på status eller dagens pizza. Ändras direkt.' })] })] }),
    menu.length === 0 && _jsx('p', { className: 'empty', children: 'Ingen pizza vald. Lägg till en från pizzabiblioteket.' }),
    _jsx('div', { className: 'daily-list', children: menu.map(item => { const pizza = pizzas.find(p => p.id === item.id); return pizza && _jsxs('article', { className: `daily-card ${item.featured ? 'featured' : ''}`, children: [
      _jsx(Picture, { pizza }), _jsxs('div', { children: [_jsx('h3', { children: pizza.name }), _jsx('p', { className: 'ingredients', children: pizza.toppings }),
      _jsxs('label', { className: 'daily-price', children: ['DAGENS PRIS ', _jsx('input', { type: 'number', value: item.price, onChange: e => update(item.id, { price: Number(e.target.value) }) }), ' KR'] }),
      _jsx('div', { className: 'status-row', children: statuses.map(status => _jsx('button', { className: item.status === status ? 'active' : '', onClick: () => update(item.id, { status }), children: status }, status)) }),
      _jsx('button', { className: `featured-button ${item.featured ? 'active' : ''}`, onClick: () => setMenu(menu.map(x => ({ ...x, featured: x.id === item.id ? !x.featured : false }))), children: item.featured ? '★ DAGENS PIZZA' : '☆ GÖR TILL DAGENS PIZZA' })] })
    ] }, item.id); }) })
  ] });
}

function Truck() {
  const [open, setOpen] = useState(true); const [checked, setChecked] = useState(false);
  return _jsxs('section', { children: [_jsx('h2', { children: 'TRUCKSTATUS' }), _jsxs('div', { className: 'truck-panel', children: [
    _jsxs('div', { children: [_jsx('small', { children: 'AKTUELL PLATS' }), _jsx('strong', { children: checked ? 'MUNKSJÖSTRANDEN, JÖNKÖPING' : 'FOLKETS PARK, HUSKVANA' }), _jsx('p', { children: checked ? 'Senast incheckad · precis nu' : 'Senast incheckad · idag 16:42' })] }),
    _jsxs('button', { className: `open-toggle ${open ? 'is-open' : ''}`, onClick: () => setOpen(!open), children: [open ? 'ÖPPET' : 'STÄNGT', _jsx('small', { children: open ? 'TILL 22:00' : 'TRYCK FÖR ATT ÖPPNA' })] }),
    _jsx('button', { className: 'bo-primary checkin', onClick: () => setChecked(true), children: checked ? '✓ PLATS MOCK-PUBLICERAD' : '⌖ CHECKA IN TRUCKEN HÄR' }),
    _jsx('p', { className: 'hint', children: 'PROTOTYP: En framtida GPS-position hämtas bara vid trycket. Ingen livespårning.' })
  ] })] });
}

function Feed() {
  const [text, setText] = useState(''); const [posts, setPosts] = useState([{ id: 1, time: '17:08', text: 'Dagen börjar toppen, dagens pizza flyger ut genom luckan och jag har skickat bud efter mer nduja.' }]);
  return _jsxs('section', { children: [_jsx('h2', { children: 'FRÅN LUCKAN' }), _jsxs('form', { className: 'feed-form', onSubmit: e => { e.preventDefault(); if (text.trim()) { setPosts([{ id: Date.now(), time: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }), text }, ...posts]); setText(''); } }, children: [_jsxs('label', { children: ['Vad händer i trucken?', _jsx('textarea', { value: text, onChange: e => setText(e.target.value), placeholder: 'Skriv en snabb uppdatering...' })] }), _jsx('button', { className: 'bo-primary', children: 'PUBLICERA' })] }),
    _jsx('div', { className: 'feed', children: posts.map(post => _jsxs('article', { children: [_jsx('time', { children: `IDAG · ${post.time}` }), _jsx('p', { children: post.text })] }, post.id)) })] });
}

function Orders({ pizzas, menu }) {
  const [customer, setCustomer] = useState(false); const [cart, setCart] = useState({}); const [payment, setPayment] = useState(''); const [ordered, setOrdered] = useState(false);
  const total = menu.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);
  if (customer) return _jsxs('section', { className: 'customer-flow', children: [_jsx('button', { className: 'text-button', onClick: () => { setCustomer(false); setOrdered(false); }, children: '← KÖKSVY' }), _jsx('h2', { children: ordered ? 'ORDER #A145' : 'BESTÄLL PIZZA' }), ordered ? _jsxs('div', { className: 'confirmation', children: [_jsx('b', { children: '✓ BESTÄLLNING MOTTAGEN' }), _jsx('p', { children: payment === 'KONTANT' ? 'BETALAS VID LUCKAN' : `${payment} · BETALD (MOCK)` }), _jsx('button', { className: 'bo-primary', onClick: () => { setOrdered(false); setCart({}); setPayment(''); }, children: 'NY BESTÄLLNING' })] }) : _jsxs('div', { children: [
    _jsx('div', { className: 'order-menu', children: menu.map(item => { const pizza = pizzas.find(p => p.id === item.id); return pizza && _jsxs('article', { children: [_jsx(Picture, { pizza }), _jsxs('div', { children: [_jsx('h3', { children: pizza.name }), _jsx('p', { children: pizza.toppings }), _jsxs('strong', { children: [item.price, ' KR'] })] }), _jsxs('div', { className: 'quantity', children: [_jsx('button', { onClick: () => setCart({ ...cart, [item.id]: Math.max(0, (cart[item.id] || 0) - 1) }), children: '−' }), _jsx('b', { children: cart[item.id] || 0 }), _jsx('button', { onClick: () => setCart({ ...cart, [item.id]: (cart[item.id] || 0) + 1 }), children: '+' })] })] }, item.id); }) }),
    _jsxs('div', { className: 'cart', children: [_jsx('h3', { children: 'DIN VARUKORG' }), _jsxs('strong', { children: ['TOTALT ', total, ' KR'] }), _jsx('div', { className: 'payments', children: ['SWISH', 'KORT', 'APPLE PAY', 'GOOGLE PAY', 'BITCOIN / LIGHTNING', 'KONTANT'].map(p => _jsx('button', { className: payment === p ? 'active' : '', onClick: () => setPayment(p), children: p }, p)) }), payment === 'KONTANT' && _jsx('p', { children: 'BETALAS VID LUCKAN' }), _jsx('button', { className: 'bo-primary', disabled: !total || !payment, onClick: () => setOrdered(true), children: 'BEKRÄFTA ORDER' })] })
  ] })] });
  return _jsxs('section', { children: [_jsx('h2', { children: 'BESTÄLLNINGAR' }), _jsx('button', { className: 'bo-primary', onClick: () => setCustomer(true), children: 'ÖPPNA QR-KUNDVY →' }), _jsxs('div', { className: 'kitchen', children: [_jsxs('article', { children: [_jsx('h3', { children: '#A143' }), _jsx('p', { children: '2 × OSSJ DEVON' }), _jsx('p', { children: '1 × PILO SPÄZZIJAL' }), _jsx('b', { children: 'SWISH · BETALD' })] }), _jsxs('article', { children: [_jsx('h3', { children: '#A144' }), _jsx('p', { children: '1 × GOJIG JORDPÄRA' }), _jsx('b', { children: 'KONTANT · BETALAS VID LUCKAN' })] })] })] });
}

function Live() {
  const [live, setLive] = useState(false); const [title, setTitle] = useState('MELLO LAJV JUST NU'); const [chat, setChat] = useState(['pizza_lover: Ser gott ut!']); const [message, setMessage] = useState('');
  const chatMessages = Array.isArray(chat) ? chat : [];
  return _jsxs('section', { children: [_jsx('h2', { children: 'SÄNDER LAJV' }), _jsxs('div', { className: 'live-grid', children: [_jsxs('div', { className: 'live-controls', children: [_jsx('div', { className: `live-preview ${live ? 'on' : ''}`, children: live ? '● LAJV · KAMERAPREVIEW' : 'KAMERA AV' }), _jsxs('label', { children: ['TITEL', _jsx('input', { value: title, onChange: e => setTitle(e.target.value) })] }), _jsxs('div', { className: 'device-row', children: [_jsx('button', { children: '📷 KAMERA' }), _jsx('button', { children: '🎙 MIKROFON' })] }), _jsx('button', { className: `bo-primary ${live ? 'stop' : ''}`, onClick: () => setLive(!live), children: live ? 'STOPPA LAJV' : 'STARTA LAJV' })] }), _jsxs('div', { className: 'public-live', children: [_jsxs('b', { children: [live ? '● SÄNDER LAJV' : '○ OFFLINE', ' · ', live ? '23 TITTARE' : '0 TITTARE'] }), _jsx('h3', { children: title }), _jsx('div', { className: 'chat', children: chatMessages.map((x, i) => _jsx('p', { children: x }, i)) }), _jsxs('form', { onSubmit: e => { e.preventDefault(); if (message) { setChat(previous => [...(Array.isArray(previous) ? previous : []), `du: ${message}`]); setMessage(''); } }, children: [_jsx('input', { value: message, onChange: e => setMessage(e.target.value), placeholder: 'Skriv i chatten' }), _jsx('button', { children: 'SKICKA' })] })] })] }), _jsx('p', { className: 'hint', children: 'MOCK: Video och chatt kopplas senare till en etablerad streamingplattform.' })] });
}

export default function Backoffice({ initialPizzas }) {
  const pizzaSeed = Array.isArray(initialPizzas) ? initialPizzas : [];
  const [active, setActive] = useState('DAGENS MENY'); const [pizzas, setPizzas] = useState(pizzaSeed); const [menu, setMenu] = useState(() => pizzaSeed.slice(0, 3).map((p, i) => ({ id: p.id, price: p.price, status: 'TILLGÄNGLIG', featured: i === 0 }))); const [editor, setEditor] = useState(false);
  const toggle = id => setMenu(menu.some(x => x.id === id) ? menu.filter(x => x.id !== id) : [...menu, { id, price: pizzas.find(p => p.id === id).price, status: 'TILLGÄNGLIG', featured: false }]);
  const content = active === 'DAGENS MENY' ? _jsx(DailyMenu, { pizzas, menu, setMenu }) : active === 'PIZZABIBLIOTEK' ? _jsxs('section', { children: [_jsxs('div', { className: 'bo-section-title', children: [_jsx('span', { children: '02' }), _jsxs('div', { children: [_jsx('h2', { children: 'PIZZABIBLIOTEK' }), _jsx('p', { children: 'Ett tryck väljer eller väljer bort från dagens meny.' })] })] }), _jsx('button', { className: 'bo-primary new-pizza', onClick: () => setEditor(true), children: '+ NY PIZZA' }), _jsx('div', { className: 'library-grid', children: pizzas.map(pizza => _jsx(LibraryCard, { pizza, selected: menu.some(x => x.id === pizza.id), toggle: () => toggle(pizza.id), update: patch => setPizzas(pizzas.map(p => p.id === pizza.id ? { ...p, ...patch } : p)) }, pizza.id)) })] }) : active === 'TRUCKSTATUS' ? _jsx(Truck, {}) : active === 'FRÅN LUCKAN' ? _jsx(Feed, {}) : active === 'BESTÄLLNINGAR' ? _jsx(Orders, { pizzas, menu }) : _jsx(Live, {});
  return _jsxs('div', { className: 'backoffice', children: [_jsxs('header', { children: [_jsxs('a', { href: './', children: [_jsx('b', { children: 'HB' }), _jsx('span', { children: 'HÄRLIGE BENKES – BACKOFFICE' })] }), _jsx('small', { children: 'OPERATIV PROTOTYP · EJ LIVE' })] }), _jsx('nav', { 'aria-label': 'Arbetsområden', children: areas.map((area, i) => _jsxs('button', { className: active === area ? 'active' : '', onClick: () => setActive(area), children: [_jsxs('span', { children: ['0', i + 1] }), area] }, area)) }), _jsx('main', { children: content }), editor && _jsx('div', { className: 'editor-layer', children: _jsx(NewPizza, { close: () => setEditor(false), save: pizza => { setPizzas([...pizzas, pizza]); setEditor(false); } }) }), _jsx('footer', { children: 'ALLT SPARAS BARA LOKALT I DENNA SESSION · INGEN BACKEND' })] });
}
