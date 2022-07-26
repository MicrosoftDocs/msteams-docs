"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const constant_1 = require("./constant");
const expressionEvaluator_1 = require("./expressionEvaluator");
const expressionType_1 = require("./expressionType");
const extensions_1 = require("./extensions");
const functionTable_1 = require("./functionTable");
const memory_1 = require("./memory");
const options_1 = require("./options");
const parser_1 = require("./parser");
const returnType_1 = require("./returnType");
/**
 * An expression which can be analyzed or evaluated to produce a value.
 * This provides an open-ended wrapper that supports a number of built-in functions and can also be extended at runtime.
 * It also supports validation of the correctness of an expression and evaluation that should be exception free.
 */
class Expression {
    /**
     * expression constructor.
     *
     * @param type Type of expression from ExpressionType
     * @param evaluator Information about how to validate and evaluate expression.
     * @param children Child expressions.
     */
    constructor(type, evaluator, ...children) {
        /**
         * Validate immediate expression.
         *
         * @returns The validated expression.
         */
        this.validate = () => this.evaluator.validateExpression(this);
        if (evaluator) {
            this.evaluator = evaluator;
            this.children = children;
        }
        else if (type !== undefined) {
            if (!Expression.functions.get(type)) {
                throw Error(`${type} does not have an evaluator, it's not a built-in function or a custom function.`);
            }
            this.evaluator = Expression.functions.get(type);
            this.children = children;
        }
    }
    /**
     * Expected result of evaluating the expression.
     *
     * @returns The expected result of evaluating the expression.
     */
    get returnType() {
        return this.evaluator.returnType;
    }
    /**
     * Type of expression.
     *
     * @returns The type of the expression.
     */
    get type() {
        return this.evaluator.type;
    }
    /**
     * Do a deep equality between expressions.
     *
     * @param other Other expression.
     * @returns True if expressions are the same.
     */
    deepEquals(other) {
        let eq = false;
        if (other) {
            eq = this.type === other.type;
            if (eq) {
                eq = this.children.length === other.children.length;
                if (this.type === expressionType_1.ExpressionType.And || this.type === expressionType_1.ExpressionType.Or) {
                    // And/Or do not depand on order
                    for (let i = 0; eq && i < this.children.length; i++) {
                        const primary = this.children[0];
                        let found = false;
                        for (let j = 0; j < this.children.length; j++) {
                            if (primary.deepEquals(other.children[j])) {
                                found = true;
                                break;
                            }
                        }
                        eq = found;
                    }
                }
                else {
                    for (let i = 0; eq && i < this.children.length; i++) {
                        eq = this.children[i].deepEquals(other.children[i]);
                    }
                }
            }
        }
        return eq;
    }
    /**
     * Return the static reference paths to memory.
     * Return all static paths to memory.  If there is a computed element index, then the path is terminated there,
     * but you might get other paths from the computed part as well.
     *
     * @returns List of the static reference paths.
     */
    references() {
        const { path, refs } = this.referenceWalk(this);
        if (path !== undefined) {
            refs.add(path);
        }
        return Array.from(refs);
    }
    /**
     * Walking function for identifying static memory references in an expression.
     *
     * @param expression Expression to analyze.
     * @param extension If present, called to override lookup for things like template expansion.
     * @returns Accessor path of expression.
     */
    referenceWalk(expression, extension) {
        let path;
        let refs = new Set();
        if (extension === undefined || !extension(expression)) {
            const children = expression.children;
            if (expression.type === expressionType_1.ExpressionType.Accessor) {
                const prop = children[0].value;
                if (children.length === 1) {
                    path = prop;
                }
                if (children.length === 2) {
                    ({ path, refs } = this.referenceWalk(children[1], extension));
                    if (path !== undefined) {
                        path = path.concat('.', prop);
                    }
                    // if path is null we still keep it null, won't append prop
                    // because for example, first(items).x should not return x as refs
                }
            }
            else if (expression.type === expressionType_1.ExpressionType.Element) {
                ({ path, refs } = this.referenceWalk(children[0], extension));
                if (path !== undefined) {
                    if (children[1] instanceof constant_1.Constant) {
                        const cnst = children[1];
                        if (cnst.returnType === returnType_1.ReturnType.String) {
                            path += `.${cnst.value}`;
                        }
                        else {
                            path += `[${cnst.value}]`;
                        }
                    }
                    else {
                        refs.add(path);
                    }
                }
                const result = this.referenceWalk(children[1], extension);
                const idxPath = result.path;
                const refs1 = result.refs;
                refs = new Set([...refs, ...refs1]);
                if (idxPath !== undefined) {
                    refs.add(idxPath);
                }
            }
            else if (expression.type === expressionType_1.ExpressionType.Foreach ||
                expression.type === expressionType_1.ExpressionType.Where ||
                expression.type === expressionType_1.ExpressionType.Select) {
                let result = this.referenceWalk(children[0], extension);
                const child0Path = result.path;
                const refs0 = result.refs;
                if (child0Path !== undefined) {
                    refs0.add(child0Path);
                }
                result = this.referenceWalk(children[2], extension);
                const child2Path = result.path;
                const refs2 = result.refs;
                if (child2Path !== undefined) {
                    refs2.add(child2Path);
                }
                const iteratorName = children[1].children[0].value;
                const nonLocalRefs2 = Array.from(refs2).filter((x) => !(x === iteratorName || x.startsWith(iteratorName + '.') || x.startsWith(iteratorName + '[')));
                refs = new Set([...refs, ...refs0, ...nonLocalRefs2]);
            }
            else {
                for (const child of expression.children) {
                    const result = this.referenceWalk(child, extension);
                    const childPath = result.path;
                    const refs0 = result.refs;
                    refs = new Set([...refs, ...refs0]);
                    if (childPath !== undefined) {
                        refs.add(childPath);
                    }
                }
            }
        }
        return { path, refs };
    }
    /**
     * Parse an expression string into an [Expression](xref:adaptive-expressions.Expression) object.
     *
     * @param expression Expression string.
     * @param lookup Optional. [EvaluatorLookup](xref:adaptive-expressions.EvaluatorLookup) function lookup when parsing the expression. Default is [Expression.lookup](xref:adaptive-expressions.Expression.lookup) which uses [Expression.functions](xref:adaptive-expressions.Expression.functions) table.
     * @returns The expression object.
     */
    static parse(expression, lookup) {
        return new parser_1.ExpressionParser(lookup || Expression.lookup).parse(expression.replace(/^=/, ''));
    }
    /**
     * Lookup an [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) function by name.
     *
     * @param functionName Name of function to lookup.
     * @returns An [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) corresponding to the function name.
     */
    static lookup(functionName) {
        const exprEvaluator = Expression.functions.get(functionName);
        if (!exprEvaluator) {
            return undefined;
        }
        return exprEvaluator;
    }
    /**
     * Make an expression and validate it.
     *
     * @param type Type of expression from ExpressionType.
     * @param evaluator Information about how to validate and evaluate expression.
     * @param children Child expressions.
     * @returns The new expression.
     */
    static makeExpression(type, evaluator, ...children) {
        const expr = new Expression(type, evaluator, ...children);
        expr.validate();
        return expr;
    }
    /**
     * Construct an expression from a EvaluateExpressionDelegate
     *
     * @param func Function to create an expression from.
     * @returns The new expression.
     */
    static lambaExpression(func) {
        return new Expression(expressionType_1.ExpressionType.Lambda, new expressionEvaluator_1.ExpressionEvaluator(expressionType_1.ExpressionType.Lambda, func));
    }
    /**
     * Construct an expression from a lamba expression over the state.
     * Exceptions will be caught and surfaced as an error string.
     *
     * @param func ambda expression to evaluate.
     * @returns New expression.
     */
    static lambda(func) {
        return new Expression(expressionType_1.ExpressionType.Lambda, new expressionEvaluator_1.ExpressionEvaluator(expressionType_1.ExpressionType.Lambda, (_expression, state, _) => {
            let value;
            let error;
            try {
                value = func(state);
            }
            catch (funcError) {
                error = funcError;
            }
            return { value, error };
        }));
    }
    /**
     * Construct and validate an Set a property expression to a value expression.
     *
     * @param property property expression.
     * @param value value expression.
     * @returns New expression.
     */
    static setPathToValue(property, value) {
        if (value instanceof Expression) {
            return Expression.makeExpression(expressionType_1.ExpressionType.SetPathToValue, undefined, property, value);
        }
        else {
            return Expression.makeExpression(expressionType_1.ExpressionType.SetPathToValue, undefined, property, new constant_1.Constant(value));
        }
    }
    /**
     * Construct and validate an Equals expression.
     *
     * @param children Child clauses.
     * @returns New expression.
     */
    static equalsExpression(...children) {
        return Expression.makeExpression(expressionType_1.ExpressionType.Equal, undefined, ...children);
    }
    /**
     * Construct and validate an And expression.
     *
     * @param children Child clauses.
     * @returns New expression.
     */
    static andExpression(...children) {
        if (children.length > 1) {
            return Expression.makeExpression(expressionType_1.ExpressionType.And, undefined, ...children);
        }
        else {
            return children[0];
        }
    }
    /**
     * Construct and validate an Or expression.
     *
     * @param children Child clauses.
     * @returns New expression.
     */
    static orExpression(...children) {
        if (children.length > 1) {
            return Expression.makeExpression(expressionType_1.ExpressionType.Or, undefined, ...children);
        }
        else {
            return children[0];
        }
    }
    /**
     * Construct and validate an Not expression.
     *
     * @param child Child clauses.
     * @returns New expression.
     */
    static notExpression(child) {
        return Expression.makeExpression(expressionType_1.ExpressionType.Not, undefined, child);
    }
    /**
     * Recursively validate the expression tree.
     */
    validateTree() {
        this.validate();
        for (const child of this.children) {
            child.validateTree();
        }
    }
    /**
     * Evaluate the expression.
     *
     * @param state Global state to evaluate accessor expressions against. Can be Dictionary, otherwise reflection is used to access property and then indexer.
     * @param options Options used in the evaluation.
     * @returns Computed value and an error string. If the string is non-null, then there was an evaluation error.
     */
    tryEvaluate(state, options = undefined) {
        if (!extensions_1.Extensions.isMemoryInterface(state)) {
            state = memory_1.SimpleObjectMemory.wrap(state);
        }
        options = options ? options : new options_1.Options();
        return this.evaluator.tryEvaluate(this, state, options);
    }
    /**
     * Returns a string that represents the current [Expression](xref:adaptive-expressions.Expression) object.
     *
     * @returns A string that represents the current [Expression](xref:adaptive-expressions.Expression) object.
     */
    toString() {
        let builder = '';
        let valid = false;
        // Special support for memory paths
        if (this.type === expressionType_1.ExpressionType.Accessor && this.children.length >= 1) {
            if (this.children[0] instanceof constant_1.Constant) {
                const prop = this.children[0].value;
                if (typeof prop === 'string') {
                    if (this.children.length === 1) {
                        valid = true;
                        builder = builder.concat(prop);
                    }
                    else if (this.children.length === 2) {
                        valid = true;
                        builder = builder.concat(this.children[1].toString(), '.', prop);
                    }
                }
            }
        }
        else if (this.type === expressionType_1.ExpressionType.Element && this.children.length === 2) {
            valid = true;
            builder = builder.concat(this.children[0].toString(), '[', this.children[1].toString(), ']');
        }
        if (!valid) {
            const infix = this.type.length > 0 && !new RegExp(/[a-z]/i).test(this.type[0]) && this.children.length >= 2;
            if (!infix) {
                builder = builder.concat(this.type);
            }
            builder = builder.concat('(');
            let first = true;
            for (const child of this.children) {
                if (first) {
                    first = false;
                }
                else {
                    if (infix) {
                        builder = builder.concat(' ', this.type, ' ');
                    }
                    else {
                        builder = builder.concat(', ');
                    }
                }
                builder = builder.concat(child.toString());
            }
            builder = builder.concat(')');
        }
        return builder;
    }
}
/**
 * Dictionary of function => ExpressionEvaluator.
 * This is all available functions, you can add custom functions to it, but you cannot
 * replace builtin functions.  If you clear the dictionary, it will be reset to the built in functions.
 */
Expression.functions = new functionTable_1.FunctionTable();
exports.Expression = Expression;
//# sourceMappingURL=expression.js.map