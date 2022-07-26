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
 * Return the JavaScript Object Notation (JSON) type value or object of a string or XML.
 */
class Json extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Json](xref:adaptive-expressions.Json) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Json, Json.evaluator(), returnType_1.ReturnType.Object, Json.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => JSON.parse(args[0].trim()));
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, undefined, returnType_1.ReturnType.String);
    }
}
exports.Json = Json;
//# sourceMappingURL=json.js.map