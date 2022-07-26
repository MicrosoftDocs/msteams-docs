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
 *  Return the highest value from an array. The array is inclusive at both ends.
 */
class Max extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Max](xref:adaptive-expressions.Max) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Max, Max.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateAtLeastOne);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            let result = Number.NEGATIVE_INFINITY;
            if (args.length === 1) {
                if (Array.isArray(args[0])) {
                    for (const value of args[0]) {
                        result = Math.max(result, value);
                    }
                }
                else {
                    result = Math.max(result, args[0]);
                }
            }
            else {
                for (const arg of args) {
                    if (Array.isArray(arg)) {
                        for (const value of arg) {
                            result = Math.max(result, value);
                        }
                    }
                    else {
                        result = Math.max(result, arg);
                    }
                }
            }
            return result;
        }, functionUtils_1.FunctionUtils.verifyNumberOrNumericList);
    }
}
exports.Max = Max;
//# sourceMappingURL=max.js.map