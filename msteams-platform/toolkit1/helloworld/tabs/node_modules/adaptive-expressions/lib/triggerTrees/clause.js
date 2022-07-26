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
const expressionType_1 = require("../expressionType");
const relationshipType_1 = require("./relationshipType");
/**
 * A canonical normal form expression.
 */
class Clause extends expression_1.Expression {
    /**
     * Initializes a new instance of the `Clause` class.
     *
     * @param clauseOrExpression A clause, expression or an array of expressions to initialize a `Clause`.
     */
    constructor(clauseOrExpression) {
        super(expressionType_1.ExpressionType.And, undefined);
        /**
         * Gets or sets the anyBinding dictionary.
         */
        this.anyBindings = new Map();
        /**
         * Gets or sets whether the clause is subsumed.
         */
        this.subsumed = false;
        if (clauseOrExpression) {
            if (Array.isArray(clauseOrExpression)) {
                const children = clauseOrExpression;
                this.children = children;
            }
            else if (clauseOrExpression instanceof Clause) {
                const fromClause = clauseOrExpression;
                this.children = [...fromClause.children];
                for (const [key, value] of fromClause.anyBindings.entries()) {
                    this.anyBindings.set(key, value);
                }
            }
            else if (clauseOrExpression instanceof expression_1.Expression) {
                const expression = clauseOrExpression;
                this.children.push(expression);
            }
        }
    }
    /**
     * Gets a string that represents the current clause.
     *
     * @param builder An array of string to build the string of clause.
     * @param indent An integer represents the number of spaces at the start of a line.
     * @returns A string that represents the current clause.
     */
    toString(builder = [], indent = 0) {
        builder.push(' '.repeat(indent));
        if (this.subsumed) {
            builder.push('*');
        }
        builder.push('(');
        let first = true;
        for (const child of this.children) {
            if (first) {
                first = false;
            }
            else {
                builder.push(' && ');
            }
            builder.push(child.toString());
        }
        builder.push(')');
        if (this._ignored) {
            builder.push(' ignored(');
            builder.push(this._ignored.toString());
            builder.push(')');
        }
        this.anyBindings.forEach((value, key) => {
            builder.push(` ${key}->${value}`);
        });
        return builder.join('');
    }
    /**
     * Compares the current `Clause` with another `Clause`.
     *
     * @param other The other `Clause` to compare.
     * @param comparers A comparer, which is a dictionary of `PredicateComparer` with string keys.
     * @returns A `RelationshipType` value between two `Clause` instances.
     */
    relationship(other, comparers) {
        let soFar = relationshipType_1.RelationshipType.incomparable;
        let shorter = this;
        let shorterCount = shorter.children.length;
        let longer = other;
        let longerCount = longer.children.length;
        let swapped = false;
        if (longerCount < shorterCount) {
            longer = this;
            shorter = other;
            const tmp = longerCount;
            longerCount = shorterCount;
            shorterCount = tmp;
            swapped = true;
        }
        if (shorterCount === 0) {
            if (longerCount === 0) {
                soFar = relationshipType_1.RelationshipType.equal;
            }
            else {
                soFar = relationshipType_1.RelationshipType.generalizes;
            }
        }
        else {
            // If every one of shorter predicates is equal or superset of one in longer, then shorter is a superset of longer
            for (const shortPredicate of shorter.children) {
                let shorterRel = relationshipType_1.RelationshipType.incomparable;
                for (const longPredicate of longer.children) {
                    shorterRel = this._relationship(shortPredicate, longPredicate, comparers);
                    if (shorterRel !== relationshipType_1.RelationshipType.incomparable) {
                        // Found related predicates
                        break;
                    }
                }
                if (shorterRel === relationshipType_1.RelationshipType.incomparable) {
                    // Predicate in shorter is incomparable so done
                    soFar = relationshipType_1.RelationshipType.incomparable;
                    break;
                }
                else {
                    if (soFar === relationshipType_1.RelationshipType.incomparable) {
                        soFar = shorterRel;
                    }
                    if (soFar === relationshipType_1.RelationshipType.equal) {
                        if (shorterRel === relationshipType_1.RelationshipType.generalizes ||
                            (shorterRel === relationshipType_1.RelationshipType.specializes && shorterCount === longerCount) ||
                            shorterRel === relationshipType_1.RelationshipType.equal) {
                            soFar = shorterRel;
                        }
                        else {
                            break;
                        }
                    }
                    else if (soFar != shorterRel) {
                        // Not continued with sub/super so incomparable
                        break;
                    }
                }
            }
            if (shorterCount !== longerCount) {
                switch (soFar) {
                    case relationshipType_1.RelationshipType.equal:
                    case relationshipType_1.RelationshipType.generalizes:
                        soFar = relationshipType_1.RelationshipType.generalizes;
                        break;
                    default:
                        soFar = relationshipType_1.RelationshipType.incomparable;
                        break;
                }
            }
            soFar = this._bindingRelationship(soFar, shorter, longer);
        }
        return this._swap(soFar, swapped);
    }
    /**
     * Determines whether the current `Clause` matches with another `Clause`.
     *
     * @param clause The other `Clause` instance to compare with.
     * @param memory The scope for looking up variables.
     * @returns A boolean value indicating whether the two clauses are matches.
     */
    matches(clause, memory) {
        let matched = false;
        if (clause.deepEquals(this)) {
            matched = true;
            if (this._ignored) {
                const { value: match, error } = this._ignored.tryEvaluate(memory);
                matched = !error && match;
            }
        }
        return matched;
    }
    /**
     * Splits ignored child expressions.
     */
    splitIgnores() {
        const children = [];
        const ignores = [];
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            if (child.type === expressionType_1.ExpressionType.Ignore) {
                ignores.push(child);
            }
            else {
                children.push(child);
            }
        }
        this.children = children;
        if (ignores.length > 0) {
            this._ignored = expression_1.Expression.andExpression(...ignores);
        }
    }
    _bindingRelationship(soFar, shorterClause, longerClause) {
        if (soFar === relationshipType_1.RelationshipType.equal) {
            let swapped = false;
            let shorter = shorterClause.anyBindings;
            let longer = longerClause.anyBindings;
            if (shorterClause.anyBindings.size > longerClause.anyBindings.size) {
                shorter = longerClause.anyBindings;
                longer = shorterClause.anyBindings;
                swapped = true;
            }
            for (const [shorterKey, shorterValue] of shorter.entries()) {
                let found = false;
                for (const [longerKey, longerValue] of longer.entries()) {
                    if (shorterKey === longerKey && shorterValue === longerValue) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    soFar = relationshipType_1.RelationshipType.incomparable;
                }
            }
            if (soFar === relationshipType_1.RelationshipType.equal && shorter.size < longer.size) {
                soFar = relationshipType_1.RelationshipType.specializes;
            }
            soFar = this._swap(soFar, swapped);
        }
        return soFar;
    }
    _swap(soFar, swapped) {
        let reln = soFar;
        if (swapped) {
            switch (soFar) {
                case relationshipType_1.RelationshipType.specializes:
                    reln = relationshipType_1.RelationshipType.generalizes;
                    break;
                case relationshipType_1.RelationshipType.generalizes:
                    reln = relationshipType_1.RelationshipType.specializes;
                    break;
            }
        }
        return reln;
    }
    _relationship(expr, other, comparers) {
        let relationship = relationshipType_1.RelationshipType.incomparable;
        let root = expr;
        let rootOther = other;
        if (expr.type === expressionType_1.ExpressionType.Not && other.type === expressionType_1.ExpressionType.Not) {
            root = expr.children[0];
            rootOther = other.children[0];
        }
        let comparer;
        if (root.type === other.type) {
            comparer = comparers[root.type];
        }
        if (comparer) {
            relationship = comparer.relationship(root, rootOther);
        }
        else {
            relationship = expr.deepEquals(other) ? relationshipType_1.RelationshipType.equal : relationshipType_1.RelationshipType.incomparable;
        }
        return relationship;
    }
}
exports.Clause = Clause;
//# sourceMappingURL=clause.js.map