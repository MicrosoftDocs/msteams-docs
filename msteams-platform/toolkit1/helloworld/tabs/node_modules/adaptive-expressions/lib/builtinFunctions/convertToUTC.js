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
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(timezone_1.default);
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
const timeZoneConverter_1 = require("../timeZoneConverter");
/**
 * Convert a timestamp to Universal Time Coordinated (UTC) from the source time zone.
 */
class ConvertToUTC extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [ConvertToUTC](xref:adaptive-expressions.ConvertToUTC) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.ConvertToUTC, ConvertToUTC.evaluator, returnType_1.ReturnType.String, ConvertToUTC.validator);
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
            ({ format, locale } = functionUtils_1.FunctionUtils.determineFormatAndLocale(args, 4, format, locale));
            if (typeof args[0] === 'string' && typeof args[1] === 'string') {
                ({ value, error } = ConvertToUTC.evalConvertToUTC(args[0], args[1], format, locale));
            }
            else {
                error = `${expression} should contain an ISO format timestamp, a destination time zone string and an optional output format string.`;
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static verifyTimeStamp(timeStamp) {
        const parsed = dayjs_1.default(timeStamp);
        if (parsed.toString() === 'Invalid Date') {
            return `${timeStamp} is a invalid datetime`;
        }
        return undefined;
    }
    /**
     * @private
     */
    static evalConvertToUTC(timeStamp, sourceTimezone, format, locale) {
        let result;
        let error;
        let formattedSourceTime;
        const timeZone = timeZoneConverter_1.TimeZoneConverter.windowsToIana(sourceTimezone);
        if (!timeZoneConverter_1.TimeZoneConverter.verifyTimeZoneStr(timeZone)) {
            error = `${sourceTimezone} is not a valid timezone`;
        }
        if (!error) {
            error = this.verifyTimeStamp(timeStamp);
            if (!error) {
                try {
                    const sourceTime = dayjs_1.default.tz(timeStamp, timeZone);
                    formattedSourceTime = sourceTime.format();
                }
                catch (_a) {
                    error = `${timeStamp} with ${timeZone} is not a valid timestamp with specified timeZone:`;
                }
                if (!error) {
                    try {
                        result = dayjs_1.default(formattedSourceTime).locale(locale).tz('Etc/UTC').format(format);
                    }
                    catch (_b) {
                        error = `${format} is not a valid timestamp format`;
                    }
                }
            }
        }
        return { value: result, error };
    }
    /**
     * @private
     */
    static validator(expr) {
        functionUtils_1.FunctionUtils.validateOrder(expr, [returnType_1.ReturnType.String, returnType_1.ReturnType.String], returnType_1.ReturnType.String, returnType_1.ReturnType.String);
    }
}
exports.ConvertToUTC = ConvertToUTC;
//# sourceMappingURL=convertToUTC.js.map