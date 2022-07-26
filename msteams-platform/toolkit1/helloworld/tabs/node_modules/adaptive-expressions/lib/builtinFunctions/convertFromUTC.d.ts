/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Convert a timestamp from Universal Time Coordinated (UTC) to a target time zone.
 */
export declare class ConvertFromUTC extends ExpressionEvaluator {
    static readonly NoneUtcDefaultDateTimeFormat: string;
    /**
     * Initializes a new instance of the [ConvertFromUTC](xref:adaptive-expressions.ConvertFromUTC) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
    /**
     * @private
     */
    private static evalConvertFromUTC;
    /**
     * @private
     */
    private static validator;
}
//# sourceMappingURL=convertFromUTC.d.ts.map