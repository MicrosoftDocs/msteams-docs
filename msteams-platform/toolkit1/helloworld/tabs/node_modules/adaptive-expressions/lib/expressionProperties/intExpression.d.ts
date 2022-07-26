/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionProperty } from './expressionProperty';
import { Expression } from '../expression';
/**
 * Represents a property which is either a int or a string expression which resolves to a int.
 *
 * @remarks
 * String values are always interpreted as an expression, whether it has '=' prefix or not.
 */
export declare class IntExpression extends ExpressionProperty<number> {
    /**
     * Initializes a new instance of the [IntExpression](xref:adaptive-expressions.IntExpression) class.
     *
     * @param value An int `number` or `string` expression which resolves to an int `number`.
     */
    constructor(value?: number | string | Expression);
    /**
     * Try to get the value.
     *
     * @param data Data to use for expression binding.
     * @returns Value of int number
     */
    tryGetValue(data: object): {
        value: number;
        error: Error;
    };
    /**
     * Set an integer value.
     *
     * @param value Value to set.
     */
    setValue(value: number | string | Expression): void;
}
//# sourceMappingURL=intExpression.d.ts.map