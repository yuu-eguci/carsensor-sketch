# Security notes

Checked on 2026-11-13.

## Where Node runs

The site is static files in `docs/` served by GitHub Pages. Pages does not run Node. Node only runs on dev machines, in Docker, and in CI for install / lint / test / build.

## Node.js runtime

- Pinned to 24.22.1 in `.nvmrc`, `package.json` engines (`>=24.22.1 <25`), `Dockerfile` (digest pinned), and CI (`node-version-file: .nvmrc`).
- 24.22.1 is a patched 24.x LTS from the October 2026 security release (patched lines: 26.12.1 / 24.22.1 / 22.23.4).
  - https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
  - https://nodejs.org/dist/index.json
  - https://raw.githubusercontent.com/nodejs/Release/main/schedule.json (20.x EOL 2026-04-30, 24.x supported until 2028-04-30)
- The build no longer needs `--openssl-legacy-provider`. Vue CLI 4 / webpack 4 failed with `ERR_OSSL_EVP_UNSUPPORTED` on Node 22/24; The current Vite 8 build runs without it; the preceding Vue CLI 5 / webpack 5 migration had also removed that requirement. `tests/` fails if the flag shows up again.

## npm dependencies

Method (same every time): `yarn audit --summary` with yarn 1.22.22 on a copy of `package.json` + `yarn.lock`.

| | 5df6582 (Vue CLI 4) | ddc02bc (Vue CLI 5) | ff1297a (Vue 3 + Vite) | now (+ TypeScript) |
|---|---|---|---|---|
| all | 636 (critical 55 / high 319 / moderate 208 / low 54) | 33 (high 11 / moderate 21 / low 1) | 0 (2026-10-22) → 2 moderate (2026-11-13) | 0 |
| `dependencies` only | 1 low | 1 low | 0 | 0 |

How:

- ddc02bc: Vue CLI 4 → 5.0.9, `yarn.lock` moved off the dead `registry.npm.taobao.org` to `registry.yarnpkg.com`.
- ff1297a: Vue 2.6 + Vue CLI 5 → Vue 3.5 + Vue Router 5 + Vite 8 + ESLint 10. Vue CLI, webpack, webpack-dev-server, Babel, `vue-template-compiler`, `core-js` and eslint-plugin-vue 9 are gone, and with them every path of the 33 findings (all of them came from those packages or from Vue 2).
- ff1297a の 2 件 (2026-11-13 時点): minimatch 10.2.6 の [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) (2026-10-30 公開、修正版は 11.0.1 以降)。経路は eslint と @eslint/config-array。
- now: devDependencies に TypeScript 6.0 / vue-tsc / typescript-eslint を追加 (typescript-eslint 経由でも同じ minimatch を使う)。minimatch は `resolutions` で ^11.0.5 (11.0.8) にして 0 件。
- No audit ignores. CI runs `yarn audit` and fails on any finding.

## `resolutions`

`package.json` の `resolutions` は minimatch の 1 件だけ。`tests/lockfile.test.js` が、それ以外を足していないことと、`yarn.lock` に 11 未満の minimatch がないことを見ている。

- 理由: GHSA-g3hv-75wg-m249 の修正版は minimatch 11 系だけ (10 系への backport なし)。eslint 10.14.0 / @eslint/config-array 0.23.5 / typescript-eslint 8.72.2 (2026-11-13 時点のリリース版の最新) は ^10 を要求している。
- ^11.0.5 は upstream の修正と同じ範囲。eslint (eslint/eslint#21492) と @eslint/config-array (eslint/rewrite#535) は main で ^11.0.5 に上げ済み (未リリース)。typescript-eslint も canary で ^11.0.1。
- 互換性: 3 つとも使っているのは `new Minimatch(pattern, { dot, flipNegate })`、`.match(path[, partial])`、`.pattern`、`minimatch(path, pattern, { dot })` だけで、11 でも残っている (11 で消えたのは `makeRe` や `AST` など)。Node は 11 の engines (`20 || >=22`) を満たす。10.2.6 と 11.0.8 で、`eslint .` の対象ファイルと検出結果、CLI の glob 指定 (`**`、`{a,b}`、該当なし、ignores 済みの `docs/`) の結果が同じなのを確認した。
- 外す条件: eslint・@eslint/config-array・typescript-eslint のリリース版がどれも minimatch ^11 を要求するようになったら、`resolutions` とテストの該当部分を消す。

The shipped bundle uses Vue's runtime-only build; `tests/build.test.js` checks the source maps for Vue compiler sources.

## Published site

`docs/` was not rebuilt in these changes, so GitHub Pages still serves the old Vue 2.6.11 runtime bundle (no template compiler inside). It changes only when `yarn build` output is committed to `docs/`.

## Browser-side (not npm)

`index.html` loads jQuery 3.4.1, Popper 1.14.7, Bootstrap 4.3.1 and Font Awesome 4.7.0 from CDNs without SRI. Not changed here.
