import * as z from './base';
export interface ZodDateDef extends z.ZodTypeDef {
    t: z.ZodTypes.date;
}
export declare class ZodDate extends z.ZodType<Date, ZodDateDef> {
    toJSON: () => ZodDateDef;
    static create: () => ZodDate;
}
