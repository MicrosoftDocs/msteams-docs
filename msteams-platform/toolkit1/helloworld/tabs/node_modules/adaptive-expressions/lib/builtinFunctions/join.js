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
const returnType_1 = require("../returnType");
/**
 * Return a string that has all the items from an array, with each character separated by a delimiter.
 */
class Join extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the Join class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Join, Join.evaluator, returnType_1.ReturnType.String, Join.validator);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let value;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expression, state, options);
        let error = childrenError;
        if (!error) {
            if (!Array.isArray(args[0])) {
                error = `${expression.children[0]} evaluates to ${args[0]} which is not a list.`;
            }
            else {
                if (args.length === 2) {
                    value = args[0].join(args[1]);
                }
                else {
                    if (args[0].length < 3) {
                        value = args[0].join(args[2]);
                    }
                    else {
                        const firstPart = args[0].slice(0, args[0].length - 1).join(args[1]);
                        value = firstPart.concat(args[2], args[0][args[0].length - 1]);
                    }
                }
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String], returnType_1.ReturnType.Array, returnType_1.ReturnType.String);
    }
}
exports.Join = Join;
//# sourceMappingURL=join.js.map