import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";
export declare function logPolicy(logger?: any): RequestPolicyFactory;
export declare class LogPolicy extends BaseRequestPolicy {
    logger?: any;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, logger?: any);
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=logPolicy.d.ts.map