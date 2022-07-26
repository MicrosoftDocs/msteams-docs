/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Expression } from './expression';
/**
 * Construct an expression constant.
 */
export declare class Constant extends Expression {
    private readonly singleQuotRegex;
    /**
     * Constant value.
     *
     * @returns The value.
     */
    /**
    * Sets constant value.
    */
    value: any;
    private _value;
    /**
     * Initializes a new instance of the [Constant](xref:adaptive-expressions.Constant) class.
     * Constructs an expression constant.
     *
     * @param value Constant value.
     */
    constructor(value: any);
    /**
     * Determines if the current [Expression](xref:adaptive-expressions.Expression) instance is deep equal to another one.
     *
     * @param other The other [Expression](xref:adaptive-expressions.Expression) instance to compare.
     * @returns A boolean value indicating whether the two expressions are deep equal (`true`) or not (`false`).
     */
    deepEquals(other: Expression): boolean;
    /**
     * Returns a string that represents the current constant object.
     *
     * @returns A string that represents the current constant object.
     */
    toString(): string;
    /**
     * @private
     */
    private reverseString;
}
//# sourceMappingURL=constant.d.ts.map