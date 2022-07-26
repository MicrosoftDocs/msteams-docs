"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const expressionEvaluator_1 = require("../expressionEvaluator");
const expressionType_1 = require("../expressionType");
const functionUtils_1 = require("../functionUtils");
const functionUtils_internal_1 = require("../functionUtils.internal");
const returnType_1 = require("../returnType");
const convertFromUTC_1 = require("./convertFromUTC");
/**
 * Returns time of day for a given timestamp.
 */
class GetTimeOfDay extends expressionEvaluator_1.ExpressionEvaluator {
    /**
     * Initializes a new instance of the [GetTimeOfDay](xref:adaptive-expressions.GetTimeOfDay) class.
     */
    constructor() {
        super(expressionType_1.ExpressionType.GetTimeOfDay, GetTimeOfDay.evaluator(), returnType_1.ReturnType.String, functionUtils_1.FunctionUtils.validateUnaryString);
    }
    /**
     * @private
     */
    static evaluator() {
        return functionUtils_1.FunctionUtils.applyWithError((args) => {
            let value;
            let error = functionUtils_internal_1.InternalFunctionUtils.verifyISOTimestamp(args[0]);
            let thisTime;
            if (error) {
                error = functionUtils_internal_1.InternalFunctionUtils.verifyTimestamp(args[0]);
                if (error) {
                    return { value, error };
                }
                else {
                    if (dayjs_1.default(args[0]).format(convertFromUTC_1.ConvertFromUTC.NoneUtcDefaultDateTimeFormat) === args[0]) {
                        thisTime = new Date(args[0]).getHours() * 100 + new Date(args[0]).getMinutes();
                        error = undefined;
                    }
                    else {
                        return { value, error };
                    }
                }
            }
            else {
                // utc iso format
                thisTime = new Date(args[0]).getUTCHours() * 100 + new Date(args[0]).getUTCMinutes();
            }
            if (thisTime === 0) {
                value = 'midnight';
            }
            else if (thisTime > 0 && thisTime < 1200) {
                value = 'morning';
            }
            else if (thisTime === 1200) {
                value = 'noon';
            }
            else if (thisTime > 1200 && thisTime < 1800) {
                value = 'afternoon';
            }
            else if (thisTime >= 1800 && thisTime <= 2200) {
                value = 'evening';
            }
            else if (thisTime > 2200 && thisTime <= 2359) {
                value = 'night';
            }
            return { value, error };
        }, functionUtils_1.FunctionUtils.verifyString);
    }
}
exports.GetTimeOfDay = GetTimeOfDay;
//# sourceMappingURL=getTimeOfDay.js.map