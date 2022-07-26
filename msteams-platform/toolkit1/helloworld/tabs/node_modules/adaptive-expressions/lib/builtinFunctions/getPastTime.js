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
 * Return the current timestamp minus the specified time units.
 */
class GetPastTime extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [GetPastTime](xref:adaptive-expressions.GetPastTime) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.GetPastTime, GetPastTime.evaluator, returnType_1.ReturnType.String, GetPastTime.validator);
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
            if (Number.isInteger(args[0]) && typeof args[1] === 'string') {
                ({ format, locale } = functionUtils_1.FunctionUtils.determineFormatAndLocale(args, 4, format, locale));
                const { duration, tsStr } = functionUtils_internal_1.InternalFunctionUtils.timeUnitTransformer(args[0], args[1]);
                if (tsStr === undefined) {
                    error = `${args[2]} is not a valid time unit.`;
                }
                else {
                    value = dayjs_1.default().locale(locale).utc().subtract(duration, tsStr).format(format);
                }
            }
            else {
                error = `${expression} should contain a time interval integer, a string unit of time and an optional output format string.`;
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String, returnType_1.ReturnType.String], returnType_1.ReturnType.Number, returnType_1.ReturnType.String);
    }
}
exports.GetPastTime = GetPastTime;
//# sourceMappingURL=getPastTime.js.map