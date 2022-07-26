import * as z from './base';
export interface ZodBigIntDef extends z.ZodTypeDef {
    t: z.ZodTypes.bigint;
}
export declare class ZodBigInt extends z.ZodType<bigint, ZodBigIntDef> {
    toJSON: () => ZodBigIntDef;
    static create: () => ZodBigInt;
}
