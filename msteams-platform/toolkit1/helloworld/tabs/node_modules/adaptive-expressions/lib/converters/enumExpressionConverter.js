"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expressionProperties_1 = require("../expressionProperties");
/**
 * `string` to json [EnumExpression](xref:adaptive-expressions.EnumExpression) converter.
 */
class EnumExpressionConverter {
    /**
     * Initializes a new instance of the [EnumExpressionConverter](xref:adaptive-expressions.EnumExpressionConverter) class.
     *
     * @param enumValue The enum value of the `string` to convert.
     */
    constructor(enumValue) {
        this.enumValue = enumValue;
        this.lowercaseIndex = Object.keys(enumValue || {}).reduce((acc, key) => {
            acc[key.toLowerCase()] = key;
            return acc;
        }, {});
    }
    /**
     * Converts a `string` into an [EnumExpression](xref:adaptive-expressions.EnumExpression).
     *
     * @param value `string` to convert.
     * @returns The [EnumExpression](xref:adaptive-expressions.EnumExpression).
     */
    convert(value) {
        if (value instanceof expressionProperties_1.EnumExpression) {
            return value;
        }
        if (typeof value === 'string') {
            let enumValue = this.enumValue[value];
            if (enumValue === undefined) {
                enumValue = this.enumValue[this.lowercaseIndex[value]];
            }
            if (enumValue !== undefined) {
                return new expressionProperties_1.EnumExpression(enumValue);
            }
            return new expressionProperties_1.EnumExpression(`=${value}`);
        }
        return new expressionProperties_1.EnumExpression(value);
    }
}
exports.EnumExpressionConverter = EnumExpressionConverter;
//# sourceMappingURL=enumExpressionConverter.js.map