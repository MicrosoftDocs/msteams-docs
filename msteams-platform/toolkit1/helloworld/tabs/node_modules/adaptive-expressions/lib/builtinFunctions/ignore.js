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
 * Mark a clause so that MostSpecificSelector will ignore it.
 * MostSpecificSelector considers A &amp; B to be more specific than A, but some clauses are unique and incomparable.
 *
 */
class Ignore extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Ignore](xref:adaptive-expressions.Ignore) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Ignore, Ignore.evaluator, returnType_1.ReturnType.Boolean, functionUtils_1.FunctionUtils.validateUnaryBoolean);
        this.negation = this;
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        return expression.children[0].tryEvaluate(state, options);
    }
}
exports.Ignore = Ignore;
//# sourceMappingURL=ignore.js.map