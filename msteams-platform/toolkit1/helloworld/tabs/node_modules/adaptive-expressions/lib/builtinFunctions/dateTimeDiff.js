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
const dayjs_1 = __importDefault(require("dayjs"));
const returnType_1 = require("../returnType");
const functionUtils_internal_1 = require("../functionUtils.internal");
/**
 * Return a number of ticks that the two timestamps differ.
 */
class DateTimeDiff extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [DateTimeDiff](xref:adaptive-expressions.DateTimeDiff) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.DateTimeDiff, DateTimeDiff.evaluator, returnType_1.ReturnType.Number, DateTimeDiff.validator);
    }
    /**
     * @private
     */
    static evaluator(expr, state, options) {
        let value;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expr, state, options);
        let error = childrenError;
        if (!error) {
            error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(args[0]);
            if (!error) {
                error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(args[1]);
                if (!error) {
                    value = dayjs_1.default(args[0]).diff(dayjs_1.default(args[1]), 'milliseconds') * 10000;
                }
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 2, 2, returnType_1.ReturnType.String);
    }
}
exports.DateTimeDiff = DateTimeDiff;
//# sourceMappingURL=dateTimeDiff.js.map