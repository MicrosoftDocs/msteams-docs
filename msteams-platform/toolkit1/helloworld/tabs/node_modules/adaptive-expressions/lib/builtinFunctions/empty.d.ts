/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ComparisonEvaluator } from './comparisonEvaluator';
/**
 * Check whether an instance is empty. Return true if the input is empty. Empty means:
 * 1.Input is null or undefined.
 * 2.Input is a null or empty string.
 * 3.Input is zero size collection.
 * 4.Input is an object with no property.
 */
export declare class Empty extends ComparisonEvaluator {
    /**
     * Initializes a new instance of the [Empty](xref:adaptive-expressions.Empty) class.
     */
    constructor();
    /**
     * @private
     */
    private static func;
    /**
     * @private
     */
    private static isEmpty;
}
//# sourceMappingURL=empty.d.ts.map