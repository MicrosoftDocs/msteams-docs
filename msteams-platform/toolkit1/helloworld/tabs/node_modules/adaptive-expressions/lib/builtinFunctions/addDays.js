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
 * Add a number of days to a timestamp.
 */
class AddDays extends timeTransformEvaluator_1.TimeTransformEvaluator {
    /**
     * Initializes a new instance of the [AddDays](xref:adaptive-expressions.AddDays) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.AddDays, (ts, num) => {
            const newDate = new Date(ts);
            newDate.setDate(ts.getDate() + num);
            return newDate;
        });
    }
}
exports.AddDays = AddDays;
//# sourceMappingURL=addDays.js.map