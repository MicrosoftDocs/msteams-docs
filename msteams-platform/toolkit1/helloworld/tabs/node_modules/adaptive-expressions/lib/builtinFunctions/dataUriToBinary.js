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
 * Return the binary version of a data uniform resource identifier (URI).
 */
class DataUriToBinary extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [DataUriToBinary](xref:adaptive-expressions.DataUriToBinary) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.DataUriToBinary, DataUriToBinary.evaluator(), returnType_1.ReturnType.Object, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => functionUtils_internal_1.InternalFunctionUtils.getTextEncoder().encode(args[0]), functionUtils_1.FunctionUtils.verifyString);
    }
}
exports.DataUriToBinary = DataUriToBinary;
//# sourceMappingURL=dataUriToBinary.js.map