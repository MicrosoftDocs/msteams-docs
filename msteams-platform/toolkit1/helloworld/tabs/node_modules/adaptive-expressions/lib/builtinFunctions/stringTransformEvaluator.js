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
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
/**
 * Evaluator that transforms a string to another string.
 */
class StringTransformEvaluator extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [StringTransformEvaluator](xref:adaptive-expressions.StringTransformEvaluator) class.
     *
     * @param type Name of the built-in function.
     * @param func The string transformation function, it takes a list of objects and returns an string.
     * @param validator The validation function.
     */
    constructor(type, func, validator) {
        super(type, functionUtils_1.FunctionUtils.applyWithOptions(func, functionUtils_1.FunctionUtils.verifyStringOrNull), returnType_1.ReturnType.String, validator ? validator : functionUtils_1.FunctionUtils.validateUnaryString);
    }
}
exports.StringTransformEvaluator = StringTransformEvaluator;
//# sourceMappingURL=stringTransformEvaluator.js.map