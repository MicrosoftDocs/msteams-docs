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
 * Return an array from multiple inputs.
 */
class CreateArray extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [CreateArray](xref:adaptive-expressions.CreateArray) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.CreateArray, CreateArray.evaluator(), returnType_1.ReturnType.Array);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => Array.from(args));
    }
}
exports.CreateArray = CreateArray;
//# sourceMappingURL=createArray.js.map