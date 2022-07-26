import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions, RequestPolicyFactory } from "./requestPolicy";
import { WebResource } from "../webResource";
import { HttpOperationResponse } from "../httpOperationResponse";
declare type ResponseHandler = (httpRequest: WebResource, response: HttpOperationResponse) => Promise<HttpOperationResponse>;
export declare function throttlingRetryPolicy(): RequestPolicyFactory;
/**
 * To learn more, please refer to
 * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits,
 * https://docs.microsoft.com/en-us/azure/azure-subscription-service-limits and
 * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
 */
export declare class ThrottlingRetryPolicy extends BaseRequestPolicy {
    private _handleResponse;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, _handleResponse?: ResponseHandler);
    sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse>;
    private _defaultResponseHandler;
    static parseRetryAfterHeader(headerValue: string): number | undefined;
    static parseDateRetryAfterHeader(headerValue: string): number | undefined;
}
export {};
//# sourceMappingURL=throttlingRetryPolicy.d.ts.map