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
 * For the MostSpecificSelector, this is a short hand so that instead of having to do A &amp; B || A you can do A &amp; optional(B) to mean the same thing.
 */
class Optional extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Optional](xref:adaptive-expressions.Optional) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Optional, Optional.evaluator(), returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateUnaryBoolean);
        this.negation = this;
    }
    /**
     * @private
     */
    static evaluator() {
        return undefined;
    }
}
exports.Optional = Optional;
//# sourceMappingURL=optional.js.map