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
const fast_xml_parser_1 = require("fast-xml-parser");
/**
 * Return the newline string according to the environment.
 */
class XML extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [EOL](xref:adaptive-expressions.EOL) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.XML, XML.evaluator(), returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnary);
    }
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => XML.platformSpecificXML(args));
    }
    static platformSpecificXML(args) {
        let result;
        let error;
        let obj;
        try {
            if (typeof args[0] === 'string') {
                obj = JSON.parse(args[0]);
            }
            else if (typeof args[0] === 'object') {
                obj = args[0];
            }
            const parser = new fast_xml_parser_1.j2xParser({
                indentBy: '  ',
                format: true,
            });
            result = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n${parser.parse(obj)}`.trim();
        }
        catch (_a) {
            error = `${args[0]} is not a valid json`;
        }
        return { value: result, error: error };
    }
}
exports.XML = XML;
//# sourceMappingURL=xml.js.map