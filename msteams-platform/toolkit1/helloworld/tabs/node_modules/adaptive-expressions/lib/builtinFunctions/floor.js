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
 * Returns the largest integer less than or equal to the specified number.
 */
class Floor extends numberTransformEvaluator_1.NumberTransformEvaluator {
    /**
     * Initializes a new instance of the [Floor](xref:adaptive-expressions.Floor) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Floor, Floor.func);
    }
    /**
     * @private
     */
    static func(args) {
        return Math.floor(args[0]);
    }
}
exports.Floor = Floor;
//# sourceMappingURL=floor.js.map