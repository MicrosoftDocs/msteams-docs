/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Wrap string interpolation to get real value.
 * For example: stringOrValue('${1}'), would get number 1
 * stringOrValue('${1} item'), would get string "1 item".
 */
export declare class StringOrValue extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [StringOrValue](xref:adaptive-expressions.StringOrValue) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
}
//# sourceMappingURL=stringOrValue.d.ts.map