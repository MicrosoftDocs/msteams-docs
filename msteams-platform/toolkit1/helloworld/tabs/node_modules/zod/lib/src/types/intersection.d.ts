import * as z from './base';
export interface ZodIntersectionDef<T extends z.ZodTypeAny = z.ZodTypeAny, U extends z.ZodTypeAny = z.ZodTypeAny> extends z.ZodTypeDef {
    t: z.ZodTypes.intersection;
    left: T;
    right: U;
}
export declare class ZodIntersection<T extends z.ZodTypeAny, U extends z.ZodTypeAny> extends z.ZodType<T['_type'] & U['_type'], ZodIntersectionDef<T, U>> {
    toJSON: () => {
        t: z.ZodTypes.intersection;
        left: object;
        right: object;
    };
    static create: <T_1 extends z.ZodType<any, any>, U_1 extends z.ZodType<any, any>>(left: T_1, right: U_1) => ZodIntersection<T_1, U_1>;
}
