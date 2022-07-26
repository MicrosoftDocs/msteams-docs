"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const expressionEvaluator_1 = require("../expressionEvaluator");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
/**
 * Comparison operators.
 * A comparison operator returns false if the comparison is false, or there is an error.  This prevents errors from short-circuiting boolean expressions.
 */
class ComparisonEvaluator extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [ComparisonEvaluator](xref:adaptive-expressions.ComparisonEvaluator) class.
     *
     * @param type Name of the built-in function.
     * @param func The comparison function, it takes a list of objects and returns a boolean.
     * @param validator [ValidateExpressionDelegate](xref:adaptive-expressions.ValidateExpressionDelegate) for input arguments.
     * @param verify Optional. [VerifyExpression](xref:adaptive-expressions.VerifyExpression) function to verify each child's result.
     */
    constructor(type, func, validator, verify) {
        super(type, ComparisonEvaluator.evaluator(func, verify), returnType_1.ReturnType.Boolean, validator);
    }
    /**
     * @private
     */
    static evaluator(func, verify) {
        return (expression, state, options) => {
            let result = false;
            const newOptions = new __1.Options(options);
            newOptions.nullSubstitution = undefined;
            const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expression, state, newOptions, verify);
            let error = childrenError;
            if (!error) {
                try {
                    result = func(args);
                }
                catch (e) {
                    // NOTE: This should not happen in normal execution
                    error = e.message;
                }
            }
            else {
                error = undefined;
            }
            return { value: result, error };
        };
    }
}
exports.ComparisonEvaluator = ComparisonEvaluator;
//# sourceMappingURL=comparisonEvaluator.js.map