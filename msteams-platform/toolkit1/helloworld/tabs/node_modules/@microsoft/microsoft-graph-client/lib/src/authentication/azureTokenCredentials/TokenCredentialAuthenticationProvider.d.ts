/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TokenCredential } from "@azure/identity";
import { AuthenticationProvider } from "../../IAuthenticationProvider";
import { TokenCredentialAuthenticationProviderOptions } from "./ITokenCredentialAuthenticationProviderOptions";
/**
 * @module TokenCredentialAuthenticationProvider
 */
/**
 * @class
 * Class representing TokenCredentialAuthenticationProvider
 * This feature is introduced in Version 3.0.0
 * @extends AuthenticationProvider
 * Reference - https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md
 */
export declare class TokenCredentialAuthenticationProvider implements AuthenticationProvider {
    /**
     * @private
     * A member holding an instance of @azure/identity TokenCredential
     */
    private tokenCredential;
    /**
     * @private
     * A member holding an instance of TokenCredentialAuthenticationProviderOptions
     */
    private authenticationProviderOptions;
    /**
     * @public
     * @constructor
     * Creates an instance of TokenCredentialAuthenticationProvider
     * @param {TokenCredential} tokenCredential - An instance of @azure/identity TokenCredential
     * @param {TokenCredentialAuthenticationProviderOptions} authenticationProviderOptions - An instance of TokenCredentialAuthenticationProviderOptions
     * @returns An instance of TokenCredentialAuthenticationProvider
     */
    constructor(tokenCredential: TokenCredential, authenticationProviderOptions: TokenCredentialAuthenticationProviderOptions);
    /**
     * @public
     * @async
     * To get the access token
     * @param {TokenCredentialAuthenticationProviderOptions} authenticationProviderOptions - The authentication provider options object
     * @returns The promise that resolves to an access token
     */
    getAccessToken(): Promise<string>;
}
