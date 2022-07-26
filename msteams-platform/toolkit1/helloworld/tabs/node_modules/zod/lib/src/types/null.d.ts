import * as z from './base';
export interface ZodNullDef extends z.ZodTypeDef {
    t: z.ZodTypes.null;
}
export declare class ZodNull extends z.ZodType<null, ZodNullDef> {
    toJSON: () => ZodNullDef;
    static create: () => ZodNull;
}
