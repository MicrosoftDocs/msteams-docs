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
 * `any` value to json [ValueExpression](xref:adaptive-expressions.ValueExpression) converter.
 */
class ValueExpressionConverter {
    /**
     * Converts `any` value into a [ValueExpression](xref:adaptive-expressions.ValueExpression).
     *
     * @param value `any` value to convert.
     * @returns The [ValueExpression](xref:adaptive-expressions.ValueExpression).
     */
    convert(value) {
        return value instanceof expressionProperties_1.ValueExpression ? value : new expressionProperties_1.ValueExpression(value);
    }
}
exports.ValueExpressionConverter = ValueExpressionConverter;
//# sourceMappingURL=valueExpressionConverter.js.map