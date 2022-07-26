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
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
const expressionEvaluator_1 = require("../expressionEvaluator");
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
/**
 * Evaluator that transforms a datetime to another datetime.
 */
class TimeTransformEvaluator extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [TimeTransformEvaluator](xref:adaptive-expressions.TimeTransformEvaluator) class.
     *
     * @param type Name of the built-in function.
     * @param func The evaluation function, it takes a timestamp and the number of transformation, and returns a `Date`.
     */
    constructor(type, func) {
        super(type, TimeTransformEvaluator.evaluator(func), returnType_1.ReturnType.String, TimeTransformEvaluator.validator);
    }
    /**
     * @private
     */
    static evaluator(func) {
        return (expression, state, options) => {
            let result;
            let locale = options.locale ? options.locale : Intl.DateTimeFormat().resolvedOptions().locale;
            let format = functionUtils_1.FunctionUtils.DefaultDateTimeFormat;
            const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expression, state, options);
            let error = childrenError;
            if (!error) {
                ({ format, locale } = functionUtils_1.FunctionUtils.determineFormatAndLocale(args, 4, format, locale));
                if (typeof args[0] === 'string' && functionUtils_1.FunctionUtils.isNumber(args[1])) {
                    error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(args[0]);
                    if (!error) {
                        result = dayjs_1.default(func(new Date(args[0]), args[1]))
                            .locale(locale)
                            .utc()
                            .format(format);
                    }
                }
                else {
                    error = `${expression} should contain an ISO format timestamp and a time interval integer.`;
                }
            }
            return { value: result, error };
        };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String, returnType_1.ReturnType.String], returnType_1.ReturnType.String, returnType_1.ReturnType.Number);
    }
}
exports.TimeTransformEvaluator = TimeTransformEvaluator;
//# sourceMappingURL=timeTransformEvaluator.js.map