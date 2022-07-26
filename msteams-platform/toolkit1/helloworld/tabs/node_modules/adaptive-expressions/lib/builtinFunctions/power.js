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
const functionUtils_1 = require("../functionUtils");
const multivariateNumericEvaluator_1 = require("./multivariateNumericEvaluator");
/**
 * Return exponentiation of one number to another.
 */
class Power extends multivariateNumericEvaluator_1.MultivariateNumericEvaluator {
    /**
     * Initializes a new instance of the [Power](xref:adaptive-expressions.Power) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Power, Power.func, functionUtils_1.FunctionUtils.verifyNumberOrNumericList);
    }
    /**
     * @private
     */
    static func(args) {
        return Math.pow(args[0], args[1]);
    }
}
exports.Power = Power;
//# sourceMappingURL=power.js.map