/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Expression } from '../expression';
/**
 * `string` to json [Expression](xref:adaptive-expressions.Expression) converter.
 */
export declare class ExpressionConverter {
    /**
     * Converts a `string` into an [Expression](xref:adaptive-expressions.Expression).
     *
     * @param value `string` to convert.
     * @returns The [Expression](xref:adaptive-expressions.Expression).
     */
    convert(value: string | Expression): Expression;
}
//# sourceMappingURL=expressionConverter.d.ts.map