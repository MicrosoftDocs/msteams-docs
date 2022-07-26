"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
const atob_lite_1 = __importDefault(require("atob-lite"));
/**
 * Return the string version of a data uniform resource identifier (URI).
 */
class DataUriToString extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [DataUriToString](xref:adaptive-expressions.DataUriToString) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.DataUriToString, DataUriToString.evaluator(), returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => atob_lite_1.default(args[0].slice(args[0].indexOf(',') + 1)), functionUtils_1.FunctionUtils.verifyString);
    }
}
exports.DataUriToString = DataUriToString;
//# sourceMappingURL=dataUriToString.js.map