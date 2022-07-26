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
 * Represents a property which is either a int or a string expression which resolves to a int.
 *
 * @remarks
 * String values are always interpreted as an expression, whether it has '=' prefix or not.
 */
class IntExpression extends expressionProperty_1.ExpressionProperty {
    /**
     * Initializes a new instance of the [IntExpression](xref:adaptive-expressions.IntExpression) class.
     *
     * @param value An int `number` or `string` expression which resolves to an int `number`.
     */
    constructor(value) {
        super(value, 0);
    }
    /**
     * Try to get the value.
     *
     * @param data Data to use for expression binding.
     * @returns Value of int number
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    tryGetValue(data) {
        const result = super.tryGetValue(data);
        if (functionUtils_1.FunctionUtils.isNumber(result.value)) {
            // Ensure returned value is an int.
            result.value = Math.trunc(result.value);
        }
        return result;
    }
    /**
     * Set an integer value.
     *
     * @param value Value to set.
     */
    setValue(value) {
        if (value != null &&
            !functionUtils_1.FunctionUtils.isNumber(value) &&
            typeof value !== 'string' &&
            !(value instanceof expression_1.Expression)) {
            throw new Error('IntExpression accepts string, number or Expression as the value.');
        }
        super.setValue(value);
    }
}
exports.IntExpression = IntExpression;
//# sourceMappingURL=intExpression.js.map