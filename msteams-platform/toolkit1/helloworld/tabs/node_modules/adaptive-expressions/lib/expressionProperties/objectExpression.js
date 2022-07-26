"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const expressionProperty_1 = require("./expressionProperty");
/**
 * Represents a property which is either an object of type T or a string expression which resolves
 * to a object of type T.
 *
 * @remarks
 * String values are always interpreted as an expression, whether it has '=' prefix or not.
 * @param T The type of object.
 */
class ObjectExpression extends expressionProperty_1.ExpressionProperty {
    /**
     * Initializes a new instance of the [ObjectExpression<T>](xref:adaptive-expressions.ObjectExpression) class.
     *
     * @param value An object of type `T` or a `string` expression which resolves to a object of type `T`.
     */
    constructor(value) {
        super(value);
    }
}
exports.ObjectExpression = ObjectExpression;
//# sourceMappingURL=objectExpression.js.map