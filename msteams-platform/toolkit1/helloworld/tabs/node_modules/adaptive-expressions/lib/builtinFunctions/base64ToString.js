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
 * Return the string version of a base64-encoded string, effectively decoding the base64 string.
 */
class Base64ToString extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Base64ToString](xref:adaptive-expressions.Base64ToString) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Base64ToString, Base64ToString.evaluator(), returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => atob_lite_1.default(args[0]), functionUtils_1.FunctionUtils.verifyString);
    }
}
exports.Base64ToString = Base64ToString;
//# sourceMappingURL=base64ToString.js.map