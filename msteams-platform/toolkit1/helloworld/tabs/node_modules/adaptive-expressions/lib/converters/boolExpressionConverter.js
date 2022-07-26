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
 * `any` value to json [BoolExpression](xref:adaptive-expressions.BoolExpression) converter.
 */
class BoolExpressionConverter {
    /**
     * Converts `any` value into a [BoolExpression](xref:adaptive-expressions.BoolExpression).
     *
     * @param value `any` value to convert.
     * @returns The [BoolExpression](xref:adaptive-expressions.BoolExpression).
     */
    convert(value) {
        return value instanceof expressionProperties_1.BoolExpression ? value : new expressionProperties_1.BoolExpression(value);
    }
}
exports.BoolExpressionConverter = BoolExpressionConverter;
//# sourceMappingURL=boolExpressionConverter.js.map