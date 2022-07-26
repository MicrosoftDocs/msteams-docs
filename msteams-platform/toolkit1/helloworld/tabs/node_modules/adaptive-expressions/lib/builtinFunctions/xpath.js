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
 * Return the newline string according to the environment.
 */
class XPath extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [EOL](xref:adaptive-expressions.EOL) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.XPath, XPath.evaluator(), returnType_1.ReturnType.Object, XPath.validator);
    }
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => XPath.platformSpecificXPath(args));
    }
    static platformSpecificXPath(args) {
        if (typeof window !== 'undefined' || typeof self !== 'undefined') {
            // this is for evaluating in browser environment, however it is not covered by any test currently
            let error;
            let result;
            let xmlDoc;
            try {
                const parser = new DOMParser();
                xmlDoc = parser.parseFromString(args[0], 'text/xml');
            }
            catch (_a) {
                error = error = `${args[0]} is not valid xml input`;
            }
            if (!error) {
                const nodes = xmlDoc.evaluate(args[1], xmlDoc, null, XPathResult.ANY_TYPE, null);
                let node = nodes.iterateNext();
                const evalResult = [];
                while (node) {
                    evalResult.push(node.childNodes[0].nodeValue);
                    node = nodes.iterateNext();
                }
                if (evalResult.length === 0) {
                    error = `There is no matched nodes for the expression ${args[1]} in the xml: ${args[0]}`;
                }
                else if (evalResult.length === 1) {
                    result = evalResult[0];
                }
                else {
                    result = evalResult;
                }
                return { value: result, error: error };
            }
        }
        else {
            let error;
            let result;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const xpath = require('xpath');
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { DOMParser } = require('@xmldom/xmldom');
            let doc;
            try {
                doc = new DOMParser().parseFromString(args[0], 'text/xml');
            }
            catch (_b) {
                error = `${args[0]} is not valid xml input`;
            }
            if (!error) {
                const nodes = xpath.select(args[1], doc);
                if (Array.isArray(nodes)) {
                    if (nodes.length === 0) {
                        error = `There is no matched nodes for the expression ${args[1]} in the xml: ${args[0]}`;
                    }
                    else {
                        result = nodes.map((node) => node.toString());
                    }
                }
                else {
                    result = nodes;
                }
            }
            return { value: result, error: error };
        }
    }
    /**
     * @param expression
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateOrder(expression, undefined, returnType_1.ReturnType.Object, returnType_1.ReturnType.String);
    }
}
exports.XPath = XPath;
//# sourceMappingURL=xpath.js.map