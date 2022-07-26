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
 * Represents a property which is either a float or a string expression which resolves to a float.
 *
 * @remarks
 * String values are always interpreted as an expression, whether it has '=' prefix or not.
 */
export declare class NumberExpression extends ExpressionProperty<number> {
    /**
     * Initializes a new instance of the [NumberExpression](xref:adaptive-expressions.NumberExpression) class.
     *
     * @param value A float `number` or `string` expression which resolves to a float `number`.
     */
    constructor(value?: number | string | Expression);
    /**
     * Set a number value.
     *
     * @param value Value to set.
     */
    setValue(value: number | string | Expression): void;
}
//# sourceMappingURL=numberExpression.d.ts.map