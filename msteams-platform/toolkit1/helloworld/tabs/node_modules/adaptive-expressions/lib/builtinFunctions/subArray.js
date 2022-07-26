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
 * Returns a subarray from specified start and end positions. Index values start with the number 0.
 */
class SubArray extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [SubArray](xref:adaptive-expressions.SubArray) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.SubArray, SubArray.evaluator, returnType_1.ReturnType.Array, SubArray.validator);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let result;
        const { value: arr, error: childrenError } = expression.children[0].tryEvaluate(state, options);
        let error = childrenError;
        if (!error) {
            if (Array.isArray(arr)) {
                let start;
                const startExpr = expression.children[1];
                ({ value: start, error } = startExpr.tryEvaluate(state, options));
                if (!error && !Number.isInteger(start)) {
                    error = `${startExpr} is not an integer.`;
                }
                else if (start < 0 || start > arr.length) {
                    error = `${startExpr}=${start} which is out of range for ${arr}`;
                }
                if (!error) {
                    let end;
                    if (expression.children.length === 2) {
                        end = arr.length;
                    }
                    else {
                        const endExpr = expression.children[2];
                        ({ value: end, error } = endExpr.tryEvaluate(state, options));
                        if (!error && !Number.isInteger(end)) {
                            error = `${endExpr} is not an integer`;
                        }
                        else if (end < 0 || end > arr.length) {
                            error = `${endExpr}=${end} which is out of range for ${arr}`;
                        }
                    }
                    if (!error) {
                        result = arr.slice(start, end);
                    }
                }
            }
            else {
                error = `${expression.children[0]} is not array.`;
            }
        }
        return { value: result, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.Number], returnType_1.ReturnType.Array, returnType_1.ReturnType.Number);
    }
}
exports.SubArray = SubArray;
//# sourceMappingURL=subArray.js.map