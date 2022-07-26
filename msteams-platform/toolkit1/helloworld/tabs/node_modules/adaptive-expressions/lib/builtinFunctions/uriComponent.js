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
 * Return the binary version of a uniform resource identifier (URI) component.
 */
class UriComponent extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [UriComponent](xref:adaptive-expressions.UriComponent) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.UriComponent, UriComponent.evaluator(), returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => encodeURIComponent(args[0]), functionUtils_1.FunctionUtils.verifyString);
    }
}
exports.UriComponent = UriComponent;
//# sourceMappingURL=uriComponent.js.map