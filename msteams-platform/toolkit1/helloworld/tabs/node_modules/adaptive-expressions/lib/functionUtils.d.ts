/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Expression } from './expression';
import { EvaluateExpressionDelegate, ValueWithError } from './expressionEvaluator';
import { MemoryInterface } from './memory';
import { Options } from './options';
import { ReturnType } from './returnType';
/**
 * Verify the result of an expression is of the appropriate type and return a string if not.
 *
 * @param value Value to verify.
 * @param expression Expression that produced value.
 * @param child Index of child expression.
 */
export declare type VerifyExpression = (value: any, expression: Expression, child: number) => string | undefined;
/**
 * Utility functions in AdaptiveExpression.
 */
export declare class FunctionUtils {
    /**
     * The default date time format string.
     */
    static readonly DefaultDateTimeFormat: string;
    /**
     * Validate that expression has a certain number of children that are of any of the supported types.
     *
     * @param expression Expression to validate.
     * @param minArity Minimum number of children.
     * @param maxArity Maximum number of children.
     * @param returnType Allowed return types for children.
     * If a child has a return type of Object then validation will happen at runtime.
     */
    static validateArityAndAnyType(expression: Expression, minArity: number, maxArity: number, returnType?: ReturnType): void;
    /**
     * Validate the number and type of arguments to a function.
     *
     * @param expression Expression to validate.
     * @param optional Optional types in order.
     * @param types Expected types in order.
     */
    static validateOrder(expression: Expression, optional: ReturnType[], ...types: ReturnType[]): void;
    /**
     * Validate at least 1 argument of any type.
     *
     * @param expression Expression to validate.
     */
    static validateAtLeastOne(expression: Expression): void;
    /**
     * Validate 1 or more numeric arguments.
     *
     * @param expression Expression to validate.
     */
    static validateNumber(expression: Expression): void;
    /**
     * Validate 1 or more string arguments.
     *
     * @param expression Expression to validate.
     */
    static validateString(expression: Expression): void;
    /**
     * Validate there are two children.
     *
     * @param expression Expression to validate.
     */
    static validateBinary(expression: Expression): void;
    /**
     * Validate 2 numeric arguments.
     *
     * @param expression Expression to validate.
     */
    static validateBinaryNumber(expression: Expression): void;
    /**
     * Validate 1 or 2 numeric arguments.
     *
     * @param expression Expression to validate.
     */
    static validateUnaryOrBinaryNumber(expression: Expression): void;
    /**
     * Validate 2 or more than 2 numeric arguments.
     *
     * @param expression Expression to validate.
     */
    static validateTwoOrMoreThanTwoNumbers(expression: Expression): void;
    /**
     * Validate there are 2 numeric or string arguments.
     *
     * @param expression Expression to validate.
     */
    static validateBinaryNumberOrString(expression: Expression): void;
    /**
     * Validate there is a single argument.
     *
     * @param expression Expression to validate.
     */
    static validateUnary(expression: Expression): void;
    /**
     * Validate there is a single argument.
     *
     * @param expression Expression to validate.
     */
    static validateUnaryNumber(expression: Expression): void;
    /**
     * Validate there is a single string argument.
     *
     * @param expression Expression to validate.
     */
    static validateUnaryString(expression: Expression): void;
    /**
     * Validate there is one or two string arguments.
     *
     * @param expression Expression to validate.
     */
    static validateUnaryOrBinaryString(expression: Expression): void;
    /**
     * Validate there is a single boolean argument.
     *
     * @param expression Expression to validate.
     */
    static validateUnaryBoolean(expression: Expression): void;
    /**
     * Verify value is numeric.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyNumber(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Verify value is numeric.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyNumberOrNumericList(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Verify value is numeric list.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyNumericList(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Verify value contains elements.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyContainer(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Verify value contains elements or null.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyContainerOrNull(value: unknown, expression: Expression, _: number): string | undefined;
    /**
     * Verify value is not null or undefined.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if valid.
     */
    static verifyNotNull(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Verify value is an integer.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyInteger(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Verify value is an list.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @returns Error or undefined if invalid.
     */
    static verifyList(value: any, expression: Expression): string | undefined;
    /**
     * Verify value is a string.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyString(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Verify an object is neither a string nor null.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyStringOrNull(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Verify value is a number or string or null.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyNumberOrStringOrNull(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Verify value is a number or string.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyNumberOrString(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Verify value is boolean.
     *
     * @param value Value to check.
     * @param expression Expression that led to value.
     * @param _ No function.
     * @returns Error or undefined if invalid.
     */
    static verifyBoolean(value: any, expression: Expression, _: number): string | undefined;
    /**
     * Evaluate expression children and return them.
     *
     * @param expression Expression with children.
     * @param state Global state.
     * @param options Options used in evaluation.
     * @param verify Optional function to verify each child's result.
     * @returns List of child values or error message.
     */
    static evaluateChildren(expression: Expression, state: MemoryInterface, options: Options, verify?: VerifyExpression): {
        args: any[];
        error: string;
    };
    /**
     * Generate an expression delegate that applies function after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static apply(func: (arg0: unknown[]) => unknown, verify?: VerifyExpression): EvaluateExpressionDelegate;
    /**
     * Generate an expression delegate that applies function after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static applyWithError(func: (arg0: any[]) => ValueWithError, verify?: VerifyExpression): EvaluateExpressionDelegate;
    /**
     * Generate an expression delegate that applies function after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static applyWithOptionsAndError(func: (arg0: unknown[], options: Options) => {
        value: unknown;
        error: string;
    }, verify?: VerifyExpression): EvaluateExpressionDelegate;
    /**
     * Generate an expression delegate that applies function after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static applyWithOptions(func: (arg0: unknown[], options: Options) => unknown, verify?: VerifyExpression): EvaluateExpressionDelegate;
    /**
     * Generate an expression delegate that applies function on the accumulated value after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static applySequence(func: (arg0: any[]) => any, verify?: VerifyExpression): EvaluateExpressionDelegate;
    /**
     * Generate an expression delegate that applies function on the accumulated value after verifying all children.
     *
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    static applySequenceWithError(func: (arg0: any[]) => any, verify?: VerifyExpression): EvaluateExpressionDelegate;
    /**
     *
     * @param args An array of arguments.
     * @param maxArgsLength The max length of a given function.
     * @param locale A locale string
     * @returns The last item from the args param, otherwise the locale string.
     */
    static determineLocale(args: unknown[], maxArgsLength: number, locale?: string): string;
    /**
     *
     * @param args An array of arguments.
     * @param maxArgsLength The max length of a given function.
     * @param format A format string.
     * @param locale A locale string.
     * @returns The format and the locale from the args param, otherwise the locale and format strings.
     */
    static determineFormatAndLocale(args: unknown[], maxArgsLength: number, format: string, locale?: string): {
        format: string;
        locale: string;
    };
    /**
     * Timestamp formatter, convert C# datetime to day.js format.
     *
     * @param formatter C# datetime format
     * @returns The formated datetime.
     */
    static timestampFormatter(formatter: string): string;
    /**
     * State object for resolving memory paths.
     *
     * @param expression Expression.
     * @param state Scope.
     * @param options Options used in evaluation.
     * @returns Return the accumulated path and the expression left unable to accumulate.
     */
    static tryAccumulatePath(expression: Expression, state: MemoryInterface, options: Options): {
        path: string;
        left: any;
        error: string;
    };
    /**
     * Is number helper function.
     *
     * @param instance Input.
     * @returns True if the input is a number.
     */
    static isNumber(instance: any): instance is number;
    /**
     * Equal helper function.
     * Compare the first param and second param.
     *
     * @param obj1 The first value to compare.
     * @param obj2 The second value to compare.
     * @returns A boolean based on the comparison.
     */
    static commonEquals(obj1: unknown, obj2: unknown): boolean;
    /**
     * @private
     */
    private static buildTypeValidatorError;
    /**
     * Helper function of get the number of properties of an object.
     *
     * @param obj An object.
     * @returns The number of properties.
     */
    private static getPropertyCount;
    /**
     * @private
     */
    private static convertToObj;
}
//# sourceMappingURL=functionUtils.d.ts.map