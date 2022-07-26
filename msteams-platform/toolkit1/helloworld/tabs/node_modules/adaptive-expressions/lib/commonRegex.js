"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable security/detect-non-literal-regexp */
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const antlr4ts_1 = require("antlr4ts");
const lru_cache_1 = __importDefault(require("lru-cache"));
const generated_1 = require("./generated");
const regexErrorListener_1 = require("./regexErrorListener");
// tslint:disable-next-line: completed-docs
/**
 * Convert PCRE regex string to RegExp
 * PCRE ref: http://www.pcre.org/.
 * PCRE antlr g4 file: CommonRegex.g4.
 */
class CommonRegex {
    /**
     * Create RegExp object from PCRE pattern string.
     *
     * @param pattern PCRE pattern string.
     * @returns RegExp object.
     */
    static CreateRegex(pattern) {
        let result;
        if (pattern && this.regexCache.has(pattern)) {
            result = this.regexCache.get(pattern);
        }
        else {
            if (!pattern || !this.isCommonRegex(pattern)) {
                throw new Error(`'${pattern}' is not a valid regex.`);
            }
            result = this.getRegExpFromString(pattern);
            this.regexCache.set(pattern, result);
        }
        return result;
    }
    /**
     * @private
     */
    static getRegExpFromString(pattern) {
        const flags = ['(?i)', '(?m)', '(?s)'];
        let flag = '';
        flags.forEach((e) => {
            if (pattern.includes(e)) {
                flag += e.substr(2, 1);
                pattern = pattern.replace(e, '');
            }
        });
        let regexp;
        if (flag) {
            regexp = new RegExp(`${pattern}`, flag);
        }
        else {
            regexp = new RegExp(`${pattern}`);
        }
        return regexp;
    }
    /**
     * @private
     */
    static isCommonRegex(pattern) {
        try {
            this.antlrParse(pattern);
        }
        catch (_a) {
            return false;
        }
        return true;
    }
    /**
     * @private
     */
    static antlrParse(pattern) {
        const inputStream = new antlr4ts_1.ANTLRInputStream(pattern);
        const lexer = new generated_1.CommonRegexLexer(inputStream);
        lexer.removeErrorListeners();
        const tokenStream = new antlr4ts_1.CommonTokenStream(lexer);
        const parser = new generated_1.CommonRegexParser(tokenStream);
        parser.removeErrorListeners();
        // tslint:disable-next-line: no-use-before-declare
        parser.addErrorListener(regexErrorListener_1.RegexErrorListener.Instance);
        parser.buildParseTree = true;
        return parser.parse();
    }
}
CommonRegex.regexCache = new lru_cache_1.default(15);
exports.CommonRegex = CommonRegex;
//# sourceMappingURL=commonRegex.js.map