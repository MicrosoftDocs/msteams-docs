import { MemoryInterface } from './memoryInterface';
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Simple implement of MemoryInterface
 */
export declare class SimpleObjectMemory implements MemoryInterface {
    private memory;
    /**
     * Initializes a new instance of the [SimpleObjectMemory](xref:adaptive-expressions.SimpleObjectMemory) class.
     * This wraps a simple object as [MemoryInterface](xref:adaptive-expressions.MemoryInterface).
     *
     * @param memory The object to wrap.
     */
    constructor(memory: any);
    /**
     * Transfer a common object to simple memory.
     *
     * @param obj Common object.
     * @returns Simple memory instance.
     */
    static wrap(obj: any): MemoryInterface;
    /**
     * Gets the value from a given path.
     *
     * @param path Given path.
     * @returns The value in the given path or undefined.
     */
    getValue(path: string): any;
    /**
     * In this simple object scope, we don't allow you to set a path in which some parts in middle don't exist
     * for example
     * if you set dialog.a.b = x, but dialog.a don't exist, this will result in an error
     * because we can't and shouldn't smart create structure in the middle
     * you can implement a customzied Scope that support such behavior
     *
     * @param path Memory path.
     * @param input Value to set.
     */
    setValue(path: string, input: any): void;
    /**
     * Returns the version info of [SimpleObjectMemory](xref:adaptive-expressions.SimpleObjectMemory).
     *
     * @returns A string value representing the version info.
     */
    version(): string;
    /**
     * Returns a string that represents the current [SimpleObjectMemory](xref:adaptive-expressions.SimpleObjectMemory) object.
     *
     * @returns A string value representing the current [SimpleObjectMemory](xref:adaptive-expressions.SimpleObjectMemory) object.
     */
    toString(): string;
    /**
     * @private
     */
    private getCircularReplacer;
    /**
     * @private
     */
    private setProperty;
}
//# sourceMappingURL=simpleObjectMemory.d.ts.map