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
 * Return the last item from a collection.
 */
class Last extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Last](xref:adaptive-expressions.Last) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Last, Last.evaluator(), returnType_1.ReturnType.Object, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            let last;
            if (typeof args[0] === 'string' && args[0].length > 0) {
                last = args[0][args[0].length - 1];
            }
            if (Array.isArray(args[0]) && args[0].length > 0) {
                last = functionUtils_internal_1.InternalFunctionUtils.accessIndex(args[0], args[0].length - 1).value;
            }
            return last;
        });
    }
}
exports.Last = Last;
//# sourceMappingURL=last.js.map