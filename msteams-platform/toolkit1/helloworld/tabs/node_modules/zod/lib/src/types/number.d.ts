import * as z from './base';
export interface ZodNumberDef extends z.ZodTypeDef {
    t: z.ZodTypes.number;
}
export declare class ZodNumber extends z.ZodType<number, ZodNumberDef> {
    toJSON: () => ZodNumberDef;
    static create: () => ZodNumber;
    min: (minimum: number, message?: string | {
        message?: string | undefined;
    } | undefined) => this;
    max: (maximum: number, message?: string | {
        message?: string | undefined;
    } | undefined) => this;
    int: (message?: string | {
        message?: string | undefined;
    } | undefined) => this;
    positive: (message?: string | {
        message?: string | undefined;
    } | undefined) => this;
    negative: (message?: string | {
        message?: string | undefined;
    } | undefined) => this;
    nonpositive: (message?: string | {
        message?: string | undefined;
    } | undefined) => this;
    nonnegative: (message?: string | {
        message?: string | undefined;
    } | undefined) => this;
}
