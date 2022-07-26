"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = require("../expression");
const clause_1 = require("./clause");
const node_1 = require("./node");
const relationshipType_1 = require("./relationshipType");
const trigger_1 = require("./trigger");
/**
 * A trigger tree organizes evaluators according to generalization/specialization in order to make it easier to use rules.
 */
class TriggerTree {
    /**
     * Intializes a new instance of the `TriggerTree` class.
     */
    constructor() {
        /**
         * A list of `Optimizer` for optimizing claues.
         */
        this.optimizers = [];
        /**
         * A dictionary of `PredicateComparer` values, with string keys.
         */
        this.comparers = {};
        /**
         * The total number of triggers.
         */
        this.totalTriggers = 0;
        this.root = new node_1.Node(new clause_1.Clause(), this);
    }
    /**
     * @returns A string the represents the current object.
     */
    toString() {
        return `TriggerTree with ${this.totalTriggers} triggers`;
    }
    /**
     * Add a trigger expression to the tree.
     *
     * @param stringOrExpression Trigger to add.
     * @param action Action when triggered.
     * @param quantifiers Quantifiers to use when expanding expressions.
     * @returns New trigger.
     */
    addTrigger(stringOrExpression, action, ...quantifiers) {
        const expression = typeof stringOrExpression === 'string' ? expression_1.Expression.parse(stringOrExpression) : stringOrExpression;
        const trigger = new trigger_1.Trigger(this, expression, action, ...quantifiers);
        let added = false;
        if (trigger.clauses.length) {
            for (const clause of trigger.clauses) {
                const newNode = new node_1.Node(clause, this, trigger);
                if (this.root.addNode(newNode)) {
                    added = true;
                }
            }
        }
        if (added) {
            ++this.totalTriggers;
        }
        return trigger;
    }
    /**
     * Remove trigger from tree.
     *
     * @param trigger Trigger to remove.
     * @returns True if removed trigger.
     */
    removeTrigger(trigger) {
        const result = this.root.removeTrigger(trigger);
        if (result) {
            --this.totalTriggers;
        }
        return result;
    }
    /**
     * Generates a string describing the tree.
     *
     * @param indent Current indent level.
     * @returns String describing the tree.
     */
    treeToString(indent = 0) {
        const builder = [];
        this._treeToString(builder, this.root, indent);
        return builder.join('');
    }
    /**
     * Return the possible matches given the current state.
     *
     * @param state State to evaluate against.
     * @returns List of possible matches.
     */
    matches(state) {
        return this.root.matches(state);
    }
    /**
     * Verify the tree meets specialization/generalization invariants.
     *
     * @returns Bad node if found.
     */
    verifyTree() {
        return this._verifyTree(this.root, new Set());
    }
    _verifyTree(node, visited) {
        let badNode;
        if (!visited.has(node)) {
            visited.add(node);
            for (let i = 0; !badNode && i < node.specializations.length; ++i) {
                const first = node.specializations[i];
                if (node.relationship(first) !== relationshipType_1.RelationshipType.generalizes) {
                    badNode = node;
                }
                else {
                    this._verifyTree(node.specializations[i], visited);
                    for (let j = i + 1; j < node.specializations.length; ++j) {
                        const second = node.specializations[j];
                        if (first.relationship(second) !== relationshipType_1.RelationshipType.incomparable) {
                            badNode = node;
                            break;
                        }
                    }
                }
            }
        }
        return badNode;
    }
    _treeToString(builder, node, indent) {
        node.toString(builder, indent);
        builder.push(` [${node.triggers.length}]`);
        builder.push('\n');
        for (const child of node.specializations) {
            this._treeToString(builder, child, indent + 2);
        }
    }
}
exports.TriggerTree = TriggerTree;
//# sourceMappingURL=triggerTree.js.map