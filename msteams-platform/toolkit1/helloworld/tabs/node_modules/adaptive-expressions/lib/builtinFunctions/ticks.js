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
 * Return the ticks property value of a specified timestamp. A tick is 100-nanosecond interval.
 */
class Ticks extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Ticks](xref:adaptive-expressions.Ticks) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Ticks, Ticks.evaluator, returnType_1.ReturnType.Number, Ticks.validator);
    }
    /**
     * @private
     */
    static evaluator(expr, state, options) {
        let value;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expr, state, options);
        let error = childrenError;
        if (!error) {
            if (typeof args[0] === 'string') {
                ({ value, error } = functionUtils_internal_1.InternalFunctionUtils.ticks(args[0]));
            }
            else {
                error = `${expr} should contain an ISO format timestamp.`;
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 1, 1, returnType_1.ReturnType.String);
    }
}
exports.Ticks = Ticks;
//# sourceMappingURL=ticks.js.map