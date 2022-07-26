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
 * Return true if a given TimexProperty or Timex expression refers to a valid duration.
 */
class IsDuration extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [IsDuration](xref:adaptive-expressions.IsDuration) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.IsDuration, IsDuration.evaluator, returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator(expr, state, options) {
        let parsed;
        let value = false;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expr, state, options);
        let error = childrenError;
        if (!error) {
            ({ timexProperty: parsed, error: error } = functionUtils_internal_1.InternalFunctionUtils.parseTimexProperty(args[0]));
        }
        if (parsed && !error) {
            value =
                parsed.years !== undefined ||
                    parsed.months !== undefined ||
                    parsed.weeks !== undefined ||
                    parsed.days !== undefined ||
                    parsed.hours !== undefined ||
                    parsed.minutes !== undefined ||
                    parsed.seconds !== undefined;
        }
        return { value, error };
    }
}
exports.IsDuration = IsDuration;
//# sourceMappingURL=isDuration.js.map