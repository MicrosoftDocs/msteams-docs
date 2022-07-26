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
 * Return the result from subtracting the next number from the previous number.
 */
class Subtract extends multivariateNumericEvaluator_1.MultivariateNumericEvaluator {
    /**
     * Initializes a new instance of the [Subtract](xref:adaptive-expressions.Subtract) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Subtract, Subtract.func);
    }
    /**
     * @private
     */
    static func(args) {
        return Number(args[0]) - Number(args[1]);
    }
}
exports.Subtract = Subtract;
//# sourceMappingURL=subtract.js.map