"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
/**
 * Return the first non-null value from one or more parameters.
 * Empty strings, empty arrays, and empty objects are not null.
 */
class Coalesce extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Coalesce](xref:adaptive-expressions.Coalesce) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Coalesce, Coalesce.evaluator(), returnType_1.ReturnType.Object, functionUtils_1.FunctionUtils.validateAtLeastOne);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => Coalesce.evalCoalesce(args));
    }
    /**
     * @private
     */
    static evalCoalesce(objectList) {
        for (const obj of objectList) {
            if (obj != null) {
                return obj;
            }
        }
        return undefined;
    }
}
exports.Coalesce = Coalesce;
//# sourceMappingURL=coalesce.js.map