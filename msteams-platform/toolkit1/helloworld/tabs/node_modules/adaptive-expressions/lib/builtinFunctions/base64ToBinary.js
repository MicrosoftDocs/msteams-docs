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
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
const atob_lite_1 = __importDefault(require("atob-lite"));
/**
 * Return the binary array of a base64-encoded string.
 */
class Base64ToBinary extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Base64ToBinary](xref:adaptive-expressions.Base64ToBinary) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Base64ToBinary, Base64ToBinary.evaluator(), returnType_1.ReturnType.Object, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            const raw = atob_lite_1.default(args[0].toString());
            return functionUtils_internal_1.InternalFunctionUtils.getTextEncoder().encode(raw);
        }, functionUtils_1.FunctionUtils.verifyString);
    }
}
exports.Base64ToBinary = Base64ToBinary;
//# sourceMappingURL=base64ToBinary.js.map