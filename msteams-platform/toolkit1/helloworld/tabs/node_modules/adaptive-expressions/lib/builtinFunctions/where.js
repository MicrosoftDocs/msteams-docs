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
 * Filter on each element and return the new collection of filtered elements which match a specific condition.
 */
class Where extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Where](xref:adaptive-expressions.Where) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Where, Where.evaluator, returnType_1.ReturnType.Array, functionUtils_internal_1.InternalFunctionUtils.ValidateLambdaExpression);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let result;
        const { value: instance, error: childrenError } = expression.children[0].tryEvaluate(state, options);
        let error = childrenError;
        if (!error) {
            const list = functionUtils_internal_1.InternalFunctionUtils.convertToList(instance);
            if (!list) {
                error = `${expression.children[0]} is not a collection or structure object to run Where`;
            }
            else {
                result = [];
                functionUtils_internal_1.InternalFunctionUtils.lambdaEvaluator(expression, state, options, list, (currentItem, r, e) => {
                    if (functionUtils_internal_1.InternalFunctionUtils.isLogicTrue(r) && !e) {
                        // add if only if it evaluates to true
                        result.push(currentItem);
                    }
                    return false;
                });
                //reconstruct object if instance is object, otherwise, return array result
                if (!Array.isArray(instance)) {
                    const objResult = {};
                    for (const item of result) {
                        objResult[item.key] = item.value;
                    }
                    result = objResult;
                }
            }
        }
        return { value: result, error };
    }
}
exports.Where = Where;
//# sourceMappingURL=where.js.map