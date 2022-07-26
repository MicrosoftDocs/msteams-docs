/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Return the first non-null value from one or more parameters.
 * Empty strings, empty arrays, and empty objects are not null.
 */
export declare class Coalesce extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Coalesce](xref:adaptive-expressions.Coalesce) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
    /**
     * @private
     */
    private static evalCoalesce;
}
//# sourceMappingURL=coalesce.d.ts.map