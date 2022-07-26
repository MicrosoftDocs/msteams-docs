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
 * Returns the index of the last occurrence of a specified value in an array.
 * The zero-based index position of value if that value is found, or -1 if it is not.
 */
class LastIndexOf extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [LastIndexOf](xref:adaptive-expressions.LastIndexOf) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.LastIndexOf, LastIndexOf.evaluator, returnType_1.ReturnType.Number, LastIndexOf.validator);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let value = -1;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expression, state, options);
        let error = childrenError;
        if (!error) {
            if (args[0] == null || typeof args[0] === 'string') {
                if (args[1] === undefined || typeof args[1] === 'string') {
                    const str = functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[0]);
                    const searchValue = functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[1]);
                    value = str.lastIndexOf(searchValue, str.length - 1);
                }
                else {
                    error = `Can only look for indexof string in ${expression}`;
                }
            }
            else if (Array.isArray(args[0])) {
                value = args[0].lastIndexOf(args[1]);
            }
            else {
                error = `${expression} works only on string or list.`;
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [], returnType_1.ReturnType.String | returnType_1.ReturnType.Array, returnType_1.ReturnType.Object);
    }
}
exports.LastIndexOf = LastIndexOf;
//# sourceMappingURL=lastIndexOf.js.map