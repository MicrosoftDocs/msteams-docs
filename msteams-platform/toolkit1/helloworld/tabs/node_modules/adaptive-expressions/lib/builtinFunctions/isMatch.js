"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const commonRegex_1 = require("../commonRegex");
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
/**
 * Return true if a given string matches a specified regular expression pattern.
 */
class IsMatch extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [IsMatch](xref:adaptive-expressions.IsMatch) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.IsMatch, IsMatch.evaluator(), returnType_1.ReturnType.Boolean, IsMatch.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            let value = false;
            let error;
            if (args[0] === undefined || args[0] === '') {
                value = false;
                error = 'regular expression is empty.';
            }
            else {
                const regex = commonRegex_1.CommonRegex.CreateRegex(args[1].toString());
                value = regex.test(args[0].toString());
            }
            return { value, error };
        }, functionUtils_1.FunctionUtils.verifyStringOrNull);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 2, 2, returnType_1.ReturnType.String);
        const second = expression.children[1];
        if (second.returnType === returnType_1.ReturnType.String && second.type === expressionType_1.ExpressionType.Constant) {
            commonRegex_1.CommonRegex.CreateRegex(second.value.toString());
        }
    }
}
exports.IsMatch = IsMatch;
//# sourceMappingURL=isMatch.js.map