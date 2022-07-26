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
 * Check whether a string ends with a specific substring. Return true if the substring is found, or return false if not found.
 * This function is case-insensitive.
 */
class EndsWith extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [EndsWith](xref:adaptive-expressions.EndsWith) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.EndsWith, EndsWith.evaluator(), returnType_1.ReturnType.Boolean, EndsWith.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[0]).endsWith(functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[1])), functionUtils_1.FunctionUtils.verifyStringOrNull);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 2, 2, returnType_1.ReturnType.String);
    }
}
exports.EndsWith = EndsWith;
//# sourceMappingURL=endsWith.js.map