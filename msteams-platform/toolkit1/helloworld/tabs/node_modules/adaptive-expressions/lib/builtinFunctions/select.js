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
 * Operate on each element and return the new collection of transformed elements.
 */
class Select extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Select](xref:adaptive-expressions.Select) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Select, functionUtils_internal_1.InternalFunctionUtils.foreach, returnType_1.ReturnType.Array, functionUtils_internal_1.InternalFunctionUtils.ValidateLambdaExpression);
    }
}
exports.Select = Select;
//# sourceMappingURL=select.js.map