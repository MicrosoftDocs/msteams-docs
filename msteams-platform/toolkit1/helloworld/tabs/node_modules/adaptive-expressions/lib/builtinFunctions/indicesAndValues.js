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
 * Turn an array or object into an array of objects with index and value properties.
 * For arrays, the index is the position in the array.
 * For objects, it is the key for the value.
 */
class IndicesAndValues extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [IndicesAndValues](xref:adaptive-expressions.IndicesAndValues) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.IndicesAndValues, IndicesAndValues.evaluator, returnType_1.ReturnType.Array, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        let result = undefined;
        let error = undefined;
        let value = undefined;
        ({ value, error } = expression.children[0].tryEvaluate(state, options));
        if (error === undefined) {
            if (Array.isArray(value)) {
                const tempList = [];
                for (let i = 0; i < value.length; i++) {
                    tempList.push({ index: i, value: value[i] });
                }
                result = tempList;
            }
            else if (typeof value === 'object') {
                const tempList = [];
                for (const [index, val] of Object.entries(value)) {
                    tempList.push({ index: index, value: val });
                }
                result = tempList;
            }
            else {
                error = `${expression.children[0]} is not array or object.`;
            }
        }
        return { value: result, error };
    }
}
exports.IndicesAndValues = IndicesAndValues;
//# sourceMappingURL=indicesAndValues.js.map