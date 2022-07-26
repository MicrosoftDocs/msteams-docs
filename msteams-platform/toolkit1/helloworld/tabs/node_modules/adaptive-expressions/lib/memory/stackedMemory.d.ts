import { MemoryInterface } from './memoryInterface';
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
export declare class StackedMemory extends Array<MemoryInterface> implements MemoryInterface {
    /**
     * Wraps an object that implements [MemoryInterface](xref:adaptive-expressions.MemoryInterface) into a [StackedMemory](xref:adaptive-expressions.StackedMemory) object.
     *
     * @param memory An object that implements [MemoryInterface](xref:adaptive-expressions.MemoryInterface).
     * @returns A [StackedMemory](xref:adaptive-expressions.StackedMemory) object.
     */
    static wrap(memory: MemoryInterface): StackedMemory;
    /**
     * Gets the value from a given path.
     *
     * @param path Given path.
     * @returns The value from the given path if found, otherwise, undefined.
     */
    getValue(path: string): any;
    /**
     * Sets value to a given path.
     *
     * @param _path Memory path.
     * @param _value Value to set.
     */
    setValue(_path: string, _value: any): void;
    /**
     * Gets the version of the current [StackedMemory](xref:adaptive-expressions.StackedMemory).
     *
     * @returns A string value representing the version.
     */
    version(): string;
}
//# sourceMappingURL=stackedMemory.d.ts.map