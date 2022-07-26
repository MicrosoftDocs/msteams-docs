"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const recognizers_text_data_types_timex_expression_1 = require("@microsoft/recognizers-text-data-types-timex-expression");
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
/**
 *  Return true if a given TimexProperty or Timex expression refers to a valid time.
 */
class TimexResolve extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [TimexResolve](xref:adaptive-expressions.TimexResolve) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.TimexResolve, TimexResolve.evaluator, returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnary);
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
        if (!error && parsed.types.size === 0) {
            error = `The parsed TimexProperty of ${args[0]} in ${expr} has no types. It can't be resolved to a string value.`;
        }
        if (!error) {
            const formatedTimex = parsed.timex;
            try {
                const resolvedValues = recognizers_text_data_types_timex_expression_1.valueResolver.resolve([formatedTimex]);
                value = resolvedValues.values[0].value;
            }
            catch (err) {
                error = `${args[0]} in ${expr} is not a valid argument. ${err.Message}`;
            }
        }
        return { value, error };
    }
}
exports.TimexResolve = TimexResolve;
//# sourceMappingURL=timexResolve.js.map