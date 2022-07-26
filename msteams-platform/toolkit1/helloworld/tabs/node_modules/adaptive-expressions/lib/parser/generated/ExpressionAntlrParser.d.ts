/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ATN } from "antlr4ts/atn/ATN";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { RuleContext } from "antlr4ts/RuleContext";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { ExpressionAntlrParserListener } from "./ExpressionAntlrParserListener";
import { ExpressionAntlrParserVisitor } from "./ExpressionAntlrParserVisitor";
export declare class ExpressionAntlrParser extends Parser {
    static readonly STRING_INTERPOLATION_START = 1;
    static readonly PLUS = 2;
    static readonly SUBSTRACT = 3;
    static readonly NON = 4;
    static readonly XOR = 5;
    static readonly ASTERISK = 6;
    static readonly SLASH = 7;
    static readonly PERCENT = 8;
    static readonly DOUBLE_EQUAL = 9;
    static readonly NOT_EQUAL = 10;
    static readonly SINGLE_AND = 11;
    static readonly DOUBLE_AND = 12;
    static readonly DOUBLE_VERTICAL_CYLINDER = 13;
    static readonly LESS_THAN = 14;
    static readonly MORE_THAN = 15;
    static readonly LESS_OR_EQUAl = 16;
    static readonly MORE_OR_EQUAL = 17;
    static readonly OPEN_BRACKET = 18;
    static readonly CLOSE_BRACKET = 19;
    static readonly DOT = 20;
    static readonly OPEN_SQUARE_BRACKET = 21;
    static readonly CLOSE_SQUARE_BRACKET = 22;
    static readonly OPEN_CURLY_BRACKET = 23;
    static readonly CLOSE_CURLY_BRACKET = 24;
    static readonly COMMA = 25;
    static readonly COLON = 26;
    static readonly ARROW = 27;
    static readonly NULL_COALESCE = 28;
    static readonly QUESTION_MARK = 29;
    static readonly NUMBER = 30;
    static readonly WHITESPACE = 31;
    static readonly IDENTIFIER = 32;
    static readonly NEWLINE = 33;
    static readonly STRING = 34;
    static readonly INVALID_TOKEN_DEFAULT_MODE = 35;
    static readonly TEMPLATE = 36;
    static readonly ESCAPE_CHARACTER = 37;
    static readonly TEXT_CONTENT = 38;
    static readonly RULE_file = 0;
    static readonly RULE_expression = 1;
    static readonly RULE_primaryExpression = 2;
    static readonly RULE_stringInterpolation = 3;
    static readonly RULE_textContent = 4;
    static readonly RULE_argsList = 5;
    static readonly RULE_lambda = 6;
    static readonly RULE_keyValuePairList = 7;
    static readonly RULE_keyValuePair = 8;
    static readonly RULE_key = 9;
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    readonly vocabulary: Vocabulary;
    readonly grammarFileName: string;
    readonly ruleNames: string[];
    readonly serializedATN: string;
    constructor(input: TokenStream);
    file(): FileContext;
    expression(): ExpressionContext;
    expression(_p: number): ExpressionContext;
    primaryExpression(): PrimaryExpressionContext;
    primaryExpression(_p: number): PrimaryExpressionContext;
    stringInterpolation(): StringInterpolationContext;
    textContent(): TextContentContext;
    argsList(): ArgsListContext;
    lambda(): LambdaContext;
    keyValuePairList(): KeyValuePairListContext;
    keyValuePair(): KeyValuePairContext;
    key(): KeyContext;
    sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean;
    private expression_sempred;
    private primaryExpression_sempred;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static readonly _ATN: ATN;
}
export declare class FileContext extends ParserRuleContext {
    expression(): ExpressionContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class ExpressionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: ExpressionContext): void;
}
export declare class UnaryOpExpContext extends ExpressionContext {
    expression(): ExpressionContext;
    NON(): TerminalNode | undefined;
    SUBSTRACT(): TerminalNode | undefined;
    PLUS(): TerminalNode | undefined;
    constructor(ctx: ExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class BinaryOpExpContext extends ExpressionContext {
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    XOR(): TerminalNode | undefined;
    ASTERISK(): TerminalNode | undefined;
    SLASH(): TerminalNode | undefined;
    PERCENT(): TerminalNode | undefined;
    PLUS(): TerminalNode | undefined;
    SUBSTRACT(): TerminalNode | undefined;
    DOUBLE_EQUAL(): TerminalNode | undefined;
    NOT_EQUAL(): TerminalNode | undefined;
    SINGLE_AND(): TerminalNode | undefined;
    LESS_THAN(): TerminalNode | undefined;
    LESS_OR_EQUAl(): TerminalNode | undefined;
    MORE_THAN(): TerminalNode | undefined;
    MORE_OR_EQUAL(): TerminalNode | undefined;
    DOUBLE_AND(): TerminalNode | undefined;
    DOUBLE_VERTICAL_CYLINDER(): TerminalNode | undefined;
    NULL_COALESCE(): TerminalNode | undefined;
    constructor(ctx: ExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class TripleOpExpContext extends ExpressionContext {
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    QUESTION_MARK(): TerminalNode;
    COLON(): TerminalNode;
    constructor(ctx: ExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class PrimaryExpContext extends ExpressionContext {
    primaryExpression(): PrimaryExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class PrimaryExpressionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: PrimaryExpressionContext): void;
}
export declare class ParenthesisExpContext extends PrimaryExpressionContext {
    OPEN_BRACKET(): TerminalNode;
    expression(): ExpressionContext;
    CLOSE_BRACKET(): TerminalNode;
    constructor(ctx: PrimaryExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class ArrayCreationExpContext extends PrimaryExpressionContext {
    OPEN_SQUARE_BRACKET(): TerminalNode;
    CLOSE_SQUARE_BRACKET(): TerminalNode;
    argsList(): ArgsListContext | undefined;
    constructor(ctx: PrimaryExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class JsonCreationExpContext extends PrimaryExpressionContext {
    OPEN_CURLY_BRACKET(): TerminalNode;
    CLOSE_CURLY_BRACKET(): TerminalNode;
    keyValuePairList(): KeyValuePairListContext | undefined;
    constructor(ctx: PrimaryExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class NumericAtomContext extends PrimaryExpressionContext {
    NUMBER(): TerminalNode;
    constructor(ctx: PrimaryExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class StringAtomContext extends PrimaryExpressionContext {
    STRING(): TerminalNode;
    constructor(ctx: PrimaryExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class IdAtomContext extends PrimaryExpressionContext {
    IDENTIFIER(): TerminalNode;
    constructor(ctx: PrimaryExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class StringInterpolationAtomContext extends PrimaryExpressionContext {
    stringInterpolation(): StringInterpolationContext;
    constructor(ctx: PrimaryExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class MemberAccessExpContext extends PrimaryExpressionContext {
    primaryExpression(): PrimaryExpressionContext;
    DOT(): TerminalNode;
    IDENTIFIER(): TerminalNode;
    constructor(ctx: PrimaryExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class FuncInvokeExpContext extends PrimaryExpressionContext {
    primaryExpression(): PrimaryExpressionContext;
    OPEN_BRACKET(): TerminalNode;
    CLOSE_BRACKET(): TerminalNode;
    NON(): TerminalNode | undefined;
    argsList(): ArgsListContext | undefined;
    constructor(ctx: PrimaryExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class IndexAccessExpContext extends PrimaryExpressionContext {
    primaryExpression(): PrimaryExpressionContext;
    OPEN_SQUARE_BRACKET(): TerminalNode;
    expression(): ExpressionContext;
    CLOSE_SQUARE_BRACKET(): TerminalNode;
    constructor(ctx: PrimaryExpressionContext);
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class StringInterpolationContext extends ParserRuleContext {
    STRING_INTERPOLATION_START(): TerminalNode[];
    STRING_INTERPOLATION_START(i: number): TerminalNode;
    ESCAPE_CHARACTER(): TerminalNode[];
    ESCAPE_CHARACTER(i: number): TerminalNode;
    TEMPLATE(): TerminalNode[];
    TEMPLATE(i: number): TerminalNode;
    textContent(): TextContentContext[];
    textContent(i: number): TextContentContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class TextContentContext extends ParserRuleContext {
    TEXT_CONTENT(): TerminalNode[];
    TEXT_CONTENT(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class ArgsListContext extends ParserRuleContext {
    lambda(): LambdaContext[];
    lambda(i: number): LambdaContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class LambdaContext extends ParserRuleContext {
    IDENTIFIER(): TerminalNode;
    ARROW(): TerminalNode;
    expression(): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class KeyValuePairListContext extends ParserRuleContext {
    keyValuePair(): KeyValuePairContext[];
    keyValuePair(i: number): KeyValuePairContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class KeyValuePairContext extends ParserRuleContext {
    key(): KeyContext;
    COLON(): TerminalNode;
    expression(): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
export declare class KeyContext extends ParserRuleContext {
    IDENTIFIER(): TerminalNode | undefined;
    STRING(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: ExpressionAntlrParserListener): void;
    exitRule(listener: ExpressionAntlrParserListener): void;
    accept<Result>(visitor: ExpressionAntlrParserVisitor<Result>): Result;
}
//# sourceMappingURL=ExpressionAntlrParser.d.ts.map