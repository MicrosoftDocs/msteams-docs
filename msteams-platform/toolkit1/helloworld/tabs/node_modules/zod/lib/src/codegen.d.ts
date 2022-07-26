import * as z from './index';
declare type TypeResult = {
    schema: any;
    id: string;
    type: string;
};
export declare class ZodCodeGenerator {
    seen: TypeResult[];
    serial: number;
    randomId: () => string;
    findBySchema: (schema: z.ZodType<any, any>) => TypeResult | undefined;
    findById: (id: string) => TypeResult;
    dump: () => string;
    setType: (id: string, type: string) => TypeResult;
    generate: (schema: z.ZodType<any, any>) => TypeResult;
    static create: () => z.ZodCodeGenerator;
}
export {};
