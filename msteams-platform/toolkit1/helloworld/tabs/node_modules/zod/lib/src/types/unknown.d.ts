import * as z from './base';
export interface ZodUnknownDef extends z.ZodTypeDef {
    t: z.ZodTypes.unknown;
}
export declare class ZodUnknown extends z.ZodType<unknown, ZodUnknownDef> {
    toJSON: () => ZodUnknownDef;
    static create: () => ZodUnknown;
}
