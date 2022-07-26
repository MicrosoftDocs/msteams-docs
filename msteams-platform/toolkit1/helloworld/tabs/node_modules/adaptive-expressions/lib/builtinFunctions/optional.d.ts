/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * For the MostSpecificSelector, this is a short hand so that instead of having to do A &amp; B || A you can do A &amp; optional(B) to mean the same thing.
 */
export declare class Optional extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Optional](xref:adaptive-expressions.Optional) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
}
//# sourceMappingURL=optional.d.ts.map