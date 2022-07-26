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
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
/**
 * Add a number of time units to a timestamp.
 */
class AddToTime extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [AddToTime](xref:adaptive-expressions.AddToTime) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.AddToTime, AddToTime.evaluator, returnType_1.ReturnType.String, AddToTime.validator);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let value;
        let locale = options.locale ? options.locale : Intl.DateTimeFormat().resolvedOptions().locale;
        let format = functionUtils_1.FunctionUtils.DefaultDateTimeFormat;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expression, state, options);
        let error = childrenError;
        if (!error) {
            ({ format, locale } = functionUtils_1.FunctionUtils.determineFormatAndLocale(args, 5, format, locale));
            if (typeof args[0] === 'string' && Number.isInteger(args[1]) && typeof args[2] === 'string') {
                ({ value, error } = AddToTime.evalAddToTime(args[0], args[1], args[2], format, locale));
            }
            else {
                error = `${expression} should contain an ISO format timestamp, a time interval integer, a string unit of time and an optional output format string.`;
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static evalAddToTime(timeStamp, interval, timeUnit, format, locale) {
        let result;
        const error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(timeStamp);
        if (!error) {
            const { duration, tsStr } = functionUtils_internal_1.InternalFunctionUtils.timeUnitTransformer(interval, timeUnit);
            result = dayjs_1.default(timeStamp).locale(locale).utc().add(duration, tsStr).format(format);
        }
        return { value: result, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String, returnType_1.ReturnType.String], returnType_1.ReturnType.String, returnType_1.ReturnType.Number, returnType_1.ReturnType.String);
    }
}
exports.AddToTime = AddToTime;
//# sourceMappingURL=addToTime.js.map