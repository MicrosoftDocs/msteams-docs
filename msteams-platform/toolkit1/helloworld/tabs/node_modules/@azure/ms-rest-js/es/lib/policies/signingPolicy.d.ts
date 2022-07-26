import { ServiceClientCredentials } from "../credentials/serviceClientCredentials";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicyFactory, RequestPolicy, RequestPolicyOptions } from "./requestPolicy";
export declare function signingPolicy(authenticationProvider: ServiceClientCredentials): RequestPolicyFactory;
export declare class SigningPolicy extends BaseRequestPolicy {
    authenticationProvider: ServiceClientCredentials;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, authenticationProvider: ServiceClientCredentials);
    signRequest(request: WebResource): Promise<WebResource>;
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=signingPolicy.d.ts.map