import { ZodSuberrorOptionalMessage } from './ZodError';
declare type ErrorMapCtx = {
    defaultError: string;
    data: any;
};
export declare type ZodErrorMap = typeof defaultErrorMap;
export declare const defaultErrorMap: (error: ZodSuberrorOptionalMessage, _ctx: ErrorMapCtx) => {
    message: string;
};
export {};
