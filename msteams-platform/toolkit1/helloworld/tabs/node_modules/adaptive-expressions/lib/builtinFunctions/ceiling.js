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
 * Returns the smallest integral value that is greater than or equal to the specified number.
 */
class Ceiling extends numberTransformEvaluator_1.NumberTransformEvaluator {
    /**
     * Initializes a new instance of the [Ceiling](xref:adaptive-expressions.Ceiling) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Ceiling, Ceiling.func);
    }
    /**
     * @private
     */
    static func(args) {
        return Math.ceil(args[0]);
    }
}
exports.Ceiling = Ceiling;
//# sourceMappingURL=ceiling.js.map