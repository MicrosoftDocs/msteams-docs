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
 * Return the average of a numeric array.
 */
class Average extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Average](xref:adaptive-expressions.Average) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Average, Average.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => args[0].reduce((x, y) => x + y) / args[0].length, functionUtils_1.FunctionUtils.verifyNumericList);
    }
}
exports.Average = Average;
//# sourceMappingURL=average.js.map