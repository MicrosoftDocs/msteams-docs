"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
/**
 * Return a new Guid string.
 */
class NewGuid extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [NewGuid](xref:adaptive-expressions.NewGuid) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.NewGuid, NewGuid.evaluator(), returnType_1.ReturnType.String, NewGuid.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply(() => NewGuid.evalNewGuid());
    }
    /**
     * @private
     */
    static evalNewGuid() {
        return uuid_1.v4();
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 0, 0);
    }
}
exports.NewGuid = NewGuid;
//# sourceMappingURL=newGuid.js.map