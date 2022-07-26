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
const returnType_1 = require("../returnType");
/**
 * Return a collection that has only the common items across the specified collections.
 * To appear in the result, an item must appear in all the collections passed to this function.
 * If one or more items have the same name,
 * the last item with that name appears in the result.
 */
class Intersection extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Intersection](xref:adaptive-expressions.Intersection) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Intersection, Intersection.evaluator(), returnType_1.ReturnType.Array, Intersection.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            let result = args[0];
            for (const arg of args) {
                result = result.filter((e) => arg.indexOf(e) > -1);
            }
            return Array.from(new Set(result));
        }, functionUtils_1.FunctionUtils.verifyList);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 1, Number.MAX_SAFE_INTEGER, returnType_1.ReturnType.Array);
    }
}
exports.Intersection = Intersection;
//# sourceMappingURL=intersection.js.map