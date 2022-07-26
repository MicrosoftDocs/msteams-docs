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
const returnType_1 = require("../returnType");
/**
 * Return items from the front of an array or take the specific prefix from a string.
 */
class Take extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Take](xref:adaptive-expressions.Take) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Take, Take.evaluator, returnType_1.ReturnType.Array | returnType_1.ReturnType.String, Take.validator);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let result;
        const { value: arr, error: childrenError } = expression.children[0].tryEvaluate(state, options);
        let error = childrenError;
        if (!error) {
            if (Array.isArray(arr) || typeof arr === 'string') {
                let start;
                const startExpr = expression.children[1];
                ({ value: start, error } = startExpr.tryEvaluate(state, options));
                if (!error && !Number.isInteger(start)) {
                    error = `${startExpr} is not an integer.`;
                }
                if (!error) {
                    start = Math.max(start, 0);
                    result = arr.slice(0, start);
                }
            }
            else {
                error = `${expression.children[0]} is not array or string.`;
            }
        }
        return { value: result, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [], returnType_1.ReturnType.Array | returnType_1.ReturnType.String, returnType_1.ReturnType.Number);
    }
}
exports.Take = Take;
//# sourceMappingURL=take.js.map