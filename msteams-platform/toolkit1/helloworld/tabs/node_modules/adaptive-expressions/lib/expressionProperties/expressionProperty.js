"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const expression_1 = require("../expression");
/**
 * Base class which defines an Expression or value for a property.
 *
 * @param T Type of value of the expression property.
 */
class ExpressionProperty {
    /**
     * Initializes a new instance of the [ExpressionProperty<T>](xref:adaptive-expressions.ExpressionProperty) class.
     *
     * @param value Optional. Raw value of the expression property.
     * @param defaultValue Optional. Default value for the property.
     */
    constructor(value, defaultValue) {
        this.defaultValue = defaultValue;
        this.setValue(value);
    }
    /**
     * Convert an expression property to string.
     *
     * @returns The converted string.
     */
    toString() {
        if (this.expressionText) {
            return `=${this.expressionText.replace(/^=/, '')}`;
        }
        return this.value ? this.value.toString() : '';
    }
    /**
     * This will return the existing expression if the value is non-complex type.
     *
     * @returns The existing expression if the value is non-complex type.
     */
    toExpression() {
        if (this.expression) {
            return this.expression;
        }
        if (this.expressionText) {
            this.expression = expression_1.Expression.parse(this.expressionText.replace(/^=/, ''));
            return this.expression;
        }
        // Generate expression
        switch (typeof this.value) {
            case 'string':
            case 'number':
            case 'boolean':
                this.expression = expression_1.Expression.parse(this.value.toString());
                break;
            default:
                if (this.value === undefined) {
                    this.expression = expression_1.Expression.parse('undefined');
                }
                else if (this.value === null) {
                    this.expression = expression_1.Expression.parse('null');
                }
                else {
                    this.expression = expression_1.Expression.parse(`json(${JSON.stringify(this.value)})`);
                }
                break;
        }
        return this.expression;
    }
    /**
     * Get the value.
     *
     * @remarks
     * An error will be thrown if value is an invalid expression.
     * @param data Data to use for expression binding.
     * @returns The value.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    getValue(data) {
        const { value, error } = this.tryGetValue(data);
        if (error) {
            throw error;
        }
        return value;
    }
    /**
     * Try to Get the value.
     *
     * @param data Data to use for expression binding.
     * @returns the value or an error.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    tryGetValue(data) {
        if (!this.expression && this.expressionText) {
            try {
                this.expression = expression_1.Expression.parse(this.expressionText.replace(/^=/, ''));
            }
            catch (error) {
                return { value: undefined, error: error.message };
            }
        }
        if (this.expression) {
            return this.expression.tryEvaluate(data);
        }
        return { value: this.value, error: undefined };
    }
    /**
     * Set the value.
     *
     * @param value Value to set.
     */
    setValue(value) {
        this.value = this.defaultValue;
        this.expression = undefined;
        this.expressionText = undefined;
        if (typeof value == 'string') {
            this.expressionText = value.replace(/^=/, '');
        }
        else if (value instanceof expression_1.Expression) {
            this.expression = value;
            this.expressionText = value.toString();
        }
        else if (value !== undefined) {
            this.value = value;
        }
    }
}
exports.ExpressionProperty = ExpressionProperty;
//# sourceMappingURL=expressionProperty.js.map