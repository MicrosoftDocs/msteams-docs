"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
/**
 * Return the day of the week from a timestamp.
 */
class DayOfWeek extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [DayOfWeek](xref:adaptive-expressions.DayOfWeek) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.DayOfWeek, DayOfWeek.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateUnaryString);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            const error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(args[0]);
            if (!error) {
                return { value: new Date(args[0]).getUTCDay(), error };
            }
            return { value: undefined, error };
        }, functionUtils_1.FunctionUtils.verifyString);
    }
}
exports.DayOfWeek = DayOfWeek;
//# sourceMappingURL=dayOfWeek.js.map