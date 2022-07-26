"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const big_integer_1 = __importDefault(require("big-integer"));
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
/**
 * Return the integer version of a string.
 */
class Int extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Int](xref:adaptive-expressions.Int) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Int, Int.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            let error;
            let value;
            const firstChild = args[0];
            if (big_integer_1.default.isInstance(firstChild)) {
                return { value: firstChild.toJSNumber(), error };
            }
            if (typeof firstChild === 'string') {
                value = parseInt(firstChild, 10);
                if (!functionUtils_1.FunctionUtils.isNumber(value)) {
                    error = `parameter ${args[0]} is not a valid number string.`;
                }
            }
            else if (functionUtils_1.FunctionUtils.isNumber(firstChild)) {
                value = parseInt(firstChild.toString(), 10);
            }
            return { value, error };
        });
    }
}
exports.Int = Int;
//# sourceMappingURL=int.js.map