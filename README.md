# carsensor-sketch

- Docker: 対応!
- Node: 24.22.1
- Linter: ESLint
- Test: node:test

Vue.js 2 と Bootstrap 4 で、カーセンサーアプリっぽい画面を真似してみたやつ。

## クイックスタート

```
docker compose up --build
```

http://localhost:8080/carsensor-sketch/ で見れる。

lint とテストはこれ。

```
docker compose run --rm app yarn lint --no-fix
docker compose run --rm app yarn test
```

`yarn test` はビルドも一時ディレクトリで回すので、`docs/` は変わらない。

## ローカルで動かす

Node は `.nvmrc` の 24.22.1 を使う。

### Project setup
```
yarn install --frozen-lockfile --ignore-scripts
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

`docs/` に出力される。GitHub Pages はここを配信してるので、公開を更新したいときだけ実行する。確認だけなら `yarn build --dest dist`。

### Lints and fixes files
```
yarn lint
```

### Run tests
```
yarn test
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## GitHub Pages

https://yuu-eguci.github.io/carsensor-sketch/
