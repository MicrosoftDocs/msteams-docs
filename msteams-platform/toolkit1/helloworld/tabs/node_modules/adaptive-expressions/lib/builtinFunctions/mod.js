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
 * Return the remainder from dividing two numbers.
 */
class Mod extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Mod](xref:adaptive-expressions.Mod) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Mod, Mod.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateBinaryNumber);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            let error;
            let value;
            if (Number(args[1]) === 0) {
                error = 'Cannot mod by 0.';
            }
            else {
                value = args[0] % args[1];
            }
            return { value, error };
        }, functionUtils_1.FunctionUtils.verifyInteger);
    }
}
exports.Mod = Mod;
//# sourceMappingURL=mod.js.map