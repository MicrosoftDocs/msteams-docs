import * as z from './base';
export interface ZodArrayDef<T extends z.ZodTypeAny = z.ZodTypeAny> extends z.ZodTypeDef {
    t: z.ZodTypes.array;
    type: T;
    nonempty: boolean;
}
export declare class ZodArray<T extends z.ZodTypeAny> extends z.ZodType<T['_type'][], ZodArrayDef<T>> {
    toJSON: () => {
        t: z.ZodTypes.array;
        nonempty: boolean;
        type: object;
    };
    readonly element: T;
    min: (minLength: number, message?: string | {
        message?: string | undefined;
    } | undefined) => this;
    max: (maxLength: number, message?: string | {
        message?: string | undefined;
    } | undefined) => this;
    length: (len: number, message?: string | undefined) => this;
    nonempty: () => ZodNonEmptyArray<T>;
    static create: <T_1 extends z.ZodType<any, any>>(schema: T_1) => ZodArray<T_1>;
}
export declare class ZodNonEmptyArray<T extends z.ZodTypeAny> extends z.ZodType<[T['_type'], ...T['_type'][]], ZodArrayDef<T>> {
    toJSON: () => {
        t: z.ZodTypes.array;
        type: object;
    };
    min: (minLength: number, message?: string | {
        message?: string | undefined;
    } | undefined) => this;
    max: (maxLength: number, message?: string | {
        message?: string | undefined;
    } | undefined) => this;
    length: (len: number, message?: string | undefined) => this;
}
