/**
 * @module adaptive-expressions
 */
import { ExpressionEvaluator } from './expressionEvaluator';
/**
 *  <summary>
 *  Definition of default built-in functions for expressions.
 *  </summary>
 *  <remarks>
 *  These functions are largely from WDL https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference
 *  with a few extensions like infix operators for math, logic and comparisons.
 *  This class also has some methods that are useful to use when defining custom functions.
 *  You can always construct a <see cref="ExpressionEvaluator"/> directly which gives the maximum amount of control over validation and evaluation.
 *  Validators are static checkers that should throw an exception if something is not valid statically.
 *  Evaluators are called to evaluate an expression and should try not to throw.
 *  There are some evaluators in this file that take in a verifier that is called at runtime to verify arguments are proper.
 *  </remarks>
 */
export declare class ExpressionFunctions {
    /**
     * Read only Dictionary of built in functions.
     */
    static readonly standardFunctions: ReadonlyMap<string, ExpressionEvaluator>;
    /**
     * @private
     */
    private static getStandardFunctions;
}
//# sourceMappingURL=expressionFunctions.d.ts.map