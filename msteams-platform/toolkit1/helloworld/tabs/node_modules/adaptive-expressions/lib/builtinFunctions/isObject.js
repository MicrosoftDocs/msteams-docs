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
 * Return true if a given input is a complex object or return false if it is a primitive object.
 * Primitive objects include strings, numbers, and Booleans;
 * complex types, contain properties.
 */
class IsObject extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [IsObject](xref:adaptive-expressions.IsObject) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.IsObject, IsObject.evaluator(), returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => typeof args[0] === 'object');
    }
}
exports.IsObject = IsObject;
//# sourceMappingURL=isObject.js.map