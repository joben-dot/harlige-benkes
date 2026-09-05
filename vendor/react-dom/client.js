const Fragment = Symbol.for('react.fragment')
const StrictMode = Symbol.for('react.strict_mode')
let activeRoot
let activeHooks
let hookIndex = 0

function append(parent, value, path = '0') {
  if (value == null || value === false || value === true) return
  if (Array.isArray(value)) return value.forEach((child, index) => append(parent, child, `${path}.${index}`))
  if (typeof value === 'string' || typeof value === 'number') return parent.append(document.createTextNode(String(value)))
  if (value.type === Fragment || value.type === StrictMode) return append(parent, value.props.children, path)
  if (typeof value.type === 'function') {
    const instance = activeRoot.components.get(path)
    const hooks = instance?.type === value.type ? instance.hooks : []
    activeRoot.components.set(path, { type: value.type, hooks })
    const parentHooks = activeHooks
    const parentHookIndex = hookIndex
    activeHooks = hooks
    hookIndex = 0
    const rendered = value.type(value.props)
    activeHooks = parentHooks
    hookIndex = parentHookIndex
    return append(parent, rendered, `${path}.0`)
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
  append(element, value.props.children, `${path}.0`)
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
    components: new Map(),
    tree: null,
    paint() {
      activeRoot = root
      activeHooks = null
      hookIndex = 0
      container.replaceChildren()
      append(container, root.tree)
    },
    render(tree) { root.tree = tree; root.paint() },
  }
  return root
}

export default { createRoot }
