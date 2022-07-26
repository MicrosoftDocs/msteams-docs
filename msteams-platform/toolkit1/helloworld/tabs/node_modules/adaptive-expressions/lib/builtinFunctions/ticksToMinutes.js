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
 * Convert ticks to number of minutes.
 */
class TicksToMinutes extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [TicksToMinutes](xref:adaptive-expressions.TicksToMinutes) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.TicksToMinutes, TicksToMinutes.evaluator, returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateUnaryNumber);
    }
    /**
     * @private
     */
    static evaluator(expr, state, options) {
        let value;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expr, state, options);
        let error = childrenError;
        if (!error) {
            const firstChild = args[0];
            if (Number.isInteger(firstChild)) {
                value = firstChild / TicksToMinutes.TicksPerMinute;
            }
            else if (big_integer_1.default.isInstance(firstChild)) {
                value = firstChild.toJSNumber() / TicksToMinutes.TicksPerMinute;
            }
            else {
                error = `${expr} should contain an integer of ticks`;
            }
        }
        return { value, error };
    }
}
TicksToMinutes.TicksPerMinute = 60 * 10000000;
exports.TicksToMinutes = TicksToMinutes;
//# sourceMappingURL=ticksToMinutes.js.map