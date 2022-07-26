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
 * Check whether an expression is true or false. Based on the result, return a specified value.
 */
class If extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [If](xref:adaptive-expressions.If) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.If, If.evaluator, returnType_1.ReturnType.Object, If.validator);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let result;
        let error;
        const newOptions = new options_1.Options(options);
        newOptions.nullSubstitution = undefined;
        ({ value: result, error } = expression.children[0].tryEvaluate(state, newOptions));
        if (!error && functionUtils_internal_1.InternalFunctionUtils.isLogicTrue(result)) {
            ({ value: result, error } = expression.children[1].tryEvaluate(state, options));
        }
        else {
            ({ value: result, error } = expression.children[2].tryEvaluate(state, options));
        }
        return { value: result, error };
    }
    /**
     * @private
     */
    static validator(expr) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expr, 3, 3);
    }
}
exports.If = If;
//# sourceMappingURL=if.js.map