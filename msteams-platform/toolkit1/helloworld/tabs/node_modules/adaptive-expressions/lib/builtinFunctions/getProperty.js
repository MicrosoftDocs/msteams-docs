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
 * Retrieve the value of the specified property from the JSON object.
 */
class GetProperty extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [GetProperty](xref:adaptive-expressions.GetProperty) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.GetProperty, GetProperty.evaluator, returnType_1.ReturnType.Object, GetProperty.validator);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let value;
        let property;
        const children = expression.children;
        const { value: firstItem, error: childrenError } = children[0].tryEvaluate(state, options);
        let error = childrenError;
        if (!error) {
            if (children.length === 1) {
                // get root value from memory
                if (typeof firstItem === 'string') {
                    value = functionUtils_internal_1.InternalFunctionUtils.wrapGetValue(state, firstItem, options);
                }
                else {
                    error = `"Single parameter ${children[0]} is not a string."`;
                }
            }
            else {
                // get the peoperty value from the instance
                ({ value: property, error } = children[1].tryEvaluate(state, options));
                if (!error) {
                    value = functionUtils_internal_1.InternalFunctionUtils.wrapGetValue(new simpleObjectMemory_1.SimpleObjectMemory(firstItem), property.toString(), options);
                }
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, [returnType_1.ReturnType.String], returnType_1.ReturnType.Object);
    }
}
exports.GetProperty = GetProperty;
//# sourceMappingURL=getProperty.js.map