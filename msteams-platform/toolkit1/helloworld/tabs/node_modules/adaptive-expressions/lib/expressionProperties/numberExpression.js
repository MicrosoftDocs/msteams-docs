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
const functionUtils_1 = require("../functionUtils");
/**
 * Represents a property which is either a float or a string expression which resolves to a float.
 *
 * @remarks
 * String values are always interpreted as an expression, whether it has '=' prefix or not.
 */
class NumberExpression extends expressionProperty_1.ExpressionProperty {
    /**
     * Initializes a new instance of the [NumberExpression](xref:adaptive-expressions.NumberExpression) class.
     *
     * @param value A float `number` or `string` expression which resolves to a float `number`.
     */
    constructor(value) {
        super(value, 0);
    }
    /**
     * Set a number value.
     *
     * @param value Value to set.
     */
    setValue(value) {
        if (value != null &&
            !functionUtils_1.FunctionUtils.isNumber(value) &&
            typeof value !== 'string' &&
            !(value instanceof expression_1.Expression)) {
            throw new Error('NumberExpression accepts string, number or Expression as the value.');
        }
        super.setValue(value);
    }
}
exports.NumberExpression = NumberExpression;
//# sourceMappingURL=numberExpression.js.map