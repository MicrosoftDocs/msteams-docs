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
const returnType_1 = require("../returnType");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const timeZoneConverter_1 = require("../timeZoneConverter");
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(timezone_1.default);
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
const recognizers_text_data_types_timex_expression_1 = require("@microsoft/recognizers-text-data-types-timex-expression");
/**
 * Return the previous viable date of a timex expression based on the current date and user's timezone.
 */
class GetPreviousViableDate extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [GetPreviousViableDate](xref:adaptive-expressions.GetPreviousViableDate) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.GetPreviousViableDate, GetPreviousViableDate.evaluator, returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnaryOrBinaryString);
    }
    /**
     * @private
     */
    static evaluator(expr, state, options) {
        let parsed;
        const currentTime = dayjs_1.default(new Date().toISOString());
        let validYear = 0;
        let validMonth = 0;
        let validDay = 0;
        let convertedDateTime;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expr, state, options);
        let error = childrenError;
        if (!error) {
            ({ timexProperty: parsed, error: error } = functionUtils_internal_1.InternalFunctionUtils.parseTimexProperty(args[0]));
        }
        if (parsed && !error) {
            if (parsed.year || !parsed.month || !parsed.dayOfMonth) {
                error = `${args[0]} must be a timex string which only contains month and day-of-month, for example: 'XXXX-10-31'.`;
            }
        }
        if (!error) {
            if (args.length === 2 && typeof args[1] === 'string') {
                const timeZone = timeZoneConverter_1.TimeZoneConverter.windowsToIana(args[1]);
                if (!timeZoneConverter_1.TimeZoneConverter.verifyTimeZoneStr(timeZone)) {
                    error = `${args[1]} is not a valid timezone`;
                }
                if (!error) {
                    convertedDateTime = currentTime.utc().tz(timeZone);
                }
            }
            else {
                convertedDateTime = currentTime.utc();
            }
        }
        if (!error) {
            const year = convertedDateTime.year();
            const month = convertedDateTime.month() + 1;
            const dayOfMonth = convertedDateTime.date();
            if (parsed.month < month || (parsed.month === month && parsed.dayOfMonth < dayOfMonth)) {
                validYear = year;
            }
            else {
                validYear = year - 1;
            }
            validMonth = parsed.month;
            validDay = parsed.dayOfMonth;
            if (validMonth === 2 && validDay === 29) {
                while (!GetPreviousViableDate.leapYear(validYear)) {
                    validYear -= 1;
                }
            }
        }
        const value = recognizers_text_data_types_timex_expression_1.TimexProperty.fromDate(new Date(validYear, validMonth - 1, validDay)).timex;
        return { value, error };
    }
    /**
     * @private
     */
    static leapYear(year) {
        return (year % 4 === 0 && year % 100 != 0) || year % 400 === 0;
    }
}
exports.GetPreviousViableDate = GetPreviousViableDate;
//# sourceMappingURL=getPreviousViableDate.js.map