import { WebResource } from "../webResource";
import { ServiceClientCredentials } from "./serviceClientCredentials";
export declare class BasicAuthenticationCredentials implements ServiceClientCredentials {
    userName: string;
    password: string;
    authorizationScheme: string;
    /**
     * Creates a new BasicAuthenticationCredentials object.
     *
     * @constructor
     * @param {string} userName User name.
     * @param {string} password Password.
     * @param {string} [authorizationScheme] The authorization scheme.
     */
    constructor(userName: string, password: string, authorizationScheme?: string);
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResource} webResource The WebResource to be signed.
     * @returns {Promise<WebResource>} The signed request object.
     */
    signRequest(webResource: WebResource): Promise<WebResource>;
}
//# sourceMappingURL=basicAuthenticationCredentials.d.ts.map