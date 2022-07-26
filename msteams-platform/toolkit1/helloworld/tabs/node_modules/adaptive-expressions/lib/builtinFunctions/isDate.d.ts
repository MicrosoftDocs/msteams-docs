/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Return true if a given `TimexProperty` or timex string refers to a valid date.
 * Valid dates contain the month and dayOfMonth, or contain the dayOfWeek.
 */
export declare class IsDate extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [IsDate](xref:adaptive-expressions.IsDate) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
}
//# sourceMappingURL=isDate.d.ts.map