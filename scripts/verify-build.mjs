import { existsSync, readFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const read = path => readFileSync(resolve(root, path), 'utf8')
const assert = (condition, message) => {
  if (!condition) throw new Error(`Build verification failed: ${message}`)
}

assert(!existsSync(resolve(root, 'vendor/vite/template/App.js')), 'vendor/vite/template/App.js must not exist')
assert(
  read('dist/src/App.js') === read('src/App.jsx').replace("'./Backoffice.jsx'", "'./Backoffice.js'"),
  'dist/src/App.js is not built directly from src/App.jsx with its browser module extension rewritten',
)
assert(read('dist/src/Backoffice.js') === read('src/Backoffice.jsx'), 'dist/src/Backoffice.js is not copied directly from src/Backoffice.jsx')
assert(read('dist/src/styles.css') === read('src/styles.css'), 'dist/src/styles.css is not copied directly from src/styles.css')
assert(read('dist/index.html').includes('/harlige-benkes/src/main.js'), 'GitHub Pages subpath is missing from the entry script')
assert(read('dist/index.html').includes('/harlige-benkes/src/styles.css'), 'GitHub Pages subpath is missing from the stylesheet')

// Follow local static imports from the published entry module. Every referenced
// module must exist under dist, just as it must when GitHub Pages serves it.
const checkedModules = new Set()
function verifyLocalImports(modulePath) {
  const absoluteModule = resolve(root, modulePath)
  assert(existsSync(absoluteModule), `${modulePath} does not exist`)
  if (checkedModules.has(absoluteModule)) return
  checkedModules.add(absoluteModule)

  const source = readFileSync(absoluteModule, 'utf8')
  const imports = source.matchAll(/(?:import|export)\s+(?:[^'";]*?\s+from\s+)?['"](\.[^'"]+)['"]/g)
  for (const [, specifier] of imports) {
    const importedModule = resolve(dirname(absoluteModule), specifier)
    const importedPath = relative(root, importedModule)
    assert(importedModule.startsWith(resolve(root, 'dist') + '/'), `${modulePath} imports outside dist: ${specifier}`)
    assert(existsSync(importedModule), `${modulePath} imports missing local module ${importedPath}`)
    verifyLocalImports(importedPath)
  }
}
verifyLocalImports('dist/src/main.js')

const app = read('dist/src/App.js')
for (const expected of ['GOJIG JORDPÄRA', 'Fäjsbook', 'LOVER', 'VECKANS']) {
  assert(app.includes(expected), `dist/src/App.js does not contain ${JSON.stringify(expected)}`)
}
for (const removed of ['FJOCKLA', 'TYEN', 'FÄJJSBOOK', 'LOVVER']) {
  assert(!app.includes(removed), `dist/src/App.js still contains ${JSON.stringify(removed)}`)
}

console.log(`✓ verified src/ source of truth, ${checkedModules.size} published modules, and GitHub Pages paths`)
