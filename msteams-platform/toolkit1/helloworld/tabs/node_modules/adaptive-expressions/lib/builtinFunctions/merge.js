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
 * Merge multiple object(json) into one object(json).
 * If the item is array, the elements of the array are merged as well.
 */
class Merge extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Merge](xref:adaptive-expressions.Merge) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Merge, Merge.evaluator(), returnType_1.ReturnType.Object, functionUtils_1.FunctionUtils.validateAtLeastOne);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            const result = {};
            for (const arg of args) {
                const objectResult = this.parseToObjectList(arg);
                if (objectResult.error != null) {
                    return { value: undefined, error: objectResult.error };
                }
                for (const item of objectResult.result) {
                    Object.assign(result, item);
                }
            }
            return { value: result, error: undefined };
        });
    }
    static parseToObjectList(arg) {
        const result = [];
        let error;
        if (arg == null) {
            error = `The argument ${arg} must be a JSON object or array.`;
        }
        else if (Array.isArray(arg)) {
            for (const item of arg) {
                if (typeof item === 'object' && !Array.isArray(item)) {
                    result.push(item);
                }
                else {
                    error = `The argument ${item} in array must be a JSON object.`;
                }
            }
        }
        else if (typeof arg === 'object') {
            result.push(arg);
        }
        else {
            error = `The argument ${arg} must be a JSON object or array.`;
        }
        return { result: result, error: error };
    }
}
exports.Merge = Merge;
//# sourceMappingURL=merge.js.map