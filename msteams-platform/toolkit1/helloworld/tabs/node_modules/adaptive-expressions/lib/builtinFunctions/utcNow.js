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
const returnType_1 = require("../returnType");
/**
 * Return the current timestamp.
 */
class UtcNow extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [UtcNow](xref:adaptive-expressions.UtcNow) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.UtcNow, UtcNow.evaluator(), returnType_1.ReturnType.String, UtcNow.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithOptionsAndError((args, options) => {
            let locale = options.locale ? options.locale : Intl.DateTimeFormat().resolvedOptions().locale;
            let format = functionUtils_1.FunctionUtils.DefaultDateTimeFormat;
            ({ format, locale } = functionUtils_1.FunctionUtils.determineFormatAndLocale(args, 2, format, locale));
            return {
                value: dayjs_1.default(new Date()).locale(locale).utc().format(format),
                error: undefined,
            };
        });
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String, returnType_1.ReturnType.String]);
    }
}
exports.UtcNow = UtcNow;
//# sourceMappingURL=utcNow.js.map