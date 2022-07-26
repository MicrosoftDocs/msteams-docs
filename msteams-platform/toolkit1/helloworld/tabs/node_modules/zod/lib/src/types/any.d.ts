import * as z from './base';
export interface ZodAnyDef extends z.ZodTypeDef {
    t: z.ZodTypes.any;
}
export declare class ZodAny extends z.ZodType<any, ZodAnyDef> {
    toJSON: () => ZodAnyDef;
    static create: () => ZodAny;
}
