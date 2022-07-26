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
 * Return the number of words in a string.
 */
class CountWord extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [CountWord](xref:adaptive-expressions.CountWord) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.CountWord, CountWord.evaluator(), returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateUnaryString);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(args[0]).trim().split(/\s+/).length, functionUtils_1.FunctionUtils.verifyStringOrNull);
    }
}
exports.CountWord = CountWord;
//# sourceMappingURL=countWord.js.map