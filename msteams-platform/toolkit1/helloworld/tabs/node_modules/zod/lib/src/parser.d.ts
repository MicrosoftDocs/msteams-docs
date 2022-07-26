import * as z from './types/base';
import { ZodSuberrorOptionalMessage } from './ZodError';
import { util } from './helpers/util';
import { ZodErrorMap } from './defaultErrorMap';
export declare type ParseParams = {
    seen?: {
        schema: any;
        objects: {
            data: any;
            error?: any;
            times: number;
        }[];
    }[];
    path?: (string | number)[];
    errorMap?: ZodErrorMap;
};
export declare const getParsedType: (data: any) => "number" | "string" | "nan" | "integer" | "boolean" | "date" | "bigint" | "symbol" | "function" | "undefined" | "null" | "array" | "object" | "unknown" | "promise" | "void";
export declare const ZodParsedType: {
    number: "number";
    string: "string";
    nan: "nan";
    integer: "integer";
    boolean: "boolean";
    date: "date";
    bigint: "bigint";
    symbol: "symbol";
    function: "function";
    undefined: "undefined";
    null: "null";
    array: "array";
    object: "object";
    unknown: "unknown";
    promise: "promise";
    void: "void";
};
export declare type ZodParsedType = keyof typeof ZodParsedType;
export declare const find: (arr: any[], checker: (arg: any) => any) => any;
declare type stripPath<T extends object> = T extends any ? util.OmitKeys<T, 'path'> : never;
export declare type MakeErrorData = stripPath<ZodSuberrorOptionalMessage> & {
    path?: (string | number)[];
};
export declare const ZodParser: (schemaDef: z.ZodTypeDef) => (obj: any, baseParams?: ParseParams) => any;
export {};
