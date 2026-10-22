const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.join(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

// 2026-10-21 の Node.js セキュリティリリースで修正済みの 24.x LTS。
const minimumPatchedVersion = '24.22.1'

const parse = (version) => version.replace(/^v/, '').split('.').map(Number)
const isAtLeast = (version, minimum) => {
  const [a, b] = [parse(version), parse(minimum)]
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] > b[i]
  }
  return true
}
const pinnedVersion = () => read('.nvmrc').trim()

test('.nvmrc pins an exact patched Node 24 LTS version', () => {
  const version = pinnedVersion()
  assert.match(version, /^24\.\d+\.\d+$/)
  assert.ok(isAtLeast(version, minimumPatchedVersion), `${version} is older than ${minimumPatchedVersion}`)
})

test('package.json engines follows .nvmrc', () => {
  const version = pinnedVersion()
  const major = parse(version)[0]
  assert.equal(JSON.parse(read('package.json')).engines.node, `>=${version} <${major + 1}`)
})

test('Dockerfile uses the same Node version with a pinned digest', () => {
  const version = pinnedVersion()
  assert.match(read('Dockerfile'), new RegExp(`^FROM node:${version.replace(/\./g, '\\.')}-bookworm-slim@sha256:[0-9a-f]{64}$`, 'm'))
})

test('CI reads the Node version from .nvmrc', () => {
  const workflow = read('.github/workflows/ci.yml')
  assert.match(workflow, /node-version-file: \.nvmrc/)
  assert.doesNotMatch(workflow, /node-version:/)
})

test('running Node satisfies the pinned version', () => {
  const version = pinnedVersion()
  const running = process.versions.node
  assert.equal(parse(running)[0], parse(version)[0], `running Node ${running}, expected ${version}`)
  assert.ok(isAtLeast(running, version), `running Node ${running} is older than ${version}`)
})

test('build setup does not rely on the legacy OpenSSL provider', () => {
  for (const file of ['package.json', 'vue.config.js', 'Dockerfile', 'compose.yaml', '.github/workflows/ci.yml']) {
    assert.doesNotMatch(read(file), /openssl-legacy-provider/, file)
  }
})
