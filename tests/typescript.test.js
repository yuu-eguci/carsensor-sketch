const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const root = path.join(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const vueTsc = path.join(root, 'node_modules', 'vue-tsc', 'bin', 'vue-tsc.js')
const eslint = path.join(root, 'node_modules', 'eslint', 'bin', 'eslint.js')

const runNode = (args) => spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8' })
const sourceFiles = () => fs.readdirSync(path.join(root, 'src'), { recursive: true })
  .filter((file) => /\.(js|ts|vue)$/.test(file))
  .map((file) => path.posix.join('src', file.split(path.sep).join('/')))

test('application code under src/ is TypeScript', () => {
  const files = sourceFiles()

  assert.deepEqual(files.filter((file) => file.endsWith('.js')), [])
  assert.ok(files.includes('src/main.ts'))
  assert.ok(files.includes('src/router.ts'))
  for (const file of files.filter((file) => file.endsWith('.vue'))) {
    for (const [tag] of read(file).matchAll(/<script\b[^>]*>/g)) {
      assert.match(tag, /\blang="ts"/, `${file}: ${tag}`)
    }
  }
})

test('yarn typecheck runs vue-tsc in strict mode without emitting', () => {
  const pkg = JSON.parse(read('package.json'))
  const { compilerOptions } = JSON.parse(read('tsconfig.json'))

  assert.equal(pkg.scripts.typecheck, 'vue-tsc --noEmit')
  assert.equal(compilerOptions.strict, true)
  assert.equal(compilerOptions.noEmit, true)
})

test('tsconfig.json covers every .ts and .vue file under src/', () => {
  const result = runNode([vueTsc, '--noEmit', '--listFilesOnly'])
  assert.equal(result.status, 0, result.stdout + result.stderr)

  const listed = new Set(result.stdout.split('\n').map((line) => path.relative(root, line.trim()).split(path.sep).join('/')))
  for (const file of sourceFiles()) {
    assert.ok(listed.has(file), file)
  }
})

test('type errors in .vue scripts and templates fail the type check', () => {
  // 本物の tsconfig.json を継承して、わざと型エラーを入れた SFC だけをチェックする。
  const dir = fs.mkdtempSync(path.join(root, '.typecheck-probe-'))
  const write = (file, content) => fs.writeFileSync(path.join(dir, file), content)
  const check = () => runNode([vueTsc, '--noEmit', '-p', path.join(dir, 'tsconfig.json')])

  try {
    write('tsconfig.json', JSON.stringify({ extends: '../tsconfig.json', include: ['*.ts', '*.vue'] }))
    write('main.ts', "import Probe from './Probe.vue'\nexport default Probe\n")
    write('Probe.vue', [
      '<template><p>{{ count.toFixed(0) }}</p></template>',
      '<script setup lang="ts">',
      'const count: number = 1',
      '</script>',
      '',
    ].join('\n'))

    // 型エラーがなければ通る (失敗の原因が設定ではないことの確認)。
    const ok = check()
    assert.equal(ok.status, 0, ok.stdout + ok.stderr)

    write('Probe.vue', [
      '<template><p>{{ count.toUpperCase() }}</p></template>',
      '<script setup lang="ts">',
      "const count: number = 'one'",
      'const twice = (value) => value * 2',
      'twice(count)',
      '</script>',
      '',
    ].join('\n'))

    const ng = check()
    const output = ng.stdout + ng.stderr
    assert.notEqual(ng.status, 0, output)
    assert.match(output, /Probe\.vue\(3,7\): error TS2322/) // script の型エラー
    assert.match(output, /Probe\.vue\(4,16\): error TS7006/) // strict (noImplicitAny)
    assert.match(output, /Probe\.vue\(1,23\): error TS2339/) // template の型エラー
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

test('ESLint lints the TypeScript sources', () => {
  const files = sourceFiles()
  const result = runNode([eslint, '--format', 'json', ...files])
  assert.equal(result.status, 0, result.stdout + result.stderr)

  const reports = JSON.parse(result.stdout)
  assert.deepEqual(reports.map((report) => path.relative(root, report.filePath).split(path.sep).join('/')).sort(), [...files].sort())
  // 対象外のファイルは "File ignored" の warning になるので、warning がないことも見る。
  assert.deepEqual(reports.flatMap((report) => report.messages), [])
})
