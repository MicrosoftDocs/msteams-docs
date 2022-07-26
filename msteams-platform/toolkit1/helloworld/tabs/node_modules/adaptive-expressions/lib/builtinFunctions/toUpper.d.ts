/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { StringTransformEvaluator } from './stringTransformEvaluator';
/**
 * Return a string in uppercase format.
 * If a character in the string doesn't have an uppercase version, that character stays unchanged in the returned string.
 */
export declare class ToUpper extends StringTransformEvaluator {
    /**
     * Initializes a new instance of the [ToUpper](xref:adaptive-expressions.ToUpper) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
}
//# sourceMappingURL=toUpper.d.ts.map