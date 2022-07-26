/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { OpUnitType } from 'dayjs';
import { Expression } from './expression';
import { Options } from './options';
import { EvaluateExpressionDelegate, ValueWithError } from './expressionEvaluator';
import { MemoryInterface } from './memory';
import { TimexProperty } from '@microsoft/recognizers-text-data-types-timex-expression';
import bigInt = require('big-integer');
/**
 * Utility functions only used internal
 */
export declare class InternalFunctionUtils {
    /**
     * Constant for converting unix timestamp to ticks.
     */
    static readonly UnixMilliSecondToTicksConstant: bigInt.BigInteger;
    /**
     * Constant to convert between ticks and ms.
     */
    static readonly MillisecondToTickConstant: bigInt.BigInteger;
    /**
     * Parse timex funcition.
     *
     * @param timexExpr String or TimexProperty input.
     * @returns TimexProperty and error.
     */
    static parseTimexProperty(timexExpr: any): {
        timexProperty: TimexProperty;
        error: string;
    };
    /**
     * Sort helper function.
     *
     * @param isDescending Descending flag.
     * @returns The sorted array.
     */
    static sortBy(isDescending: boolean): EvaluateExpressionDelegate;
    /**
     * Lookup a string or number index of an Object.
     *
     * @param instance Instance with property.
     * @param index Property to lookup.
     * @returns Value and error information if any.
     */
    static accessIndex(instance: any, index: number): ValueWithError;
    /**
     * Verify a timestamp string is valid timestamp format.
     *
     * @param value Timestamp string to check.
     * @returns Error or undefined if invalid.
     */
    static verifyTimestamp(value: any): string | undefined;
    /**
     * Verify a timestamp string is valid ISO timestamp format.
     *
     * @param value Timestamp string to check.
     * @returns Error or undefined if invalid.
     */
    static verifyISOTimestamp(value: any): string | undefined;
    /**
     * Convert a string input to ticks number.
     *
     * @param timeStamp String timestamp input.
     * @returns The string converted in ticks.
     */
    static ticks(timeStamp: string): ValueWithError;
    /**
     * Lookup a property in Map or Object.
     *
     * @param instance Instance with property.
     * @param property Property to lookup.
     * @returns Value and error information if any.
     */
    static accessProperty(instance: any, property: string): ValueWithError;
    /**
     * Get the value of a path from a memory.
     *
     * @param state Memory.
     * @param path Path string.
     * @param options Options.
     * @returns The value of a path from a memory.
     */
    static wrapGetValue(state: MemoryInterface, path: string, options: Options): any;
    /**
     * Wrap string or undefined into string. Default to empty string.
     *
     * @param input Input string
     * @returns The wrapped string.
     */
    static parseStringOrUndefined(input: string | undefined): string;
    /**
     * Test result to see if True in logical comparison functions.
     *
     * @param instance Computed value.
     * @returns True if boolean true or non-null.
     */
    static isLogicTrue(instance: any): boolean;
    /**
     * Evaluator for foreach and select functions.
     *
     * @param expression Expression.
     * @param state Memory scope.
     * @param options Options.
     * @returns The evaluated list.
     */
    static foreach(expression: Expression, state: MemoryInterface, options: Options): ValueWithError;
    /**
     * Lambda evaluator.
     *
     * @param expression expression.
     * @param state memory state.
     * @param options options.
     * @param list item list.
     * @param callback call back. return the should break flag.
     */
    static lambdaEvaluator<T = unknown, U = unknown>(expression: Expression, state: MemoryInterface, options: Options, list: T[], callback: (currentItem: T, result: U, error: string) => boolean): void;
    /**
     * Convert an object into array.
     * If the instance is array, return itself.
     * If the instance is object, return {key, value} pair list.
     * Else return undefined.
     *
     * @param instance input instance.
     * @returns The generated list.
     */
    static convertToList(instance: unknown): unknown[] | undefined;
    /**
     * Validator for foreach, select, and where functions.
     *
     * @param expression The expression to validate.
     */
    static ValidateLambdaExpression(expression: Expression): void;
    /**
     * Parse string into URL object.
     *
     * @param uri Input string uri.
     * @returns The parsed URL object.
     */
    static parseUri(uri: string): ValueWithError;
    /**
     * Transform C# period and unit into js period and unit.
     *
     * @param duration C# duration.
     * @param cSharpStr C# unit.
     * @returns The transformed timeUnit.
     */
    static timeUnitTransformer(duration: number, cSharpStr: string): {
        duration: number;
        tsStr: OpUnitType;
    };
    /**
     * TextEncoder helper function.
     *
     * @returns The text encoder.
     */
    static getTextEncoder(): TextEncoder;
    /**
     * TextDecoder helper function.
     *
     * @param code The encoding format.
     * @returns The text decoder.
     */
    static getTextDecoder(code?: string): TextDecoder;
    /**
     * Common Stringify an object.
     *
     * @param input input object.
     * @returns the stringified object.
     */
    static commonStringify(input: unknown): string;
    /**
     * @private
     */
    private static sortByKey;
}
//# sourceMappingURL=functionUtils.internal.d.ts.map