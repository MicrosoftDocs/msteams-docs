/// <reference types="node" />
import { HttpClient } from "./httpClient";
import { HttpHeaders } from "./httpHeaders";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";
import * as tunnel from "tunnel";
import { ProxySettings } from "./serviceClient";
import * as http from "http";
import * as https from "https";
export declare const axiosInstance: import("axios").AxiosInstance;
/**
 * A HttpClient implementation that uses axios to send HTTP requests.
 */
export declare class AxiosHttpClient implements HttpClient {
    private readonly cookieJar;
    sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse>;
}
declare type ProxyAgent = {
    isHttps: boolean;
    agent: http.Agent | https.Agent;
};
export declare function createProxyAgent(requestUrl: string, proxySettings: ProxySettings, headers?: HttpHeaders): ProxyAgent;
export declare function createTunnel(isRequestHttps: boolean, isProxyHttps: boolean, tunnelOptions: tunnel.HttpsOverHttpsOptions): http.Agent | https.Agent;
export {};
//# sourceMappingURL=axiosHttpClient.d.ts.map