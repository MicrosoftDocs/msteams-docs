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
 * Return the lowest value from a set of numbers in an array.
 */
class Min extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Min](xref:adaptive-expressions.Min) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Min, Min.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateAtLeastOne);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            let result = Number.POSITIVE_INFINITY;
            if (args.length === 1) {
                if (Array.isArray(args[0])) {
                    for (const value of args[0]) {
                        result = Math.min(result, value);
                    }
                }
                else {
                    result = Math.min(result, args[0]);
                }
            }
            else {
                for (const arg of args) {
                    if (Array.isArray(arg)) {
                        for (const value of arg) {
                            result = Math.min(result, value);
                        }
                    }
                    else {
                        result = Math.min(result, arg);
                    }
                }
            }
            return result;
        }, functionUtils_1.FunctionUtils.verifyNumberOrNumericList);
    }
}
exports.Min = Min;
//# sourceMappingURL=min.js.map