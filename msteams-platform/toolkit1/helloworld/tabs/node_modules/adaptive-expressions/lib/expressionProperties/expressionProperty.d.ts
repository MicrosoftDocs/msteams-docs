/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Expression } from '../expression';
/**
 * Base class which defines an Expression or value for a property.
 *
 * @param T Type of value of the expression property.
 */
export declare class ExpressionProperty<T> {
    private defaultValue;
    private expression;
    /**
     * Initializes a new instance of the [ExpressionProperty<T>](xref:adaptive-expressions.ExpressionProperty) class.
     *
     * @param value Optional. Raw value of the expression property.
     * @param defaultValue Optional. Default value for the property.
     */
    constructor(value?: T | string | Expression, defaultValue?: T);
    /**
     * Gets or sets the raw value of the expression property.
     */
    value: T;
    /**
     * Getes or sets the expression text to evaluate to get the value.
     */
    expressionText: string;
    /**
     * Convert an expression property to string.
     *
     * @returns The converted string.
     */
    toString(): string;
    /**
     * This will return the existing expression if the value is non-complex type.
     *
     * @returns The existing expression if the value is non-complex type.
     */
    toExpression(): Expression;
    /**
     * Get the value.
     *
     * @remarks
     * An error will be thrown if value is an invalid expression.
     * @param data Data to use for expression binding.
     * @returns The value.
     */
    getValue(data: object): T;
    /**
     * Try to Get the value.
     *
     * @param data Data to use for expression binding.
     * @returns the value or an error.
     */
    tryGetValue(data: object): {
        value: T;
        error: Error;
    };
    /**
     * Set the value.
     *
     * @param value Value to set.
     */
    setValue(value: T | string | Expression): void;
}
//# sourceMappingURL=expressionProperty.d.ts.map