/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Clause } from './clause';
import { MemoryInterface } from '../memory';
import { RelationshipType } from './relationshipType';
import { TriggerTree } from './triggerTree';
import { Trigger } from './trigger';
/**
 * Node in a trigger tree.
 */
export declare class Node {
    private _allTriggers;
    private _triggers;
    private _specializations;
    /**
     * Intializes a new instance of the `Node` class.
     *
     * @param clause The logical conjunction this node represents.
     * @param tree The trigger tree this node is found in.
     * @param trigger The trigger to initialize this node.
     */
    constructor(clause: Clause, tree: TriggerTree, trigger?: Trigger);
    /**
     * Gets all of the most specific triggers that contains the `Clause` in this node.
     *
     * @returns All of the most specific triggers that contains the `Clause` in this node.
     */
    readonly triggers: Trigger[];
    /**
     * Gets all triggers that contain the `Clause` in this node.
     *
     * @returns All triggers that contain the `Clause` in this node.
     */
    readonly allTriggers: Trigger[];
    /**
     * Gets specialized children of this node.
     *
     * @returns Specialized children of this node.
     */
    readonly specializations: Node[];
    /**
     * Gets the logical conjunction this node represents.
     */
    clause: Clause;
    /**
     * Gets the tree this node is found in.
     */
    tree: TriggerTree;
    /**
     * Gets a string that represents the current node.
     *
     * @param builder An array of string to build the string of node.
     * @param indent An integer representing the number of spaces at the start of a line.
     * @returns A string that represents the current node.
     */
    toString(builder?: string[], indent?: number): string;
    /**
     * Identify the relationship between two nodes.
     *
     * @param other Node to compare against.
     * @returns Relationship between this node an the other.
     */
    relationship(other: Node): RelationshipType;
    /**
     * Gets the most specific matches below this node.
     *
     * @param state Frame to evaluate against.
     * @returns List of the most specific matches found.
     */
    matches(state: MemoryInterface | any): Trigger[];
    /**
     * Adds a child node.
     *
     * @param triggerNode The node to be added.
     * @returns Whether adding node operation is successful.
     */
    addNode(triggerNode: Node): boolean;
    /**
     * Removes a trigger from node.
     *
     * @param trigger The trigger to be removed.
     * @returns Whether removing trigger operation is successful.
     */
    removeTrigger(trigger: Trigger): boolean;
    private _addNode;
    private _matches;
    private _removeTrigger;
    private _addSpecialization;
}
//# sourceMappingURL=node.d.ts.map