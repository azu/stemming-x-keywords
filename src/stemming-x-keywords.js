// LICENSE : MIT
"use strict";
import kuromoji from "kuromoji";
import arrayUniq from "array-uniq";
import path from "path";
const kuromojiDir = require.resolve("kuromoji");
const options = {dicPath: path.join(kuromojiDir, "../../dict") + "/"};
function getTokenizer() {
    return new Promise((resolve, reject) => {
        kuromoji.builder(options).build(function (err, tokenizer) {
            if (err) {
                return reject(err);
            }
            resolve(tokenizer);
        });
    });
}
function isNotWhitespace(dic) {
    if (!dic.surface_form) {
        return false
    }
    return dic.surface_form.trim().length !== 0;
}
// 1文字以下ではない
function isNotChar(word) {
    return word.length > 1;
}
function toWord(dic) {
    return dic.surface_form;
}
const PunctuationRegExp = /[./\-]/i;
function computeXDictionaries(words) {
    let results = [];
    for (let i = 0; i < words.length; i++) {
        let currentWord = words[i];
        let nextWord = words[i + 1];
        let combinationWord = words[i + 2];
        if (PunctuationRegExp.test(nextWord) && combinationWord !== undefined) {
            results.push(currentWord + nextWord + combinationWord);
            i += 2;
        } else {
            results.push(currentWord)
        }
    }
    return results;
}
function filterXKeywords(dictionaries) {
    let xDicts = dictionaries.filter(isNotWhitespace).filter(dic => {
        // unknown word
        if (dic.word_type === "UNKNOWN") {
            return dic;
        }
    });
    let combinedWords = computeXDictionaries(xDicts.map(toWord));
    return arrayUniq(combinedWords.filter(isNotChar));
}
let cacheTokenizer;
export function getKeywords(text) {
    if (cacheTokenizer) {
        let results = cacheTokenizer.tokenize(text);
        return Promise.resolve(filterXKeywords(results));
    }
    return getTokenizer().then(tokenizer => {
        cacheTokenizer = tokenizer;
        let results = tokenizer.tokenize(text);
        return filterXKeywords(results)
    });
}