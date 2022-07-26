import { ExtractResult, ParseResult } from "@microsoft/recognizers-text";
import { BaseNumberParser, INumberParserConfiguration } from "./parsers";
export interface ICJKNumberParserConfiguration extends INumberParserConfiguration {
    readonly zeroToNineMap: ReadonlyMap<string, number>;
    readonly roundNumberMapChar: ReadonlyMap<string, number>;
    readonly fullToHalfMap: ReadonlyMap<string, string>;
    readonly tratoSimMap: ReadonlyMap<string, string>;
    readonly unitMap: ReadonlyMap<string, string>;
    readonly roundDirectList: ReadonlyArray<string>;
    readonly digitNumRegex: RegExp;
    readonly dozenRegex: RegExp;
    readonly percentageRegex: RegExp;
    readonly doubleAndRoundRegex: RegExp;
    readonly fracSplitRegex: RegExp;
    readonly pointRegex: RegExp;
    readonly speGetNumberRegex: RegExp;
    readonly pairRegex: RegExp;
    readonly roundNumberIntegerRegex: RegExp;
}
export declare class BaseCJKNumberParser extends BaseNumberParser {
    readonly config: ICJKNumberParserConfiguration;
    constructor(config: ICJKNumberParserConfiguration);
    private toString(value);
    parse(extResult: ExtractResult): ParseResult | null;
    private replaceTraditionalWithSimplified(value);
    private replaceFullWithHalf(value);
    private replaceUnit(value);
    private perParseCJK(extResult);
    private fracParseCJK(extResult);
    private douParseCJK(extResult);
    private intParseCJK(extResult);
    private ordParseCJK(extResult);
    private getDigitValueCJK(value, power);
    private getIntValueCJK(value);
    private getPointValueCJK(value);
    private isDigitCJK(value);
}
