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
const datetimeFormatConverter_1 = require("./datetimeFormatConverter");
const expressionType_1 = require("./expressionType");
const returnType_1 = require("./returnType");
// eslint-disable-next-line lodash/import-scope
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
/**
 * Utility functions in AdaptiveExpression.
 */
class FunctionUtils {
    /**
     * Validate that expression has a certain number of children that are of any of the supported types.
     *
     * @param expression Expression to validate.
     * @param minArity Minimum number of children.
     * @param maxArity Maximum number of children.
     * @param returnType Allowed return types for children.
     * If a child has a return type of Object then validation will happen at runtime.
     */
    static validateArityAndAnyType(expression, minArity, maxArity, returnType = returnType_1.ReturnType.Object) {
        if (expression.children.length < minArity) {
            throw new Error(`${expression} should have at least ${minArity} children.`);
        }
        if (expression.children.length > maxArity) {
            throw new Error(`${expression} can't have more than ${maxArity} children.`);
        }
        if ((returnType & returnType_1.ReturnType.Object) === 0) {
            for (const child of expression.children) {
                if ((child.returnType & returnType_1.ReturnType.Object) === 0 && (returnType & child.returnType) === 0) {
                    throw new Error(FunctionUtils.buildTypeValidatorError(returnType, child, expression));
                }
            }
        }
    }
    /**
     * Validate the number and type of arguments to a function.
     *
     * @param expression Expression to validate.
     * @param optional Optional types in order.
     * @param types Expected types in order.
     */
    static validateOrder(expression, optional, ...types) {
        if (optional === undefined) {
            optional = [];
        }
        if (expression.children.length < types.length || expression.children.length > types.length + optional.length) {
            throw new Error(optional.length === 0
                ? `${expression} should have ${types.length} children.`
                : `${expression} should have between ${types.length} and ${types.length + optional.length} children.`);
        }
        for (let i = 0; i < types.length; i++) {
            const child = expression.children[i];
            const type = types[i];
            if ((type & returnType_1.ReturnType.Object) === 0 &&
                (child.returnType & returnType_1.ReturnType.Object) === 0 &&
                (type & child.returnType) === 0) {
                throw new Error(FunctionUtils.buildTypeValidatorError(type, child, expression));
            }
        }
        for (let i = 0; i < optional.length; i++) {
            const ic = i + types.length;
            if (ic >= expression.children.length) {
                break;
            }
            const child = expression.children[ic];
            const type = optional[i];
            if ((type & returnType_1.ReturnType.Object) === 0 &&
                (child.returnType & returnType_1.ReturnType.Object) === 0 &&
                (type & child.returnType) === 0) {
                throw new Error(FunctionUtils.buildTypeValidatorError(type, child, expression));
            }
        }
    }
    /**
     * Validate at least 1 argument of any type.
     *
     * @param expression Expression to validate.
     */
    static validateAtLeastOne(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 1, Number.MAX_SAFE_INTEGER);
    }
    /**
     * Validate 1 or more numeric arguments.
     *
     * @param expression Expression to validate.
     */
    static validateNumber(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 1, Number.MAX_SAFE_INTEGER, returnType_1.ReturnType.Number);
    }
    /**
     * Validate 1 or more string arguments.
     *
     * @param expression Expression to validate.
     */
    static validateString(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 1, Number.MAX_SAFE_INTEGER, returnType_1.ReturnType.String);
    }
    /**
     * Validate there are two children.
     *
     * @param expression Expression to validate.
     */
    static validateBinary(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 2, 2);
    }
    /**
     * Validate 2 numeric arguments.
     *
     * @param expression Expression to validate.
     */
    static validateBinaryNumber(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 2, 2, returnType_1.ReturnType.Number);
    }
    /**
     * Validate 1 or 2 numeric arguments.
     *
     * @param expression Expression to validate.
     */
    static validateUnaryOrBinaryNumber(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 1, 2, returnType_1.ReturnType.Number);
    }
    /**
     * Validate 2 or more than 2 numeric arguments.
     *
     * @param expression Expression to validate.
     */
    static validateTwoOrMoreThanTwoNumbers(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 2, Number.MAX_VALUE, returnType_1.ReturnType.Number);
    }
    /**
     * Validate there are 2 numeric or string arguments.
     *
     * @param expression Expression to validate.
     */
    static validateBinaryNumberOrString(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 2, 2, returnType_1.ReturnType.Number | returnType_1.ReturnType.String);
    }
    /**
     * Validate there is a single argument.
     *
     * @param expression Expression to validate.
     */
    static validateUnary(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 1, 1);
    }
    /**
     * Validate there is a single argument.
     *
     * @param expression Expression to validate.
     */
    static validateUnaryNumber(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 1, 1, returnType_1.ReturnType.Number);
    }
    /**
     * Validate there is a single string argument.
     *
     * @param expression Expression to validate.
     */
    static validateUnaryString(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 1, 1, returnType_1.ReturnType.String);
    }
    /**
     * Validate there is one or two string arguments.
     *
     * @param expression Expression to validate.
     */
    static validateUnaryOrBinaryString(expression) {
        FunctionUtils.validateArityAndAnyType(expression, 1, 2, returnType_1.ReturnType.String);
    }
    /**
     * Validate there is a single boolean argument.
     *
     * @param expression Expression to validate.
     */
    static validateUnaryBoolean(expression) {
        FunctionUtils.validateOrder(expression, undefined, returnType_1.ReturnType.Boolean);
    }
    /**
     * Verify value is numeric.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyNumber(value, expression, _) {
        let error;
        if (!FunctionUtils.isNumber(value)) {
            error = `${expression} is not a number.`;
        }
        return error;
    }
    /**
     * Verify value is numeric.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyNumberOrNumericList(value, expression, _) {
        let error;
        if (FunctionUtils.isNumber(value)) {
            return error;
        }
        if (!Array.isArray(value)) {
            error = `${expression} is neither a list nor a number.`;
        }
        else {
            for (const elt of value) {
                if (!FunctionUtils.isNumber(elt)) {
                    error = `${elt} is not a number in ${expression}.`;
                    break;
                }
            }
        }
        return error;
    }
    /**
     * Verify value is numeric list.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyNumericList(value, expression, _) {
        let error;
        if (!Array.isArray(value)) {
            error = `${expression} is not a list.`;
        }
        else {
            for (const elt of value) {
                if (!FunctionUtils.isNumber(elt)) {
                    error = `${elt} is not a number in ${expression}.`;
                    break;
                }
            }
        }
        return error;
    }
    /**
     * Verify value contains elements.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyContainer(value, expression, _) {
        let error;
        if (!(typeof value === 'string') &&
            !Array.isArray(value) &&
            !(value instanceof Map) &&
            !(typeof value === 'object')) {
            error = `${expression} must be a string, list, map or object.`;
        }
        return error;
    }
    /**
     * Verify value contains elements or null.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyContainerOrNull(value, expression, _) {
        let error;
        if (value != null &&
            !(typeof value === 'string') &&
            !Array.isArray(value) &&
            !(value instanceof Map) &&
            !(typeof value === 'object')) {
            error = `${expression} must be a string, list, map or object.`;
        }
        return error;
    }
    /**
     * Verify value is not null or undefined.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if valid.
     */
    static verifyNotNull(value, expression, _) {
        let error;
        if (value == null) {
            error = `${expression} is null.`;
        }
        return error;
    }
    /**
     * Verify value is an integer.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyInteger(value, expression, _) {
        let error;
        if (!Number.isInteger(value)) {
            error = `${expression} is not a integer.`;
        }
        return error;
    }
    /**
     * Verify value is an list.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @returns Error or undefined if invalid.
     */
    static verifyList(value, expression) {
        let error;
        if (!Array.isArray(value)) {
            error = `${expression} is not a list or array.`;
        }
        return error;
    }
    /**
     * Verify value is a string.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyString(value, expression, _) {
        let error;
        if (typeof value !== 'string') {
            error = `${expression} is not a string.`;
        }
        return error;
    }
    /**
     * Verify an object is neither a string nor null.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyStringOrNull(value, expression, _) {
        let error;
        if (typeof value !== 'string' && value !== undefined) {
            error = `${expression} is neither a string nor a null object.`;
        }
        return error;
    }
    /**
     * Verify value is a number or string or null.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyNumberOrStringOrNull(value, expression, _) {
        let error;
        if (typeof value !== 'string' && value !== undefined && !FunctionUtils.isNumber(value)) {
            error = `${expression} is neither a number nor string`;
        }
        return error;
    }
    /**
     * Verify value is a number or string.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyNumberOrString(value, expression, _) {
        let error;
        if (value === undefined || (!FunctionUtils.isNumber(value) && typeof value !== 'string')) {
            error = `${expression} is not string or number.`;
        }
        return error;
    }
    /**
     * Verify value is boolean.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyBoolean(value, expression, _) {
        let error;
        if (typeof value !== 'boolean') {
            error = `${expression} is not a boolean.`;
        }
        return error;
    }
    /**
     * Evaluate expression children and return them.
     *
     * @param expression Expression with children.
     * @param state Global state.
     * @param options Options used in evaluation.
     * @param verify Optional function to verify each child's result.
     * @returns List of child values or error message.
     */
    static evaluateChildren(expression, state, options, verify) {
        const args = [];
        let value;
        let error;
        let pos = 0;
        for (const child of expression.children) {
            ({ value, error } = child.tryEvaluate(state, options));
            if (error) {
                break;
            }
            if (verify !== undefined) {
                error = verify(value, child, pos);
            }
            if (error) {
                break;
            }
            args.push(value);
            ++pos;
        }
        return { args, error };
    }
    /**
     * Generate an expression delegate that applies function after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static apply(func, verify) {
        return (expression, state, options) => {
            let value;
            const { args, error: childrenError } = FunctionUtils.evaluateChildren(expression, state, options, verify);
            let error = childrenError;
            if (!error) {
                try {
                    value = func(args);
                }
                catch (e) {
                    error = e.message;
                }
            }
            return { value, error };
        };
    }
    /**
     * Generate an expression delegate that applies function after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static applyWithError(func, verify) {
        return (expression, state, options) => {
            let value;
            const { args, error: childrenError } = FunctionUtils.evaluateChildren(expression, state, options, verify);
            let error = childrenError;
            if (!error) {
                try {
                    ({ value, error } = func(args));
                }
                catch (e) {
                    error = e.message;
                }
            }
            return { value, error };
        };
    }
    /**
     * Generate an expression delegate that applies function after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static applyWithOptionsAndError(func, verify) {
        return (expression, state, options) => {
            let value;
            const { args, error: childrenError } = FunctionUtils.evaluateChildren(expression, state, options, verify);
            let error = childrenError;
            if (!error) {
                try {
                    ({ value, error } = func(args, options));
                }
                catch (e) {
                    error = e.message;
                }
            }
            return { value, error };
        };
    }
    /**
     * Generate an expression delegate that applies function after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static applyWithOptions(func, verify) {
        return (expression, state, options) => {
            let value;
            const { args, error: childrenError } = FunctionUtils.evaluateChildren(expression, state, options, verify);
            let error = childrenError;
            if (!error) {
                try {
                    value = func(args, options);
                }
                catch (e) {
                    error = e.message;
                }
            }
            return { value, error };
        };
    }
    /**
     * Generate an expression delegate that applies function on the accumulated value after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static applySequence(func, verify) {
        return FunctionUtils.apply((args) => {
            const binaryArgs = [undefined, undefined];
            let soFar = args[0];
            for (let i = 1; i < args.length; i++) {
                binaryArgs[0] = soFar;
                binaryArgs[1] = args[i];
                soFar = func(binaryArgs);
            }
            return soFar;
        }, verify);
    }
    /**
     * Generate an expression delegate that applies function on the accumulated value after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static applySequenceWithError(func, verify) {
        return FunctionUtils.applyWithError((args) => {
            const binaryArgs = [undefined, undefined];
            let soFar = args[0];
            let value;
            let error;
            for (let i = 1; i < args.length; i++) {
                binaryArgs[0] = soFar;
                binaryArgs[1] = args[i];
                ({ value, error } = func(binaryArgs));
                if (error) {
                    return { value, error };
                }
                else {
                    soFar = value;
                }
            }
            return { value: soFar, error: undefined };
        }, verify);
    }
    /**
     *
     * @param args An array of arguments.
     * @param maxArgsLength The max length of a given function.
     * @param locale A locale string
     * @returns The last item from the args param, otherwise the locale string.
     */
    static determineLocale(args, maxArgsLength, locale = 'en-us') {
        if (args.length === maxArgsLength) {
            const lastArg = args[maxArgsLength - 1];
            if (typeof lastArg === 'string') {
                locale = lastArg;
            }
        }
        return locale;
    }
    /**
     *
     * @param args An array of arguments.
     * @param maxArgsLength The max length of a given function.
     * @param format A format string.
     * @param locale A locale string.
     * @returns The format and the locale from the args param, otherwise the locale and format strings.
     */
    static determineFormatAndLocale(args, maxArgsLength, format, locale = 'en-us') {
        if (maxArgsLength >= 2) {
            if (args.length === maxArgsLength) {
                const lastArg = args[maxArgsLength - 1];
                const secondLastArg = args[maxArgsLength - 2];
                if (typeof lastArg === 'string' && typeof secondLastArg === 'string') {
                    format =
                        secondLastArg !== ''
                            ? FunctionUtils.timestampFormatter(secondLastArg)
                            : FunctionUtils.DefaultDateTimeFormat;
                    locale = lastArg.substr(0, 2); //dayjs only support two-letter locale representattion
                }
            }
            else if (args.length === maxArgsLength - 1) {
                const lastArg = args[maxArgsLength - 2];
                if (typeof lastArg === 'string') {
                    format = FunctionUtils.timestampFormatter(lastArg);
                }
            }
        }
        return { format: format, locale: locale };
    }
    /**
     * Timestamp formatter, convert C# datetime to day.js format.
     *
     * @param formatter C# datetime format
     * @returns The formated datetime.
     */
    static timestampFormatter(formatter) {
        if (!formatter) {
            return FunctionUtils.DefaultDateTimeFormat;
        }
        let result = formatter;
        try {
            result = datetimeFormatConverter_1.convertCSharpDateTimeToDayjs(formatter);
        }
        catch (_a) {
            // do nothing
        }
        return result;
    }
    /**
     * State object for resolving memory paths.
     *
     * @param expression Expression.
     * @param state Scope.
     * @param options Options used in evaluation.
     * @returns Return the accumulated path and the expression left unable to accumulate.
     */
    static tryAccumulatePath(expression, state, options) {
        let path = '';
        let left = expression;
        while (left !== undefined) {
            if (left.type === expressionType_1.ExpressionType.Accessor) {
                path = left.children[0].value + '.' + path;
                left = left.children.length === 2 ? left.children[1] : undefined;
            }
            else if (left.type === expressionType_1.ExpressionType.Element) {
                const { value, error } = left.children[1].tryEvaluate(state, options);
                if (error !== undefined) {
                    return { path: undefined, left: undefined, error };
                }
                if (FunctionUtils.isNumber(parseInt(value))) {
                    path = `[${value}].${path}`;
                }
                else if (typeof value === 'string') {
                    path = `['${value}'].${path}`;
                }
                else {
                    return {
                        path: undefined,
                        left: undefined,
                        error: `${left.children[1].toString()} doesn't return an int or string`,
                    };
                }
                left = left.children[0];
            }
            else {
                break;
            }
        }
        // make sure we generated a valid path
        path = path.replace(/(\.*$)/g, '').replace(/(\.\[)/g, '[');
        if (path === '') {
            path = undefined;
        }
        return { path, left, error: undefined };
    }
    /**
     * Is number helper function.
     *
     * @param instance Input.
     * @returns True if the input is a number.
     */
    static isNumber(instance) {
        return instance != null && typeof instance === 'number' && !Number.isNaN(instance);
    }
    /**
     * Equal helper function.
     * Compare the first param and second param.
     *
     * @param obj1 The first value to compare.
     * @param obj2 The second value to compare.
     * @returns A boolean based on the comparison.
     */
    static commonEquals(obj1, obj2) {
        if (obj1 == null || obj2 == null) {
            return obj1 == null && obj2 == null;
        }
        // Array Comparison
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            if (obj1.length !== obj2.length) {
                return false;
            }
            return obj1.every((item, i) => FunctionUtils.commonEquals(item, obj2[i]));
        }
        // Object Comparison
        const propertyCountOfObj1 = FunctionUtils.getPropertyCount(obj1);
        const propertyCountOfObj2 = FunctionUtils.getPropertyCount(obj2);
        if (propertyCountOfObj1 >= 0 && propertyCountOfObj2 >= 0) {
            if (propertyCountOfObj1 !== propertyCountOfObj2) {
                return false;
            }
            const jsonObj1 = FunctionUtils.convertToObj(obj1);
            const jsonObj2 = FunctionUtils.convertToObj(obj2);
            return lodash_isequal_1.default(jsonObj1, jsonObj2);
        }
        // Number Comparison
        if (FunctionUtils.isNumber(obj1) && FunctionUtils.isNumber(obj2)) {
            if (Math.abs(obj1 - obj2) < Number.EPSILON) {
                return true;
            }
        }
        try {
            return obj1 === obj2;
        }
        catch (_a) {
            return false;
        }
    }
    /**
     * @private
     */
    static buildTypeValidatorError(returnType, childExpr, expr) {
        const names = Object.keys(returnType_1.ReturnType).filter((x) => !(parseInt(x) >= 0));
        const types = [];
        for (const name of names) {
            const value = returnType_1.ReturnType[name];
            if ((returnType & value) !== 0) {
                types.push(name);
            }
        }
        if (types.length === 1) {
            return `${childExpr} is not a ${types[0]} expression in ${expr}.`;
        }
        else {
            const typesStr = types.join(', ');
            return `${childExpr} in ${expr} is not any of [${typesStr}].`;
        }
    }
    /**
     * Helper function of get the number of properties of an object.
     *
     * @param obj An object.
     * @returns The number of properties.
     */
    static getPropertyCount(obj) {
        let count = -1;
        if (obj != null && !Array.isArray(obj)) {
            if (obj instanceof Map) {
                count = obj.size;
            }
            else if (typeof obj === 'object' && !(obj instanceof Date)) {
                count = Object.keys(obj).length;
            }
        }
        return count;
    }
    /**
     * @private
     */
    static convertToObj(instance) {
        if (FunctionUtils.getPropertyCount(instance) >= 0) {
            const entries = instance instanceof Map ? Array.from(instance.entries()) : Object.entries(instance);
            return entries.reduce((acc, [key, value]) => (Object.assign({}, acc, { [key]: FunctionUtils.convertToObj(value) })), {});
        }
        else if (Array.isArray(instance)) {
            // Convert Array
            return instance.map((item) => FunctionUtils.convertToObj(item));
        }
        return instance;
    }
}
/**
 * The default date time format string.
 */
FunctionUtils.DefaultDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
exports.FunctionUtils = FunctionUtils;
//# sourceMappingURL=functionUtils.js.map