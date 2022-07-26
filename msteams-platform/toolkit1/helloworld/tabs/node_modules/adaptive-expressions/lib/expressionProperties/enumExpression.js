"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expressionProperty_1 = require("./expressionProperty");
/**
 * EnumExpression - represents a property which is either an enum of T or a string expression which resolves to an enum.
 *
 * @remarks
 * String values are always interpreted as an expression whether it has '=' prefix or not, as string values cannot be parsed to enum values.
 */
class EnumExpression extends expressionProperty_1.ExpressionProperty {
    /**
     * Initializes a new instance of the [EnumExpression<T>](xref:adaptive-expressions.EnumExpression) class.
     *
     * @param value An enum of `T` or a `string` expression which resolves to an `enum`.
     */
    constructor(value) {
        super(value);
    }
    /**
     * Set an enum value.
     *
     * @param value value to set.
     */
    setValue(value) {
        super.setValue(undefined);
        if (typeof value == 'string' && !value.startsWith('=')) {
            // Initialize value
            this.value = value;
            return;
        }
        super.setValue(value);
    }
}
exports.EnumExpression = EnumExpression;
//# sourceMappingURL=enumExpression.js.map