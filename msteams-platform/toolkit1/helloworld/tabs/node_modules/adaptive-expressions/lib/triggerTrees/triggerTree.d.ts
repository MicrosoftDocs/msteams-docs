/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Expression } from '../expression';
import { MemoryInterface } from '../memory';
import { Node } from './node';
import { Optimizer, PredicateComparers } from './optimizer';
import { Quantifier } from './quantifier';
import { Trigger } from './trigger';
/**
 * A trigger tree organizes evaluators according to generalization/specialization in order to make it easier to use rules.
 */
export declare class TriggerTree {
    /**
     * Intializes a new instance of the `TriggerTree` class.
     */
    constructor();
    /**
     * A list of `Optimizer` for optimizing claues.
     */
    readonly optimizers: Optimizer[];
    /**
     * A dictionary of `PredicateComparer` values, with string keys.
     */
    readonly comparers: PredicateComparers;
    /**
     * The root node instance.
     */
    root: Node;
    /**
     * The total number of triggers.
     */
    totalTriggers: number;
    /**
     * @returns A string the represents the current object.
     */
    toString(): string;
    /**
     * Add a trigger expression to the tree.
     *
     * @param stringOrExpression Trigger to add.
     * @param action Action when triggered.
     * @param quantifiers Quantifiers to use when expanding expressions.
     * @returns New trigger.
     */
    addTrigger(stringOrExpression: string | Expression, action: any, ...quantifiers: Quantifier[]): Trigger;
    /**
     * Remove trigger from tree.
     *
     * @param trigger Trigger to remove.
     * @returns True if removed trigger.
     */
    removeTrigger(trigger: Trigger): boolean;
    /**
     * Generates a string describing the tree.
     *
     * @param indent Current indent level.
     * @returns String describing the tree.
     */
    treeToString(indent?: number): string;
    /**
     * Return the possible matches given the current state.
     *
     * @param state State to evaluate against.
     * @returns List of possible matches.
     */
    matches(state: MemoryInterface | any): Trigger[];
    /**
     * Verify the tree meets specialization/generalization invariants.
     *
     * @returns Bad node if found.
     */
    verifyTree(): Node;
    private _verifyTree;
    private _treeToString;
}
//# sourceMappingURL=triggerTree.d.ts.map