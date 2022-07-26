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
class EOL extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [EOL](xref:adaptive-expressions.EOL) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.EOL, EOL.evaluator(), returnType_1.ReturnType.String, EOL.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply(() => EOL.platformSpecificEOL());
    }
    /**
     * @private
     */
    static platformSpecificEOL() {
        if (typeof window !== 'undefined') {
            return window.navigator.platform.includes('Win') ? '\r\n' : '\n';
        }
        else if (typeof self !== 'undefined') {
            return self.navigator.platform.includes('Win') ? '\r\n' : '\n';
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const os = require('os');
            return os.EOL;
        }
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 0, 0);
    }
}
exports.EOL = EOL;
//# sourceMappingURL=eol.js.map