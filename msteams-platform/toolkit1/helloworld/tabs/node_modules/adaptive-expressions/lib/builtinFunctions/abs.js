"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expressionType_1 = require("../expressionType");
const numberTransformEvaluator_1 = require("./numberTransformEvaluator");
/**
 * Returns the absolute value of the specified number.
 */
class Abs extends numberTransformEvaluator_1.NumberTransformEvaluator {
    /**
     * Initializes a new instance of the [Floor](xref:adaptive-expressions.Abs) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Abs, Abs.func);
    }
    /**
     * @private
     */
    static func(args) {
        return Math.abs(args[0]);
    }
}
exports.Abs = Abs;
//# sourceMappingURL=abs.js.map