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
 * Return true if a given input is an array.
 */
class IsArray extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [IsArray](xref:adaptive-expressions.IsArray) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.IsArray, IsArray.evaluator(), returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => Array.isArray(args[0]));
    }
}
exports.IsArray = IsArray;
//# sourceMappingURL=isArray.js.map