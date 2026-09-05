import test from 'node:test'
import assert from 'node:assert/strict'

class TestNode {
  constructor(type, text = '') { this.type = type; this.value = text; this.children = []; this.listeners = {}; this.attributes = {} }
  append(child) { this.children.push(child); child.parent = this }
  replaceChildren(...children) { this.children = []; children.forEach(child => this.append(child)) }
  setAttribute(name, value) { this.attributes[name] = value }
  addEventListener(name, listener) { this.listeners[name] = listener }
  get textContent() { return this.type === '#text' ? this.value : this.children.map(child => child.textContent).join('') }
}

globalThis.document = {
  createElement: type => new TestNode(type),
  createTextNode: text => new TestNode('#text', text),
}

const all = (node, predicate, found = []) => {
  if (predicate(node)) found.push(node)
  node.children.forEach(child => all(child, predicate, found))
  return found
}
const button = (root, label) => all(root, node => node.type === 'button' && node.textContent.includes(label))[0]
const fire = (node, name, target = node) => {
  assert.ok(node, `missing element for ${name}`)
  node.listeners[name]({ preventDefault() {}, target, currentTarget: node })
}

test('standard language is active while the Benke vocabulary remains available', async () => {
  const { createRoot } = await import('../vendor/react-dom/client.js')
  const { jsx } = await import('../vendor/react/jsx-runtime.js')
  const { default: App, activeLanguageProfile, languageProfiles } = await import('../dist/src/App.js')
  const container = new TestNode('root')

  createRoot(container).render(jsx(App, {}))
  assert.equal(activeLanguageProfile, 'standard')
  assert.equal(languageProfiles.benke.pizzaNames.ossj, 'OSSJ DEVON')
  assert.equal(languageProfiles.benke.payByCard, 'betala mä kott')

  const inactiveTerms = Object.values(languageProfiles.benke).flatMap(value =>
    typeof value === 'object' ? Object.values(value) : value,
  )
  for (const term of inactiveTerms) {
    assert.ok(!container.textContent.toLocaleLowerCase('sv-SE').includes(term.toLocaleLowerCase('sv-SE')), `${term} must not be visible`)
  }
})

test('component state is scoped by parent instance, type, and key', async () => {
  const { createRoot } = await import('../vendor/react-dom/client.js')
  const { jsx } = await import('../vendor/react/jsx-runtime.js')
  const { useState } = await import('../vendor/react/index.js')
  const container = new TestNode('root')
  let setView

  function Counter({ name }) {
    const [value, setValue] = useState(name)
    return jsx('button', { onClick: () => setValue(previous => `${previous}!`), children: value })
  }
  function Shell() {
    const [view, updateView] = useState('a')
    setView = updateView
    return jsx('main', { children: view === 'a' ? jsx(Counter, { name: 'A' }, 'a') : jsx(Counter, { name: 'B' }, 'b') })
  }

  createRoot(container).render(jsx(Shell, {}))
  fire(button(container, 'A'), 'click')
  assert.equal(container.textContent, 'A!')
  setView('b')
  assert.equal(container.textContent, 'B', 'a same-type component with another key must not inherit state')
  setView('a')
  assert.equal(container.textContent, 'A', 'an unmounted instance must not be resurrected from a stale path')
})

test('Backoffice survives repeated stateful view switching without collection corruption', async () => {
  const { createRoot } = await import('../vendor/react-dom/client.js')
  const { jsx } = await import('../vendor/react/jsx-runtime.js')
  const { default: Backoffice } = await import('../dist/src/Backoffice.js')
  const { pizzas } = await import('../dist/src/App.js')
  const container = new TestNode('root')
  createRoot(container).render(jsx(Backoffice, { initialPizzas: pizzas }))
  const views = ['DAGENS MENY', 'FRÅN LUCKAN', 'BESTÄLLNINGAR', 'SÄNDER LIVE', 'TRUCKSTATUS', 'PIZZABIBLIOTEK']

  for (let round = 0; round < 3; round += 1) {
    for (const view of views) {
      fire(button(container, view), 'click')
      assert.ok(container.textContent.includes(view))
      if (view === 'DAGENS MENY') {
        fire(button(container, 'DAGENS PIZZA'), 'click')
        assert.ok(container.textContent.includes('DAGENS PRIS'))
      } else if (view === 'FRÅN LUCKAN') {
        const textarea = all(container, node => node.type === 'textarea')[0]
        fire(textarea, 'change', { value: `post-${round}` })
        fire(all(container, node => node.type === 'form')[0], 'submit')
        assert.ok(container.textContent.includes(`post-${round}`), 'posts remains an array and accepts updates')
      } else if (view === 'BESTÄLLNINGAR') {
        fire(button(container, 'ÖPPNA QR-KUNDVY'), 'click')
        fire(button(container, '+'), 'click')
        assert.ok(!container.textContent.includes('TOTALT 0 KR'), 'cart remains an object and computes a total')
      } else if (view === 'SÄNDER LIVE') {
        const input = all(container, node => node.type === 'input')[1]
        fire(input, 'change', { value: `chat-${round}` })
        fire(all(container, node => node.type === 'form')[0], 'submit')
        assert.ok(container.textContent.includes(`chat-${round}`), 'chat remains an array and accepts updates')
      } else if (view === 'TRUCKSTATUS') {
        fire(button(container, 'ÖPPET'), 'click')
        assert.ok(container.textContent.includes('STÄNGT'))
      } else if (view === 'PIZZABIBLIOTEK') {
        assert.equal(all(container, node => node.attributes.class?.includes('bo-pizza')).length, pizzas.length)
        fire(button(container, 'TA BORT') ?? button(container, 'LÄGG PÅ DAGENS MENY'), 'click')
      }
    }
  }
  fire(button(container, 'DAGENS MENY'), 'click')
  assert.ok(container.textContent.includes('Ingen pizza vald'))
})
