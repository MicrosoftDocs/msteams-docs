/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { EnumExpression } from '../expressionProperties';
import { Expression } from '../expression';
declare type Input<T> = T | string | Expression;
/**
 * `string` to json [EnumExpression](xref:adaptive-expressions.EnumExpression) converter.
 */
export declare class EnumExpressionConverter<T> {
    private readonly enumValue;
    private readonly lowercaseIndex;
    /**
     * Initializes a new instance of the [EnumExpressionConverter](xref:adaptive-expressions.EnumExpressionConverter) class.
     *
     * @param enumValue The enum value of the `string` to convert.
     */
    constructor(enumValue: unknown);
    /**
     * Converts a `string` into an [EnumExpression](xref:adaptive-expressions.EnumExpression).
     *
     * @param value `string` to convert.
     * @returns The [EnumExpression](xref:adaptive-expressions.EnumExpression).
     */
    convert(value: Input<T> | EnumExpression<T>): EnumExpression<T>;
}
export {};
//# sourceMappingURL=enumExpressionConverter.d.ts.map