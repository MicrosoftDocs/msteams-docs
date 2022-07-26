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
 * Return a collection that has all the items from the specified collections.
 * To appear in the result, an item can appear in any collection passed to this function.
 * If one or more items have the same name, the last item with that name appears in the result.
 */
class Union extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Union](xref:adaptive-expressions.Union) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Union, Union.evaluator(), returnType_1.ReturnType.Array, Union.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            let result = [];
            for (const arg of args) {
                result = result.concat(arg);
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
exports.Union = Union;
//# sourceMappingURL=union.js.map