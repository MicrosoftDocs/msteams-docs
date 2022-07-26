/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Expression } from '../expression';
import { MemoryInterface } from '../memory';
import { PredicateComparers } from './optimizer';
import { RelationshipType } from './relationshipType';
/**
 * A canonical normal form expression.
 */
export declare class Clause extends Expression {
    private _ignored;
    /**
     * Initializes a new instance of the `Clause` class.
     *
     * @param clauseOrExpression A clause, expression or an array of expressions to initialize a `Clause`.
     */
    constructor(clauseOrExpression?: Clause | Expression | Expression[]);
    /**
     * Gets or sets the anyBinding dictionary.
     */
    anyBindings: Map<string, string>;
    /**
     * Gets or sets whether the clause is subsumed.
     */
    subsumed: boolean;
    /**
     * Gets a string that represents the current clause.
     *
     * @param builder An array of string to build the string of clause.
     * @param indent An integer represents the number of spaces at the start of a line.
     * @returns A string that represents the current clause.
     */
    toString(builder?: string[], indent?: number): string;
    /**
     * Compares the current `Clause` with another `Clause`.
     *
     * @param other The other `Clause` to compare.
     * @param comparers A comparer, which is a dictionary of `PredicateComparer` with string keys.
     * @returns A `RelationshipType` value between two `Clause` instances.
     */
    relationship(other: Clause, comparers: PredicateComparers): RelationshipType;
    /**
     * Determines whether the current `Clause` matches with another `Clause`.
     *
     * @param clause The other `Clause` instance to compare with.
     * @param memory The scope for looking up variables.
     * @returns A boolean value indicating whether the two clauses are matches.
     */
    matches(clause: Clause, memory: MemoryInterface | any): boolean;
    /**
     * Splits ignored child expressions.
     */
    splitIgnores(): void;
    private _bindingRelationship;
    private _swap;
    private _relationship;
}
//# sourceMappingURL=clause.d.ts.map