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
 * Return true if a given input is a floating-point number.
 * Due to the alignment between C# and JavaScript, a number with an non-zero residue of its modulo 1 will be treated as a floating-point number.
 */
class IsFloat extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [IsFloat](xref:adaptive-expressions.IsFloat) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.IsFloat, IsFloat.evaluator(), returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => functionUtils_1.FunctionUtils.isNumber(args[0]) && !Number.isInteger(args[0]));
    }
}
exports.IsFloat = IsFloat;
//# sourceMappingURL=isFloat.js.map