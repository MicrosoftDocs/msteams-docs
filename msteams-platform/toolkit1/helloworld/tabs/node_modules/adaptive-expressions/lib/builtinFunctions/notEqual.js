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
 * Return true if the two items are not equal.
 */
class NotEqual extends comparisonEvaluator_1.ComparisonEvaluator {
    /**
     * Initializes a new instance of the [NotEqual](xref:adaptive-expressions.NotEqual) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.NotEqual, (args) => !functionUtils_1.FunctionUtils.commonEquals(args[0], args[1]), functionUtils_1.FunctionUtils.validateBinary);
    }
}
exports.NotEqual = NotEqual;
//# sourceMappingURL=notEqual.js.map