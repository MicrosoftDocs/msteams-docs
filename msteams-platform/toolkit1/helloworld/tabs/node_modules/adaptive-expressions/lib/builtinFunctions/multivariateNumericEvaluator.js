"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expressionEvaluator_1 = require("../expressionEvaluator");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
/**
 * Numeric operators that can have 2 or more args.
 */
class MultivariateNumericEvaluator extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [MultivariateNumericEvaluator](xref:adaptive-expressions.MultivariateNumericEvaluator) class.
     *
     * @param type Name of the built-in function.
     * @param func The evaluation function, it takes a list of objects and returns a number.
     * @param verify Optional. [VerifyExpression](xref:adaptive-expressions.VerifyExpression) function to verify each child's result.
     */
    constructor(type, func, verify) {
        super(type, MultivariateNumericEvaluator.evaluator(func, verify), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateTwoOrMoreThanTwoNumbers);
    }
    /**
     * @private
     */
    static evaluator(func, verify) {
        return functionUtils_1.FunctionUtils.applySequence(func, verify || functionUtils_1.FunctionUtils.verifyNumber);
    }
}
exports.MultivariateNumericEvaluator = MultivariateNumericEvaluator;
//# sourceMappingURL=multivariateNumericEvaluator.js.map