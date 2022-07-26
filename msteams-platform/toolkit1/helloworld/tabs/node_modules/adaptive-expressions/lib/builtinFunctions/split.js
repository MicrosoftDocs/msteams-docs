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
 * Return an array that contains substrings, separated by commas, based on the specified delimiter character in the original string.
 */
class Split extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Split](xref:adaptive-expressions.Split) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Split, Split.evaluator(), returnType_1.ReturnType.Array, Split.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[0]).split(functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[1] || '')), functionUtils_1.FunctionUtils.verifyStringOrNull);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 1, 2, returnType_1.ReturnType.String);
    }
}
exports.Split = Split;
//# sourceMappingURL=split.js.map