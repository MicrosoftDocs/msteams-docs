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
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
const timeZoneConverter_1 = require("../timeZoneConverter");
/**
 * Convert a timestamp from Universal Time Coordinated (UTC) to a target time zone.
 */
class ConvertFromUTC extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [ConvertFromUTC](xref:adaptive-expressions.ConvertFromUTC) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.ConvertFromUTC, ConvertFromUTC.evaluator, returnType_1.ReturnType.String, ConvertFromUTC.validator);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let value;
        let locale = options.locale ? options.locale : Intl.DateTimeFormat().resolvedOptions().locale;
        let format = ConvertFromUTC.NoneUtcDefaultDateTimeFormat;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expression, state, options);
        let error = childrenError;
        if (!error) {
            ({ format, locale } = functionUtils_1.FunctionUtils.determineFormatAndLocale(args, 4, format, locale));
            if (typeof args[0] === 'string' && typeof args[1] === 'string') {
                ({ value, error } = ConvertFromUTC.evalConvertFromUTC(args[0], args[1], format, locale));
            }
            else {
                error = `${expression} should contain an ISO format timestamp, an origin time zone string and an optional output format string.`;
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static evalConvertFromUTC(timeStamp, destinationTimeZone, format, locale) {
        let result;
        let error;
        error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(timeStamp);
        const timeZone = timeZoneConverter_1.TimeZoneConverter.windowsToIana(destinationTimeZone);
        if (!timeZoneConverter_1.TimeZoneConverter.verifyTimeZoneStr(timeZone)) {
            error = `${destinationTimeZone} is not a valid timezone`;
        }
        if (!error) {
            try {
                result = dayjs_1.default(timeStamp).locale(locale).tz(timeZone).format(format);
            }
            catch (_a) {
                error = `${format} is not a valid timestamp format`;
            }
        }
        return { value: result, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String, returnType_1.ReturnType.String], returnType_1.ReturnType.String, returnType_1.ReturnType.String);
    }
}
ConvertFromUTC.NoneUtcDefaultDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS0000';
exports.ConvertFromUTC = ConvertFromUTC;
//# sourceMappingURL=convertFromUTC.js.map