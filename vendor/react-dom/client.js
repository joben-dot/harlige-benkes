const Fragment = Symbol.for('react.fragment')
const StrictMode = Symbol.for('react.strict_mode')
let activeRoot
let activeHooks
let hookIndex = 0

const componentSlot = (value, path) => value.key == null ? path : `${path}:key:${String(value.key)}`

function append(parent, value, owner, path = '0') {
  if (value == null || value === false || value === true) return
  if (Array.isArray(value)) return value.forEach((child, index) => append(parent, child, owner, `${path}.${index}`))
  if (typeof value === 'string' || typeof value === 'number') return parent.append(document.createTextNode(String(value)))
  if (value.type === Fragment || value.type === StrictMode) return append(parent, value.props.children, owner, path)
  if (typeof value.type === 'function') {
    const slot = componentSlot(value, path)
    const previous = owner.children.get(slot)
    const instance = previous?.type === value.type && previous.key === value.key
      ? previous
      : { type: value.type, key: value.key, hooks: [], children: new Map() }
    owner.nextChildren.set(slot, instance)
    const parentHooks = activeHooks
    const parentHookIndex = hookIndex
    activeHooks = instance.hooks
    hookIndex = 0
    let rendered
    try {
      rendered = value.type(value.props)
    } finally {
      activeHooks = parentHooks
      hookIndex = parentHookIndex
    }
    instance.nextChildren = new Map()
    append(parent, rendered, instance)
    instance.children = instance.nextChildren
    delete instance.nextChildren
    return
  }

  const element = document.createElement(value.type)
  for (const [name, prop] of Object.entries(value.props)) {
    if (name === 'children' || prop == null || prop === false) continue
    if (name === 'className') element.setAttribute('class', prop)
    else if (name === 'htmlFor') element.setAttribute('for', prop)
    else if (name.startsWith('on') && typeof prop === 'function') element.addEventListener(name.slice(2).toLowerCase(), prop)
    else if (prop === true) element.setAttribute(name, '')
    else element.setAttribute(name, String(prop))
  }
  append(element, value.props.children, owner, `${path}.0`)
  parent.append(element)
}

globalThis.__HBP_REACT__ = {
  useState(initial) {
    const root = activeRoot
    const index = hookIndex++
    const hooks = activeHooks
    if (!(index in hooks)) hooks[index] = typeof initial === 'function' ? initial() : initial
    return [hooks[index], value => {
      hooks[index] = typeof value === 'function' ? value(hooks[index]) : value
      root.paint()
    }]
  },
}

export function createRoot(container) {
  const root = {
    children: new Map(),
    tree: null,
    paint() {
      activeRoot = root
      activeHooks = null
      hookIndex = 0
      container.replaceChildren()
      root.nextChildren = new Map()
      append(container, root.tree, root)
      root.children = root.nextChildren
      delete root.nextChildren
    },
    render(tree) { root.tree = tree; root.paint() },
  }
  return root
}

export default { createRoot }
