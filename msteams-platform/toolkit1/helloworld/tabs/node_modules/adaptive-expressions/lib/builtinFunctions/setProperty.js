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
 * Set the value of an object's property and return the updated object.
 */
class SetProperty extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [SetProperty](xref:adaptive-expressions.SetProperty) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.SetProperty, SetProperty.evaluator(), returnType_1.ReturnType.Object, SetProperty.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => {
            const temp = args[0];
            temp[String(args[1])] = args[2];
            return temp;
        });
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, undefined, returnType_1.ReturnType.Object, returnType_1.ReturnType.String, returnType_1.ReturnType.Object);
    }
}
exports.SetProperty = SetProperty;
//# sourceMappingURL=setProperty.js.map