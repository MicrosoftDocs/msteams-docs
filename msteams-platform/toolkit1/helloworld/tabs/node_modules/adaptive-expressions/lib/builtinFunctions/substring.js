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
 * Return characters from a string, starting from the specified position or index. Index values start with the number 0.
 */
class Substring extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Substring](xref:adaptive-expressions.Substring) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Substring, Substring.evaluator, returnType_1.ReturnType.String, Substring.validator);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let result;
        const { value: str, error: childrenError } = expression.children[0].tryEvaluate(state, options);
        let error = childrenError;
        if (!error) {
            if (typeof str === 'string') {
                let start;
                const startExpr = expression.children[1];
                ({ value: start, error } = startExpr.tryEvaluate(state, options));
                if (!error && !Number.isInteger(start)) {
                    error = `${startExpr} is not an integer.`;
                }
                else if (start < 0 || start > str.length) {
                    error = `${startExpr}=${start} which is out of range for ${str}`;
                }
                if (!error) {
                    let length;
                    if (expression.children.length === 2) {
                        // Without length, compute to end
                        length = str.length - start;
                    }
                    else {
                        const lengthExpr = expression.children[2];
                        ({ value: length, error } = lengthExpr.tryEvaluate(state, options));
                        if (!error && !Number.isInteger(length)) {
                            error = `${lengthExpr} is not an integer`;
                        }
                        else if (length < 0 || Number(start) + Number(length) > str.length) {
                            error = `${lengthExpr}=${length} which is out of range for ${str}`;
                        }
                    }
                    if (!error) {
                        result = str.substr(start, length);
                    }
                }
            }
            else if (str === undefined) {
                result = '';
            }
            else {
                error = `${expression.children[0]} is neither a string nor a null object.`;
            }
        }
        return { value: result, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.Number], returnType_1.ReturnType.String, returnType_1.ReturnType.Number);
    }
}
exports.Substring = Substring;
//# sourceMappingURL=substring.js.map