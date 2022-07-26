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
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
/**
 * Operate on each element and return the new collection.
 */
class Foreach extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Foreach](xref:adaptive-expressions.Foreach) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Foreach, functionUtils_internal_1.InternalFunctionUtils.foreach, returnType_1.ReturnType.Array, functionUtils_internal_1.InternalFunctionUtils.ValidateLambdaExpression);
    }
}
exports.Foreach = Foreach;
//# sourceMappingURL=foreach.js.map