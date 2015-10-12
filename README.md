# stemming-x-keywords

Get stemming unknown keywords.

[kuromoji.js](https://github.com/takuyaa/kuromoji.js "kuromoji.js")を使い形態素解析された単語から、
未知の単語をキーワードとして抽出します。

## 目的

短い技術文章からキーワードらしいものを抽出する目的で実装されています。
技術用語など専門分野の単語は辞書にはないため、`word_type: UNKNOWN`となることを利用してそれをキーワードとして取り出します。

## Installation

    npm install stemming-x-keywords

## Usage

```js
import {getKeywords} from "gstemming-x-keywords";
let text = `ESLintのルールを拡張する仕組みについて解説しています。
ESLintではJavaScriptのコードをパースして作成されたASTを元にコードのLintを行います。
実際にESLintのルールを解釈できる小さな実装を作りながらプラグインの仕組みについて学びます。`;
getKeywords(text).then(keywords => {
    console.log(keywords);
    // [ 'ESLint', 'JavaScript', 'AST', 'Lint', 'プラグインアーキテクチャ' ]
});
```

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT