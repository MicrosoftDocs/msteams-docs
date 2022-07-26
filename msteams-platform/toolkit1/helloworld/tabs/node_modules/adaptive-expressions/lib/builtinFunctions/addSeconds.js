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
 * Add a number of seconds to a timestamp.
 */
class AddSeconds extends timeTransformEvaluator_1.TimeTransformEvaluator {
    /**
     * Initializes a new instance of the [AddSeconds](xref:adaptive-expressions.AddSeconds) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.AddSeconds, (ts, num) => {
            const newDate = new Date(ts);
            newDate.setSeconds(ts.getSeconds() + num);
            return newDate;
        });
    }
}
exports.AddSeconds = AddSeconds;
//# sourceMappingURL=addSeconds.js.map