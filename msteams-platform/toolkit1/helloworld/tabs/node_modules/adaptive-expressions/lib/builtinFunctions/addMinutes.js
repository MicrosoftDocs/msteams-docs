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
const timeTransformEvaluator_1 = require("./timeTransformEvaluator");
/**
 * Add a number of minutes to a timestamp.
 */
class AddMinutes extends timeTransformEvaluator_1.TimeTransformEvaluator {
    /**
     * Initializes a new instance of the [AddMinutes](xref:adaptive-expressions.AddMinutes) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.AddMinutes, (ts, num) => {
            const newDate = new Date(ts);
            newDate.setMinutes(ts.getMinutes() + num);
            return newDate;
        });
    }
}
exports.AddMinutes = AddMinutes;
//# sourceMappingURL=addMinutes.js.map