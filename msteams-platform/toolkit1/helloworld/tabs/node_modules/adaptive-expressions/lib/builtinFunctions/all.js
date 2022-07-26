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
 * Determines whether all elements of a sequence satisfy a condition.
 */
class All extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [All](xref:adaptive-expressions.All) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.All, All.evaluator, returnType_1.ReturnType.Boolean, functionUtils_internal_1.InternalFunctionUtils.ValidateLambdaExpression);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let result = true;
        const { value: instance, error: childrenError } = expression.children[0].tryEvaluate(state, options);
        let error = childrenError;
        if (!error) {
            const list = functionUtils_internal_1.InternalFunctionUtils.convertToList(instance);
            if (!list) {
                error = `${expression.children[0]} is not a collection or structure object to run Any`;
            }
            else {
                functionUtils_internal_1.InternalFunctionUtils.lambdaEvaluator(expression, state, options, list, (currentItem, r, e) => {
                    if (e || !functionUtils_internal_1.InternalFunctionUtils.isLogicTrue(r)) {
                        result = false;
                        return true;
                    }
                    return false;
                });
            }
        }
        return { value: result, error };
    }
}
exports.All = All;
//# sourceMappingURL=all.js.map