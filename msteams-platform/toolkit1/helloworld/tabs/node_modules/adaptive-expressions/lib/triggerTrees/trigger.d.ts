/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Clause } from './clause';
import { Expression } from '../expression';
import { MemoryInterface } from '../memory';
import { PredicateComparers } from './optimizer';
import { Quantifier } from './quantifier';
import { RelationshipType } from './relationshipType';
import { TriggerTree } from './triggerTree';
/**
 * A trigger is a combination of a trigger expression and the corresponding action.
 */
export declare class Trigger {
    private readonly _quantifiers;
    private readonly _tree;
    private _clauses;
    /**
     * Intializes a new instance of the `Trigger` class.
     *
     * @param tree Trigger tree that contains this trigger.
     * @param expression Expression for when the trigger action is possible.
     * @param action Action to take when a trigger matches.
     * @param quantifiers Quantifiers to dynamically expand the expression.
     */
    constructor(tree: TriggerTree, expression?: Expression, action?: any, ...quantifiers: Quantifier[]);
    /**
     * Original trigger expression.
     */
    readonly originalExpression: Expression;
    /**
     * Action to take when trigger is true.
     */
    readonly action: any;
    /**
     * Gets list of expressions converted into Disjunctive Normal Form where ! is pushed to the leaves and
     * there is an implicit || between clauses and && within a clause.
     *
     * @returns The list of clauses.
     */
    readonly clauses: Clause[];
    /**
     * Determines the relationship between current instance and another `Trigger` instance.
     *
     * @param other The other Trigger instance.
     * @param comparers The comparer dictionary.
     * @returns A `RelationshipType` value.
     */
    relationship(other: Trigger, comparers: PredicateComparers): RelationshipType;
    /**
     * Determines whether there is a member in the current `Clause` that matches the nodeClause parameter.
     *
     * @param nodeClause The other Clause instance to match.
     * @param state The scope for looking up variables.
     * @returns A boolean value inidicating whether there is a member matches.
     */
    matches(nodeClause: Clause, state: MemoryInterface | any): boolean;
    /**
     * Gets a string that represents the current trigger.
     *
     * @param builder An array of string to build the string of trigger.
     * @param indent An integer represents the number of spaces at the start of a line.
     * @returns A string that represents the current trigger.
     */
    toString(builder?: string[], indent?: number): string;
    private _relationship;
    private _generateClauses;
    /**
     * Remove any duplicate predicates within a clause.
     * NOTE: This is annoying but expression hash codes of deepEquals expressions are different.
     */
    private _removeDuplicatedPredicates;
    /**
     * Mark clauses that are more specific than another clause as subsumed and also remove any = clauses.
     */
    private _markSubsumedClauses;
    private _splitIgnores;
    private _optimizeClauses;
    private _expandQuantifiers;
    private _expandQuantifiersWithClause;
    private _substituteVariable;
    private _removeDuplicates;
}
//# sourceMappingURL=trigger.d.ts.map