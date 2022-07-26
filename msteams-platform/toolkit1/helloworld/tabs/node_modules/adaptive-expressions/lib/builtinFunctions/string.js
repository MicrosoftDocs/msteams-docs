"use strict";
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
const functionUtils_internal_1 = require("../functionUtils.internal");
/**
 * Return the string version of a value.
 */
class String extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [String](xref:adaptive-expressions.String) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.String, String.evaluator(), returnType_1.ReturnType.String, String.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithOptionsAndError((args, options) => {
            let result;
            let error;
            let locale = options.locale ? options.locale : Intl.DateTimeFormat().resolvedOptions().locale;
            if (!error) {
                locale = functionUtils_1.FunctionUtils.determineLocale(args, 2, locale);
            }
            if (!error) {
                if (typeof args[0] === 'string') {
                    result = args[0];
                }
                else if (functionUtils_1.FunctionUtils.isNumber(args[0])) {
                    const formatLocale = localeInfo_1.localeInfo[locale];
                    const tempStrValue = args[0].toString();
                    let precision = 0;
                    if (tempStrValue.includes('.')) {
                        precision = tempStrValue.split('.')[1].length;
                    }
                    const fixedNotation = `,.${precision}f`;
                    if (formatLocale !== undefined) {
                        result = d3_format_1.formatLocale(formatLocale).format(fixedNotation)(args[0]);
                    }
                    else {
                        result = d3_format_1.format(fixedNotation)(args[0]);
                    }
                }
                else if (args[0] instanceof Date) {
                    result = args[0].toLocaleDateString(locale);
                }
                else if (args[0] instanceof Uint8Array) {
                    result = functionUtils_internal_1.InternalFunctionUtils.getTextDecoder().decode(args[0]);
                }
                else {
                    result = functionUtils_internal_1.InternalFunctionUtils.commonStringify(args[0]);
                }
            }
            return { value: result, error: error };
        });
    }
    /**
     * @private
     */
    static validator(expr) {
        functionUtils_1.FunctionUtils.validateOrder(expr, [returnType_1.ReturnType.String], returnType_1.ReturnType.Object);
    }
}
exports.String = String;
//# sourceMappingURL=string.js.map