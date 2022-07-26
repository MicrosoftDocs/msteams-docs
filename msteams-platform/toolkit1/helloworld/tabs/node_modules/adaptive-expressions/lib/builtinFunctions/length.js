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
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
/**
 * Return the length of a string.
 */
class Length extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Length](xref:adaptive-expressions.Length) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Length, Length.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateUnaryString);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[0]).length, functionUtils_1.FunctionUtils.verifyStringOrNull);
    }
}
exports.Length = Length;
//# sourceMappingURL=length.js.map