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
 * Add a property and its value, or name-value pair, to a JSON object, and return the updated object.
 * If the object already exists at runtime the function throws an error.
 */
class AddProperty extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [AddProperty](xref:adaptive-expressions.AddProperty) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.AddProperty, AddProperty.evaluator(), returnType_1.ReturnType.Object, AddProperty.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            let error;
            const temp = args[0];
            const prop = String(args[1]);
            if (prop in temp) {
                error = `${prop} already exists`;
            }
            else {
                temp[String(args[1])] = args[2];
            }
            return { value: temp, error };
        });
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, undefined, returnType_1.ReturnType.Object, returnType_1.ReturnType.String, returnType_1.ReturnType.Object);
    }
}
exports.AddProperty = AddProperty;
//# sourceMappingURL=addProperty.js.map