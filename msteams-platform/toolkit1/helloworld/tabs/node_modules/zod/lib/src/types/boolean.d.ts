import * as z from './base';
export interface ZodBooleanDef extends z.ZodTypeDef {
    t: z.ZodTypes.boolean;
}
export declare class ZodBoolean extends z.ZodType<boolean, ZodBooleanDef> {
    toJSON: () => ZodBooleanDef;
    static create: () => ZodBoolean;
}
