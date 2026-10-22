const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const root = path.join(__dirname, '..')

test('production build works without NODE_OPTIONS and keeps the GitHub Pages paths', () => {
  // 公開物の docs/ は触らないよう、一時ディレクトリにビルドする。
  const dest = fs.mkdtempSync(path.join(os.tmpdir(), 'carsensor-sketch-build-'))
  const env = { ...process.env }
  delete env.NODE_OPTIONS

  try {
    const result = spawnSync(
      process.execPath,
      [path.join(root, 'node_modules', 'vite', 'bin', 'vite.js'), 'build', '--outDir', dest, '--emptyOutDir', '--sourcemap'],
      { cwd: root, env, encoding: 'utf8' }
    )
    assert.equal(result.status, 0, result.stdout + result.stderr)

    const html = fs.readFileSync(path.join(dest, 'index.html'), 'utf8')
    const ownAssets = [...html.matchAll(/(?:src|href)="(\/carsensor-sketch\/[^"]+)"/g)].map((match) => match[1])

    assert.ok(ownAssets.some((src) => src.endsWith('.js')))
    for (const src of ownAssets) {
      assert.ok(fs.existsSync(path.join(dest, src.replace('/carsensor-sketch/', ''))), src)
    }
    assert.match(html, /<div id="app"><\/div>/)
    assert.match(html, /bootstrap\/4\.3\.1\/css\/bootstrap\.min\.css/)

    // テンプレートはビルド時にコンパイルするので、Vue のコンパイラは配信しない。
    const sources = fs.readdirSync(path.join(dest, 'assets'))
      .filter((file) => file.endsWith('.js.map'))
      .flatMap((file) => JSON.parse(fs.readFileSync(path.join(dest, 'assets', file), 'utf8')).sources)
    assert.ok(sources.some((source) => source.includes('runtime-core')))
    assert.deepEqual(sources.filter((source) => /compiler-(core|dom|sfc)/.test(source)), [])
  } finally {
    fs.rmSync(dest, { recursive: true, force: true })
  }
})
