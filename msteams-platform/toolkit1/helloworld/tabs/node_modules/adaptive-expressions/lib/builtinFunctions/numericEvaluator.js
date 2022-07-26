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
 * Numeric operators that can have 1 or more args.
 */
class NumericEvaluator extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [NumericEvaluator](xref:adaptive-expressions.NumericEvaluator) class.
     *
     * @param type Name of the built-in function.
     * @param func The evaluation function, it takes a list of objects and returns a number.
     */
    constructor(type, func) {
        super(type, NumericEvaluator.evaluator(func), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateNumber);
    }
    /**
     * @private
     */
    static evaluator(func) {
        return functionUtils_1.FunctionUtils.applySequence(func, functionUtils_1.FunctionUtils.verifyNumber);
    }
}
exports.NumericEvaluator = NumericEvaluator;
//# sourceMappingURL=numericEvaluator.js.map