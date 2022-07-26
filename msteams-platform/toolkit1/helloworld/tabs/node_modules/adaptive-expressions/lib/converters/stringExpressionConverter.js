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
 * `string` to json [StringExpression](xref:adaptive-expressions.StringExpression) converter.
 */
class StringExpressionConverter {
    /**
     * Converts a string into an [StringExpression](xref:adaptive-expressions.StringExpression).
     *
     * @param value `string` to convert.
     * @returns The [StringExpression](xref:adaptive-expressions.StringExpression).
     */
    convert(value) {
        return value instanceof expressionProperties_1.StringExpression ? value : new expressionProperties_1.StringExpression(value);
    }
}
exports.StringExpressionConverter = StringExpressionConverter;
//# sourceMappingURL=stringExpressionConverter.js.map