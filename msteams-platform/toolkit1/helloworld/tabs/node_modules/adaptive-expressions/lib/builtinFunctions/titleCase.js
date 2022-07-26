"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const functionUtils_1 = require("../functionUtils");
const expressionType_1 = require("../expressionType");
const functionUtils_internal_1 = require("../functionUtils.internal");
const stringTransformEvaluator_1 = require("./stringTransformEvaluator");
/**
 * Converts the specified string to title case.
 */
class TitleCase extends stringTransformEvaluator_1.StringTransformEvaluator {
    /**
     * Initializes a new instance of the [TitleCase](xref:adaptive-expressions.TitleCase) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.TitleCase, TitleCase.evaluator, functionUtils_1.FunctionUtils.validateUnaryOrBinaryString);
    }
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
                return inputStr.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLocaleLowerCase(locale));
            }
        }
    }
}
exports.TitleCase = TitleCase;
//# sourceMappingURL=titleCase.js.map