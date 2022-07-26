/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Return a collection that has all the items from the specified collections.
 * To appear in the result, an item can appear in any collection passed to this function.
 * If one or more items have the same name, the last item with that name appears in the result.
 */
export declare class Union extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Union](xref:adaptive-expressions.Union) class.
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
//# sourceMappingURL=union.d.ts.map