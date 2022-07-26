/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { BoolExpression } from '../expressionProperties';
import { Expression } from '../expression';
declare type Input = boolean | string | Expression;
/**
 * `any` value to json [BoolExpression](xref:adaptive-expressions.BoolExpression) converter.
 */
export declare class BoolExpressionConverter {
    /**
     * Converts `any` value into a [BoolExpression](xref:adaptive-expressions.BoolExpression).
     *
     * @param value `any` value to convert.
     * @returns The [BoolExpression](xref:adaptive-expressions.BoolExpression).
     */
    convert(value: Input | BoolExpression): BoolExpression;
}
export {};
//# sourceMappingURL=boolExpressionConverter.d.ts.map