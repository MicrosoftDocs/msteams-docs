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
 * Add a number of hours to a timestamp.
 */
class AddHours extends timeTransformEvaluator_1.TimeTransformEvaluator {
    /**
     * Initializes a new instance of the [AddHours](xref:adaptive-expressions.AddHours) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.AddHours, (ts, num) => {
            const newDate = new Date(ts);
            newDate.setHours(ts.getHours() + num);
            return newDate;
        });
    }
}
exports.AddHours = AddHours;
//# sourceMappingURL=addHours.js.map