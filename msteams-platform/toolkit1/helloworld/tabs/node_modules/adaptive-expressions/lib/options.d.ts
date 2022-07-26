/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Options used to define evaluation behaviors.
 */
export declare class Options {
    nullSubstitution: (path: string) => unknown;
    /**
     * The locale info for evaluating Expressions.
     */
    locale: string;
    /**
     * Initializes a new instance of the [Options](xref:adaptive-expressions.Options) class.
     *
     * @param opt Optional. An [Options](xref:adaptive-expressions.Options) instance.
     */
    constructor(opt?: Options);
}
//# sourceMappingURL=options.d.ts.map