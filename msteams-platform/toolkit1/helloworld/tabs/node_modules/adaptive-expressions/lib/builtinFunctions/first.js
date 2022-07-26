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
 * Return the first item from a string or array.
 */
class First extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [First](xref:adaptive-expressions.First) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.First, First.evaluator(), returnType_1.ReturnType.Object, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            let first;
            if (typeof args[0] === 'string' && args[0].length > 0) {
                first = args[0][0];
            }
            if (Array.isArray(args[0]) && args[0].length > 0) {
                first = functionUtils_internal_1.InternalFunctionUtils.accessIndex(args[0], 0).value;
            }
            return first;
        });
    }
}
exports.First = First;
//# sourceMappingURL=first.js.map