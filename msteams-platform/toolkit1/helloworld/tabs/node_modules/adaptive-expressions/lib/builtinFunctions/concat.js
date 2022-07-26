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
const functionUtils_internal_1 = require("../functionUtils.internal");
/**
 * Combine two or more strings, and return the combined string.
 */
class Concat extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Concat](xref:adaptive-expressions.Concat) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Concat, Concat.evaluator(), returnType_1.ReturnType.String | returnType_1.ReturnType.Array, functionUtils_1.FunctionUtils.validateAtLeastOne);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applySequence((args) => {
            const firstItem = args[0];
            const secondItem = args[1];
            const isFirstList = Array.isArray(firstItem);
            const isSecondList = Array.isArray(secondItem);
            if (firstItem == null && secondItem == null) {
                return undefined;
            }
            else if (firstItem == null && isSecondList) {
                return secondItem;
            }
            else if (secondItem == null && isFirstList) {
                return firstItem;
            }
            else if (isFirstList && isSecondList) {
                return firstItem.concat(secondItem);
            }
            else {
                return (functionUtils_internal_1.InternalFunctionUtils.commonStringify(firstItem) + functionUtils_internal_1.InternalFunctionUtils.commonStringify(secondItem));
            }
        });
    }
}
exports.Concat = Concat;
//# sourceMappingURL=concat.js.map