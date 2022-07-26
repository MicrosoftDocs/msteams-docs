export declare namespace errorUtil {
    type ErrMessage = string | {
        message?: string;
    };
    const errToObj: (message?: string | {
        message?: string | undefined;
    } | undefined) => {
        message?: string | undefined;
    };
}
