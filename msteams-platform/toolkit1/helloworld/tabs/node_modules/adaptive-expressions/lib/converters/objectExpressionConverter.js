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
 * `any` value to json [ObjectExpressionConverter](xref:adaptive-expressions.ObjectExpressionConverter) converter.
 *
 * @template T The type of the value.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
class ObjectExpressionConverter {
    /**
     * Converts value of type `T` into an [ObjectExpression](xref:adaptive-expressions.ObjectExpression).
     *
     * @param value Value of type `T` to convert.
     * @returns The [ObjectExpression](xref:adaptive-expressions.ObjectExpression).
     */
    convert(value) {
        return value instanceof expressionProperties_1.ObjectExpression ? value : new expressionProperties_1.ObjectExpression(value);
    }
}
exports.ObjectExpressionConverter = ObjectExpressionConverter;
//# sourceMappingURL=objectExpressionConverter.js.map