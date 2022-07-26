"use strict";
/* eslint-disable security/detect-object-injection */
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const d3_format_1 = require("d3-format");
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
const localeInfo_1 = require("../localeInfo");
/**
 * Format number into required decimal numbers.
 */
class FormatNumber extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [FormatNumber](xref:adaptive-expressions.FormatNumber) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.FormatNumber, FormatNumber.evaluator(), returnType_1.ReturnType.String, FormatNumber.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithOptionsAndError((args, options) => {
            let value = null;
            let error;
            const number = args[0];
            const precision = args[1];
            let locale = options.locale ? options.locale : Intl.DateTimeFormat().resolvedOptions().locale;
            locale = functionUtils_1.FunctionUtils.determineLocale(args, 3, locale);
            if (!functionUtils_1.FunctionUtils.isNumber(number)) {
                error = `formatNumber first argument ${number} must be a number`;
            }
            else if (!functionUtils_1.FunctionUtils.isNumber(precision)) {
                error = `formatNumber second argument ${precision} must be a number`;
            }
            else if (locale && typeof locale !== 'string') {
                error = `formatNubmer third argument ${locale} is not a valid locale`;
            }
            else {
                const fixedNotation = `,.${precision}f`;
                const roundedNumber = this.roundToPrecision(number, precision);
                const formatLocale = localeInfo_1.localeInfo[locale];
                if (formatLocale !== undefined) {
                    value = d3_format_1.formatLocale(formatLocale).format(fixedNotation)(roundedNumber);
                }
                else {
                    value = d3_format_1.format(fixedNotation)(roundedNumber);
                }
            }
            return { value, error };
        });
    }
    static validator(expr) {
        functionUtils_1.FunctionUtils.validateOrder(expr, [returnType_1.ReturnType.String], returnType_1.ReturnType.Number, returnType_1.ReturnType.Number);
    }
}
FormatNumber.roundToPrecision = (num, digits) => Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits);
exports.FormatNumber = FormatNumber;
//# sourceMappingURL=formatNumber.js.map