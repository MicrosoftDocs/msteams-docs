/**
 * Convert PCRE regex string to RegExp
 * PCRE ref: http://www.pcre.org/.
 * PCRE antlr g4 file: CommonRegex.g4.
 */
export declare class CommonRegex {
    private static regexCache;
    /**
     * Create RegExp object from PCRE pattern string.
     *
     * @param pattern PCRE pattern string.
     * @returns RegExp object.
     */
    static CreateRegex(pattern: string): RegExp;
    /**
     * @private
     */
    private static getRegExpFromString;
    /**
     * @private
     */
    private static isCommonRegex;
    /**
     * @private
     */
    private static antlrParse;
}
//# sourceMappingURL=commonRegex.d.ts.map