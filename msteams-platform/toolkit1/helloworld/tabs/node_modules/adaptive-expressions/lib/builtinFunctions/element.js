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
const functionUtils_internal_1 = require("../functionUtils.internal");
const options_1 = require("../options");
const returnType_1 = require("../returnType");
/**
 * The indexing operator ([ ]) selects a single element from a sequence.
 * Support number index for list or string index for object.
 */
class Element extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Element](xref:adaptive-expressions.Element) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Element, Element.evaluator, returnType_1.ReturnType.Object, functionUtils_1.FunctionUtils.validateBinary);
    }
    /**
     * @private
     */
    static evaluator(expression, state, options) {
        let value;
        const instance = expression.children[0];
        const index = expression.children[1];
        const { value: inst, error: evalError } = instance.tryEvaluate(state, options);
        let error = evalError;
        if (!error) {
            let idxValue;
            const newOptions = new options_1.Options(options);
            newOptions.nullSubstitution = undefined;
            ({ value: idxValue, error } = index.tryEvaluate(state, newOptions));
            if (!error) {
                if (Number.isInteger(idxValue)) {
                    ({ value, error } = functionUtils_internal_1.InternalFunctionUtils.accessIndex(inst, Number(idxValue)));
                }
                else if (typeof idxValue === 'string') {
                    ({ value, error } = functionUtils_internal_1.InternalFunctionUtils.accessProperty(inst, idxValue.toString()));
                }
                else {
                    error = `Could not coerce ${index} to an int or string.`;
                }
                return { value, error };
            }
        }
    }
}
exports.Element = Element;
//# sourceMappingURL=element.js.map