#!/usr/bin/env node
import { createServer } from 'node:http'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'

const cwd = process.cwd()
const build = process.argv[2] === 'build'
const preview = process.argv[2] === 'preview'
const out = resolve(cwd, build ? 'dist' : preview ? 'dist' : '.vite-dev')
const config = (await import(new URL(`file://${resolve(cwd, 'vite.config.js')}`))).default
const configuredBase = config.base || '/'
const base = `/${configuredBase.replace(/^\/+|\/+$/g, '')}${configuredBase === '/' ? '' : '/'}`

function copySource(sourceName, outputName) {
  const source = resolve(cwd, 'src', sourceName)
  const output = join(out, 'src', outputName)
  cpSync(source, output)
  if (!readFileSync(source).equals(readFileSync(output))) {
    throw new Error(`Built ${outputName} differs from src/${sourceName}`)
  }
}

function compile() {
  rmSync(out, { recursive: true, force: true })
  mkdirSync(join(out, 'src'), { recursive: true })

  // Application code and styles always come from src/. There is deliberately no
  // vendored application template: these byte-for-byte checks enforce that rule.
  copySource('main.jsx', 'main.js')
  copySource('App.jsx', 'App.js')
  copySource('styles.css', 'styles.css')

  cpSync(new URL('../react', import.meta.url), join(out, 'node_modules/react'), { recursive: true })
  cpSync(new URL('../react-dom', import.meta.url), join(out, 'node_modules/react-dom'), { recursive: true })
  let html = readFileSync(resolve(cwd, 'index.html'), 'utf8')
    .replace('/harlige-benkes/src/styles.css', `${base}src/styles.css`)
    .replace('<script type="module" src="/src/main.jsx"></script>', `<script type="importmap">{"imports":{"react":"${base}node_modules/react/index.js","react/jsx-runtime":"${base}node_modules/react/jsx-runtime.js","react-dom/client":"${base}node_modules/react-dom/client.js"}}</script>\n    <script type="module" src="${base}src/main.js"></script>`)
  const stylesheetHref = `${base}src/styles.css`
  if (!html.includes(`<link rel="stylesheet" href="${stylesheetHref}" />`)) {
    throw new Error(`Missing stylesheet link: ${stylesheetHref}`)
  }
  writeFileSync(join(out, 'index.html'), html)
}

if (!preview) compile()
if (build) { console.log('✓ built from src/ in local offline mode → dist/'); process.exit(0) }
if (!existsSync(join(out, 'index.html'))) { console.error('Run npm run build first.'); process.exit(1) }

const args = process.argv.slice(2)
const portAt = args.indexOf('--port')
const port = Number(portAt >= 0 ? args[portAt + 1] : 5173)
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' }
createServer((request, response) => {
  const urlPath = decodeURIComponent(request.url.split('?')[0])
  const relativePath = urlPath.startsWith(base) ? urlPath.slice(base.length) : urlPath.replace(/^\/+/, '')
  const path = normalize(relativePath).replace(/^(\.\.[/\\])+/, '')
  let file = join(out, path === '.' ? 'index.html' : path)
  if (!file.startsWith(out) || !existsSync(file)) file = join(out, 'index.html')
  response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream')
  response.end(readFileSync(file))
}).listen(port, '0.0.0.0', () => console.log(`\n  VITE local  ready\n\n  ➜  Local:   http://localhost:${port}/\n`))
