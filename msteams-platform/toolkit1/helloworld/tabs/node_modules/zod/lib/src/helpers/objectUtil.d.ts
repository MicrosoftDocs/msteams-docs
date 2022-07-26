import { ZodRawShape } from '../types/base';
import { ZodObject } from '../types/object';
export declare namespace objectUtil {
    interface ZodObjectParams {
        strict: boolean;
    }
    type MergeObjectParams<First extends ZodObjectParams, Second extends ZodObjectParams> = {
        strict: First['strict'] extends false ? false : Second['strict'] extends false ? false : true;
    };
    type MergeShapes<U extends ZodRawShape, V extends ZodRawShape> = {
        [k in Exclude<keyof U, keyof V>]: U[k];
    } & V;
    type Flatten<T extends object> = {
        [k in keyof T]: T[k];
    };
    type OptionalKeys<T extends object> = {
        [k in keyof T]: undefined extends T[k] ? k : never;
    }[keyof T];
    type RequiredKeys<T extends object> = Exclude<keyof T, OptionalKeys<T>>;
    type AddQuestionMarks<T extends object> = {
        [k in OptionalKeys<T>]?: T[k];
    } & {
        [k in RequiredKeys<T>]: T[k];
    };
    type ObjectIntersection<T extends ZodRawShape> = AddQuestionMarks<{
        [k in keyof T]: T[k]['_type'];
    }>;
    type Identity<T> = T;
    type FlattenObject<T extends ZodRawShape> = Identity<{
        [k in keyof T]: T[k];
    }>;
    type NoNeverKeys<T extends ZodRawShape> = {
        [k in keyof T]: [T[k]] extends [never] ? never : k;
    }[keyof T];
    type NoNever<T extends ZodRawShape> = Identity<{
        [k in NoNeverKeys<T>]: k extends keyof T ? T[k] : never;
    }>;
    type ObjectType<T extends ZodRawShape> = FlattenObject<ObjectIntersection<T>>;
    const mergeShapes: <U extends ZodRawShape, T extends ZodRawShape>(first: U, second: T) => T & U;
    const mergeObjects: <First extends ZodObject<any, any, any>>(first: First) => <Second extends ZodObject<any, any, any>>(second: Second) => ZodObject<First["_shape"] & Second["_shape"], MergeObjectParams<First["_params"], Second["_params"]>, First["_type"] & Second["_type"]>;
}
