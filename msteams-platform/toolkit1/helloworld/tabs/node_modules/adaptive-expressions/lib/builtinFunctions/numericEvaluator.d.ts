/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Numeric operators that can have 1 or more args.
 */
export declare class NumericEvaluator extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [NumericEvaluator](xref:adaptive-expressions.NumericEvaluator) class.
     *
     * @param type Name of the built-in function.
     * @param func The evaluation function, it takes a list of objects and returns a number.
     */
    constructor(type: string, func: (args: any[]) => any);
    /**
     * @private
     */
    private static evaluator;
}
//# sourceMappingURL=numericEvaluator.d.ts.map