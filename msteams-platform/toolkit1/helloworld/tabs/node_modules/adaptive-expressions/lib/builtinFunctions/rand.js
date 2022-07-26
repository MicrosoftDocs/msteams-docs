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
const extensions_1 = require("../extensions");
/**
 * Return a random integer from a specified range, which is inclusive only at the starting end.
 */
class Rand extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Rand](xref:adaptive-expressions.Rand) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Rand, Rand.evaluator, returnType_1.ReturnType.Number, functionUtils_1.FunctionUtils.validateBinaryNumber);
    }
    static evaluator(expression, state, options) {
        let result;
        let minValue;
        let maxValue;
        let error;
        const [maybeMinValue, maybeMaxValue] = expression.children;
        // eslint-disable-next-line prefer-const
        ({ value: minValue, error } = maybeMinValue.tryEvaluate(state, options));
        if (error) {
            return { value: undefined, error };
        }
        if (!Number.isInteger(minValue)) {
            return { value: undefined, error: `${minValue} is not an integer.` };
        }
        // eslint-disable-next-line prefer-const
        ({ value: maxValue, error } = maybeMaxValue.tryEvaluate(state, options));
        if (error) {
            return { value: undefined, error };
        }
        if (!Number.isInteger(maxValue)) {
            return { value: undefined, error: `${maxValue} is not an integer.` };
        }
        if (minValue > maxValue) {
            error = `Min value ${minValue} cannot be greater than max value ${maxValue}.`;
        }
        else {
            result = extensions_1.Extensions.randomNext(state, minValue, maxValue);
        }
        return { value: result, error };
    }
}
exports.Rand = Rand;
//# sourceMappingURL=rand.js.map