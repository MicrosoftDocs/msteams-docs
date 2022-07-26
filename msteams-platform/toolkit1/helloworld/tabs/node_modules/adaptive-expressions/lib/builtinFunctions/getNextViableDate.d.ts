/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Return the next viable date of a timex expression based on the current date and user's timezone.
 */
export declare class GetNextViableDate extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [GetNextViableDate](xref:adaptive-expressions.GetNextViableDate) class.
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
//# sourceMappingURL=getNextViableDate.d.ts.map