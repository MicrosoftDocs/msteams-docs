import * as z from './base';
export interface ZodVoidDef extends z.ZodTypeDef {
    t: z.ZodTypes.void;
}
export declare class ZodVoid extends z.ZodType<void, ZodVoidDef> {
    toJSON: () => ZodVoidDef;
    static create: () => ZodVoid;
}
