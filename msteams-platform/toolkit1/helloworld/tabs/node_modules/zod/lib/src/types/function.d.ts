import * as z from './base';
import { ZodTuple } from './tuple';
import { ZodUnknown } from './unknown';
export interface ZodFunctionDef<Args extends ZodTuple<any> = ZodTuple<any>, Returns extends z.ZodTypeAny = z.ZodTypeAny> extends z.ZodTypeDef {
    t: z.ZodTypes.function;
    args: Args;
    returns: Returns;
}
export declare type TypeOfFunction<Args extends ZodTuple<any>, Returns extends z.ZodTypeAny> = Args['_type'] extends Array<any> ? (...args: Args['_type']) => Returns['_type'] : never;
export declare class ZodFunction<Args extends ZodTuple<any>, Returns extends z.ZodTypeAny> extends z.ZodType<TypeOfFunction<Args, Returns>, ZodFunctionDef> {
    readonly _def: ZodFunctionDef<Args, Returns>;
    readonly _type: TypeOfFunction<Args, Returns>;
    args: <Items extends [z.ZodType<any, any>, ...z.ZodType<any, any>[]] | []>(...items: Items) => ZodFunction<ZodTuple<Items>, Returns>;
    returns: <NewReturnType extends z.ZodType<any, any>>(returnType: NewReturnType) => ZodFunction<Args, NewReturnType>;
    implement: <F extends TypeOfFunction<Args, Returns>>(func: F) => F;
    validate: <F extends TypeOfFunction<Args, Returns>>(func: F) => F;
    static create: <T extends ZodTuple<any> = ZodTuple<[]>, U extends z.ZodType<any, any> = ZodUnknown>(args?: T | undefined, returns?: U | undefined) => ZodFunction<T, U>;
    toJSON: () => {
        t: z.ZodTypes.function;
        args: {
            t: z.ZodTypes.tuple;
            items: any[];
        };
        returns: object;
    };
}
