/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionEvaluator } from './expressionEvaluator';
declare type customFunction = (args: any[]) => any;
/**
 * FunctionTable is a dictionary which merges BuiltinFunctions.Functions with a CustomDictionary.
 */
export declare class FunctionTable implements Map<string, ExpressionEvaluator> {
    private readonly customFunctions;
    /**
     * Gets a collection of string values that represent the keys of the [ExpressionFunctions.standardFunctions](xref:adaptive-expressions.ExpressionFunctions.standardFunctions).
     *
     * @returns A list of string values.
     */
    keys(): IterableIterator<string>;
    /**
     * Gets a collection of [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) which is the value of the StandardFunctions.
     *
     * @returns A list of [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator).
     */
    values(): IterableIterator<ExpressionEvaluator>;
    /**
     * Gets the total number of [ExpressionFunctions.standardFunctions](xref:adaptive-expressions.ExpressionFunctions.standardFunctions) and user [customFunctions](xref:adaptive-expressions.FunctionTable.customFunctions).
     *
     * @returns An integer value.
     */
    readonly size: number;
    /**
     * Gets a value indicating whether the [FunctionTable](xref:adaptive-expressions.FunctionTable) is readonly.
     *
     * @returns A boolean value indicating whether the [FunctionTable](xref:adaptive-expressions.FunctionTable) is readonly.
     */
    readonly isReadOnly: boolean;
    /**
     * Gets a value of [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) corresponding to the given key.
     *
     * @param key A string value of function name.
     * @returns An [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator).
     */
    get(key: string): ExpressionEvaluator;
    /**
     * Sets a value of [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) corresponding to the given key.
     *
     * @param key A string value of function name.
     * @param value The value to set for the [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator).
     * @returns The value of the [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator).
     */
    set(key: string, value: ExpressionEvaluator): this;
    add(item: {
        key: string;
        value: ExpressionEvaluator;
    }): void;
    add(key: string, value: ExpressionEvaluator): void;
    add(key: string, value: customFunction): void;
    /**
     * Clears the user [customFunctions](xref:adaptive-expressions.FunctionTable.customFunctions).
     */
    clear(): void;
    /**
     * Determines if the [FunctionTable](xref:adaptive-expressions.FunctionTable) has a given string key.
     *
     * @param key A string key.
     * @returns `True` if the key is contained, otherwise returns `False`.
     */
    has(key: string): boolean;
    /**
     * Deletes a specified key from user [customFunctions](xref:adaptive-expressions.FunctionTable.customFunctions).
     *
     * @param key A string key of function name.
     * @returns A boolean value indicating whether the key is successfully deleted.
     */
    delete(key: string): boolean;
    /**
     * Operates on each element of the [ExpressionFunctions.standardFunctions](xref:adaptive-expressions.ExpressionFunctions.standardFunctions).
     * Not implemented.
     *
     * @param _callbackfn Callback function.
     * @param _thisArg Optional. This args.
     */
    forEach(_callbackfn: (value: ExpressionEvaluator, key: string, map: Map<string, ExpressionEvaluator>) => void, _thisArg?: any): void;
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     * Not implemented.
     */
    entries(): IterableIterator<[string, ExpressionEvaluator]>;
    /**
     * Returns an iterable of key, value pairs.
     * Not implemented.
     */
    readonly [Symbol.iterator]: () => IterableIterator<[string, ExpressionEvaluator]>;
    /**
     * Returns a string value.
     * Not implemented.
     */
    readonly [Symbol.toStringTag]: string;
}
export {};
//# sourceMappingURL=functionTable.d.ts.map