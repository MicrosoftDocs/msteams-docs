/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Mark a clause so that MostSpecificSelector will ignore it.
 * MostSpecificSelector considers A &amp; B to be more specific than A, but some clauses are unique and incomparable.
 *
 */
export declare class Ignore extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Ignore](xref:adaptive-expressions.Ignore) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
}
//# sourceMappingURL=ignore.d.ts.map