"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expressionType_1 = require("../expressionType");
const multivariateNumericEvaluator_1 = require("./multivariateNumericEvaluator");
/**
 * Return the product from multiplying any number of numbers.
 */
class Multiply extends multivariateNumericEvaluator_1.MultivariateNumericEvaluator {
    /**
     * Initializes a new instance of the [Multiply](xref:adaptive-expressions.Multiply) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Multiply, Multiply.func);
    }
    /**
     * @private
     */
    static func(args) {
        return Number(args[0]) * Number(args[1]);
    }
}
exports.Multiply = Multiply;
//# sourceMappingURL=multiply.js.map