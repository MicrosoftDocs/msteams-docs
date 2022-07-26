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
 * Set path in a JSON object to value.
 */
class SetPathToValue extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [SetPathToValue](xref:adaptive-expressions.SetPathToValue) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.SetPathToValue, SetPathToValue.evaluator, returnType_1.ReturnType.Object, functionUtils_1.FunctionUtils.validateBinary);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        const { path, left, error } = functionUtils_1.FunctionUtils.tryAccumulatePath(expression.children[0], state, options);
        if (error !== undefined) {
            return { value: undefined, error };
        }
        if (left) {
            // the expression can't be fully merged as a path
            return { value: undefined, error: `${expression.children[0].toString()} is not a valid path to set value` };
        }
        const { value, error: err } = expression.children[1].tryEvaluate(state, options);
        if (err) {
            return { value: undefined, error: err };
        }
        state.setValue(path, value);
        return { value, error: undefined };
    }
}
exports.SetPathToValue = SetPathToValue;
//# sourceMappingURL=setPathToValue.js.map