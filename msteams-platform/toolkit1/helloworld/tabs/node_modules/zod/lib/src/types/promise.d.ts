import * as z from './base';
export interface ZodPromiseDef<T extends z.ZodTypeAny = z.ZodTypeAny> extends z.ZodTypeDef {
    t: z.ZodTypes.promise;
    type: T;
}
export declare class ZodPromise<T extends z.ZodTypeAny> extends z.ZodType<Promise<T['_type']>, ZodPromiseDef<T>> {
    toJSON: () => {
        t: z.ZodTypes.promise;
        type: object;
    };
    static create: <T_1 extends z.ZodType<any, any>>(schema: T_1) => ZodPromise<T_1>;
}
