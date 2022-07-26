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
 *  Flatten an array into non-array values. You can optionally set the maximum depth to flatten to.
 */
class Flatten extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Flatten](xref:adaptive-expressions.Flatten) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Flatten, Flatten.evaluator(), returnType_1.ReturnType.Array, Flatten.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            const array = args[0];
            const depth = args.length > 1 ? args[1] : 100;
            return Flatten.evalFlatten(array, depth);
        });
    }
    /**
     * @private
     */
    static evalFlatten(arr, dept) {
        if (!functionUtils_1.FunctionUtils.isNumber(dept) || dept < 1) {
            dept = 1;
        }
        let res = JSON.parse(JSON.stringify(arr));
        const reduceArr = (_arr) => _arr.reduce((prevItem, curItem) => prevItem.concat(curItem), []);
        for (let i = 0; i < dept; i++) {
            const hasArrayItem = res.some((item) => Array.isArray(item));
            if (hasArrayItem) {
                res = reduceArr(res);
            }
            else {
                break;
            }
        }
        return res;
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.Number], returnType_1.ReturnType.Array);
    }
}
exports.Flatten = Flatten;
//# sourceMappingURL=flatten.js.map