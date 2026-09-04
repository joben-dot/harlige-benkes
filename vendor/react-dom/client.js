const Fragment = Symbol.for('react.fragment')
const StrictMode = Symbol.for('react.strict_mode')
let activeRoot
let hookIndex = 0

function append(parent, value) {
  if (value == null || value === false || value === true) return
  if (Array.isArray(value)) return value.forEach(child => append(parent, child))
  if (typeof value === 'string' || typeof value === 'number') return parent.append(document.createTextNode(String(value)))
  if (value.type === Fragment || value.type === StrictMode) return append(parent, value.props.children)
  if (typeof value.type === 'function') return append(parent, value.type(value.props))

  const element = document.createElement(value.type)
  for (const [name, prop] of Object.entries(value.props)) {
    if (name === 'children' || prop == null || prop === false) continue
    if (name === 'className') element.setAttribute('class', prop)
    else if (name === 'htmlFor') element.setAttribute('for', prop)
    else if (name.startsWith('on') && typeof prop === 'function') element.addEventListener(name.slice(2).toLowerCase(), prop)
    else if (prop === true) element.setAttribute(name, '')
    else element.setAttribute(name, String(prop))
  }
  append(element, value.props.children)
  parent.append(element)
}

globalThis.__HBP_REACT__ = {
  useState(initial) {
    const root = activeRoot
    const index = hookIndex++
    if (!(index in root.hooks)) root.hooks[index] = typeof initial === 'function' ? initial() : initial
    return [root.hooks[index], value => {
      root.hooks[index] = typeof value === 'function' ? value(root.hooks[index]) : value
      root.paint()
    }]
  },
}

export function createRoot(container) {
  const root = {
    hooks: [],
    tree: null,
    paint() {
      activeRoot = root
      hookIndex = 0
      container.replaceChildren()
      append(container, root.tree)
    },
    render(tree) { root.tree = tree; root.paint() },
  }
  return root
}

export default { createRoot }
