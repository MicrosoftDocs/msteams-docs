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
 * Return an integer array that starts from a specified integer with the given length.
 */
class Range extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Range](xref:adaptive-expressions.Range) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Range, Range.evaluator(), returnType_1.ReturnType.Array, functionUtils_1.FunctionUtils.validateBinaryNumber);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            let error;
            if (args[1] <= 0) {
                error = 'Second paramter must be more than zero';
            }
            const result = [...Array(args[1]).keys()].map((u) => u + Number(args[0]));
            return { value: result, error };
        }, functionUtils_1.FunctionUtils.verifyInteger);
    }
}
exports.Range = Range;
//# sourceMappingURL=range.js.map