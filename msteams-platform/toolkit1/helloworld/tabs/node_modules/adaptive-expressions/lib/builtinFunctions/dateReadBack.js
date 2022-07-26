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
const recognizers_text_data_types_timex_expression_1 = require("@microsoft/recognizers-text-data-types-timex-expression");
const dayjs_1 = __importDefault(require("dayjs"));
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
/**
 * Uses the date-time library to provide a date readback.
 */
class DateReadBack extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [DateReadBack](xref:adaptive-expressions.DateReadBack) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.DateReadBack, DateReadBack.evaluator(), returnType_1.ReturnType.String, DateReadBack.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            const dateFormat = 'YYYY-MM-DD';
            let error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(args[0]);
            if (!error) {
                const timestamp1 = dayjs_1.default(args[0]).toDate();
                error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(args[1]);
                if (!error) {
                    const timestamp2 = dayjs_1.default(args[1]).format(dateFormat);
                    const timex = new recognizers_text_data_types_timex_expression_1.TimexProperty(timestamp2);
                    return { value: timex.toNaturalLanguage(timestamp1), error };
                }
            }
            return { value: undefined, error };
        }, functionUtils_1.FunctionUtils.verifyString);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, undefined, returnType_1.ReturnType.String, returnType_1.ReturnType.String);
    }
}
exports.DateReadBack = DateReadBack;
//# sourceMappingURL=dateReadBack.js.map