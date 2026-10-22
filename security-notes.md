# Security notes

Checked on 2026-10-22.

## Where Node runs

The site is static files in `docs/` served by GitHub Pages. Pages does not run Node. Node only runs on dev machines, in Docker, and in CI for install / lint / test / build.

## Node.js runtime

- Pinned to 24.22.1 in `.nvmrc`, `package.json` engines (`>=24.22.1 <25`), `Dockerfile` (digest pinned), and CI (`node-version-file: .nvmrc`).
- 24.22.1 is a patched 24.x LTS from the October 2026 security release (patched lines: 26.12.1 / 24.22.1 / 22.23.4).
  - https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
  - https://nodejs.org/dist/index.json
  - https://raw.githubusercontent.com/nodejs/Release/main/schedule.json (20.x EOL 2026-04-30, 24.x supported until 2028-04-30)
- The build no longer needs `--openssl-legacy-provider`. Vue CLI 4 / webpack 4 failed with `ERR_OSSL_EVP_UNSUPPORTED` on Node 22/24; Vue CLI 5 / webpack 5 builds without it. `tests/` fails if the flag shows up again.

## npm dependencies

Method (same every time): `yarn audit --summary` with yarn 1.22.22 on a copy of `package.json` + `yarn.lock`.

| | 5df6582 (Vue CLI 4) | ddc02bc (Vue CLI 5) | now (Vue 3 + Vite) |
|---|---|---|---|
| all | 636 (critical 55 / high 319 / moderate 208 / low 54) | 33 (high 11 / moderate 21 / low 1) | 0 |
| `dependencies` only | 1 low | 1 low | 0 |

How:

- ddc02bc: Vue CLI 4 → 5.0.9, `yarn.lock` moved off the dead `registry.npm.taobao.org` to `registry.yarnpkg.com`.
- now: Vue 2.6 + Vue CLI 5 → Vue 3.5 + Vue Router 5 + Vite 8 + ESLint 10. Vue CLI, webpack, webpack-dev-server, Babel, `vue-template-compiler`, `core-js` and eslint-plugin-vue 9 are gone, and with them every path of the 33 findings (all of them came from those packages or from Vue 2).
- No `resolutions`, no audit ignores. CI runs `yarn audit` and fails on any finding.

The shipped bundle uses Vue's runtime-only build; `tests/build.test.js` checks the source maps for Vue compiler sources.

## Published site

`docs/` was not rebuilt in these changes, so GitHub Pages still serves the old Vue 2.6.11 runtime bundle (no template compiler inside). It changes only when `yarn build` output is committed to `docs/`.

## Browser-side (not npm)

`index.html` loads jQuery 3.4.1, Popper 1.14.7, Bootstrap 4.3.1 and Font Awesome 4.7.0 from CDNs without SRI. Not changed here.
