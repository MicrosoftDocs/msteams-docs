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
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(timezone_1.default);
const recognizers_text_data_types_timex_expression_1 = require("@microsoft/recognizers-text-data-types-timex-expression");
/**
 * Return the next viable time of a timex expression based on the current time and user's timezone.
 */
class GetNextViableTime extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [GetNextViableTime](xref:adaptive-expressions.GetNextViableTime) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.GetNextViableTime, GetNextViableTime.evaluator, returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnaryOrBinaryString);
    }
    /**
     * @private
     */
    static evaluator(expr, state, options) {
        let parsed;
        const currentTime = dayjs_1.default(new Date().toISOString());
        let validHour = 0;
        let validMinute = 0;
        let validSecond = 0;
        let convertedDateTime;
        const formatRegex = /TXX:[0-5][0-9]:[0-5][0-9]/g;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expr, state, options);
        let error = childrenError;
        if (!error) {
            if (!formatRegex.test(args[0])) {
                error = `${args[0]}  must be a timex string which only contains minutes and seconds, for example: 'TXX:15:28'`;
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
            ({ timexProperty: parsed, error: error } = functionUtils_internal_1.InternalFunctionUtils.parseTimexProperty(args[0].replace('XX', '00')));
        }
        if (!error) {
            const hour = convertedDateTime.hour();
            const minute = convertedDateTime.minute();
            const second = convertedDateTime.second();
            if (parsed.minute > minute || (parsed.minute === minute && parsed.second >= second)) {
                validHour = hour;
            }
            else {
                validHour = hour + 1;
            }
            if (validHour >= 24) {
                validHour -= 24;
            }
            validMinute = parsed.minute;
            validSecond = parsed.second;
        }
        const value = recognizers_text_data_types_timex_expression_1.TimexProperty.fromTime(new recognizers_text_data_types_timex_expression_1.Time(validHour, validMinute, validSecond)).timex;
        return { value, error };
    }
}
exports.GetNextViableTime = GetNextViableTime;
//# sourceMappingURL=getNextViableTime.js.map