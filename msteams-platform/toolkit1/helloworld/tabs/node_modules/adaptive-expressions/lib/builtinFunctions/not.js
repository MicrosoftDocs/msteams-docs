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
 * Check whether an expression is false.
 * Return true if the expression is false, or return false if true.
 */
class Not extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Not](xref:adaptive-expressions.Not) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Not, Not.evaluator, returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let result = false;
        let error;
        const newOptions = new options_1.Options(options);
        newOptions.nullSubstitution = undefined;
        ({ value: result, error } = expression.children[0].tryEvaluate(state, newOptions));
        if (!error) {
            result = !functionUtils_internal_1.InternalFunctionUtils.isLogicTrue(result);
        }
        else {
            error = undefined;
            result = true;
        }
        return { value: result, error };
    }
}
exports.Not = Not;
//# sourceMappingURL=not.js.map