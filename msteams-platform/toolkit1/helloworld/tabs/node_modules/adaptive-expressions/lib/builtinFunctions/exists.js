"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const comparisonEvaluator_1 = require("./comparisonEvaluator");
/**
 * Evaluates an expression for truthiness.
 */
class Exists extends comparisonEvaluator_1.ComparisonEvaluator {
    /**
     * Initializes a new instance of the [Exists](xref:adaptive-expressions.Exists) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Exists, Exists.func, functionUtils_1.FunctionUtils.validateUnary, functionUtils_1.FunctionUtils.verifyNotNull);
    }
    /**
     * @private
     */
    static func(args) {
        return args[0] != null;
    }
}
exports.Exists = Exists;
//# sourceMappingURL=exists.js.map