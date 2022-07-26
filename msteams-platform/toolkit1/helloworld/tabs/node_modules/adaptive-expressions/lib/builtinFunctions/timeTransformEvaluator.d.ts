/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from '../expressionEvaluator';
/**
 * Evaluator that transforms a datetime to another datetime.
 */
export declare class TimeTransformEvaluator extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [TimeTransformEvaluator](xref:adaptive-expressions.TimeTransformEvaluator) class.
     *
     * @param type Name of the built-in function.
     * @param func The evaluation function, it takes a timestamp and the number of transformation, and returns a `Date`.
     */
    constructor(type: string, func: (timestamp: Date, numOfTransformation: number) => Date);
    /**
     * @private
     */
    private static evaluator;
    /**
     * @private
     */
    private static validator;
}
//# sourceMappingURL=timeTransformEvaluator.d.ts.map