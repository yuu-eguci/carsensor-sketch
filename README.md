carsensor-sketch
===

Vue.js 3 と Bootstrap 4 で、カーセンサーアプリっぽい画面を真似したもの。

- Docker: 対応!
- Node: 24.22.1
- Linter: ESLint
- Test: node:test

## パッと実行してみたい

```
docker compose up --build
```

[ローカル画面](http://localhost:8080/carsensor-sketch/) で試せる。

lint とテストはこれ。

```
docker compose run --rm app yarn lint
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

`docs/` に出力される。GitHub Pages はここを配信してるので、公開を更新したいときだけ実行する。確認だけなら `yarn build --outDir dist`。

### Lints files
```
yarn lint
```

### Run tests
```
yarn test
```

### ビルド設定
[Vite の設定](https://vite.dev/config/) を参照。

## GitHub Pages

https://yuu-eguci.github.io/carsensor-sketch/
