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
const dayOfYear_1 = __importDefault(require("dayjs/plugin/dayOfYear"));
dayjs_1.default.extend(dayOfYear_1.default);
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
/**
 * Return the day of the year from a timestamp.
 */
class DayOfYear extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [DayOfYear](xref:adaptive-expressions.DayOfYear) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.DayOfYear, DayOfYear.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateUnaryString);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            const error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(args[0]);
            if (!error) {
                return { value: dayjs_1.default(args[0]).utc().dayOfYear(), error };
            }
            return { value: undefined, error };
        }, functionUtils_1.FunctionUtils.verifyString);
    }
}
exports.DayOfYear = DayOfYear;
//# sourceMappingURL=dayOfYear.js.map