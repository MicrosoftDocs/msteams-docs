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
const functionUtils_internal_1 = require("../functionUtils.internal");
const stringTransformEvaluator_1 = require("./stringTransformEvaluator");
/**
 * Remove leading and trailing whitespace from a string, and return the updated string.
 */
class Trim extends stringTransformEvaluator_1.StringTransformEvaluator {
    /**
     * Initializes a new instance of the [Trim](xref:adaptive-expressions.Trim) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Trim, Trim.evaluator);
    }
    /**
     * @private
     */
    static evaluator(args) {
        const firstArg = args[0];
        if (typeof firstArg === 'string' || firstArg === undefined) {
            return String(functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(firstArg)).trim();
        }
    }
}
exports.Trim = Trim;
//# sourceMappingURL=trim.js.map