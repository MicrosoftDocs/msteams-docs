import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";
export declare function redirectPolicy(maximumRetries?: number): RequestPolicyFactory;
export declare class RedirectPolicy extends BaseRequestPolicy {
    readonly maxRetries: number;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, maxRetries?: number);
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=redirectPolicy.d.ts.map