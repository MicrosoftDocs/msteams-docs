"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const expressionProperty_1 = require("./expressionProperty");
const expression_1 = require("../expression");
/**
 * Represents a property which is either a value of array of T or a string expression to bind to a
 * array of T.
 *
 * @remarks
 * String values are always interpreted as an expression, whether it has '=' prefix or not.
 * @param T Type of object in the array.
 */
class ArrayExpression extends expressionProperty_1.ExpressionProperty {
    /**
     * Initializes a new instance of the [ArrayExpression<T>](xref:adaptive-expressions.ArrayExpression) class.
     *
     * @param value Value of `T[]` or a `string` expression to bind to a `T[]`.
     */
    constructor(value) {
        super(value);
    }
    /**
     * Set an array value.
     *
     * @param value Value to set.
     */
    setValue(value) {
        if (value != null && !Array.isArray(value) && typeof value !== 'string' && !(value instanceof expression_1.Expression)) {
            throw new Error('ArrayExpression accepts string, array or Expression as the value.');
        }
        super.setValue(value);
    }
}
exports.ArrayExpression = ArrayExpression;
//# sourceMappingURL=arrayExpression.js.map