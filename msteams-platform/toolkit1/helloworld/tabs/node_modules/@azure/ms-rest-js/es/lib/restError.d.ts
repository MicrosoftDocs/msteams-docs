import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";
export declare class RestError extends Error {
    static readonly REQUEST_SEND_ERROR: string;
    static readonly REQUEST_ABORTED_ERROR: string;
    static readonly PARSE_ERROR: string;
    code?: string;
    statusCode?: number;
    request?: WebResource;
    response?: HttpOperationResponse;
    body?: any;
    constructor(message: string, code?: string, statusCode?: number, request?: WebResource, response?: HttpOperationResponse, body?: any);
}
//# sourceMappingURL=restError.d.ts.map