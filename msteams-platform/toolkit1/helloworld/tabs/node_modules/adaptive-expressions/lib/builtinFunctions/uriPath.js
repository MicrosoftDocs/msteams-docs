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
const returnType_1 = require("../returnType");
/**
 * Return the path value of a unified resource identifier (URI).
 */
class UriPath extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [UriPath](xref:adaptive-expressions.UriPath) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.UriPath, UriPath.evaluator, returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnary);
    }
    /**
     * @private
     */
    static evaluator(expr, state, options) {
        let value;
        const { args, error: childrenError } = functionUtils_1.FunctionUtils.evaluateChildren(expr, state, options);
        let error = childrenError;
        if (!error) {
            if (typeof args[0] === 'string') {
                ({ value, error } = UriPath.evalUriPath(args[0]));
            }
            else {
                error = `${expr} should contain a URI string.`;
            }
        }
        return { value, error };
    }
    /**
     * @private
     */
    static evalUriPath(uri) {
        let result;
        let error = functionUtils_internal_1.InternalFunctionUtils.parseUri(uri).error;
        if (!error) {
            try {
                const uriObj = new URL(uri);
                result = uriObj.pathname;
            }
            catch (_a) {
                error = 'invalid operation, input uri should be an absolute URI';
            }
        }
        return { value: result, error };
    }
}
exports.UriPath = UriPath;
//# sourceMappingURL=uriPath.js.map