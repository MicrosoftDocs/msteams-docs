/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Check JSON or a JSON string for nodes or values that match a path expression, and return the matching nodes.
 */
export declare class JPath extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [JPath](xref:adaptive-expressions.JPath) class.
     */
    constructor();
    /**
     * @private
     */
    private static evaluator;
    /**
     * @private
     */
    private static evalJPath;
    /**
     * @private
     */
    private static validator;
}
//# sourceMappingURL=jPath.d.ts.map