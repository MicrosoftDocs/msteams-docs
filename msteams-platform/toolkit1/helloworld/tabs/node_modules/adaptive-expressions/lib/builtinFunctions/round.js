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
 * Rounds a number value to the nearest integer.
 */
class Round extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Round](xref:adaptive-expressions.Round) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Round, Round.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateUnaryOrBinaryNumber);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            let result;
            let error;
            if (args.length === 2 && !Number.isInteger(args[1])) {
                error = `The second parameter ${args[1]} must be an integer.`;
            }
            if (!error) {
                const digits = args.length === 2 ? args[1] : 0;
                if (digits < 0 || digits > 15) {
                    error = `The second parameter ${args[1]} must be an integer between 0 and 15;`;
                }
                else {
                    result = Round.roundToPrecision(args[0], digits);
                }
            }
            return { value: result, error };
        }, functionUtils_1.FunctionUtils.verifyNumber);
    }
}
Round.roundToPrecision = (num, digits) => Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits);
exports.Round = Round;
//# sourceMappingURL=round.js.map