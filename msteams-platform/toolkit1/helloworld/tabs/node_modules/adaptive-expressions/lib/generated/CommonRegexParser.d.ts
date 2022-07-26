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
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { CommonRegexListener } from "./CommonRegexListener";
import { CommonRegexVisitor } from "./CommonRegexVisitor";
export declare class CommonRegexParser extends Parser {
    static readonly Quoted = 1;
    static readonly BlockQuoted = 2;
    static readonly BellChar = 3;
    static readonly ControlChar = 4;
    static readonly EscapeChar = 5;
    static readonly FormFeed = 6;
    static readonly NewLine = 7;
    static readonly CarriageReturn = 8;
    static readonly Tab = 9;
    static readonly Backslash = 10;
    static readonly HexChar = 11;
    static readonly Dot = 12;
    static readonly DecimalDigit = 13;
    static readonly NotDecimalDigit = 14;
    static readonly CharWithProperty = 15;
    static readonly CharWithoutProperty = 16;
    static readonly WhiteSpace = 17;
    static readonly NotWhiteSpace = 18;
    static readonly WordChar = 19;
    static readonly NotWordChar = 20;
    static readonly CharacterClassStart = 21;
    static readonly CharacterClassEnd = 22;
    static readonly Caret = 23;
    static readonly Hyphen = 24;
    static readonly QuestionMark = 25;
    static readonly Plus = 26;
    static readonly Star = 27;
    static readonly OpenBrace = 28;
    static readonly CloseBrace = 29;
    static readonly Comma = 30;
    static readonly EndOfSubject = 31;
    static readonly Pipe = 32;
    static readonly OpenParen = 33;
    static readonly CloseParen = 34;
    static readonly LessThan = 35;
    static readonly GreaterThan = 36;
    static readonly SingleQuote = 37;
    static readonly Underscore = 38;
    static readonly Colon = 39;
    static readonly Hash = 40;
    static readonly Equals = 41;
    static readonly Exclamation = 42;
    static readonly Ampersand = 43;
    static readonly ALC = 44;
    static readonly BLC = 45;
    static readonly CLC = 46;
    static readonly DLC = 47;
    static readonly ELC = 48;
    static readonly FLC = 49;
    static readonly GLC = 50;
    static readonly HLC = 51;
    static readonly ILC = 52;
    static readonly JLC = 53;
    static readonly KLC = 54;
    static readonly LLC = 55;
    static readonly MLC = 56;
    static readonly NLC = 57;
    static readonly OLC = 58;
    static readonly PLC = 59;
    static readonly QLC = 60;
    static readonly RLC = 61;
    static readonly SLC = 62;
    static readonly TLC = 63;
    static readonly ULC = 64;
    static readonly VLC = 65;
    static readonly WLC = 66;
    static readonly XLC = 67;
    static readonly YLC = 68;
    static readonly ZLC = 69;
    static readonly AUC = 70;
    static readonly BUC = 71;
    static readonly CUC = 72;
    static readonly DUC = 73;
    static readonly EUC = 74;
    static readonly FUC = 75;
    static readonly GUC = 76;
    static readonly HUC = 77;
    static readonly IUC = 78;
    static readonly JUC = 79;
    static readonly KUC = 80;
    static readonly LUC = 81;
    static readonly MUC = 82;
    static readonly NUC = 83;
    static readonly OUC = 84;
    static readonly PUC = 85;
    static readonly QUC = 86;
    static readonly RUC = 87;
    static readonly SUC = 88;
    static readonly TUC = 89;
    static readonly UUC = 90;
    static readonly VUC = 91;
    static readonly WUC = 92;
    static readonly XUC = 93;
    static readonly YUC = 94;
    static readonly ZUC = 95;
    static readonly D1 = 96;
    static readonly D2 = 97;
    static readonly D3 = 98;
    static readonly D4 = 99;
    static readonly D5 = 100;
    static readonly D6 = 101;
    static readonly D7 = 102;
    static readonly D8 = 103;
    static readonly D9 = 104;
    static readonly D0 = 105;
    static readonly OtherChar = 106;
    static readonly RULE_parse = 0;
    static readonly RULE_alternation = 1;
    static readonly RULE_expr = 2;
    static readonly RULE_element = 3;
    static readonly RULE_quantifier = 4;
    static readonly RULE_quantifier_type = 5;
    static readonly RULE_character_class = 6;
    static readonly RULE_capture = 7;
    static readonly RULE_non_capture = 8;
    static readonly RULE_option = 9;
    static readonly RULE_option_flag = 10;
    static readonly RULE_atom = 11;
    static readonly RULE_cc_atom = 12;
    static readonly RULE_shared_atom = 13;
    static readonly RULE_literal = 14;
    static readonly RULE_cc_literal = 15;
    static readonly RULE_shared_literal = 16;
    static readonly RULE_number = 17;
    static readonly RULE_octal_char = 18;
    static readonly RULE_octal_digit = 19;
    static readonly RULE_digits = 20;
    static readonly RULE_digit = 21;
    static readonly RULE_name = 22;
    static readonly RULE_alpha_nums = 23;
    static readonly RULE_non_close_parens = 24;
    static readonly RULE_non_close_paren = 25;
    static readonly RULE_letter = 26;
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    readonly vocabulary: Vocabulary;
    readonly grammarFileName: string;
    readonly ruleNames: string[];
    readonly serializedATN: string;
    constructor(input: TokenStream);
    parse(): ParseContext;
    alternation(): AlternationContext;
    expr(): ExprContext;
    element(): ElementContext;
    quantifier(): QuantifierContext;
    quantifier_type(): Quantifier_typeContext;
    character_class(): Character_classContext;
    capture(): CaptureContext;
    non_capture(): Non_captureContext;
    option(): OptionContext;
    option_flag(): Option_flagContext;
    atom(): AtomContext;
    cc_atom(): Cc_atomContext;
    shared_atom(): Shared_atomContext;
    literal(): LiteralContext;
    cc_literal(): Cc_literalContext;
    shared_literal(): Shared_literalContext;
    number(): NumberContext;
    octal_char(): Octal_charContext;
    octal_digit(): Octal_digitContext;
    digits(): DigitsContext;
    digit(): DigitContext;
    name(): NameContext;
    alpha_nums(): Alpha_numsContext;
    non_close_parens(): Non_close_parensContext;
    non_close_paren(): Non_close_parenContext;
    letter(): LetterContext;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static readonly _ATN: ATN;
}
export declare class ParseContext extends ParserRuleContext {
    alternation(): AlternationContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class AlternationContext extends ParserRuleContext {
    expr(): ExprContext[];
    expr(i: number): ExprContext;
    Pipe(): TerminalNode[];
    Pipe(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class ExprContext extends ParserRuleContext {
    element(): ElementContext[];
    element(i: number): ElementContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class ElementContext extends ParserRuleContext {
    atom(): AtomContext;
    quantifier(): QuantifierContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class QuantifierContext extends ParserRuleContext {
    QuestionMark(): TerminalNode | undefined;
    quantifier_type(): Quantifier_typeContext;
    Plus(): TerminalNode | undefined;
    Star(): TerminalNode | undefined;
    OpenBrace(): TerminalNode | undefined;
    number(): NumberContext[];
    number(i: number): NumberContext;
    CloseBrace(): TerminalNode | undefined;
    Comma(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Quantifier_typeContext extends ParserRuleContext {
    Plus(): TerminalNode | undefined;
    QuestionMark(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Character_classContext extends ParserRuleContext {
    CharacterClassStart(): TerminalNode;
    Caret(): TerminalNode | undefined;
    CharacterClassEnd(): TerminalNode;
    cc_atom(): Cc_atomContext[];
    cc_atom(i: number): Cc_atomContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class CaptureContext extends ParserRuleContext {
    OpenParen(): TerminalNode;
    QuestionMark(): TerminalNode | undefined;
    LessThan(): TerminalNode | undefined;
    name(): NameContext | undefined;
    GreaterThan(): TerminalNode | undefined;
    alternation(): AlternationContext;
    CloseParen(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Non_captureContext extends ParserRuleContext {
    OpenParen(): TerminalNode;
    QuestionMark(): TerminalNode;
    Colon(): TerminalNode;
    alternation(): AlternationContext;
    CloseParen(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class OptionContext extends ParserRuleContext {
    OpenParen(): TerminalNode;
    QuestionMark(): TerminalNode;
    CloseParen(): TerminalNode;
    option_flag(): Option_flagContext[];
    option_flag(i: number): Option_flagContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Option_flagContext extends ParserRuleContext {
    ILC(): TerminalNode | undefined;
    MLC(): TerminalNode | undefined;
    SLC(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class AtomContext extends ParserRuleContext {
    shared_atom(): Shared_atomContext | undefined;
    literal(): LiteralContext | undefined;
    character_class(): Character_classContext | undefined;
    capture(): CaptureContext | undefined;
    non_capture(): Non_captureContext | undefined;
    option(): OptionContext | undefined;
    Dot(): TerminalNode | undefined;
    Caret(): TerminalNode | undefined;
    EndOfSubject(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Cc_atomContext extends ParserRuleContext {
    cc_literal(): Cc_literalContext[];
    cc_literal(i: number): Cc_literalContext;
    Hyphen(): TerminalNode | undefined;
    shared_atom(): Shared_atomContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Shared_atomContext extends ParserRuleContext {
    ControlChar(): TerminalNode | undefined;
    DecimalDigit(): TerminalNode | undefined;
    NotDecimalDigit(): TerminalNode | undefined;
    CharWithProperty(): TerminalNode | undefined;
    CharWithoutProperty(): TerminalNode | undefined;
    WhiteSpace(): TerminalNode | undefined;
    NotWhiteSpace(): TerminalNode | undefined;
    WordChar(): TerminalNode | undefined;
    NotWordChar(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class LiteralContext extends ParserRuleContext {
    shared_literal(): Shared_literalContext | undefined;
    CharacterClassEnd(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Cc_literalContext extends ParserRuleContext {
    shared_literal(): Shared_literalContext | undefined;
    Dot(): TerminalNode | undefined;
    CharacterClassStart(): TerminalNode | undefined;
    Caret(): TerminalNode | undefined;
    QuestionMark(): TerminalNode | undefined;
    Plus(): TerminalNode | undefined;
    Star(): TerminalNode | undefined;
    EndOfSubject(): TerminalNode | undefined;
    Pipe(): TerminalNode | undefined;
    OpenParen(): TerminalNode | undefined;
    CloseParen(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Shared_literalContext extends ParserRuleContext {
    octal_char(): Octal_charContext | undefined;
    letter(): LetterContext | undefined;
    digit(): DigitContext | undefined;
    BellChar(): TerminalNode | undefined;
    EscapeChar(): TerminalNode | undefined;
    FormFeed(): TerminalNode | undefined;
    NewLine(): TerminalNode | undefined;
    CarriageReturn(): TerminalNode | undefined;
    Tab(): TerminalNode | undefined;
    HexChar(): TerminalNode | undefined;
    Quoted(): TerminalNode | undefined;
    BlockQuoted(): TerminalNode | undefined;
    OpenBrace(): TerminalNode | undefined;
    CloseBrace(): TerminalNode | undefined;
    Comma(): TerminalNode | undefined;
    Hyphen(): TerminalNode | undefined;
    LessThan(): TerminalNode | undefined;
    GreaterThan(): TerminalNode | undefined;
    SingleQuote(): TerminalNode | undefined;
    Underscore(): TerminalNode | undefined;
    Colon(): TerminalNode | undefined;
    Hash(): TerminalNode | undefined;
    Equals(): TerminalNode | undefined;
    Exclamation(): TerminalNode | undefined;
    Ampersand(): TerminalNode | undefined;
    OtherChar(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class NumberContext extends ParserRuleContext {
    digits(): DigitsContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Octal_charContext extends ParserRuleContext {
    Backslash(): TerminalNode | undefined;
    octal_digit(): Octal_digitContext[];
    octal_digit(i: number): Octal_digitContext;
    D0(): TerminalNode | undefined;
    D1(): TerminalNode | undefined;
    D2(): TerminalNode | undefined;
    D3(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Octal_digitContext extends ParserRuleContext {
    D0(): TerminalNode | undefined;
    D1(): TerminalNode | undefined;
    D2(): TerminalNode | undefined;
    D3(): TerminalNode | undefined;
    D4(): TerminalNode | undefined;
    D5(): TerminalNode | undefined;
    D6(): TerminalNode | undefined;
    D7(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class DigitsContext extends ParserRuleContext {
    digit(): DigitContext[];
    digit(i: number): DigitContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class DigitContext extends ParserRuleContext {
    D0(): TerminalNode | undefined;
    D1(): TerminalNode | undefined;
    D2(): TerminalNode | undefined;
    D3(): TerminalNode | undefined;
    D4(): TerminalNode | undefined;
    D5(): TerminalNode | undefined;
    D6(): TerminalNode | undefined;
    D7(): TerminalNode | undefined;
    D8(): TerminalNode | undefined;
    D9(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class NameContext extends ParserRuleContext {
    alpha_nums(): Alpha_numsContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Alpha_numsContext extends ParserRuleContext {
    letter(): LetterContext[];
    letter(i: number): LetterContext;
    Underscore(): TerminalNode[];
    Underscore(i: number): TerminalNode;
    digit(): DigitContext[];
    digit(i: number): DigitContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Non_close_parensContext extends ParserRuleContext {
    non_close_paren(): Non_close_parenContext[];
    non_close_paren(i: number): Non_close_parenContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class Non_close_parenContext extends ParserRuleContext {
    CloseParen(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
export declare class LetterContext extends ParserRuleContext {
    ALC(): TerminalNode | undefined;
    BLC(): TerminalNode | undefined;
    CLC(): TerminalNode | undefined;
    DLC(): TerminalNode | undefined;
    ELC(): TerminalNode | undefined;
    FLC(): TerminalNode | undefined;
    GLC(): TerminalNode | undefined;
    HLC(): TerminalNode | undefined;
    ILC(): TerminalNode | undefined;
    JLC(): TerminalNode | undefined;
    KLC(): TerminalNode | undefined;
    LLC(): TerminalNode | undefined;
    MLC(): TerminalNode | undefined;
    NLC(): TerminalNode | undefined;
    OLC(): TerminalNode | undefined;
    PLC(): TerminalNode | undefined;
    QLC(): TerminalNode | undefined;
    RLC(): TerminalNode | undefined;
    SLC(): TerminalNode | undefined;
    TLC(): TerminalNode | undefined;
    ULC(): TerminalNode | undefined;
    VLC(): TerminalNode | undefined;
    WLC(): TerminalNode | undefined;
    XLC(): TerminalNode | undefined;
    YLC(): TerminalNode | undefined;
    ZLC(): TerminalNode | undefined;
    AUC(): TerminalNode | undefined;
    BUC(): TerminalNode | undefined;
    CUC(): TerminalNode | undefined;
    DUC(): TerminalNode | undefined;
    EUC(): TerminalNode | undefined;
    FUC(): TerminalNode | undefined;
    GUC(): TerminalNode | undefined;
    HUC(): TerminalNode | undefined;
    IUC(): TerminalNode | undefined;
    JUC(): TerminalNode | undefined;
    KUC(): TerminalNode | undefined;
    LUC(): TerminalNode | undefined;
    MUC(): TerminalNode | undefined;
    NUC(): TerminalNode | undefined;
    OUC(): TerminalNode | undefined;
    PUC(): TerminalNode | undefined;
    QUC(): TerminalNode | undefined;
    RUC(): TerminalNode | undefined;
    SUC(): TerminalNode | undefined;
    TUC(): TerminalNode | undefined;
    UUC(): TerminalNode | undefined;
    VUC(): TerminalNode | undefined;
    WUC(): TerminalNode | undefined;
    XUC(): TerminalNode | undefined;
    YUC(): TerminalNode | undefined;
    ZUC(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: CommonRegexListener): void;
    exitRule(listener: CommonRegexListener): void;
    accept<Result>(visitor: CommonRegexVisitor<Result>): Result;
}
//# sourceMappingURL=CommonRegexParser.d.ts.map