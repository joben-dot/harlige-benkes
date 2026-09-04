export const StrictMode = Symbol.for('react.strict_mode')
export function useState(initial) {
  return globalThis.__HBP_REACT__.useState(initial)
}
export default { StrictMode, useState }
