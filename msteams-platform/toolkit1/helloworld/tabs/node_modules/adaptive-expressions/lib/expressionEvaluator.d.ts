/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Expression } from './expression';
import { MemoryInterface } from './memory';
import { Options } from './options';
import { ReturnType } from './returnType';
/**
 * Delegate for doing static validation on an expression.
 * Validators can and should throw exceptions if the expression is not valid.
 */
export declare type ValidateExpressionDelegate = (expression: Expression) => any;
/**
 * Value result with error.
 */
export declare type ValueWithError = {
    value: any;
    error: string;
};
/**
 * Delegate to evaluate an expression.
 * Evaluators should verify runtime arguments when appropriate and return an error rather than throw exceptions if possible.
 */
export declare type EvaluateExpressionDelegate = (expression: Expression, state: MemoryInterface, options: Options) => ValueWithError;
/**
 * Delegate to lookup function information from the type.
 */
export declare type EvaluatorLookup = (type: string) => ExpressionEvaluator;
/**
 * Information on how to evaluate an expression.
 */
export declare class ExpressionEvaluator {
    /**
     * Gets the expression type for evaluator.
     */
    type: string;
    /**
     * Type expected by evaluating the expression.
     */
    returnType: ReturnType;
    private readonly _validator;
    private readonly _evaluator;
    private _negation;
    /**
     * Initializes a new instance of the <see cref="ExpressionEvaluator"/> class.
     *
     * @param type Expression type.
     * @param evaluator Delegate to evaluate an expression.
     * @param returnType Type expected from evaluation.
     * @param validator Static validation of expression.
     */
    constructor(type: string, evaluator: EvaluateExpressionDelegate, returnType?: ReturnType, validator?: ValidateExpressionDelegate);
    /**
     * Gets the evaluator that is a negation of this one.
     *
     * @returns The evaluator that is a negation of this one.
     */
    /**
    * Sets the evaluator that is a negation of this one.
    */
    negation: ExpressionEvaluator;
    /**
     * Evaluate an expression.
     *
     * @param expression Expression to evaluate.
     * @param state Global state information.
     * @param options Options used in the evaluation.
     * @returns The value and error string that is non-null if there is an error.
     */
    tryEvaluate: (expression: Expression, state: MemoryInterface, options: Options) => ValueWithError;
    /**
     * Validate an expression.
     *
     * @param expression Expression to validate.
     * @returns The validated expression.
     */
    validateExpression: (expression: Expression) => void;
}
//# sourceMappingURL=expressionEvaluator.d.ts.map