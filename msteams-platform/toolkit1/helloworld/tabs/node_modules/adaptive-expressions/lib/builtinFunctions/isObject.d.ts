/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Return true if a given input is a complex object or return false if it is a primitive object.
 * Primitive objects include strings, numbers, and Booleans;
 * complex types, contain properties.
 */
export declare class IsObject extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [IsObject](xref:adaptive-expressions.IsObject) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
}
//# sourceMappingURL=isObject.d.ts.map