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
 * Return true if a given input is a Boolean.
 */
class IsBoolean extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [IsBoolean](xref:adaptive-expressions.IsBoolean) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.IsBoolean, IsBoolean.evaluator(), returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => typeof args[0] === 'boolean');
    }
}
exports.IsBoolean = IsBoolean;
//# sourceMappingURL=isBoolean.js.map