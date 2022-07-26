/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator, ValidateExpressionDelegate } from '../expressionEvaluator';
import { VerifyExpression } from '../functionUtils';
/**
 * Comparison operators.
 * A comparison operator returns false if the comparison is false, or there is an error.  This prevents errors from short-circuiting boolean expressions.
 */
export declare class ComparisonEvaluator extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [ComparisonEvaluator](xref:adaptive-expressions.ComparisonEvaluator) class.
     *
     * @param type Name of the built-in function.
     * @param func The comparison function, it takes a list of objects and returns a boolean.
     * @param validator [ValidateExpressionDelegate](xref:adaptive-expressions.ValidateExpressionDelegate) for input arguments.
     * @param verify Optional. [VerifyExpression](xref:adaptive-expressions.VerifyExpression) function to verify each child's result.
     */
    constructor(type: string, func: (arg0: any[]) => boolean, validator: ValidateExpressionDelegate, verify?: VerifyExpression);
    /**
     * @private
     */
    private static evaluator;
}
//# sourceMappingURL=comparisonEvaluator.d.ts.map