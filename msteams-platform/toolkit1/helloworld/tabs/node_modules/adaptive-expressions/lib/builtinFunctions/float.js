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
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
const big_integer_1 = __importDefault(require("big-integer"));
/**
 * Convert the string version of a floating-point number to a floating-point number.
 */
class Float extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Float](xref:adaptive-expressions.Float) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Float, Float.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            const firstChild = args[0];
            let error;
            let value;
            if (big_integer_1.default.isInstance(firstChild)) {
                return { value: firstChild.toJSNumber(), error };
            }
            if (typeof firstChild === 'string') {
                value = parseFloat(firstChild);
                if (!functionUtils_1.FunctionUtils.isNumber(value)) {
                    error = `parameter ${args[0]} is not a valid number string.`;
                }
            }
            else if (functionUtils_1.FunctionUtils.isNumber(firstChild)) {
                value = firstChild;
            }
            return { value, error };
        });
    }
}
exports.Float = Float;
//# sourceMappingURL=float.js.map