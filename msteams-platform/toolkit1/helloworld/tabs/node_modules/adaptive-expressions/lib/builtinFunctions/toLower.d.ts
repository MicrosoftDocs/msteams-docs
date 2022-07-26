/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { StringTransformEvaluator } from './stringTransformEvaluator';
/**
 * Return a string in lowercase format.
 * If a character in the string doesn't have a lowercase version, that character stays unchanged in the returned string.
 */
export declare class ToLower extends StringTransformEvaluator {
    /**
     * Initializes a new instance of the [ToLower](xref:adaptive-expressions.ToLower) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
}
//# sourceMappingURL=toLower.d.ts.map