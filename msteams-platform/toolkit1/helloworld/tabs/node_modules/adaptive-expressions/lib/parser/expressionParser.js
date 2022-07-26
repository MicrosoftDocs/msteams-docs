"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable security/detect-object-injection */
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const antlr4ts_1 = require("antlr4ts");
const tree_1 = require("antlr4ts/tree");
const constant_1 = require("../constant");
const expression_1 = require("../expression");
const expressionType_1 = require("../expressionType");
const generated_1 = require("./generated");
const ep = __importStar(require("./generated/ExpressionAntlrParser"));
const parseErrorListener_1 = require("./parseErrorListener");
const functionUtils_1 = require("../functionUtils");
/**
 * Parser to turn strings into Expression
 */
class ExpressionParser {
    /**
     * Initializes a new instance of the [ExpressionParser](xref:adaptive-expressions.ExpressionParser) class.
     *
     * @param lookup [EvaluatorLookup](xref:adaptive-expressions.EvaluatorLookup) for information from type string.
     */
    constructor(lookup) {
        this.ExpressionTransformer = class extends tree_1.AbstractParseTreeVisitor {
            constructor(lookup) {
                super();
                this.escapeRegex = new RegExp(/\\[^\r\n]?/g);
                this._lookupFunction = undefined;
                this.transform = (context) => this.visit(context);
                this.visitParenthesisExp = (context) => this.visit(context.expression());
                this.defaultResult = () => new constant_1.Constant('');
                this.makeExpression = (functionType, ...children) => {
                    if (!this._lookupFunction(functionType)) {
                        throw new Error(`${functionType} does not have an evaluator, it's not a built-in function or a custom function.`);
                    }
                    return expression_1.Expression.makeExpression(functionType, this._lookupFunction(functionType), ...children);
                };
                this._lookupFunction = lookup;
            }
            visitUnaryOpExp(context) {
                const unaryOperationName = context.getChild(0).text;
                const operand = this.visit(context.expression());
                if (unaryOperationName === expressionType_1.ExpressionType.Subtract || unaryOperationName === expressionType_1.ExpressionType.Add) {
                    return this.makeExpression(unaryOperationName, new constant_1.Constant(0), operand);
                }
                return this.makeExpression(unaryOperationName, operand);
            }
            visitBinaryOpExp(context) {
                const binaryOperationName = context.getChild(1).text;
                const left = this.visit(context.expression(0));
                const right = this.visit(context.expression(1));
                return this.makeExpression(binaryOperationName, left, right);
            }
            visitTripleOpExp(context) {
                const conditionalExpression = this.visit(context.expression(0));
                const left = this.visit(context.expression(1));
                const right = this.visit(context.expression(2));
                return this.makeExpression(expressionType_1.ExpressionType.If, conditionalExpression, left, right);
            }
            visitFuncInvokeExp(context) {
                const parameters = this.processArgsList(context.argsList());
                // Remove the check to check primaryExpression is just an IDENTIFIER to support "." in template name
                let functionName = context.primaryExpression().text;
                if (context.NON() !== undefined) {
                    functionName += context.NON().text;
                }
                return this.makeExpression(functionName, ...parameters);
            }
            visitIdAtom(context) {
                let result;
                const symbol = context.text;
                if (symbol === 'false') {
                    result = new constant_1.Constant(false);
                }
                else if (symbol === 'true') {
                    result = new constant_1.Constant(true);
                }
                else if (symbol === 'null') {
                    result = new constant_1.Constant(null);
                }
                else if (symbol === 'undefined') {
                    result = new constant_1.Constant(undefined);
                }
                else {
                    result = this.makeExpression(expressionType_1.ExpressionType.Accessor, new constant_1.Constant(symbol));
                }
                return result;
            }
            visitIndexAccessExp(context) {
                const property = this.visit(context.expression());
                const instance = this.visit(context.primaryExpression());
                return this.makeExpression(expressionType_1.ExpressionType.Element, instance, property);
            }
            visitMemberAccessExp(context) {
                const property = context.IDENTIFIER().text;
                const instance = this.visit(context.primaryExpression());
                return this.makeExpression(expressionType_1.ExpressionType.Accessor, new constant_1.Constant(property), instance);
            }
            visitNumericAtom(context) {
                const numberValue = parseFloat(context.text);
                if (functionUtils_1.FunctionUtils.isNumber(numberValue)) {
                    return new constant_1.Constant(numberValue);
                }
                throw new Error(`${context.text} is not a number.`);
            }
            visitArrayCreationExp(context) {
                const parameters = this.processArgsList(context.argsList());
                return this.makeExpression(expressionType_1.ExpressionType.CreateArray, ...parameters);
            }
            visitStringAtom(context) {
                let text = context.text;
                if (text.startsWith("'") && text.endsWith("'")) {
                    text = text.substr(1, text.length - 2).replace(/\\'/g, "'");
                }
                else if (text.startsWith('"') && text.endsWith('"')) {
                    // start with ""
                    text = text.substr(1, text.length - 2).replace(/\\"/g, '"');
                }
                else {
                    throw new Error(`Invalid string ${text}`);
                }
                return new constant_1.Constant(this.evalEscape(text));
            }
            visitJsonCreationExp(context) {
                let expr = this.makeExpression(expressionType_1.ExpressionType.Json, new constant_1.Constant('{}'));
                if (context.keyValuePairList()) {
                    for (const kvPair of context.keyValuePairList().keyValuePair()) {
                        let key = '';
                        const keyNode = kvPair.key().children[0];
                        if (keyNode instanceof tree_1.TerminalNode) {
                            if (keyNode.symbol.type === ep.ExpressionAntlrParser.IDENTIFIER) {
                                key = keyNode.text;
                            }
                            else {
                                key = keyNode.text.substring(1, keyNode.text.length - 1);
                            }
                        }
                        expr = this.makeExpression(expressionType_1.ExpressionType.SetProperty, expr, new constant_1.Constant(key), this.visit(kvPair.expression()));
                    }
                }
                return expr;
            }
            visitStringInterpolationAtom(context) {
                const children = [new constant_1.Constant('')];
                for (const node of context.stringInterpolation().children) {
                    if (node instanceof tree_1.TerminalNode) {
                        switch (node.symbol.type) {
                            case ep.ExpressionAntlrParser.TEMPLATE: {
                                const expressionString = this.trimExpression(node.text);
                                children.push(expression_1.Expression.parse(expressionString, this._lookupFunction));
                                break;
                            }
                            case ep.ExpressionAntlrParser.ESCAPE_CHARACTER: {
                                children.push(new constant_1.Constant(node.text.replace(/\\`/g, '`').replace(/\\\$/g, '$')));
                                break;
                            }
                            default:
                                break;
                        }
                    }
                    else {
                        children.push(new constant_1.Constant(node.text));
                    }
                }
                return this.makeExpression(expressionType_1.ExpressionType.Concat, ...children);
            }
            processArgsList(context) {
                const result = [];
                if (!context) {
                    return result;
                }
                for (const child of context.children) {
                    if (child instanceof ep.LambdaContext) {
                        const evalParam = this.makeExpression(expressionType_1.ExpressionType.Accessor, new constant_1.Constant(child.IDENTIFIER().text));
                        const evalFun = this.visit(child.expression());
                        result.push(evalParam);
                        result.push(evalFun);
                    }
                    else if (child instanceof ep.ExpressionContext) {
                        result.push(this.visit(child));
                    }
                }
                return result;
            }
            trimExpression(expression) {
                let result = expression.trim();
                if (result.startsWith('$')) {
                    result = result.substr(1);
                }
                result = result.trim();
                if (result.startsWith('{') && result.endsWith('}')) {
                    result = result.substr(1, result.length - 2);
                }
                return result.trim();
            }
            evalEscape(text) {
                const validCharactersDict = {
                    '\\r': '\r',
                    '\\n': '\n',
                    '\\t': '\t',
                    '\\\\': '\\',
                };
                return text.replace(this.escapeRegex, (sub) => {
                    if (sub in validCharactersDict) {
                        return validCharactersDict[sub];
                    }
                    else {
                        return sub;
                    }
                });
            }
        };
        this.EvaluatorLookup = lookup || expression_1.Expression.lookup;
    }
    /**
     * @protected
     * Parse the expression to ANTLR lexer and parser.
     * @param expression The input string expression.
     * @returns A ParseTree.
     */
    static antlrParse(expression) {
        if (ExpressionParser.expressionDict.has(expression)) {
            return ExpressionParser.expressionDict.get(expression);
        }
        const inputStream = new antlr4ts_1.ANTLRInputStream(expression);
        const lexer = new generated_1.ExpressionAntlrLexer(inputStream);
        lexer.removeErrorListeners();
        const tokenStream = new antlr4ts_1.CommonTokenStream(lexer);
        const parser = new generated_1.ExpressionAntlrParser(tokenStream);
        parser.removeErrorListeners();
        parser.addErrorListener(parseErrorListener_1.ParseErrorListener.Instance);
        parser.buildParseTree = true;
        let expressionContext;
        const file = parser.file();
        if (file !== undefined) {
            expressionContext = file.expression();
        }
        ExpressionParser.expressionDict.set(expression, expressionContext);
        return expressionContext;
    }
    /**
     * Parse the input into an expression.
     *
     * @param expression Expression to parse.
     * @returns Expression tree.
     */
    parse(expression) {
        if (expression == null || expression === '') {
            return new constant_1.Constant('');
        }
        else {
            return new this.ExpressionTransformer(this.EvaluatorLookup).transform(ExpressionParser.antlrParse(expression));
        }
    }
}
ExpressionParser.expressionDict = new Map();
exports.ExpressionParser = ExpressionParser;
//# sourceMappingURL=expressionParser.js.map