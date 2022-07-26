"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returnType_1 = require("./returnType");
/**
 * Information on how to evaluate an expression.
 */
class ExpressionEvaluator {
    /**
     * Initializes a new instance of the <see cref="ExpressionEvaluator"/> class.
     *
     * @param type Expression type.
     * @param evaluator Delegate to evaluate an expression.
     * @param returnType Type expected from evaluation.
     * @param validator Static validation of expression.
     */
    constructor(type, evaluator, returnType = returnType_1.ReturnType.Object, validator) {
        /**
         * Evaluate an expression.
         *
         * @param expression Expression to evaluate.
         * @param state Global state information.
         * @param options Options used in the evaluation.
         * @returns The value and error string that is non-null if there is an error.
         */
        this.tryEvaluate = (expression, state, options) => this._evaluator(expression, state, options);
        /**
         * Validate an expression.
         *
         * @param expression Expression to validate.
         * @returns The validated expression.
         */
        this.validateExpression = (expression) => this._validator(expression);
        this.type = type;
        this._evaluator = evaluator;
        this.returnType = returnType;
        this._validator =
            validator ||
                ((_expr) => {
                    //noop
                });
    }
    /**
     * Gets the evaluator that is a negation of this one.
     *
     * @returns The evaluator that is a negation of this one.
     */
    get negation() {
        return this._negation;
    }
    /**
     * Sets the evaluator that is a negation of this one.
     */
    set negation(value) {
        value._negation = this;
        this._negation = value;
    }
}
exports.ExpressionEvaluator = ExpressionEvaluator;
//# sourceMappingURL=expressionEvaluator.js.map