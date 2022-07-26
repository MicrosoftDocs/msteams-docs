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
 * Sort elements in the collection in descending order, and return the sorted collection.
 */
class SortByDescending extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [SortByDescending](xref:adaptive-expressions.SortByDescending) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.SortByDescending, functionUtils_internal_1.InternalFunctionUtils.sortBy(true), returnType_1.ReturnType.Array, SortByDescending.validator);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String], returnType_1.ReturnType.Array);
    }
}
exports.SortByDescending = SortByDescending;
//# sourceMappingURL=sortByDescending.js.map