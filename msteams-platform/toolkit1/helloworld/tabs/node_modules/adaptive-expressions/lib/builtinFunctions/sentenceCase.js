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
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const stringTransformEvaluator_1 = require("./stringTransformEvaluator");
/**
 * Capitalizing only the first word and leave others lowercase.
 */
class SentenceCase extends stringTransformEvaluator_1.StringTransformEvaluator {
    /**
     * Initializes a new instance of the [SentenceCase](xref:adaptive-expressions.SentenceCase) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.SentenceCase, SentenceCase.evaluator, functionUtils_1.FunctionUtils.validateUnaryOrBinaryString);
    }
    /**
     * @private
     */
    static evaluator(args, options) {
        let locale = options.locale ? options.locale : Intl.DateTimeFormat().resolvedOptions().locale;
        locale = functionUtils_1.FunctionUtils.determineLocale(args, 2, locale);
        const firstArg = args[0];
        if (typeof firstArg === 'string' || firstArg === undefined) {
            const inputStr = functionUtils_internal_1.InternalFunctionUtils.parseStringOrUndefined(firstArg).toLocaleLowerCase(locale);
            if (inputStr === '') {
                return inputStr;
            }
            else {
                return inputStr.charAt(0).toUpperCase() + inputStr.substr(1).toLocaleLowerCase(locale);
            }
        }
    }
}
exports.SentenceCase = SentenceCase;
//# sourceMappingURL=sentenceCase.js.map