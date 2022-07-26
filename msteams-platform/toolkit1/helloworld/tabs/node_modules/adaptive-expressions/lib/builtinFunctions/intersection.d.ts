/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Return a collection that has only the common items across the specified collections.
 * To appear in the result, an item must appear in all the collections passed to this function.
 * If one or more items have the same name,
 * the last item with that name appears in the result.
 */
export declare class Intersection extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Intersection](xref:adaptive-expressions.Intersection) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
    /**
     * @private
     */
    private static validator;
}
//# sourceMappingURL=intersection.d.ts.map