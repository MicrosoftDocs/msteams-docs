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
 * Return the ordinal number of the input number.
 */
class AddOrdinal extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [AddOrdinal](xref:adaptive-expressions.AddOrdinal) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.AddOrdinal, AddOrdinal.evaluator(), returnType_1.ReturnType.String, AddOrdinal.validator);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.apply((args) => AddOrdinal.evalAddOrdinal(args[0]), functionUtils_1.FunctionUtils.verifyInteger);
    }
    /**
     * @private
     */
    static evalAddOrdinal(num) {
        let hasResult = false;
        let ordinalResult = num.toString();
        if (num > 0) {
            switch (num % 100) {
                case 11:
                case 12:
                case 13:
                    ordinalResult += 'th';
                    hasResult = true;
                    break;
                default:
                    break;
            }
            if (!hasResult) {
                switch (num % 10) {
                    case 1:
                        ordinalResult += 'st';
                        break;
                    case 2:
                        ordinalResult += 'nd';
                        break;
                    case 3:
                        ordinalResult += 'rd';
                        break;
                    default:
                        ordinalResult += 'th';
                        break;
                }
            }
        }
        return ordinalResult;
    }
    /**
     * @private
     */
    static validator(expression) {
        functionUtils_1.FunctionUtils.validateArityAndAnyType(expression, 1, 1, returnType_1.ReturnType.Number);
    }
}
exports.AddOrdinal = AddOrdinal;
//# sourceMappingURL=addOrdinal.js.map