import { existsSync, readFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const read = path => readFileSync(resolve(root, path), 'utf8')
const assert = (condition, message) => {
  if (!condition) throw new Error(`Build verification failed: ${message}`)
}

assert(!existsSync(resolve(root, 'vendor/vite/template/App.js')), 'vendor/vite/template/App.js must not exist')
assert(
  read('dist/src/App.js') === read('src/App.jsx'),
  'dist/src/App.js is not copied directly from src/App.jsx',
)
assert(read('dist/src/Backoffice.js') === read('src/Backoffice.jsx'), 'dist/src/Backoffice.js is not copied directly from src/Backoffice.jsx')
const backoffice = read('src/Backoffice.jsx')
assert(backoffice.includes('const chatMessages = Array.isArray(chat) ? chat : []'), 'Backoffice chat rendering must normalize non-array values')
assert(backoffice.includes('setChat(previous => [...(Array.isArray(previous) ? previous : [])'), 'Backoffice chat updates must preserve the array state type')
assert(backoffice.includes('const pizzaSeed = Array.isArray(initialPizzas) ? initialPizzas : []'), 'Backoffice pizza and menu state must start from an array')
assert(read('dist/src/styles.css') === read('src/styles.css'), 'dist/src/styles.css is not copied directly from src/styles.css')
assert(existsSync(resolve(root, 'dist/src/assets/devil-frame.png')), 'the local VEGAN? backdrop is missing from the build')
assert(read('dist/index.html').includes('/harlige-benkes/src/main.js'), 'GitHub Pages subpath is missing from the entry script')
assert(read('dist/index.html').includes('/harlige-benkes/src/styles.css'), 'GitHub Pages subpath is missing from the stylesheet')

// Follow local static and dynamic imports from the published entry module. Every
// referenced module must exist under dist, just as it must when Pages serves it.
const checkedModules = new Set()
function verifyLocalImports(modulePath) {
  const absoluteModule = resolve(root, modulePath)
  assert(existsSync(absoluteModule), `${modulePath} does not exist`)
  if (checkedModules.has(absoluteModule)) return
  checkedModules.add(absoluteModule)

  const source = readFileSync(absoluteModule, 'utf8')
  const imports = [
    ...source.matchAll(/(?:import|export)\s+(?:[^'";]*?\s+from\s+)?['"](\.[^'"]+)['"]/g),
    ...source.matchAll(/import\(\s*['"](\.[^'"]+)['"]\s*\)/g),
  ]
  for (const [, specifier] of imports) {
    const importedModule = resolve(dirname(absoluteModule), specifier)
    const importedPath = relative(root, importedModule)
    assert(importedModule.startsWith(resolve(root, 'dist') + '/'), `${modulePath} imports outside dist: ${specifier}`)
    assert(existsSync(importedModule), `${modulePath} imports missing local module ${importedPath}`)
    verifyLocalImports(importedPath)
  }
}
verifyLocalImports('dist/src/main.js')

// An import map only resolves a module URL; it cannot synthesize missing ESM
// exports. Validate named imports against the exact runtime published in dist.
const vendoredModules = new Map([
  ['react', 'dist/node_modules/react/index.js'],
  ['react/jsx-runtime', 'dist/node_modules/react/jsx-runtime.js'],
  ['react-dom/client', 'dist/node_modules/react-dom/client.js'],
])
for (const modulePath of checkedModules) {
  const source = readFileSync(modulePath, 'utf8')
  for (const match of source.matchAll(/import\s+([^;]+?)\s+from\s+['"]([^'"]+)['"]/g)) {
    const [, clause, specifier] = match
    const vendorPath = vendoredModules.get(specifier)
    if (!vendorPath) continue
    const vendorSource = read(vendorPath)
    const named = clause.match(/\{([^}]+)\}/)?.[1] ?? ''
    for (const item of named.split(',').map(value => value.trim()).filter(Boolean)) {
      const importedName = item.split(/\s+as\s+/)[0].trim()
      assert(
        new RegExp(`export\\s+(?:const|let|var|function|class)\\s+${importedName}\\b`).test(vendorSource),
        `${relative(root, modulePath)} imports ${importedName} from ${specifier}, but ${vendorPath} does not export it`,
      )
    }
  }
}

const main = read('dist/src/main.js')
assert(
  main.includes("backoffice\n  ? await Promise.all([import('./Backoffice.js'), import('./App.js')])"),
  'Backoffice is not conditionally loaded',
)
assert(!read('dist/src/App.js').includes('Backoffice'), 'public App.js must not load Backoffice')

const app = read('dist/src/App.js')
const languageProfile = app
assert(
  languageProfile.includes("export const activeLanguageProfile = 'standard'"),
  'standard Swedish must be the active language profile',
)
for (const expected of ['PEPPERONI MED STING', 'Facebook', 'Ingredienser', 'Huskvarna']) {
  assert(languageProfile.includes(expected), `standard profile does not contain ${JSON.stringify(expected)}`)
}
assert(languageProfile.includes('export const getLanguageProfile = profile =>'), 'language profile resolver is missing')
for (const expected of ['VECKANS', 'language.ingredients.toUpperCase()', 'language.seeMenu.toUpperCase()']) {
  assert(app.includes(expected), `dist/src/App.js does not contain ${JSON.stringify(expected)}`)
}
for (const inactive of ['OSSJ DEVON', 'Huskvana', 'Evänts', 'Kaländarium', 'Kåntakt', 'Tåppings', 'Se mänyn', 'Fäjjsbook', 'Kåntanter', 'betala mä kott', 'Lajv']) {
  assert(!app.includes(inactive), `public UI source still contains removed term ${JSON.stringify(inactive)}`)
  assert(!backoffice.includes(inactive), `Backoffice UI source still contains inactive term ${JSON.stringify(inactive)}`)
}

console.log(`✓ verified src/ source of truth, ${checkedModules.size} published modules, and GitHub Pages paths`)
