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

Method (same before and after): `yarn audit --summary` with yarn 1.22.22 on a copy of `package.json` + `yarn.lock`.

| | before (5df6582) | after |
|---|---|---|
| all | 636 (critical 55 / high 319 / moderate 208 / low 54) | 33 (critical 0 / high 11 / moderate 21 / low 1) |
| `dependencies` only | 1 low | 1 low |

How: Vue CLI 4 → 5.0.9, `yarn.lock` moved off the dead `registry.npm.taobao.org` to `registry.yarnpkg.com`, and only the build tooling was re-resolved to the latest versions inside its ranges. `vue` 2.6.11, `vue-router` 3.1.6, `core-js` 3.6.1 stay the same. No `resolutions`, no audit ignores.

### What is left and why

The 33 rows are 21 unique advisories; `yarn audit` counts each path. The table counts unique advisories.

| package (severity) | path | impact | why not fixed |
|---|---|---|---|
| vue (low, GHSA-5j4c-8p2g-v4jx / CVE-2024-9506) | `vue` | ReDoS in the template compiler's `parseHTML`. The shipped bundle uses `vue/dist/vue.runtime.esm.js` (Vue CLI alias `vue$`), and the bundle source maps contain no compiler sources, so the vulnerable code is not shipped. | No 2.x fix. Vue 2 is EOL. |
| vue-template-compiler (moderate, GHSA-g3ch-rx76-35fx) | `vue-template-compiler` | Client-side XSS when compiling untrusted templates. Here it only compiles our own `.vue` files at build time. | No 2.x fix. |
| webpack-dev-server 4 (6 moderate), webpack-dev-middleware (high), sockjs → uuid (moderate), selfsigned → node-forge (high) | `@vue/cli-service > webpack-dev-server > ...` | `yarn serve` only: source exposure / CSRF / DoS while the dev server runs. compose binds it to 127.0.0.1. Not in the built site. | `@vue/cli-service@5` requires webpack-dev-server ^4. Fixes are in 5.2.x. |
| postcss 7 (2 high, 3 moderate), postcss-selector-parser (moderate) | `@vue/cli-service > @vue/component-compiler-utils > postcss`, `@vue/vue-loader-v15 > ...` | Build-time CSS processing of our own styles. | Vue 2 SFC compiler utils pin postcss 7. |
| serialize-javascript (high, moderate) | `@vue/cli-service > copy-webpack-plugin > serialize-javascript` | Build-time only, no untrusted input. | Pinned by copy-webpack-plugin 9 in Vue CLI 5. |
| braces (high), cross-spawn (high) | `@vue/cli-plugin-eslint > eslint-webpack-plugin > micromatch`, `@vue/cli-plugin-eslint > yorkie > execa` | Lint tooling only. Installs use `--ignore-scripts`, so yorkie does not touch git hooks. | Pinned inside `@vue/cli-plugin-eslint@5`. |

Also: eslint 8.57.1 is EOL upstream, but `@vue/cli-plugin-eslint@5` does not support eslint 9.

Clearing the rest needs leaving Vue CLI (for example Vite + Vue 2.7, or Vue 3). That was out of scope for this change.

## Browser-side (not npm)

`public/index.html` loads jQuery 3.4.1, Popper 1.14.7, Bootstrap 4.3.1 and Font Awesome 4.7.0 from CDNs without SRI. Not changed here.
