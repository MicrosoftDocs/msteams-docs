"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = require("../expression");
/**
 * `string` to json [Expression](xref:adaptive-expressions.Expression) converter.
 */
class ExpressionConverter {
    /**
     * Converts a `string` into an [Expression](xref:adaptive-expressions.Expression).
     *
     * @param value `string` to convert.
     * @returns The [Expression](xref:adaptive-expressions.Expression).
     */
    convert(value) {
        return value instanceof expression_1.Expression ? value : expression_1.Expression.parse(value);
    }
}
exports.ExpressionConverter = ExpressionConverter;
//# sourceMappingURL=expressionConverter.js.map