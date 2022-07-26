import * as z from './base';
import { ZodUndefined } from './undefined';
import { ZodUnion } from './union';
import { objectUtil } from '../helpers/objectUtil';
import { partialUtil } from '../helpers/partialUtil';
export interface ZodObjectDef<T extends z.ZodRawShape = z.ZodRawShape, Params extends ZodObjectParams = ZodObjectParams> extends z.ZodTypeDef {
    t: z.ZodTypes.object;
    shape: () => T;
    params: Params;
}
interface ZodObjectParams {
    strict: boolean;
}
export declare type Scalars = string | string[] | number | number[] | boolean | boolean[] | bigint | bigint[] | undefined | null;
declare type ZodObjectType<T extends z.ZodRawShape, Params extends ZodObjectParams> = Params['strict'] extends true ? objectUtil.ObjectType<T> : objectUtil.Flatten<objectUtil.ObjectType<T> & {
    [k: string]: any;
}>;
export declare class ZodObject<T extends z.ZodRawShape, Params extends ZodObjectParams = {
    strict: true;
}, Type extends ZodObjectType<T, Params> = ZodObjectType<T, Params>> extends z.ZodType<Type, ZodObjectDef<T, Params>> {
    readonly _shape: T;
    readonly _params: Params;
    readonly shape: T;
    readonly params: Params;
    toJSON: () => {
        t: z.ZodTypes.object;
        shape: {
            [x: string]: any;
        }[];
    };
    nonstrict: () => ZodObject<T, objectUtil.Flatten<{ [k in Exclude<keyof Params, "strict">]: Params[k]; } & {
        strict: false;
    }>, ZodObjectType<T, objectUtil.Flatten<{ [k in Exclude<keyof Params, "strict">]: Params[k]; } & {
        strict: false;
    }>>>;
    augment: <Augmentation extends z.ZodRawShape>(augmentation: Augmentation) => ZodObject<{ [k in Exclude<keyof T, keyof Augmentation>]: T[k]; } & { [k in keyof Augmentation]: Augmentation[k]; }, Params, ZodObjectType<{ [k in Exclude<keyof T, keyof Augmentation>]: T[k]; } & { [k in keyof Augmentation]: Augmentation[k]; }, Params>>;
    extend: <Augmentation extends z.ZodRawShape>(augmentation: Augmentation) => ZodObject<{ [k in Exclude<keyof T, keyof Augmentation>]: T[k]; } & { [k in keyof Augmentation]: Augmentation[k]; }, Params, ZodObjectType<{ [k in Exclude<keyof T, keyof Augmentation>]: T[k]; } & { [k in keyof Augmentation]: Augmentation[k]; }, Params>>;
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge: <MergeShape extends z.ZodRawShape, MergeParams extends ZodObjectParams>(other: ZodObject<MergeShape, MergeParams>) => ZodObject<T & MergeShape, objectUtil.MergeObjectParams<Params, MergeParams>>;
    pick: <Mask extends { [k in keyof T]?: true | undefined; }>(mask: Mask) => ZodObject<{ [k in { [k in keyof { [k in keyof Mask]: k extends keyof T ? T[k] : never; }]: [{ [k in keyof Mask]: k extends keyof T ? T[k] : never; }[k]] extends [never] ? never : k; }[keyof Mask]]: k extends keyof Mask ? { [k in keyof Mask]: k extends keyof T ? T[k] : never; }[k] : never; }, Params, ZodObjectType<{ [k in { [k in keyof { [k in keyof Mask]: k extends keyof T ? T[k] : never; }]: [{ [k in keyof Mask]: k extends keyof T ? T[k] : never; }[k]] extends [never] ? never : k; }[keyof Mask]]: k extends keyof Mask ? { [k in keyof Mask]: k extends keyof T ? T[k] : never; }[k] : never; }, Params>>;
    omit: <Mask extends { [k in keyof T]?: true | undefined; }>(mask: Mask) => ZodObject<{ [k in { [k in keyof { [k in keyof T]: k extends keyof Mask ? never : T[k]; }]: [{ [k in keyof T]: k extends keyof Mask ? never : T[k]; }[k]] extends [never] ? never : k; }[keyof T]]: k extends keyof T ? { [k in keyof T]: k extends keyof Mask ? never : T[k]; }[k] : never; }, Params, ZodObjectType<{ [k in { [k in keyof { [k in keyof T]: k extends keyof Mask ? never : T[k]; }]: [{ [k in keyof T]: k extends keyof Mask ? never : T[k]; }[k]] extends [never] ? never : k; }[keyof T]]: k extends keyof T ? { [k in keyof T]: k extends keyof Mask ? never : T[k]; }[k] : never; }, Params>>;
    partial: () => ZodObject<{ [k in keyof T]: ZodUnion<[T[k], ZodUndefined]>; }, Params, ZodObjectType<{ [k in keyof T]: ZodUnion<[T[k], ZodUndefined]>; }, Params>>;
    primitives: () => ZodObject<{ [k in { [k in keyof { [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? T[k] : never; }]: [{ [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? T[k] : never; }[k]] extends [never] ? never : k; }[keyof T]]: k extends keyof T ? { [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? T[k] : never; }[k] : never; }, Params, ZodObjectType<{ [k in { [k in keyof { [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? T[k] : never; }]: [{ [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? T[k] : never; }[k]] extends [never] ? never : k; }[keyof T]]: k extends keyof T ? { [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? T[k] : never; }[k] : never; }, Params>>;
    nonprimitives: () => ZodObject<{ [k in { [k in keyof { [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? never : T[k]; }]: [{ [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? never : T[k]; }[k]] extends [never] ? never : k; }[keyof T]]: k extends keyof T ? { [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? never : T[k]; }[k] : never; }, Params, ZodObjectType<{ [k in { [k in keyof { [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? never : T[k]; }]: [{ [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? never : T[k]; }[k]] extends [never] ? never : k; }[keyof T]]: k extends keyof T ? { [k in keyof T]: [T[k]["_type"]] extends [Scalars] ? never : T[k]; }[k] : never; }, Params>>;
    deepPartial: () => partialUtil.RootDeepPartial<this>;
    static create: <T_1 extends z.ZodRawShape>(shape: T_1) => ZodObject<T_1, {
        strict: true;
    }, { [k in keyof ({ [k in { [k in keyof { [k in keyof T_1]: T_1[k]["_type"]; }]: undefined extends { [k in keyof T_1]: T_1[k]["_type"]; }[k] ? k : never; }[keyof T_1]]?: { [k in keyof T_1]: T_1[k]["_type"]; }[k] | undefined; } & { [k in Exclude<keyof T_1, { [k in keyof { [k in keyof T_1]: T_1[k]["_type"]; }]: undefined extends { [k in keyof T_1]: T_1[k]["_type"]; }[k] ? k : never; }[keyof T_1]>]: { [k in keyof T_1]: T_1[k]["_type"]; }[k]; })]: ({ [k in { [k in keyof { [k in keyof T_1]: T_1[k]["_type"]; }]: undefined extends { [k in keyof T_1]: T_1[k]["_type"]; }[k] ? k : never; }[keyof T_1]]?: { [k in keyof T_1]: T_1[k]["_type"]; }[k] | undefined; } & { [k in Exclude<keyof T_1, { [k in keyof { [k in keyof T_1]: T_1[k]["_type"]; }]: undefined extends { [k in keyof T_1]: T_1[k]["_type"]; }[k] ? k : never; }[keyof T_1]>]: { [k in keyof T_1]: T_1[k]["_type"]; }[k]; })[k]; }>;
    static lazycreate: <T_1 extends z.ZodRawShape>(shape: () => T_1) => ZodObject<T_1, {
        strict: true;
    }, { [k in keyof ({ [k in { [k in keyof { [k in keyof T_1]: T_1[k]["_type"]; }]: undefined extends { [k in keyof T_1]: T_1[k]["_type"]; }[k] ? k : never; }[keyof T_1]]?: { [k in keyof T_1]: T_1[k]["_type"]; }[k] | undefined; } & { [k in Exclude<keyof T_1, { [k in keyof { [k in keyof T_1]: T_1[k]["_type"]; }]: undefined extends { [k in keyof T_1]: T_1[k]["_type"]; }[k] ? k : never; }[keyof T_1]>]: { [k in keyof T_1]: T_1[k]["_type"]; }[k]; })]: ({ [k in { [k in keyof { [k in keyof T_1]: T_1[k]["_type"]; }]: undefined extends { [k in keyof T_1]: T_1[k]["_type"]; }[k] ? k : never; }[keyof T_1]]?: { [k in keyof T_1]: T_1[k]["_type"]; }[k] | undefined; } & { [k in Exclude<keyof T_1, { [k in keyof { [k in keyof T_1]: T_1[k]["_type"]; }]: undefined extends { [k in keyof T_1]: T_1[k]["_type"]; }[k] ? k : never; }[keyof T_1]>]: { [k in keyof T_1]: T_1[k]["_type"]; }[k]; })[k]; }>;
}
export {};
