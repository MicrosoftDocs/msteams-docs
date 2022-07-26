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
 * Check whether an instance is empty. Return true if the input is empty. Empty means:
 * 1.Input is null or undefined.
 * 2.Input is a null or empty string.
 * 3.Input is zero size collection.
 * 4.Input is an object with no property.
 */
class Empty extends comparisonEvaluator_1.ComparisonEvaluator {
    /**
     * Initializes a new instance of the [Empty](xref:adaptive-expressions.Empty) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Empty, Empty.func, functionUtils_1.FunctionUtils.validateUnary, functionUtils_1.FunctionUtils.verifyContainerOrNull);
    }
    /**
     * @private
     */
    static func(args) {
        return Empty.isEmpty(args[0]);
    }
    /**
     * @private
     */
    static isEmpty(instance) {
        let result;
        if (instance == null) {
            result = true;
        }
        else if (typeof instance === 'string') {
            result = instance === '';
        }
        else if (Array.isArray(instance)) {
            result = instance.length === 0;
        }
        else if (instance instanceof Map) {
            result = instance.size === 0;
        }
        else {
            result = Object.keys(instance).length === 0;
        }
        return result;
    }
}
exports.Empty = Empty;
//# sourceMappingURL=empty.js.map