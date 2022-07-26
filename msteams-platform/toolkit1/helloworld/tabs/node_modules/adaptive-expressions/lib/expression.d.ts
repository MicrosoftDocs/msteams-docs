import { EvaluateExpressionDelegate, EvaluatorLookup, ExpressionEvaluator, ValueWithError } from './expressionEvaluator';
import { FunctionTable } from './functionTable';
import { MemoryInterface } from './memory';
import { Options } from './options';
import { ReturnType } from './returnType';
/**
 * An expression which can be analyzed or evaluated to produce a value.
 * This provides an open-ended wrapper that supports a number of built-in functions and can also be extended at runtime.
 * It also supports validation of the correctness of an expression and evaluation that should be exception free.
 */
export declare class Expression {
    /**
     * Expected result of evaluating the expression.
     *
     * @returns The expected result of evaluating the expression.
     */
    readonly returnType: ReturnType;
    /**
     * Type of expression.
     *
     * @returns The type of the expression.
     */
    readonly type: string;
    /**
     * Children expressions.
     */
    children: Expression[];
    /**
     * Evaluator of expression.
     */
    readonly evaluator: ExpressionEvaluator;
    /**
     * Dictionary of function => ExpressionEvaluator.
     * This is all available functions, you can add custom functions to it, but you cannot
     * replace builtin functions.  If you clear the dictionary, it will be reset to the built in functions.
     */
    static readonly functions: FunctionTable;
    /**
     * expression constructor.
     *
     * @param type Type of expression from ExpressionType
     * @param evaluator Information about how to validate and evaluate expression.
     * @param children Child expressions.
     */
    constructor(type: string, evaluator: ExpressionEvaluator, ...children: Expression[]);
    /**
     * Do a deep equality between expressions.
     *
     * @param other Other expression.
     * @returns True if expressions are the same.
     */
    deepEquals(other: Expression): boolean;
    /**
     * Return the static reference paths to memory.
     * Return all static paths to memory.  If there is a computed element index, then the path is terminated there,
     * but you might get other paths from the computed part as well.
     *
     * @returns List of the static reference paths.
     */
    references(): string[];
    /**
     * Walking function for identifying static memory references in an expression.
     *
     * @param expression Expression to analyze.
     * @param extension If present, called to override lookup for things like template expansion.
     * @returns Accessor path of expression.
     */
    referenceWalk(expression: Expression, extension?: (arg0: Expression) => boolean): {
        path: string;
        refs: Set<string>;
    };
    /**
     * Parse an expression string into an [Expression](xref:adaptive-expressions.Expression) object.
     *
     * @param expression Expression string.
     * @param lookup Optional. [EvaluatorLookup](xref:adaptive-expressions.EvaluatorLookup) function lookup when parsing the expression. Default is [Expression.lookup](xref:adaptive-expressions.Expression.lookup) which uses [Expression.functions](xref:adaptive-expressions.Expression.functions) table.
     * @returns The expression object.
     */
    static parse(expression: string, lookup?: EvaluatorLookup): Expression;
    /**
     * Lookup an [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) function by name.
     *
     * @param functionName Name of function to lookup.
     * @returns An [ExpressionEvaluator](xref:adaptive-expressions.ExpressionEvaluator) corresponding to the function name.
     */
    static lookup(functionName: string): ExpressionEvaluator;
    /**
     * Make an expression and validate it.
     *
     * @param type Type of expression from ExpressionType.
     * @param evaluator Information about how to validate and evaluate expression.
     * @param children Child expressions.
     * @returns The new expression.
     */
    static makeExpression(type: string, evaluator: ExpressionEvaluator, ...children: Expression[]): Expression;
    /**
     * Construct an expression from a EvaluateExpressionDelegate
     *
     * @param func Function to create an expression from.
     * @returns The new expression.
     */
    static lambaExpression(func: EvaluateExpressionDelegate): Expression;
    /**
     * Construct an expression from a lamba expression over the state.
     * Exceptions will be caught and surfaced as an error string.
     *
     * @param func ambda expression to evaluate.
     * @returns New expression.
     */
    static lambda(func: (arg0: any) => any): Expression;
    /**
     * Construct and validate an Set a property expression to a value expression.
     *
     * @param property property expression.
     * @param value value expression.
     * @returns New expression.
     */
    static setPathToValue(property: Expression, value: any): Expression;
    /**
     * Construct and validate an Equals expression.
     *
     * @param children Child clauses.
     * @returns New expression.
     */
    static equalsExpression(...children: Expression[]): Expression;
    /**
     * Construct and validate an And expression.
     *
     * @param children Child clauses.
     * @returns New expression.
     */
    static andExpression(...children: Expression[]): Expression;
    /**
     * Construct and validate an Or expression.
     *
     * @param children Child clauses.
     * @returns New expression.
     */
    static orExpression(...children: Expression[]): Expression;
    /**
     * Construct and validate an Not expression.
     *
     * @param child Child clauses.
     * @returns New expression.
     */
    static notExpression(child: Expression): Expression;
    /**
     * Validate immediate expression.
     *
     * @returns The validated expression.
     */
    validate: () => void;
    /**
     * Recursively validate the expression tree.
     */
    validateTree(): void;
    /**
     * Evaluate the expression.
     *
     * @param state Global state to evaluate accessor expressions against. Can be Dictionary, otherwise reflection is used to access property and then indexer.
     * @param options Options used in the evaluation.
     * @returns Computed value and an error string. If the string is non-null, then there was an evaluation error.
     */
    tryEvaluate(state: MemoryInterface | any, options?: Options): ValueWithError;
    /**
     * Returns a string that represents the current [Expression](xref:adaptive-expressions.Expression) object.
     *
     * @returns A string that represents the current [Expression](xref:adaptive-expressions.Expression) object.
     */
    toString(): string;
}
//# sourceMappingURL=expression.d.ts.map