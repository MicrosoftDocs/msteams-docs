"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const expression_1 = require("./expression");
const returnType_1 = require("./returnType");
const expressionEvaluator_1 = require("./expressionEvaluator");
const expressionType_1 = require("./expressionType");
const functionUtils_1 = require("./functionUtils");
/**
 * Construct an expression constant.
 */
class Constant extends expression_1.Expression {
    /**
     * Initializes a new instance of the [Constant](xref:adaptive-expressions.Constant) class.
     * Constructs an expression constant.
     *
     * @param value Constant value.
     */
    constructor(value) {
        super(expressionType_1.ExpressionType.Constant, new expressionEvaluator_1.ExpressionEvaluator(expressionType_1.ExpressionType.Constant, (expression) => {
            return { value: expression.value, error: undefined };
        }));
        // original regex: (?<!\\)'
        this.singleQuotRegex = new RegExp(/'(?!\\)/g);
        this.value = value;
    }
    /**
     * Constant value.
     *
     * @returns The value.
     */
    get value() {
        return this._value;
    }
    /**
     * Sets constant value.
     */
    set value(theValue) {
        this.evaluator.returnType =
            typeof theValue === 'string'
                ? returnType_1.ReturnType.String
                : typeof theValue === 'boolean'
                    ? returnType_1.ReturnType.Boolean
                    : functionUtils_1.FunctionUtils.isNumber(theValue)
                        ? returnType_1.ReturnType.Number
                        : Array.isArray(theValue)
                            ? returnType_1.ReturnType.Array
                            : returnType_1.ReturnType.Object;
        this._value = theValue;
    }
    /**
     * Determines if the current [Expression](xref:adaptive-expressions.Expression) instance is deep equal to another one.
     *
     * @param other The other [Expression](xref:adaptive-expressions.Expression) instance to compare.
     * @returns A boolean value indicating whether the two expressions are deep equal (`true`) or not (`false`).
     */
    deepEquals(other) {
        let eq;
        if (!other || other.type !== this.type) {
            eq = false;
        }
        else {
            const otherVal = other.value;
            eq = this.value === otherVal;
        }
        return eq;
    }
    /**
     * Returns a string that represents the current constant object.
     *
     * @returns A string that represents the current constant object.
     */
    toString() {
        if (this.value === undefined) {
            return 'undefined';
        }
        else if (this.value === null) {
            return 'null';
        }
        else if (typeof this.value === 'string') {
            let result = this.value;
            result = result.replace(/\\/g, '\\\\');
            result = this.reverseString(this.reverseString(result).replace(this.singleQuotRegex, () => "'\\"));
            return `'${result}'`;
        }
        else if (functionUtils_1.FunctionUtils.isNumber(this.value)) {
            return this.value.toString();
        }
        else if (typeof this.value === 'object') {
            return JSON.stringify(this.value);
        }
        return this.value.toString();
    }
    /**
     * @private
     */
    reverseString(str) {
        if (!str) {
            return str;
        }
        return str.split('').reverse().join('');
    }
}
exports.Constant = Constant;
//# sourceMappingURL=constant.js.map