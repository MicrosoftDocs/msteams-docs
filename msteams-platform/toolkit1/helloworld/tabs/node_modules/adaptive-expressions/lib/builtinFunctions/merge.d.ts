/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Merge multiple object(json) into one object(json).
 * If the item is array, the elements of the array are merged as well.
 */
export declare class Merge extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Merge](xref:adaptive-expressions.Merge) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
    private static parseToObjectList;
}
//# sourceMappingURL=merge.d.ts.map