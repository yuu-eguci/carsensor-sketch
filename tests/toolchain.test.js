const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { pathToFileURL } = require('node:url')

const root = path.join(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

test('package.json uses Vue 3 and Vite without the old toolchain', () => {
  const pkg = JSON.parse(read('package.json'))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }

  assert.match(deps.vue, /^\^3\./)
  assert.ok(deps.vite)
  assert.deepEqual(Object.keys(deps).filter((name) => /^(@vue\/cli-|@babel\/|babel-|vue-template-compiler$|core-js$)/.test(name)), [])
  assert.equal(pkg.eslintConfig, undefined)
  assert.equal(pkg.browserslist, undefined)
})

test('old Vue CLI config files are gone', () => {
  for (const file of ['vue.config.js', 'babel.config.js', 'public/index.html']) {
    assert.equal(fs.existsSync(path.join(root, file)), false, file)
  }
})

test('Vite builds for GitHub Pages into docs/', async () => {
  const { default: config } = await import(pathToFileURL(path.join(root, 'vite.config.mjs')))

  assert.equal(config.base, '/carsensor-sketch/')
  assert.equal(config.build.outDir, 'docs')
  assert.equal(config.server.port, 8080)
})

test('index.html loads the Vue entry and keeps the CDN tags', () => {
  const html = read('index.html')

  assert.match(html, /<script type="module" src="\/src\/main\.js"><\/script>/)
  for (const url of [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://code.jquery.com/jquery-3.4.1.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
  ]) {
    assert.ok(html.includes(url), url)
  }
})
