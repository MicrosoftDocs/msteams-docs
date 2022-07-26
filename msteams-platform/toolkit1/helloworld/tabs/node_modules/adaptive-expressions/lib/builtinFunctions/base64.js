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
const functionUtils_internal_1 = require("../functionUtils.internal");
/**
 * Return the base64-encoded version of a string or byte array.
 */
class Base64 extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Base64](xref:adaptive-expressions.Base64) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Base64, Base64.evaluator(), returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            let result;
            const firstChild = args[0];
            if (typeof firstChild === 'string') {
                result = btoa_lite_1.default(firstChild);
            }
            if (firstChild instanceof Uint8Array) {
                const stringContent = functionUtils_internal_1.InternalFunctionUtils.getTextDecoder().decode(firstChild);
                result = btoa_lite_1.default(stringContent);
            }
            return result;
        });
    }
}
exports.Base64 = Base64;
//# sourceMappingURL=base64.js.map