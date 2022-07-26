import { ProxySettings } from "../serviceClient";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
export declare function getDefaultProxySettings(_proxyUrl?: string): ProxySettings | undefined;
export declare function proxyPolicy(_proxySettings?: ProxySettings): RequestPolicyFactory;
export declare class ProxyPolicy extends BaseRequestPolicy {
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
    sendRequest(_request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=proxyPolicy.browser.d.ts.map