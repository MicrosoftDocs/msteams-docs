import { IExtractor, ExtractResult } from "@microsoft/recognizers-text";
import { LongFormatType } from "./models";
export interface RegExpValue {
    regExp: RegExp;
    value: string;
}
export declare abstract class BaseNumberExtractor implements IExtractor {
    regexes: Array<RegExpValue>;
    protected extractType: string;
    protected negativeNumberTermsRegex: RegExp;
    extract(source: string): Array<ExtractResult>;
    protected generateLongFormatNumberRegexes(type: LongFormatType, placeholder?: string): RegExp;
}
export declare abstract class BasePercentageExtractor implements IExtractor {
    regexes: Array<RegExp>;
    protected static readonly numExtType: string;
    protected extractType: string;
    private readonly numberExtractor;
    constructor(numberExtractor: BaseNumberExtractor);
    protected abstract initRegexes(): Array<RegExp>;
    extract(source: string): ExtractResult[];
    private preprocessStrWithNumberExtracted(str);
    private postProcessing(results, originSource, positionMap, numExtResults);
    protected buildRegexes(regexStrs: Array<string>, ignoreCase?: boolean): Array<RegExp>;
}
