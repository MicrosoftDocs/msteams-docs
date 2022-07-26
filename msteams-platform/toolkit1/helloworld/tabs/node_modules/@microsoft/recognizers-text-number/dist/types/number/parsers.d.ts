import { IParser, ParseResult, ExtractResult } from "@microsoft/recognizers-text";
import { CultureInfo } from "../culture";
export interface INumberParserConfiguration {
    readonly cardinalNumberMap: ReadonlyMap<string, number>;
    readonly ordinalNumberMap: ReadonlyMap<string, number>;
    readonly roundNumberMap: ReadonlyMap<string, number>;
    readonly cultureInfo: CultureInfo;
    readonly digitalNumberRegex: RegExp;
    readonly fractionMarkerToken: string;
    readonly negativeNumberSignRegex: RegExp;
    readonly halfADozenRegex: RegExp;
    readonly halfADozenText: string;
    readonly langMarker: string;
    readonly nonDecimalSeparatorChar: string;
    readonly decimalSeparatorChar: string;
    readonly wordSeparatorToken: string;
    readonly writtenDecimalSeparatorTexts: ReadonlyArray<string>;
    readonly writtenGroupSeparatorTexts: ReadonlyArray<string>;
    readonly writtenIntegerSeparatorTexts: ReadonlyArray<string>;
    readonly writtenFractionSeparatorTexts: ReadonlyArray<string>;
    normalizeTokenSet(tokens: ReadonlyArray<string>, context: ParseResult): ReadonlyArray<string>;
    resolveCompositeNumber(numberStr: string): number;
}
export declare class BaseNumberParser implements IParser {
    protected readonly config: INumberParserConfiguration;
    protected readonly textNumberRegex: RegExp;
    protected readonly arabicNumberRegex: RegExp;
    protected readonly roundNumberSet: Set<string>;
    supportedTypes: ReadonlyArray<string>;
    constructor(config: INumberParserConfiguration);
    parse(extResult: ExtractResult): ParseResult | null;
    protected getKeyRegex(regexMap: ReadonlyMap<string, number>): string;
    protected digitNumberParse(extResult: ExtractResult): ParseResult;
    protected isDigit(c: string): boolean;
    protected fracLikeNumberParse(extResult: ExtractResult): ParseResult;
    protected textNumberParse(extResult: ExtractResult): ParseResult;
    protected powerNumberParse(extResult: ExtractResult): ParseResult;
    private splitMulti(str, tokens);
    private getMatches(input);
    private isComposable(big, small);
    private getIntValue(matchStrs);
    private getPointValue(matchStrs);
    private skipNonDecimalSeparator(ch, distance, culture);
    protected getDigitalValue(digitsStr: string, power: number): number;
}
export declare class BasePercentageParser extends BaseNumberParser {
    parse(extResult: ExtractResult): ParseResult | null;
}
