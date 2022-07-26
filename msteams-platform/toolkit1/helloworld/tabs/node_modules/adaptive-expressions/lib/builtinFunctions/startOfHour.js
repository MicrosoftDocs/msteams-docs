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
 * Return the start of the hour for a timestamp.
 */
class StartOfHour extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [StartOfHour](xref:adaptive-expressions.StartOfHour) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.StartOfHour, StartOfHour.evaluator, returnType_1.ReturnType.String, StartOfHour.validator);
    }
    /**
     * @private
     */
    static evaluator(expr, state, options) {
        let value;
        let locale = options.locale ? options.locale : Intl.DateTimeFormat().resolvedOptions().locale;
        let format = functionUtils_1.FunctionUtils.DefaultDateTimeFormat;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expr, state, options);
        let error = childrenError;
        if (!error) {
            ({ format, locale } = functionUtils_1.FunctionUtils.determineFormatAndLocale(args, 3, format, locale));
            if (typeof args[0] === 'string') {
                ({ value, error } = StartOfHour.evalStartOfHour(args[0], format, locale));
            }
            else {
                error = `${expr} should contain an ISO format timestamp and an optional output format string.`;
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static evalStartOfHour(timeStamp, format, locale) {
        let result;
        const error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(timeStamp);
        if (!error) {
            result = dayjs_1.default(timeStamp).locale(locale).utc().startOf('hour').format(format);
        }
        return { value: result, error };
    }
    /**
     * @private
     */
    static validator(expr) {
        functionUtils_1.FunctionUtils.validateOrder(expr, [returnType_1.ReturnType.String, returnType_1.ReturnType.String], returnType_1.ReturnType.String);
    }
}
exports.StartOfHour = StartOfHour;
//# sourceMappingURL=startOfHour.js.map