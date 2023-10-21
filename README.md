# fooocus infotext

![logo image](./logo/logo.png)

[![Test](https://github.com/shinshin86/fooocus-infotext/actions/workflows/test.yml/badge.svg)](https://github.com/shinshin86/fooocus-infotext/actions/workflows/test.yml)

[Fooocus](https://github.com/lllyasviel/Fooocus)で出力されたログ画面からStable Diffusion web UIなどで利用できるinfotextを抽出するためのChrome拡張機能です。


## Usage
Chrome拡張機能を有効にした状態でFooocusのログ画面を開くと`生成情報をコピー`ボタンが各画像毎に追加されます。  
こちらをクリックすると、`infotext`形式でクリップボードにコピーされるので、そのままStable Diffusion web UIのプロンプト欄に貼り付けて利用してください。


## Development

### test

```sh
npm run test
```

### format

内部で`deno fmt`を用いているため、`deno` を開発マシンから利用できるようにしておく必要があります。

```sh
npm run fmt
```

## License

MIT