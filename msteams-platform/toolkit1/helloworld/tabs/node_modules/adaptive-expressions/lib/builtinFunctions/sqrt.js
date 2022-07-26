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
 * Returns the square root of a specified number.
 */
class Sqrt extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [SortBy](xref:adaptive-expressions.Sqrt) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Sqrt, Sqrt.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateUnaryNumber);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            let error;
            let value;
            const originalNumber = Number(args[0]);
            if (originalNumber < 0) {
                error = 'Do not support square root extraction of negative numbers.';
            }
            else {
                value = Math.sqrt(originalNumber);
            }
            return { value, error };
        }, functionUtils_1.FunctionUtils.verifyNumber);
    }
}
exports.Sqrt = Sqrt;
//# sourceMappingURL=sqrt.js.map