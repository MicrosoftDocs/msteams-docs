"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
const expression_1 = require("../expression");
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
/**
 * Wrap string interpolation to get real value.
 * For example: stringOrValue('${1}'), would get number 1
 * stringOrValue('${1} item'), would get string "1 item".
 */
class StringOrValue extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [StringOrValue](xref:adaptive-expressions.StringOrValue) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.StringOrValue, StringOrValue.evaluator, returnType_1.ReturnType.Object, functionUtils_1.FunctionUtils.validateUnaryString);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        const { value: stringInput, error: childrenError } = expression.children[0].tryEvaluate(state, options);
        let error = childrenError;
        if (typeof stringInput !== 'string') {
            error = 'Parameter should be a string.';
        }
        if (!error) {
            const expr = expression_1.Expression.parse('`' + stringInput + '`');
            if (expr.children.length === 2) {
                const firstChild = expr.children[0];
                const secondChild = expr.children[1];
                // If the Expression follows this format:
                // concat('', childExpression)
                // return the childExpression result directly.
                if (firstChild instanceof constant_1.Constant &&
                    firstChild.value.toString() === '' &&
                    !(secondChild instanceof constant_1.Constant)) {
                    return secondChild.tryEvaluate(state, options);
                }
            }
            return expr.tryEvaluate(state, options);
        }
        return { value: undefined, error };
    }
}
exports.StringOrValue = StringOrValue;
//# sourceMappingURL=stringOrValue.js.map