/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * @module AuthCodeMSALBrowserAuthenticationProvider
 */
import { PublicClientApplication } from "@azure/msal-browser";
import { AuthenticationProvider } from "../../IAuthenticationProvider";
import { AuthCodeMSALBrowserAuthenticationProviderOptions } from "../msalOptions/MSALAuthenticationProviderOptions";
/**
 * an AuthenticationProvider implementation supporting msal-browser library.
 * This feature is introduced in Version 3.0.0
 * @class
 * @extends AuthenticationProvider
 */
export declare class AuthCodeMSALBrowserAuthenticationProvider implements AuthenticationProvider {
    private publicClientApplication;
    private options;
    /**
     * @public
     * @constructor
     * Creates an instance of ImplicitMSALAuthenticationProvider
     * @param {PublicClientApplication} msalApplication - An instance of MSAL PublicClientApplication
     * @param {AuthCodeMSALBrowserAuthenticationProviderOptions} options - An instance of MSALAuthenticationProviderOptions
     * @returns An instance of ImplicitMSALAuthenticationProvider
     */
    constructor(publicClientApplication: PublicClientApplication, options: AuthCodeMSALBrowserAuthenticationProviderOptions);
    /**
     * @public
     * @async
     * To get the access token for the request
     * @returns The promise that resolves to an access token
     */
    getAccessToken(): Promise<string>;
}
