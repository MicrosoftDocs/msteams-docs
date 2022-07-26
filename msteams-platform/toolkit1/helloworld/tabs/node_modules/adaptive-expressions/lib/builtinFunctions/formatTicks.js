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
const big_integer_1 = __importDefault(require("big-integer"));
const dayjs_1 = __importDefault(require("dayjs"));
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
/**
 * Return a timestamp in the specified format from ticks.
 */
class FormatTicks extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [FormatTicks](xref:adaptive-expressions.FormatTicks) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.FormatTicks, FormatTicks.evaluator(), returnType_1.ReturnType.String, FormatTicks.validator);
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
            if (functionUtils_1.FunctionUtils.isNumber(arg)) {
                arg = big_integer_1.default(arg);
            }
            if (typeof arg === 'string') {
                arg = big_integer_1.default(arg);
            }
            if (!big_integer_1.default.isInstance(arg)) {
                error = `formatTicks first argument ${arg} is not a number, numeric string or bigInt`;
            }
            else {
                // Convert to ms
                arg = arg
                    .subtract(functionUtils_internal_1.InternalFunctionUtils.UnixMilliSecondToTicksConstant)
                    .divide(functionUtils_internal_1.InternalFunctionUtils.MillisecondToTickConstant)
                    .toJSNumber();
            }
            let value;
            if (!error) {
                ({ format, locale } = functionUtils_1.FunctionUtils.determineFormatAndLocale(args, 3, format, locale));
                if (functionUtils_1.FunctionUtils.isNumber(arg)) {
                    const dateString = new Date(arg).toISOString();
                    value = dayjs_1.default(dateString).locale(locale).utc().format(format);
                }
            }
            return { value, error };
        });
    }
    /**
     * @param expression
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String, returnType_1.ReturnType.String], returnType_1.ReturnType.Number);
    }
}
exports.FormatTicks = FormatTicks;
//# sourceMappingURL=formatTicks.js.map