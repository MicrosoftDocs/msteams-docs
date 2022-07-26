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
const functionUtils_internal_1 = require("../functionUtils.internal");
const simpleObjectMemory_1 = require("../memory/simpleObjectMemory");
const returnType_1 = require("../returnType");
/**
 * Used to access the variable value corresponding to the path.
 */
class Accessor extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Accessor](xref:adaptive-expressions.Accessor) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Accessor, Accessor.evaluator, returnType_1.ReturnType.Object, Accessor.validator);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        const { path, left, error } = functionUtils_1.FunctionUtils.tryAccumulatePath(expression, state, options);
        if (error) {
            return { value: undefined, error };
        }
        if (left == null) {
            // fully converted to path, so we just delegate to memory scope
            return { value: functionUtils_internal_1.InternalFunctionUtils.wrapGetValue(state, path, options), error: undefined };
        }
        else {
            const { value: newScope, error: err } = left.tryEvaluate(state, options);
            if (err) {
                return { value: undefined, error: err };
            }
            return {
                value: functionUtils_internal_1.InternalFunctionUtils.wrapGetValue(new simpleObjectMemory_1.SimpleObjectMemory(newScope), path, options),
                error: undefined,
            };
        }
    }
    /**
     * @private
     */
    static validator(expression) {
        const children = expression.children;
        if (children.length === 0 ||
            children[0].type !== expressionType_1.ExpressionType.Constant ||
            children[0].returnType !== returnType_1.ReturnType.String) {
            throw new Error(`${expression} must have a string as first argument.`);
        }
        if (children.length > 2) {
            throw new Error(`${expression} has more than 2 children.`);
        }
        if (children.length === 2 && (children[1].returnType & returnType_1.ReturnType.Object) === 0) {
            throw new Error(`${expression} must have an object as its second argument.`);
        }
    }
}
exports.Accessor = Accessor;
//# sourceMappingURL=accessor.js.map