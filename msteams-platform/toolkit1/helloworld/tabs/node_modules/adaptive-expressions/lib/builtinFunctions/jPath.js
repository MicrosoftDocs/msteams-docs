"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsPath = __importStar(require("jspath"));
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const returnType_1 = require("../returnType");
/**
 * Check JSON or a JSON string for nodes or values that match a path expression, and return the matching nodes.
 */
class JPath extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [JPath](xref:adaptive-expressions.JPath) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.JPath, JPath.evaluator(), returnType_1.ReturnType.Object, JPath.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => JPath.evalJPath(args[0], args[1].toString()));
    }
    /**
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    static evalJPath(jsonEntity, path) {
        let error;
        let evaled;
        // eslint-disable-next-line @typescript-eslint/ban-types
        let json;
        if (typeof jsonEntity === 'string') {
            try {
                json = JSON.parse(jsonEntity);
            }
            catch (_a) {
                error = `${jsonEntity} is not a valid json string`;
            }
        }
        else if (typeof jsonEntity === 'object') {
            json = jsonEntity;
        }
        else {
            error = 'the first parameter should be either an object or a string';
        }
        if (!error) {
            try {
                evaled = jsPath.apply(path, json);
            }
            catch (e) {
                error = `${path} is not a valid path + ${e}`;
            }
        }
        return { value: evaled, error };
    }
    /**
     * @private
     */
    static validator(expr) {
        functionUtils_1.FunctionUtils.validateOrder(expr, undefined, returnType_1.ReturnType.Object, returnType_1.ReturnType.String);
    }
}
exports.JPath = JPath;
//# sourceMappingURL=jPath.js.map