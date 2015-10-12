// LICENSE : MIT
"use strict";
import kuromoji from "kuromoji";
import arrayUniq from "array-uniq";
const options = {dicPath: "./node_modules/kuromoji/dist/dict/"};
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
function toWord(dic) {
    return dic.surface_form;
}
function computeXDictionaries(words) {
    let results = [];
    for (let i = 0; i < words.length; i++) {
        let currentWord = words[i];
        let nextWord = words[i + 1];
        let combinationWord = words[i + 2];
        if (nextWord === "." && combinationWord !== undefined) {
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
    return arrayUniq(combinedWords);
}
export function getKeywords(text) {
    return getTokenizer().then(tokenizer => {
        let results = tokenizer.tokenize(text);
        return filterXKeywords(results)
    });
}