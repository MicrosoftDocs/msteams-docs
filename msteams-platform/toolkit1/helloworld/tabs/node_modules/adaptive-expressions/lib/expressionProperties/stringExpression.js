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
 * Represents a property which is either a string value or a string expression.
 *
 * @remarks
 * If the value is
 * - a string with '=' prefix then the string is treated as an expression to resolve to a string.
 * - a string without '=' then value is treated as string with string interpolation.
 * - You can escape the '=' prefix by putting a backslash.
 * Examples:
 *     prop = "Hello @{user.name}" => "Hello Joe"
 *     prop = "=length(user.name)" => "3"
 *     prop = "=user.name" => "Joe"
 *     prop = "\=user" => "=user".
 */
class StringExpression extends expressionProperty_1.ExpressionProperty {
    /**
     * Initializes a new instance of the [StringExpression](xref:adaptive-expressions.StringExpression) class.
     *
     * @param value A `string` value or a `string` expression.
     */
    constructor(value) {
        super(value);
    }
    /**
     * Set a string value.
     *
     * @param value Value to set.
     */
    setValue(value) {
        // reset state to no value or expression
        super.setValue(undefined);
        if (value instanceof expression_1.Expression) {
            super.setValue(value);
            return;
        }
        if (typeof value === 'string') {
            if (value.startsWith('=')) {
                this.expressionText = value;
                return;
            }
            else if (value.startsWith('\\=')) {
                // Trim off the escape char for equals (\=foo) should simply be the string (=foo).
                value = value.substr(1);
            }
            // keep the string as quoted expression, which will be literal unless string interpolation is used.
            this.expressionText = `=\`${value.replace('`', '\\`')}\``;
            return;
        }
        if (value != null) {
            throw new Error('StringExpression accepts string or Expression as the value.');
        }
    }
}
exports.StringExpression = StringExpression;
//# sourceMappingURL=stringExpression.js.map