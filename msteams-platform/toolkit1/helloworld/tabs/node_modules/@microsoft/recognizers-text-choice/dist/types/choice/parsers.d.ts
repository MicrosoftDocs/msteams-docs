import { IParser, ExtractResult, ParseResult } from "@microsoft/recognizers-text";
export interface IChoiceParserConfiguration<T> {
    resolutions: Map<string, T>;
}
export declare class ChoiceParser<T> implements IParser {
    private readonly config;
    constructor(config: IChoiceParserConfiguration<T>);
    parse(extResult: ExtractResult): ParseResult;
}
export declare class BooleanParser extends ChoiceParser<boolean> {
    constructor();
}
