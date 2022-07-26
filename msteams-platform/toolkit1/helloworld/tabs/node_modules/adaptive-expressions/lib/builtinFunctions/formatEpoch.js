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
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
/**
 * Return a timestamp in the specified format from UNIX time (also know as Epoch time, POSIX time, UNIX Epoch time).
 */
class FormatEpoch extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [FormatEpoch](xref:adaptive-expressions.FormatEpoch) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.FormatEpoch, FormatEpoch.evaluator(), returnType_1.ReturnType.String, FormatEpoch.validator);
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
            if (!functionUtils_1.FunctionUtils.isNumber(arg)) {
                error = `formatEpoch first argument ${arg} must be a number`;
            }
            else {
                // Convert to ms
                arg = arg * 1000;
            }
            let value;
            if (!error) {
                ({ format, locale } = functionUtils_1.FunctionUtils.determineFormatAndLocale(args, 3, format, locale));
                const dateString = new Date(arg).toISOString();
                value = dayjs_1.default(dateString).locale(locale).utc().format(format);
            }
            return { value, error };
        });
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String, returnType_1.ReturnType.String], returnType_1.ReturnType.Number);
    }
}
exports.FormatEpoch = FormatEpoch;
//# sourceMappingURL=formatEpoch.js.map