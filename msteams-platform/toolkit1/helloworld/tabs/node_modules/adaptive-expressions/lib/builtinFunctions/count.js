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
 * Return the number of items in a collection.
 */
class Count extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Count](xref:adaptive-expressions.Count) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Count, Count.evaluator(), returnType_1.ReturnType.Number, Count.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            let count;
            if (typeof args[0] === 'string' || Array.isArray(args[0])) {
                count = args[0].length;
            }
            else if (args[0] instanceof Map) {
                count = args[0].size;
            }
            else if (typeof args[0] === 'object') {
                count = Object.keys(args[0]).length;
            }
            return count;
        }, functionUtils_1.FunctionUtils.verifyContainer);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [], returnType_1.ReturnType.String | returnType_1.ReturnType.Array);
    }
}
exports.Count = Count;
//# sourceMappingURL=count.js.map