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
 * Return true if a given input is a UTC ISO format (YYYY-MM-DDTHH:mm:ss.fffZ) timestamp string.
 */
class IsDateTime extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [IsDateTime](xref:adaptive-expressions.IsDateTime) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.IsDateTime, IsDateTime.evaluator(), returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => typeof args[0] === 'string' && functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(args[0]) === undefined);
    }
}
exports.IsDateTime = IsDateTime;
//# sourceMappingURL=isDateTime.js.map