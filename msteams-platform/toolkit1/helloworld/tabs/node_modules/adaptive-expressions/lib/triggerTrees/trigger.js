"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const clause_1 = require("./clause");
const constant_1 = require("../constant");
const expression_1 = require("../expression");
const expressionType_1 = require("../expressionType");
const quantifier_1 = require("./quantifier");
const relationshipType_1 = require("./relationshipType");
/**
 * Rewrite the expression by pushing not down to the leaves.
 *
 * @param expression Expression to rewrite.
 * @param inNot .
 * @returns The rewritten expression.
 */
const pushDownNot = (expression, inNot = false) => {
    let newExpr = expression;
    const negation = expression.evaluator.negation;
    switch (expression.type) {
        case expressionType_1.ExpressionType.And:
        case expressionType_1.ExpressionType.Or: {
            const children = expression.children.map((child) => pushDownNot(child, inNot));
            if (children.length === 1) {
                newExpr = children[0];
            }
            else {
                newExpr = expression_1.Expression.makeExpression(expression.type === expressionType_1.ExpressionType.And
                    ? inNot
                        ? expressionType_1.ExpressionType.Or
                        : expressionType_1.ExpressionType.And
                    : inNot
                        ? expressionType_1.ExpressionType.And
                        : expressionType_1.ExpressionType.Or, undefined, ...children);
            }
            break;
        }
        case expressionType_1.ExpressionType.Not:
            newExpr = pushDownNot(expression.children[0], !inNot);
            break;
        default:
            if (inNot) {
                if (negation) {
                    if (expression.type === negation.type) {
                        // Pass through like optional/ignore
                        newExpr = expression_1.Expression.makeExpression(undefined, negation, ...expression.children.map((child) => pushDownNot(child, true)));
                    }
                    else {
                        // Replace with negation and stop
                        newExpr = expression_1.Expression.makeExpression(undefined, negation, ...expression.children);
                    }
                }
                else {
                    // Keep not
                    newExpr = expression_1.Expression.makeExpression(expressionType_1.ExpressionType.Not, undefined, expression);
                }
            }
            break;
    }
    return newExpr;
};
/**
 * A trigger is a combination of a trigger expression and the corresponding action.
 */
class Trigger {
    /**
     * Intializes a new instance of the `Trigger` class.
     *
     * @param tree Trigger tree that contains this trigger.
     * @param expression Expression for when the trigger action is possible.
     * @param action Action to take when a trigger matches.
     * @param quantifiers Quantifiers to dynamically expand the expression.
     */
    constructor(tree, expression, action, ...quantifiers) {
        this._tree = tree;
        this.action = action;
        this.originalExpression = expression;
        this._quantifiers = quantifiers;
        if (expression) {
            const normalForm = pushDownNot(expression);
            this._clauses = this._generateClauses(normalForm);
            this._removeDuplicatedPredicates();
            this._optimizeClauses();
            this._expandQuantifiers();
            this._removeDuplicates();
            this._markSubsumedClauses();
            this._splitIgnores();
        }
        else {
            this._clauses = [];
        }
    }
    /**
     * Gets list of expressions converted into Disjunctive Normal Form where ! is pushed to the leaves and
     * there is an implicit || between clauses and && within a clause.
     *
     * @returns The list of clauses.
     */
    get clauses() {
        return this._clauses;
    }
    /**
     * Determines the relationship between current instance and another `Trigger` instance.
     *
     * @param other The other Trigger instance.
     * @param comparers The comparer dictionary.
     * @returns A `RelationshipType` value.
     */
    relationship(other, comparers) {
        let result;
        const first = this._relationship(this, other, comparers);
        const second = this._relationship(other, this, comparers);
        if (first === relationshipType_1.RelationshipType.equal) {
            if (second === relationshipType_1.RelationshipType.equal) {
                // All first clauses == second clauses
                result = relationshipType_1.RelationshipType.equal;
            }
            else {
                // All first clauses found in second
                result = relationshipType_1.RelationshipType.specializes;
            }
        }
        else if (first === relationshipType_1.RelationshipType.specializes) {
            // All first clauses specializes or equal a second clause
            result = relationshipType_1.RelationshipType.specializes;
        }
        else if (second === relationshipType_1.RelationshipType.equal || second === relationshipType_1.RelationshipType.specializes) {
            // All second clauses are equal or specialize a first clause
            result = relationshipType_1.RelationshipType.generalizes;
        }
        else {
            // All other cases are in comparable
            result = relationshipType_1.RelationshipType.incomparable;
        }
        return result;
    }
    /**
     * Determines whether there is a member in the current `Clause` that matches the nodeClause parameter.
     *
     * @param nodeClause The other Clause instance to match.
     * @param state The scope for looking up variables.
     * @returns A boolean value inidicating whether there is a member matches.
     */
    matches(nodeClause, state) {
        return this.clauses.find((clause) => clause.matches(nodeClause, state)) !== undefined;
    }
    /**
     * Gets a string that represents the current trigger.
     *
     * @param builder An array of string to build the string of trigger.
     * @param indent An integer represents the number of spaces at the start of a line.
     * @returns A string that represents the current trigger.
     */
    toString(builder = [], indent = 0) {
        builder.push(' '.repeat(indent));
        if (this._clauses.length > 0) {
            let first = true;
            for (const clause of this._clauses) {
                if (first) {
                    first = false;
                }
                else {
                    builder.push('\n');
                    builder.push(' '.repeat(indent));
                    builder.push('|| ');
                }
                builder.push(clause.toString());
            }
        }
        else {
            builder.push('<Empty>');
        }
        return builder.join('');
    }
    _relationship(trigger, other, comparers) {
        let soFar = relationshipType_1.RelationshipType.incomparable;
        for (const clause of trigger.clauses) {
            if (!clause.subsumed) {
                // Check other for = or clause that is specialized
                let clauseSoFar = relationshipType_1.RelationshipType.incomparable;
                for (const second of other.clauses) {
                    if (!second.subsumed) {
                        const reln = clause.relationship(second, comparers);
                        if (reln === relationshipType_1.RelationshipType.equal || reln === relationshipType_1.RelationshipType.specializes) {
                            clauseSoFar = reln;
                            break;
                        }
                    }
                }
                if (clauseSoFar === relationshipType_1.RelationshipType.incomparable) {
                    // Some clause is not comparable
                    soFar = relationshipType_1.RelationshipType.incomparable;
                    break;
                }
                if (clauseSoFar === relationshipType_1.RelationshipType.equal) {
                    if (soFar === relationshipType_1.RelationshipType.incomparable) {
                        // Start on equal clause
                        soFar = clauseSoFar;
                    }
                }
                else if (clauseSoFar === relationshipType_1.RelationshipType.specializes) {
                    // Either going from incomparable or equal to specializes
                    soFar = clauseSoFar;
                }
            }
        }
        // Either incomparable, equal or specializes
        return soFar;
    }
    _generateClauses(expression) {
        switch (expression.type) {
            case expressionType_1.ExpressionType.And: {
                // Need to combine every combination of clauses
                let soFar = [];
                let first = true;
                for (let i = 0; i < expression.children.length; i++) {
                    const child = expression.children[i];
                    const clauses = this._generateClauses(child);
                    if (clauses.length === 0) {
                        // Encountered false
                        soFar = [];
                        break;
                    }
                    if (first) {
                        soFar.push(...clauses);
                        first = false;
                    }
                    else {
                        const newClauses = [];
                        for (const old of soFar) {
                            for (const clause of clauses) {
                                const children = [];
                                children.push(...old.children);
                                children.push(...clause.children);
                                newClauses.push(new clause_1.Clause(children));
                            }
                        }
                        soFar = newClauses;
                    }
                }
                return soFar;
            }
            case expressionType_1.ExpressionType.Or: {
                const clauses = [];
                for (let i = 0; i < expression.children.length; i++) {
                    const child = expression.children[i];
                    clauses.push(...this._generateClauses(child));
                }
                return clauses;
            }
            case expressionType_1.ExpressionType.Optional:
                return [new clause_1.Clause(), ...this._generateClauses(expression.children[0])];
            default:
                // True becomes empty expression and false drops clause
                if (expression instanceof constant_1.Constant && typeof expression.value === 'boolean') {
                    return expression.value ? [new clause_1.Clause()] : [];
                }
                else {
                    return [new clause_1.Clause(expression)];
                }
        }
    }
    /**
     * Remove any duplicate predicates within a clause.
     * NOTE: This is annoying but expression hash codes of deepEquals expressions are different.
     */
    _removeDuplicatedPredicates() {
        // Rewrite clauses to remove duplicated tests
        for (let i = 0; i < this._clauses.length; ++i) {
            const clause = this._clauses[i];
            const children = [];
            for (let p = 0; p < clause.children.length; ++p) {
                const pred = clause.children[p];
                let found = false;
                for (let q = p + 1; q < clause.children.length; ++q) {
                    if (pred.deepEquals(clause.children[q])) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    children.push(pred);
                }
            }
            this._clauses[i] = new clause_1.Clause(children);
        }
    }
    /**
     * Mark clauses that are more specific than another clause as subsumed and also remove any = clauses.
     */
    _markSubsumedClauses() {
        for (let i = 0; i < this._clauses.length; ++i) {
            const clause = this._clauses[i];
            if (!clause.subsumed) {
                for (let j = i + 1; j < this._clauses.length; ++j) {
                    const other = this._clauses[j];
                    if (!other.subsumed) {
                        const reln = clause.relationship(other, this._tree.comparers);
                        if (reln === relationshipType_1.RelationshipType.equal) {
                            this._clauses.splice(j, 1);
                            --j;
                        }
                        else {
                            if (reln === relationshipType_1.RelationshipType.specializes) {
                                clause.subsumed = true;
                                break;
                            }
                            if (reln === relationshipType_1.RelationshipType.generalizes) {
                                other.subsumed = true;
                            }
                        }
                    }
                }
            }
        }
    }
    _splitIgnores() {
        for (let i = 0; i < this._clauses.length; i++) {
            this._clauses[i].splitIgnores();
        }
    }
    _optimizeClauses() {
        this._clauses.forEach((clause) => {
            this._tree.optimizers.forEach((optimizer) => {
                optimizer.optimize(clause);
            });
        });
    }
    _expandQuantifiers() {
        if (this._quantifiers && this._quantifiers.length > 0) {
            for (let i = 0; i < this._quantifiers.length; i++) {
                const quantifier = this._quantifiers[i];
                const newClauses = [];
                for (let j = 0; j < this._clauses.length; j++) {
                    const clause = this._clauses[j];
                    newClauses.push(...this._expandQuantifiersWithClause(quantifier, clause));
                }
                this._clauses = newClauses;
            }
        }
    }
    _expandQuantifiersWithClause(quantifier, clause) {
        const results = [];
        if (quantifier.type === quantifier_1.QuantifierType.all) {
            const children = [];
            if (quantifier.bindings.length > 0) {
                for (let i = 0; i < clause.children.length; i++) {
                    const predicate = clause.children[i];
                    for (let j = 0; j < quantifier.bindings.length; j++) {
                        const binding = quantifier.bindings[j];
                        const { expression: newPredicate, changed } = this._substituteVariable(quantifier.variable, binding, predicate);
                        children.push(newPredicate);
                        if (!changed) {
                            // No change to first predicate, so can stop
                            break;
                        }
                    }
                }
            }
            else {
                // Empty quantifier is trivially true so remove any predicate that refers to quantifier
                for (let i = 0; i < clause.children.length; i++) {
                    const predicate = clause.children[i];
                    const { changed } = this._substituteVariable(quantifier.variable, '', predicate);
                    if (!changed) {
                        children.push(predicate);
                    }
                }
            }
            results.push(new clause_1.Clause(children));
        }
        else {
            if (quantifier.bindings.length > 0) {
                let changed = false;
                for (let i = 0; i < quantifier.bindings.length; i++) {
                    const binding = quantifier.bindings[i];
                    const newClause = new clause_1.Clause(clause);
                    const children = [];
                    for (let j = 0; j < clause.children.length; j++) {
                        const predicate = clause.children[j];
                        const { expression: newPredicate, changed: predicateChanged } = this._substituteVariable(quantifier.variable, binding, predicate);
                        changed = changed || predicateChanged;
                        children.push(newPredicate);
                    }
                    if (changed) {
                        newClause.anyBindings.set(quantifier.variable, binding);
                    }
                    newClause.children = [...children];
                    results.push(newClause);
                    if (!changed) {
                        break;
                    }
                }
            }
            else {
                // Keep clause if does not contain any binding
                let changed = false;
                for (let i = 0; i < clause.children.length; i++) {
                    const predicate = clause.children[i];
                    const { changed: predicateChanged } = this._substituteVariable(quantifier.variable, '', predicate);
                    if (predicateChanged) {
                        changed = true;
                        break;
                    }
                }
                if (!changed) {
                    results.push(clause);
                }
            }
        }
        return results;
    }
    _substituteVariable(variable, binding, expression) {
        let newExpr = expression;
        let changed = false;
        if (expression.type === expressionType_1.ExpressionType.Accessor &&
            expression.children.length === 1 &&
            expression.children[0] instanceof constant_1.Constant &&
            typeof expression.children[0].value === 'string' &&
            expression.children[0].value === variable) {
            newExpr = expression_1.Expression.makeExpression(expressionType_1.ExpressionType.Accessor, undefined, new constant_1.Constant(binding));
            changed = true;
        }
        else {
            const children = [];
            for (let i = 0; i < expression.children.length; i++) {
                const child = expression.children[i];
                const { expression: childExpr, changed: childChanged } = this._substituteVariable(variable, binding, child);
                children.push(childExpr);
                changed = changed || childChanged;
            }
            if (changed) {
                newExpr = new expression_1.Expression(undefined, expression.evaluator, ...children);
            }
        }
        return { expression: newExpr, changed };
    }
    _removeDuplicates() {
        for (const clause of this._clauses) {
            // NOTE: This is quadratic in clause length but GetHashCode is not equal for expressions and we expect the number of clauses to be small.
            const predicates = [...clause.children];
            for (let i = 0; i < predicates.length; ++i) {
                const first = predicates[i];
                for (let j = i + 1; j < predicates.length;) {
                    const second = predicates[j];
                    if (first.deepEquals(second)) {
                        predicates.splice(j, 1);
                    }
                    else {
                        ++j;
                    }
                }
            }
            clause.children = [...predicates];
        }
    }
}
exports.Trigger = Trigger;
//# sourceMappingURL=trigger.js.map