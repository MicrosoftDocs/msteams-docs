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
 * Represents a property which is either a boolean or a string expression which resolves to a boolean.
 *
 * @remarks
 * String values are always interpreted as an expression, whether it has '=' prefix or not.
 */
class BoolExpression extends expressionProperty_1.ExpressionProperty {
    /**
     * Initializes a new instance of the [BoolExpression](xref:adaptive-expressions.BoolExpression) class.
     *
     * @param value A `boolean` or a `string` expression which resolves to a `boolean`.
     */
    constructor(value) {
        super(value, false);
    }
    /**
     * Set a boolean value.
     *
     * @param value Value to set.
     */
    setValue(value) {
        if (value != null &&
            typeof value !== 'boolean' &&
            typeof value !== 'string' &&
            !(value instanceof expression_1.Expression)) {
            throw new Error('BoolExpression accepts string, boolean or Expression as the value.');
        }
        super.setValue(value);
    }
}
exports.BoolExpression = BoolExpression;
//# sourceMappingURL=boolExpression.js.map