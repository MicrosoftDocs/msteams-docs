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
 * Replace a substring with the specified string, and return the result string.
 * This function is case-sensitive.
 */
class Replace extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Replace](xref:adaptive-expressions.Replace) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Replace, Replace.evaluator(), returnType_1.ReturnType.String, Replace.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            let error = undefined;
            let result = undefined;
            if (functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[1]).length === 0) {
                error = `${args[1]} should be a string with length at least 1`;
            }
            if (!error) {
                result = functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[0])
                    .split(functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[1]))
                    .join(functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[2]));
            }
            return { value: result, error };
        }, functionUtils_1.FunctionUtils.verifyStringOrNull);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 3, 3, returnType_1.ReturnType.String);
    }
}
exports.Replace = Replace;
//# sourceMappingURL=replace.js.map