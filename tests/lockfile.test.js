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
