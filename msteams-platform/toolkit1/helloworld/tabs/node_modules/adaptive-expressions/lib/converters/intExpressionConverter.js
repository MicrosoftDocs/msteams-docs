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
 * `string` or `number` to json [IntExpression](xref:adaptive-expressions.IntExpression) converter.
 */
class IntExpressionConverter {
    /**
     * Converts a `string` or `number` into an [IntExpression](xref:adaptive-expressions.IntExpression).
     *
     * @param value `string` or `number` to convert.
     * @returns The [IntExpression](xref:adaptive-expressions.IntExpression).
     */
    convert(value) {
        return value instanceof expressionProperties_1.IntExpression ? value : new expressionProperties_1.IntExpression(value);
    }
}
exports.IntExpressionConverter = IntExpressionConverter;
//# sourceMappingURL=intExpressionConverter.js.map