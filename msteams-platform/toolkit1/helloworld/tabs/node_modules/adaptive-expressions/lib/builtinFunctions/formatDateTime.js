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
 * Return a timestamp in the specified format.
 * Format reference: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
 */
class FormatDateTime extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [FormatDateTime](xref:adaptive-expressions.FormatDateTime) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.FormatDateTime, FormatDateTime.evaluator(), returnType_1.ReturnType.String, FormatDateTime.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithOptionsAndError((args, options) => {
            let error;
            let arg = args[0];
            let locale = options.locale ? options.locale : Intl.DateTimeFormat().resolvedOptions().locale;
            let format = functionUtils_1.FunctionUtils.DefaultDateTimeFormat;
            if (typeof arg === 'string') {
                error = functionUtils_internal_1.InternalFunctionUtils.verifyTimestamp(arg.toString());
            }
            else {
                arg = arg.toISOString();
            }
            let value;
            if (!error) {
                ({ format, locale } = functionUtils_1.FunctionUtils.determineFormatAndLocale(args, 3, format, locale));
                let dateString;
                if (arg.endsWith('Z')) {
                    dateString = new Date(arg).toISOString();
                }
                else {
                    try {
                        dateString = new Date(`${arg}Z`).toISOString();
                    }
                    catch (_a) {
                        dateString = new Date(arg).toISOString();
                    }
                }
                value = dayjs_1.default(dateString).locale(locale).utc().format(format);
            }
            return { value, error };
        });
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String, returnType_1.ReturnType.String], returnType_1.ReturnType.String);
    }
}
exports.FormatDateTime = FormatDateTime;
//# sourceMappingURL=formatDateTime.js.map