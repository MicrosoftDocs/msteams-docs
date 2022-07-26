import { WebResource } from "../webResource";
import { ServiceClientCredentials } from "./serviceClientCredentials";
/**
 * A credentials object that uses a token string and a authorzation scheme to authenticate.
 */
export declare class TokenCredentials implements ServiceClientCredentials {
    token: string;
    authorizationScheme: string;
    /**
     * Creates a new TokenCredentials object.
     *
     * @constructor
     * @param {string} token The token.
     * @param {string} [authorizationScheme] The authorization scheme.
     */
    constructor(token: string, authorizationScheme?: string);
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResource} webResource The WebResource to be signed.
     * @return {Promise<WebResource>} The signed request object.
     */
    signRequest(webResource: WebResource): Promise<WebResource>;
}
//# sourceMappingURL=tokenCredentials.d.ts.map