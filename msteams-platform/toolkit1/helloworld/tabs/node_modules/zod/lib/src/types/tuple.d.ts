import * as z from './base';
export declare type TypeOfTuple<T extends [z.ZodTypeAny, ...z.ZodTypeAny[]] | []> = {
    [k in keyof T]: T[k] extends z.ZodType<infer U> ? U : never;
};
export interface ZodTupleDef<T extends [z.ZodTypeAny, ...z.ZodTypeAny[]] | [] = [z.ZodTypeAny, ...z.ZodTypeAny[]]> extends z.ZodTypeDef {
    t: z.ZodTypes.tuple;
    items: T;
}
export declare class ZodTuple<T extends [z.ZodTypeAny, ...z.ZodTypeAny[]] | [] = [z.ZodTypeAny, ...z.ZodTypeAny[]]> extends z.ZodType<TypeOfTuple<T>, ZodTupleDef<T>> {
    toJSON: () => {
        t: z.ZodTypes.tuple;
        items: any[];
    };
    static create: <T_1 extends [z.ZodType<any, any>, ...z.ZodType<any, any>[]] | []>(schemas: T_1) => ZodTuple<T_1>;
}
