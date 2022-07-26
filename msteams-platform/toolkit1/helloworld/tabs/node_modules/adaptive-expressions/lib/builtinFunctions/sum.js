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
 * Return the result from adding numbers in an array.
 */
class Sum extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Sum](xref:adaptive-expressions.Sum) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Sum, Sum.evaluator(), returnType_1.ReturnType.Number, Sum.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => args[0].reduce((x, y) => x + y), functionUtils_1.FunctionUtils.verifyNumericList);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [], returnType_1.ReturnType.Array);
    }
}
exports.Sum = Sum;
//# sourceMappingURL=sum.js.map