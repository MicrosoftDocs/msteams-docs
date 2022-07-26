"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Stack implements of MemoryInterface.
 * Memory variables have a hierarchical relationship.
 */
class StackedMemory extends Array {
    /**
     * Wraps an object that implements [MemoryInterface](xref:adaptive-expressions.MemoryInterface) into a [StackedMemory](xref:adaptive-expressions.StackedMemory) object.
     *
     * @param memory An object that implements [MemoryInterface](xref:adaptive-expressions.MemoryInterface).
     * @returns A [StackedMemory](xref:adaptive-expressions.StackedMemory) object.
     */
    static wrap(memory) {
        if (memory instanceof StackedMemory) {
            return memory;
        }
        else {
            const stackedMemory = new StackedMemory();
            stackedMemory.push(memory);
            return stackedMemory;
        }
    }
    /**
     * Gets the value from a given path.
     *
     * @param path Given path.
     * @returns The value from the given path if found, otherwise, undefined.
     */
    getValue(path) {
        if (this.length === 0) {
            return undefined;
        }
        else {
            for (const memory of Array.from(this).reverse()) {
                if (memory.getValue(path) !== undefined) {
                    return memory.getValue(path);
                }
            }
            return undefined;
        }
    }
    /**
     * Sets value to a given path.
     *
     * @param _path Memory path.
     * @param _value Value to set.
     */
    setValue(_path, _value) {
        throw new Error(`Can't set value to ${_path}, stacked memory is read-only`);
    }
    /**
     * Gets the version of the current [StackedMemory](xref:adaptive-expressions.StackedMemory).
     *
     * @returns A string value representing the version.
     */
    version() {
        return '0';
    }
}
exports.StackedMemory = StackedMemory;
//# sourceMappingURL=stackedMemory.js.map