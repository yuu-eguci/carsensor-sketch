const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

test('yarn.lock resolves every package from the official registry', () => {
  const lockfile = fs.readFileSync(path.join(__dirname, '..', 'yarn.lock'), 'utf8')
  const urls = [...lockfile.matchAll(/^\s+resolved "([^"]+)"$/gm)].map((match) => match[1])

  assert.ok(urls.length > 0)
  assert.deepEqual(urls.filter((url) => !url.startsWith('https://registry.yarnpkg.com/')), [])
})

test('minimatch is the patched 11.x, forced only by a single resolution', () => {
  // GHSA-g3hv-75wg-m249 の修正は minimatch 11.0.1 以降だけ。eslint / typescript-eslint の
  // リリース版が ^10 を要求している間だけ resolutions で上げる (security-notes.md 参照)。
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'))
  assert.deepEqual(pkg.resolutions, { minimatch: '^11.0.5' })

  const lockfile = fs.readFileSync(path.join(__dirname, '..', 'yarn.lock'), 'utf8')
  const versions = [...lockfile.matchAll(/^"?minimatch@[^\n]*\n\s+version "([^"]+)"$/gm)].map((match) => match[1])
  assert.ok(versions.length > 0)
  assert.deepEqual(versions.filter((version) => Number(version.split('.')[0]) < 11), [])
})
