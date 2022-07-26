import * as z from './base';
export interface ZodUndefinedDef extends z.ZodTypeDef {
    t: z.ZodTypes.undefined;
}
export declare class ZodUndefined extends z.ZodType<undefined> {
    toJSON: () => z.ZodTypeDef;
    static create: () => ZodUndefined;
}
