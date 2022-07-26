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
 * Reverses the order of the elements in a String or Array.
 */
class Reverse extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the `Reverse` class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Reverse, Reverse.evaluator(), returnType_1.ReturnType.String | returnType_1.ReturnType.Array, Reverse.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            let value = undefined;
            let error = undefined;
            if (typeof args[0] === 'string') {
                value = args[0].split('').reverse().join('');
            }
            else if (Array.isArray(args[0])) {
                value = args[0].reverse();
            }
            else {
                error = `${args[0]} is not a string or list.`;
            }
            return { value, error };
        }, functionUtils_1.FunctionUtils.verifyContainer);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [], returnType_1.ReturnType.String | returnType_1.ReturnType.Array);
    }
}
exports.Reverse = Reverse;
//# sourceMappingURL=reverse.js.map