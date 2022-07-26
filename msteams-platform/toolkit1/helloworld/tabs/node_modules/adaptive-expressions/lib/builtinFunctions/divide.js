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
 * Return the integer result from dividing two numbers.
 */
class Divide extends multivariateNumericEvaluator_1.MultivariateNumericEvaluator {
    /**
     * Initializes a new instance of the [Divide](xref:adaptive-expressions.Divide) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Divide, Divide.func, Divide.verify);
    }
    /**
     * @private
     */
    static func(args) {
        const result = Number(args[0]) / Number(args[1]);
        if (Number.isInteger(args[0]) && Number.isInteger(args[1])) {
            return Math.floor(result);
        }
        return result;
    }
    /**
     * @private
     */
    static verify(val, expression, pos) {
        let error = functionUtils_1.FunctionUtils.verifyNumber(val, expression, pos);
        if (!error && pos > 0 && Number(val) === 0) {
            error = `Cannot divide by 0 from ${expression}`;
        }
        return error;
    }
}
exports.Divide = Divide;
//# sourceMappingURL=divide.js.map