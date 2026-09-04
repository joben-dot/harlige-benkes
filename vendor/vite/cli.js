#!/usr/bin/env node
import { createServer } from 'node:http'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'

const cwd = process.cwd()
const build = process.argv[2] === 'build'
const preview = process.argv[2] === 'preview'
const out = resolve(cwd, build ? 'dist' : preview ? 'dist' : '.vite-dev')

function compile() {
  rmSync(out, { recursive: true, force: true })
  mkdirSync(join(out, 'src'), { recursive: true })
  cpSync(new URL('./template', import.meta.url), join(out, 'src'), { recursive: true })
  cpSync('src/styles.css', join(out, 'src/styles.css'))
  cpSync('node_modules/react', join(out, 'node_modules/react'), { recursive: true })
  cpSync('node_modules/react-dom', join(out, 'node_modules/react-dom'), { recursive: true })
  let html = readFileSync('index.html', 'utf8').replace('<script type="module" src="/src/main.jsx"></script>', `<script type="importmap">{"imports":{"react":"/node_modules/react/index.js","react/jsx-runtime":"/node_modules/react/jsx-runtime.js","react-dom/client":"/node_modules/react-dom/client.js"}}</script>\n    <script type="module" src="/src/main.js"></script>`)
  writeFileSync(join(out, 'index.html'), html)
}

if (!preview) compile()
if (build) { console.log('✓ built in local offline mode → dist/'); process.exit(0) }
if (!existsSync(join(out, 'index.html'))) { console.error('Run npm run build first.'); process.exit(1) }

const args = process.argv.slice(2)
const portAt = args.indexOf('--port')
const port = Number(portAt >= 0 ? args[portAt + 1] : 5173)
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' }
createServer((request, response) => {
  const path = normalize(decodeURIComponent(request.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  let file = join(out, path === '/' ? 'index.html' : path)
  if (!file.startsWith(out) || !existsSync(file)) file = join(out, 'index.html')
  response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream')
  response.end(readFileSync(file))
}).listen(port, '0.0.0.0', () => console.log(`\n  VITE local  ready\n\n  ➜  Local:   http://localhost:${port}/\n`))
