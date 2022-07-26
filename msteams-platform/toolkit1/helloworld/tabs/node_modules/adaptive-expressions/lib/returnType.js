"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type expected from evalating an expression.
 */
var ReturnType;
(function (ReturnType) {
    /**
     * True or false boolean value.
     */
    ReturnType[ReturnType["Boolean"] = 1] = "Boolean";
    /**
     * Numerical value like int, float, double, ...
     */
    ReturnType[ReturnType["Number"] = 2] = "Number";
    /**
     * Any value is possible.
     */
    ReturnType[ReturnType["Object"] = 4] = "Object";
    /**
     * String value.
     */
    ReturnType[ReturnType["String"] = 8] = "String";
    /**
     * Array value.
     */
    ReturnType[ReturnType["Array"] = 16] = "Array";
})(ReturnType = exports.ReturnType || (exports.ReturnType = {}));
//# sourceMappingURL=returnType.js.map