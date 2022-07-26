import * as z from './base';
import { Primitive } from '../helpers/primitive';
export interface ZodLiteralDef<T extends any = any> extends z.ZodTypeDef {
    t: z.ZodTypes.literal;
    value: T;
}
export declare class ZodLiteral<T extends any> extends z.ZodType<T, ZodLiteralDef<T>> {
    toJSON: () => ZodLiteralDef<T>;
    static create: <T_1 extends Primitive>(value: T_1) => ZodLiteral<T_1>;
}
