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
const btoa_lite_1 = __importDefault(require("btoa-lite"));
/**
 * Return a data uniform resource identifier (URI) of a string.
 */
class DataUri extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [DataUri](xref:adaptive-expressions.DataUri) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.DataUri, DataUri.evaluator(), returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => 'data:text/plain;charset=utf-8;base64,'.concat(btoa_lite_1.default(args[0])), functionUtils_1.FunctionUtils.verifyString);
    }
}
exports.DataUri = DataUri;
//# sourceMappingURL=dataUri.js.map