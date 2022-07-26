/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
import { VerifyExpression } from '../functionUtils';
/**
 * Numeric operators that can have 2 or more args.
 */
export declare class MultivariateNumericEvaluator extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [MultivariateNumericEvaluator](xref:adaptive-expressions.MultivariateNumericEvaluator) class.
     *
     * @param type Name of the built-in function.
     * @param func The evaluation function, it takes a list of objects and returns a number.
     * @param verify Optional. [VerifyExpression](xref:adaptive-expressions.VerifyExpression) function to verify each child's result.
     */
    constructor(type: string, func: (args: any[]) => number, verify?: VerifyExpression);
    /**
     * @private
     */
    private static evaluator;
}
//# sourceMappingURL=multivariateNumericEvaluator.d.ts.map