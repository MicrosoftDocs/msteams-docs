import * as z from './base';
export declare type ArrayKeys = keyof any[];
export declare type Indices<T> = Exclude<keyof T, ArrayKeys>;
declare type EnumValues = [string, ...string[]];
declare type Values<T extends EnumValues> = {
    [k in T[number]]: k;
};
export interface ZodEnumDef<T extends EnumValues = EnumValues> extends z.ZodTypeDef {
    t: z.ZodTypes.enum;
    values: T;
}
export declare class ZodEnum<T extends [string, ...string[]]> extends z.ZodType<T[number], ZodEnumDef<T>> {
    toJSON: () => ZodEnumDef<T>;
    readonly options: T;
    readonly enum: Values<T>;
    readonly Values: Values<T>;
    readonly Enum: Values<T>;
    static create: <U extends string, T_1 extends [U, ...U[]]>(values: T_1) => ZodEnum<T_1>;
}
export {};
