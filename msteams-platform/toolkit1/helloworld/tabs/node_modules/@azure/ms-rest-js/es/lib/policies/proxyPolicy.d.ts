import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { ProxySettings } from "../serviceClient";
import { WebResource } from "../webResource";
export declare function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined;
export declare function proxyPolicy(proxySettings?: ProxySettings): RequestPolicyFactory;
export declare class ProxyPolicy extends BaseRequestPolicy {
    proxySettings: ProxySettings;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, proxySettings: ProxySettings);
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=proxyPolicy.d.ts.map