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
 * Remove a property from an object and return the updated object.
 */
class RemoveProperty extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [RemoveProperty](xref:adaptive-expressions.RemoveProperty) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.RemoveProperty, RemoveProperty.evaluator(), returnType_1.ReturnType.Object, RemoveProperty.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            const temp = args[0];
            delete temp[String(args[1])];
            return temp;
        });
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, undefined, returnType_1.ReturnType.Object, returnType_1.ReturnType.String);
    }
}
exports.RemoveProperty = RemoveProperty;
//# sourceMappingURL=removeProperty.js.map