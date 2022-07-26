import * as z from './base';
export interface ZodRecordDef<Value extends z.ZodTypeAny = z.ZodTypeAny> extends z.ZodTypeDef {
    t: z.ZodTypes.record;
    valueType: Value;
}
export declare class ZodRecord<Value extends z.ZodTypeAny = z.ZodTypeAny> extends z.ZodType<Record<string, Value['_type']>, // { [k in keyof T]: T[k]['_type'] },
ZodRecordDef<Value>> {
    readonly _value: Value;
    toJSON: () => {
        t: z.ZodTypes.record;
        valueType: object;
    };
    static create: <Value_1 extends z.ZodType<any, any> = z.ZodType<any, any>>(valueType: Value_1) => ZodRecord<Value_1>;
}
