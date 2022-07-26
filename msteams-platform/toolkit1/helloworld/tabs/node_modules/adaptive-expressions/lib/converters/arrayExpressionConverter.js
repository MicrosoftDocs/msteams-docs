"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expressionProperties_1 = require("../expressionProperties");
/**
 * `array` to json [ArrayExpression](xref:adaptive-expressions.ArrayExpression) converter.
 *
 * @template T The type of the items of the array.
 */
class ArrayExpressionConverter {
    /**
     * Converts an array into an [ArrayExpression](xref:adaptive-expressions.ArrayExpression).
     *
     * @param value `array` to convert.
     * @returns The [ArrayExpression](xref:adaptive-expressions.ArrayExpression).
     */
    convert(value) {
        return value instanceof expressionProperties_1.ArrayExpression ? value : new expressionProperties_1.ArrayExpression(value);
    }
}
exports.ArrayExpressionConverter = ArrayExpressionConverter;
//# sourceMappingURL=arrayExpressionConverter.js.map