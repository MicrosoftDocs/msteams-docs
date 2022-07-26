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
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const options_1 = require("../options");
const returnType_1 = require("../returnType");
/**
 * Check whether at least one expression is true.
 * Return true if at least one expression is true, or return false if all are false.
 */
class Or extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Or](xref:adaptive-expressions.Or) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Or, Or.evaluator, returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateAtLeastOne);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let result = false;
        let error;
        for (const child of expression.children) {
            const newOptions = new options_1.Options(options);
            newOptions.nullSubstitution = undefined;
            ({ value: result, error } = child.tryEvaluate(state, newOptions));
            if (!error) {
                if (functionUtils_internal_1.InternalFunctionUtils.isLogicTrue(result)) {
                    result = true;
                    break;
                }
            }
            else {
                error = undefined;
            }
        }
        return { value: result, error };
    }
}
exports.Or = Or;
//# sourceMappingURL=or.js.map