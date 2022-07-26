import { ParseTree } from 'antlr4ts/tree';
import { Expression } from '../expression';
import { EvaluatorLookup } from '../expressionEvaluator';
import { ExpressionParserInterface } from '../expressionParserInterface';
/**
 * Parser to turn strings into Expression
 */
export declare class ExpressionParser implements ExpressionParserInterface {
    /**
     * The delegate to lookup function information from the type.
     */
    readonly EvaluatorLookup: EvaluatorLookup;
    private static expressionDict;
    private readonly ExpressionTransformer;
    /**
     * Initializes a new instance of the [ExpressionParser](xref:adaptive-expressions.ExpressionParser) class.
     *
     * @param lookup [EvaluatorLookup](xref:adaptive-expressions.EvaluatorLookup) for information from type string.
     */
    constructor(lookup?: EvaluatorLookup);
    /**
     * @protected
     * Parse the expression to ANTLR lexer and parser.
     * @param expression The input string expression.
     * @returns A ParseTree.
     */
    protected static antlrParse(expression: string): ParseTree;
    /**
     * Parse the input into an expression.
     *
     * @param expression Expression to parse.
     * @returns Expression tree.
     */
    parse(expression: string): Expression;
}
//# sourceMappingURL=expressionParser.d.ts.map