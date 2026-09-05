import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const read = path => readFileSync(resolve(root, path), 'utf8')
const assert = (condition, message) => {
  if (!condition) throw new Error(`Build verification failed: ${message}`)
}

assert(!existsSync(resolve(root, 'vendor/vite/template/App.js')), 'vendor/vite/template/App.js must not exist')
assert(read('dist/src/App.js') === read('src/App.jsx'), 'dist/src/App.js is not copied directly from src/App.jsx')
assert(read('dist/src/styles.css') === read('src/styles.css'), 'dist/src/styles.css is not copied directly from src/styles.css')
assert(read('dist/index.html').includes('/harlige-benkes/src/main.js'), 'GitHub Pages subpath is missing from the entry script')
assert(read('dist/index.html').includes('/harlige-benkes/src/styles.css'), 'GitHub Pages subpath is missing from the stylesheet')

const app = read('dist/src/App.js')
for (const expected of ['GOJIG JORDPÄRA', 'Fäjsbook', 'LOVER', 'VECKANS']) {
  assert(app.includes(expected), `dist/src/App.js does not contain ${JSON.stringify(expected)}`)
}
for (const removed of ['FJOCKLA', 'TYEN', 'FÄJJSBOOK', 'LOVVER']) {
  assert(!app.includes(removed), `dist/src/App.js still contains ${JSON.stringify(removed)}`)
}

console.log('✓ verified src/ source of truth, published copy, and GitHub Pages paths')
