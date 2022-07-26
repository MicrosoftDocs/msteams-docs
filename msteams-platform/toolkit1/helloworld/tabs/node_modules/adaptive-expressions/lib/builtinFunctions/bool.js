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
const functionUtils_internal_1 = require("../functionUtils.internal");
const comparisonEvaluator_1 = require("./comparisonEvaluator");
/**
 * Return the Boolean version of a value.
 */
class Bool extends comparisonEvaluator_1.ComparisonEvaluator {
    /**
     * Initializes a new instance of the [Bool](xref:adaptive-expressions.Bool) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Bool, Bool.func, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static func(args) {
        if (functionUtils_1.FunctionUtils.isNumber(args[0])) {
            return args[0] !== 0;
        }
        return functionUtils_internal_1.InternalFunctionUtils.isLogicTrue(args[0]);
    }
}
exports.Bool = Bool;
//# sourceMappingURL=bool.js.map