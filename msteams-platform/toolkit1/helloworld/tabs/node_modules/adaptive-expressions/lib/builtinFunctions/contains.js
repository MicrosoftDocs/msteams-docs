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
 * Check whether a collection has a specific item. Return true if the item is found, or return false if not found.
 * This function is case-sensitive.
 */
class Contains extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Contains](xref:adaptive-expressions.Contains) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Contains, Contains.evaluator, returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateBinary);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let found = false;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expression, state, options);
        let error = childrenError;
        if (!error) {
            if (typeof args[0] === 'string' && typeof args[1] === 'string') {
                found = args[0].includes(args[1]);
            }
            else if (Array.isArray(args[0])) {
                for (const item of args[0]) {
                    if (functionUtils_1.FunctionUtils.commonEquals(item, args[1])) {
                        found = true;
                        break;
                    }
                }
            }
            else if (typeof args[1] === 'string') {
                let value;
                ({ value, error } = functionUtils_internal_1.InternalFunctionUtils.accessProperty(args[0], args[1]));
                found = !error && value !== undefined;
            }
        }
        return { value: found, error: undefined };
    }
}
exports.Contains = Contains;
//# sourceMappingURL=contains.js.map