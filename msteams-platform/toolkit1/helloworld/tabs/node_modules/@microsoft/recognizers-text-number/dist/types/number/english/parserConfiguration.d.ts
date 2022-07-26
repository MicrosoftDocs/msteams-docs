import { ParseResult } from "@microsoft/recognizers-text";
import { INumberParserConfiguration } from "../parsers";
import { CultureInfo } from "../../culture";
export declare class EnglishNumberParserConfiguration implements INumberParserConfiguration {
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
    constructor(ci?: CultureInfo);
    normalizeTokenSet(tokens: ReadonlyArray<string>, context: ParseResult): ReadonlyArray<string>;
    resolveCompositeNumber(numberStr: string): number;
}
