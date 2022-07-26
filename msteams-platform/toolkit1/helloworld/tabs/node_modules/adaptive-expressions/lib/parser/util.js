"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable security/detect-non-literal-regexp */
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * util class
 */
class Util {
    /**
     * trim char.
     *
     * @param str input string.
     * @param char trim character.
     * @returns The trimmed char.
     */
    static trim(str, char) {
        if (char !== undefined) {
            return str.replace(new RegExp(''.concat('^\\', char, '+|\\', char, '+$'), 'g'), '');
        }
        return str.trim();
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map