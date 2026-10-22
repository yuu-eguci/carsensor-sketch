const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

test('production build works without NODE_OPTIONS and keeps the GitHub Pages paths', () => {
  // 公開物の docs/ は触らないよう、一時ディレクトリにビルドする。
  const dest = fs.mkdtempSync(path.join(os.tmpdir(), 'carsensor-sketch-build-'))
  const env = { ...process.env }
  delete env.NODE_OPTIONS

  try {
    const result = spawnSync(
      process.execPath,
      [require.resolve('@vue/cli-service/bin/vue-cli-service.js'), 'build', '--dest', dest],
      { cwd: path.join(__dirname, '..'), env, encoding: 'utf8' }
    )
    assert.equal(result.status, 0, result.stdout + result.stderr)

    const html = fs.readFileSync(path.join(dest, 'index.html'), 'utf8')
    const scripts = [...html.matchAll(/<script [^>]*src="?([^" >]+)/g)].map((match) => match[1])
    const ownScripts = scripts.filter((src) => !src.startsWith('https://'))

    assert.ok(ownScripts.length > 0)
    for (const src of ownScripts) {
      assert.match(src, /^\/carsensor-sketch\/js\//)
      assert.ok(fs.existsSync(path.join(dest, src.replace('/carsensor-sketch/', ''))), src)
    }
    assert.match(html, /<div id="?app"?>/)
    assert.match(html, /bootstrap\/4\.3\.1\/css\/bootstrap\.min\.css/)
  } finally {
    fs.rmSync(dest, { recursive: true, force: true })
  }
})
