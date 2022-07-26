import { ZodParsedType } from './parser';
export declare const ZodErrorCode: {
    invalid_type: "invalid_type";
    nonempty_array_is_empty: "nonempty_array_is_empty";
    custom_error: "custom_error";
    invalid_union: "invalid_union";
    invalid_literal_value: "invalid_literal_value";
    invalid_enum_value: "invalid_enum_value";
    unrecognized_keys: "unrecognized_keys";
    invalid_arguments: "invalid_arguments";
    invalid_return_type: "invalid_return_type";
    invalid_date: "invalid_date";
    invalid_string: "invalid_string";
    too_small: "too_small";
    too_big: "too_big";
};
export declare type ZodErrorCode = keyof typeof ZodErrorCode;
export declare type ZodSuberrorBase = {
    path: (string | number)[];
    message?: string;
};
export interface ZodInvalidTypeError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.invalid_type;
    expected: ZodParsedType;
    received: ZodParsedType;
}
export interface ZodNonEmptyArrayIsEmptyError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.nonempty_array_is_empty;
}
export interface ZodUnrecognizedKeysError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.unrecognized_keys;
    keys: string[];
}
export interface ZodInvalidUnionError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.invalid_union;
    unionErrors: ZodError[];
}
export interface ZodInvalidLiteralValueError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.invalid_literal_value;
    expected: string | number | boolean;
}
export interface ZodInvalidEnumValueError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.invalid_enum_value;
    options: (string | number)[];
}
export interface ZodInvalidArgumentsError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.invalid_arguments;
    argumentsError: ZodError;
}
export interface ZodInvalidReturnTypeError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.invalid_return_type;
    returnTypeError: ZodError;
}
export interface ZodInvalidDateError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.invalid_date;
}
export declare type StringValidation = 'email' | 'url' | 'uuid' | 'regex';
export interface ZodInvalidStringError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.invalid_string;
    validation: StringValidation;
}
export interface ZodTooSmallError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.too_small;
    minimum: number;
    inclusive: boolean;
    type: 'array' | 'string' | 'number';
}
export interface ZodTooBigError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.too_big;
    maximum: number;
    inclusive: boolean;
    type: 'array' | 'string' | 'number';
}
export interface ZodCustomError extends ZodSuberrorBase {
    code: typeof ZodErrorCode.custom_error;
    params?: {
        [k: string]: any;
    };
}
export declare type ZodSuberrorOptionalMessage = ZodInvalidTypeError | ZodNonEmptyArrayIsEmptyError | ZodUnrecognizedKeysError | ZodInvalidUnionError | ZodInvalidLiteralValueError | ZodInvalidEnumValueError | ZodInvalidArgumentsError | ZodInvalidReturnTypeError | ZodInvalidDateError | ZodInvalidStringError | ZodTooSmallError | ZodTooBigError | ZodCustomError;
export declare type ZodSuberror = ZodSuberrorOptionalMessage & {
    message: string;
};
export declare const quotelessJson: (obj: any) => string;
export declare class ZodError extends Error {
    errors: ZodSuberror[];
    constructor(errors: ZodSuberror[]);
    static create: (errors: ZodSuberror[]) => ZodError;
    readonly message: string;
    readonly isEmpty: boolean;
    addError: (sub: ZodSuberror) => void;
    addErrors: (subs?: ZodSuberror[]) => void;
    flatten: () => {
        formErrors: string[];
        fieldErrors: {
            [k: string]: string[];
        };
    };
    readonly formErrors: {
        formErrors: string[];
        fieldErrors: {
            [k: string]: string[];
        };
    };
}
