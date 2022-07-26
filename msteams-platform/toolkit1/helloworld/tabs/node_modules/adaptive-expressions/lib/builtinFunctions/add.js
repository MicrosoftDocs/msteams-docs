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
 * Return the result from adding two or more numbers (pure number case) or concatting two or more strings (other case).
 */
class Add extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Add](xref:adaptive-expressions.Add) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.Add, Add.evaluator(), returnType_1.ReturnType.String | returnType_1.ReturnType.Number, Add.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applySequenceWithError((args) => {
            let value;
            let error;
            const stringConcat = !functionUtils_1.FunctionUtils.isNumber(args[0]) || !functionUtils_1.FunctionUtils.isNumber(args[1]);
            if ((args[0] == null && functionUtils_1.FunctionUtils.isNumber(args[1])) ||
                (args[1] == null && functionUtils_1.FunctionUtils.isNumber(args[0]))) {
                error = "Operator '+' or add cannot be applied to operands of type 'number' and null object.";
            }
            else if (stringConcat) {
                if (args[0] == null && args[1] == null) {
                    value = '';
                }
                else if (args[0] == null) {
                    value = args[1].toString();
                }
                else if (args[1] == null) {
                    value = args[0].toString();
                }
                else {
                    value = args[0].toString() + args[1].toString();
                }
            }
            else {
                value = args[0] + args[1];
            }
            return { value, error };
        }, functionUtils_1.FunctionUtils.verifyNumberOrStringOrNull);
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 2, Number.MAX_SAFE_INTEGER, returnType_1.ReturnType.String | returnType_1.ReturnType.Number);
    }
}
exports.Add = Add;
//# sourceMappingURL=add.js.map