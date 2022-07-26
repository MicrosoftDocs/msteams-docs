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
 * Remove all duplicates from an array.
 */
class Unique extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Unique](xref:adaptive-expressions.Unique) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Unique, Unique.evaluator(), returnType_1.ReturnType.Array, Unique.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => [...new Set(args[0])], functionUtils_1.FunctionUtils.verifyList);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [], returnType_1.ReturnType.Array);
    }
}
exports.Unique = Unique;
//# sourceMappingURL=unique.js.map