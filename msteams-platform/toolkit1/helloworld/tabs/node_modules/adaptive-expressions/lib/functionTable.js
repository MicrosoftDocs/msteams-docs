"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expressionEvaluator_1 = require("./expressionEvaluator");
const expressionFunctions_1 = require("./expressionFunctions");
const functionUtils_1 = require("./functionUtils");
/**
 * FunctionTable is a dictionary which merges BuiltinFunctions.Functions with a CustomDictionary.
 */
class FunctionTable {
    constructor() {
        this.customFunctions = new Map();
    }
    /**
     * Gets a collection of string values that represent the keys of the [ExpressionFunctions.standardFunctions](xref:adaptive-expressions.ExpressionFunctions.standardFunctions).
     *
     * @returns A list of string values.
     */
    keys() {
        const keysOfAllFunctions = Array.from(expressionFunctions_1.ExpressionFunctions.standardFunctions.keys()).concat(Array.from(this.customFunctions.keys()));
        return keysOfAllFunctions[Symbol.iterator]();
    }
    /**
     * Gets a collection of [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) which is the value of the StandardFunctions.
     *
     * @returns A list of [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator).
     */
    values() {
        const valuesOfAllFunctions = Array.from(expressionFunctions_1.ExpressionFunctions.standardFunctions.values()).concat(Array.from(this.customFunctions.values()));
        return valuesOfAllFunctions[Symbol.iterator]();
    }
    /**
     * Gets the total number of [ExpressionFunctions.standardFunctions](xref:adaptive-expressions.ExpressionFunctions.standardFunctions) and user [customFunctions](xref:adaptive-expressions.FunctionTable.customFunctions).
     *
     * @returns An integer value.
     */
    get size() {
        return expressionFunctions_1.ExpressionFunctions.standardFunctions.size + this.customFunctions.size;
    }
    /**
     * Gets a value indicating whether the [FunctionTable](xref:adaptive-expressions.FunctionTable) is readonly.
     *
     * @returns A boolean value indicating whether the [FunctionTable](xref:adaptive-expressions.FunctionTable) is readonly.
     */
    get isReadOnly() {
        return false;
    }
    /**
     * Gets a value of [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) corresponding to the given key.
     *
     * @param key A string value of function name.
     * @returns An [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator).
     */
    get(key) {
        if (expressionFunctions_1.ExpressionFunctions.standardFunctions.get(key)) {
            return expressionFunctions_1.ExpressionFunctions.standardFunctions.get(key);
        }
        if (this.customFunctions.get(key)) {
            return this.customFunctions.get(key);
        }
        return undefined;
    }
    /**
     * Sets a value of [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) corresponding to the given key.
     *
     * @param key A string value of function name.
     * @param value The value to set for the [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator).
     * @returns The value of the [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator).
     */
    set(key, value) {
        if (expressionFunctions_1.ExpressionFunctions.standardFunctions.get(key)) {
            throw Error("You can't overwrite a built in function.");
        }
        this.customFunctions.set(key, value);
        return this;
    }
    /**
     * Inserts a mapping of a string key to [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) into [FunctionTable](xref:adaptive-expressions.FunctionTable).
     *
     * @param param1 Key-Value pair for the [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) or the function name to be added.
     * @param param2 Value of the [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) to be added or value of the user customized function to be added.
     */
    add(param1, param2) {
        if (arguments.length === 1) {
            if (param1 instanceof Object) {
                this.set(param1.key, param1.value);
            }
        }
        else {
            if (typeof param1 === 'string') {
                if (param2 instanceof expressionEvaluator_1.ExpressionEvaluator) {
                    this.set(param1, param2);
                }
                else {
                    this.set(param1, new expressionEvaluator_1.ExpressionEvaluator(param1, functionUtils_1.FunctionUtils.apply(param2)));
                }
            }
        }
    }
    /**
     * Clears the user [customFunctions](xref:adaptive-expressions.FunctionTable.customFunctions).
     */
    clear() {
        this.customFunctions.clear();
    }
    /**
     * Determines if the [FunctionTable](xref:adaptive-expressions.FunctionTable) has a given string key.
     *
     * @param key A string key.
     * @returns `True` if the key is contained, otherwise returns `False`.
     */
    has(key) {
        return expressionFunctions_1.ExpressionFunctions.standardFunctions.has(key) || this.customFunctions.has(key);
    }
    /**
     * Deletes a specified key from user [customFunctions](xref:adaptive-expressions.FunctionTable.customFunctions).
     *
     * @param key A string key of function name.
     * @returns A boolean value indicating whether the key is successfully deleted.
     */
    delete(key) {
        return this.customFunctions.delete(key);
    }
    /**
     * Operates on each element of the [ExpressionFunctions.standardFunctions](xref:adaptive-expressions.ExpressionFunctions.standardFunctions).
     * Not implemented.
     *
     * @param _callbackfn Callback function.
     * @param _thisArg Optional. This args.
     */
    forEach(_callbackfn, _thisArg) {
        throw Error('forEach function not implemented');
    }
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     * Not implemented.
     */
    entries() {
        throw Error('entries function not implemented');
    }
    /**
     * Returns an iterable of key, value pairs.
     * Not implemented.
     */
    get [Symbol.iterator]() {
        throw Error('Symbol.iterator function not implemented');
    }
    /**
     * Returns a string value.
     * Not implemented.
     */
    get [Symbol.toStringTag]() {
        throw Error('Symbol.toStringTag function not implemented');
    }
}
exports.FunctionTable = FunctionTable;
//# sourceMappingURL=functionTable.js.map