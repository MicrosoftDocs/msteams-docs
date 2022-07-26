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
 * `string` or `number` to json [NumberExpression](xref:adaptive-expressions.NumberExpression) converter.
 */
class NumberExpressionConverter {
    /**
     * Converts a `string` or `number` into a [NumberExpression](xref:adaptive-expressions.NumberExpression).
     *
     * @param value `string` or `number` to convert.
     * @returns The [NumberExpression](xref:adaptive-expressions.NumberExpression).
     */
    convert(value) {
        return value instanceof expressionProperties_1.NumberExpression ? value : new expressionProperties_1.NumberExpression(value);
    }
}
exports.NumberExpressionConverter = NumberExpressionConverter;
//# sourceMappingURL=numberExpressionConverter.js.map