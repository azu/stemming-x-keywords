import assert from "power-assert"
import {getKeywords} from "../src/stemming-x-keywords";
describe("stemming-x-keywords-test", function () {
    it("should return array", function () {
        let text = `ESLintのルールを拡張する仕組みについて解説しています。
ESLintではJavaScriptのコードをパースして作成されたASTを元にコードのLintを行います。
実際にESLintのルールを解釈できる小さな実装を作りながらプラグインアーキテクチャについて学びます。`;
        return getKeywords(text).then(keywords => {
            assert(keywords.length > 0);
        });
    });
    it("should combination `<unknown>.<unknown>` pattern", function () {
        // 未知の単語.未知の単語
        let text = "ExNewLib.js";
        return getKeywords(text).then(keywords => {
            assert(keywords.length === 1);
            const keyword = keywords[0];
            // .を結合したものが入る
            assert.equal(keyword, text);
        });
    });
});