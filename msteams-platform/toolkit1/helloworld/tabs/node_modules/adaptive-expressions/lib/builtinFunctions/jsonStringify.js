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
 * Return the string version of a value.
 */
class JsonStringify extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [JsonStringify](xref:adaptive-expressions.JsonStringify) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.JsonStringify, JsonStringify.evaluator(), returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            return JSON.stringify(args[0]);
        });
    }
}
exports.JsonStringify = JsonStringify;
//# sourceMappingURL=jsonStringify.js.map