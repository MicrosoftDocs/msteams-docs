/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ATN } from "antlr4ts/atn/ATN";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
export declare class ExpressionAntlrLexer extends Lexer {
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
    static readonly STRING_INTERPOLATION_MODE = 1;
    static readonly channelNames: string[];
    static readonly modeNames: string[];
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    readonly vocabulary: Vocabulary;
    ignoreWS: boolean;
    constructor(input: CharStream);
    readonly grammarFileName: string;
    readonly ruleNames: string[];
    readonly serializedATN: string;
    readonly channelNames: string[];
    readonly modeNames: string[];
    action(_localctx: RuleContext, ruleIndex: number, actionIndex: number): void;
    private STRING_INTERPOLATION_START_action;
    private STRING_INTERPOLATION_END_action;
    sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean;
    private WHITESPACE_sempred;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static readonly _ATN: ATN;
}
//# sourceMappingURL=ExpressionAntlrLexer.d.ts.map