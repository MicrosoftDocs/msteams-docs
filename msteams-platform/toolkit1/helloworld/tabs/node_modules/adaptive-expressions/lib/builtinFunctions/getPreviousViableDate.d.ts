/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Return the previous viable date of a timex expression based on the current date and user's timezone.
 */
export declare class GetPreviousViableDate extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [GetPreviousViableDate](xref:adaptive-expressions.GetPreviousViableDate) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
    /**
     * @private
     */
    private static leapYear;
}
//# sourceMappingURL=getPreviousViableDate.d.ts.map