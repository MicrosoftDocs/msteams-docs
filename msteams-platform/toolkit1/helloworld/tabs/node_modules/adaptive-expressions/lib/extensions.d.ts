/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { MemoryInterface } from './memory/memoryInterface';
/**
 * Some util and extension functions
 */
export declare class Extensions {
    /**
     * Patch method
     * TODO: is there any better solution?
     * To judge if an object is implements MemoryInterface. Same with 'is MemoryInterface' in C#
     *
     * @param obj The object to evaluate.
     * @returns True if the object implements MemoryInterface; False if it isn't.
     */
    static isMemoryInterface(obj: any): boolean;
    /**
     * Generator random seed and value from properties.
     * If value is not null, the mock random value result would be: min + (value % (max - min)).
     *
     * @param memory memory state.
     * @param min The inclusive lower bound of the random number returned.
     * @param max The exclusive upper bound of the random number returned. max must be greater than or equal to min.
     * @returns Random value.
     */
    static randomNext(memory: MemoryInterface, min: number, max: number): number;
}
//# sourceMappingURL=extensions.d.ts.map