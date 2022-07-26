/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Type of quantifier for expanding trigger expressions.
 */
export declare enum QuantifierType {
    /**
     * Within a clause, duplicate any predicate with variable for each possible binding.
     */
    all = "all",
    /**
     * Create a new clause for each possible binding of variable.
     */
    any = "any"
}
/**
 * Quantifier for allowing runtime expansion of expressions.
 */
export declare class Quantifier {
    readonly variable: string;
    readonly type: QuantifierType;
    readonly bindings: string[];
    /**
     * Initializes a new instance of the `Quantifier` class.
     *
     * @param variable Name of variable to replace.
     * @param type Type of quantifier.
     * @param bindings Possible bindings for variable.
     */
    constructor(variable: string, type: QuantifierType, bindings: string[]);
    /**
     * @returns A string that represents the quantifier.
     */
    toString(): string;
}
//# sourceMappingURL=quantifier.d.ts.map